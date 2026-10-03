import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const deploymentUrl =
    env.VITE_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL
  let siteOrigin = ''

  if (deploymentUrl) {
    try {
      siteOrigin = new URL(
        deploymentUrl.startsWith('http') ? deploymentUrl : `https://${deploymentUrl}`,
      ).origin
    } catch {
      siteOrigin = ''
    }
  }

  return {
    plugins: [
      react(),
      {
        name: 'absolute-social-preview-urls',
        transformIndexHtml(html) {
          if (!siteOrigin) return html

          return html
            .replace('href="/" />', `href="${siteOrigin}/" />`)
            .replace('content="/" />', `content="${siteOrigin}/" />`)
            .replaceAll(
              'content="/images/og-portfolio.jpg"',
              `content="${siteOrigin}/images/og-portfolio.jpg"`,
            )
        },
      },
    ],
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
