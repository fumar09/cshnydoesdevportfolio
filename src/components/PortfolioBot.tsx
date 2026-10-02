import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ChatCircleDots, PaperPlaneRight, Sparkle, X } from '@/components/slab'

type Citation = { title: string; url: string }
type ChatMessage = { role: 'user' | 'assistant'; content: string; citations?: Citation[]; searchSuggestions?: string }

const suggestions = [
  'Who is Connie?',
  'What tools does she use?',
  'Search for something',
]

export default function PortfolioBot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [sending, setSending] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const feedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, sending, open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  async function sendMessage(contentOverride?: string) {
    const content = (contentOverride ?? input).trim()
    if (!content || sending) return

    const nextMessages = [...messages, { role: 'user' as const, content }]
    setMessages(nextMessages)
    setInput('')
    setSending(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages.slice(-10).map(({ role, content: text }) => ({ role, content: text })) }),
      })
      const data = await response.json() as { answer?: string; citations?: Citation[]; searchSuggestions?: string; error?: string }
      if (!response.ok || !data.answer) throw new Error(data.error || 'The assistant could not respond. Please try again.')
      setMessages((current) => [...current, {
        role: 'assistant',
        content: data.answer!,
        citations: data.citations,
        searchSuggestions: data.searchSuggestions,
      }])
    } catch (error) {
      const message = error instanceof Error ? error.message : 'The assistant could not connect. Please try again.'
      setMessages((current) => [...current, { role: 'assistant', content: message }])
    } finally {
      setSending(false)
    }
  }

  return (
    <div className={`portfolio-bot${open ? ' is-open' : ''}`}>
      {open && (
        <section className="portfolio-bot__panel" role="dialog" aria-label="Connie's portfolio assistant">
          <header className="portfolio-bot__header">
            <span className="portfolio-bot__avatar" aria-hidden="true"><Sparkle size={19} weight="fill" /></span>
            <span className="portfolio-bot__heading">
              <strong>Portfolio assistant</strong>
              <span>Ask about Connie or search the web</span>
            </span>
            <button className="portfolio-bot__close" type="button" onClick={() => setOpen(false)} aria-label="Close assistant">
              <X size={19} weight="bold" />
            </button>
          </header>

          <div className="portfolio-bot__feed" ref={feedRef} aria-live="polite" aria-relevant="additions text">
            {messages.length === 0 ? (
              <div className="portfolio-bot__welcome">
                <span className="portfolio-bot__welcome-icon" aria-hidden="true"><ChatCircleDots size={25} weight="duotone" /></span>
                <h2>Hi, I’m Connie’s portfolio assistant.</h2>
                <p>Ask about her background and tools, or ask me to search for something.</p>
                <div className="portfolio-bot__suggestions">
                  {suggestions.map((suggestion) => (
                    <button key={suggestion} type="button" onClick={() => void sendMessage(suggestion)}>
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : messages.map((message, index) => (
              <article key={`${message.role}-${index}`} className={`portfolio-bot__message portfolio-bot__message--${message.role}`}>
                <p>{message.content}</p>
                {message.citations && message.citations.length > 0 && (
                  <div className="portfolio-bot__sources">
                    <span>Sources</span>
                    {message.citations.map((citation) => (
                      <a key={citation.url} href={citation.url} target="_blank" rel="noreferrer">{citation.title}</a>
                    ))}
                  </div>
                )}
                {message.searchSuggestions && (
                  <div
                    className="portfolio-bot__search-suggestions"
                    dangerouslySetInnerHTML={{ __html: message.searchSuggestions }}
                  />
                )}
              </article>
            ))}
            {sending && <div className="portfolio-bot__typing" role="status">Searching and preparing an answer…</div>}
          </div>

          <form className="portfolio-bot__form" onSubmit={(event: FormEvent<HTMLFormElement>) => { event.preventDefault(); void sendMessage() }}>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask anything…"
              aria-label="Your message"
              maxLength={1400}
              disabled={sending}
            />
            <button type="submit" aria-label="Send message" disabled={!input.trim() || sending}>
              <PaperPlaneRight size={19} weight="fill" />
            </button>
          </form>
          <p className="portfolio-bot__note">I can discuss Connie’s tools and tech stack, but not provide coding help.</p>
        </section>
      )}

      <button
        className="portfolio-bot__launcher"
        type="button"
        aria-label={open ? 'Close portfolio assistant' : 'Open portfolio assistant'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={24} weight="bold" /> : <ChatCircleDots size={25} weight="fill" />}
      </button>
    </div>
  )
}
