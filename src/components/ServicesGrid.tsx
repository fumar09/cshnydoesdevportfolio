import { skillGroups } from '@/data/portfolio'

export default function ServicesGrid() {
  return (
    <section className="pgrid portfolio-page" aria-labelledby="skills-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Skills & toolkit</span>
        <h1 className="pgrid__title" id="skills-title">Design-minded. Detail-focused.</h1>
        <p className="pgrid__lede">Technical support, web development, design, and customer-facing strengths from my resume.</p>
      </header>

      <div className="portfolio-skill-grid">
        {skillGroups.map((group, index) => (
          <section className="portfolio-panel portfolio-skill-card" key={group.title}>
            <span className="portfolio-skill-card__index">{String(index + 1).padStart(2, '0')}</span>
            <div className="portfolio-panel__eyebrow">{index === 0 ? 'Practice area' : 'Strengths'}</div>
            <h2>{group.title}</h2>
            <ul className="portfolio-tags" role="list">
              {group.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
        ))}
      </div>
    </section>
  )
}
