import { handlePortfolioChat } from './chat-core'

type VercelRequest = {
  method?: string
  body?: unknown
  headers: Record<string, string | string[] | undefined>
}

type VercelResponse = {
  status(code: number): VercelResponse
  json(body: unknown): void
  setHeader(name: string, value: string): void
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Use POST to send a message.' })
  }

  const result = await handlePortfolioChat(req.body, req.headers, process.env.GEMINI_API_KEY)
  return res.status(result.status).json(result.body)
}
