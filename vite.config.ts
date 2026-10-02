import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { handlePortfolioChat } from './api/chat-core'

export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), {
      name: 'portfolio-chat-local-api',
      configureServer(server) {
        server.middlewares.use('/api/chat', (req, res) => {
          res.setHeader('Cache-Control', 'no-store')
          if (req.method !== 'POST') {
            res.statusCode = 405
            res.setHeader('Allow', 'POST')
            res.end(JSON.stringify({ error: 'Use POST to send a message.' }))
            return
          }

          const chunks: Uint8Array[] = []
          let size = 0
          let tooLarge = false
          req.on('data', (chunk: Uint8Array) => {
            size += chunk.byteLength
            if (size > 20_000) {
              tooLarge = true
              chunks.length = 0
              return
            }
            if (!tooLarge) chunks.push(chunk)
          })
          req.on('end', () => {
            if (tooLarge) {
              res.statusCode = 413
              res.setHeader('Content-Type', 'application/json; charset=utf-8')
              res.end(JSON.stringify({ error: 'Please shorten the conversation and try again.' }))
              return
            }

            void (async () => {
              try {
                const body = JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown
                const env = loadEnv(mode, process.cwd(), '')
                const chatApiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY
                const result = await handlePortfolioChat(body, req.headers, chatApiKey)
                res.statusCode = result.status
                res.setHeader('Content-Type', 'application/json; charset=utf-8')
                res.end(JSON.stringify(result.body))
              } catch {
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json; charset=utf-8')
                res.end(JSON.stringify({ error: 'Please send a valid message and try again.' }))
              }
            })()
          })
        })
      },
    }],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5173,




      headers: {



        'X-Frame-Options': 'SAMEORIGIN',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()',
        'Cross-Origin-Opener-Policy': 'same-origin',
      },
    },
    build: {
      target: 'es2022',
      sourcemap: false,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            three: ['three'],
          },
        },
      },
    },
  }
})
