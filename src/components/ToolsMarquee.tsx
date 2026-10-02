import { useMemo } from 'react'

export const tools = [
  'Figma',
  'Google Workspace',
  'Microsoft 365',
  'HTML',
  'CSS',
  'JavaScript',
  'Web application development',
  'Technical support',
  'Hardware troubleshooting',
  'Visual graphic design',
]

export default function ToolsMarquee() {
  const doubled = useMemo(() => [...tools, ...tools], [])

  return (
    <section className="tools-marquee" aria-label="Tools and areas of practice" data-reveal>
      <div className="tools-marquee__track" aria-hidden="true">
        {doubled.map((tool, i) => (
          <div key={`${tool}-${i}`} className="tools-marquee__item">
            <span className="tools-marquee__tile"><span className="tools-marquee__symbol">{tool.slice(0, 2).toUpperCase()}</span></span>
            <span className="tools-marquee__label">{tool}</span>
          </div>
        ))}
      </div>
      <ul className="sr-only">
        {tools.map((tool) => <li key={tool}>{tool}</li>)}
      </ul>
    </section>
  )
}
