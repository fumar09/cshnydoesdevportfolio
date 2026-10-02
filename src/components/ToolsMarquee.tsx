import { useMemo } from 'react'
import { tools } from '@/data/tools'

export default function ToolsMarquee() {
  const doubled = useMemo(() => [...tools, ...tools], [])

  return (
    <section className="tools-marquee" aria-label="Tools I work with" data-reveal>
      <div className="tools-marquee__track" aria-hidden="true">
        {doubled.map((tool, i) => (
          <div key={`${tool.name}-${i}`} className="tools-marquee__item">
            <span className="tools-marquee__tile">
              <img
                className={`tools-marquee__img${tool.name === 'Cursor' ? ' tools-marquee__img--cursor' : ''}`}
                src={tool.logoPath}
                alt=""
              />
            </span>
            <span className="tools-marquee__label">{tool.name}</span>
          </div>
        ))}
      </div>
      <ul className="sr-only">
        {tools.map((tool) => <li key={tool.name}>{tool.name}</li>)}
      </ul>
    </section>
  )
}
