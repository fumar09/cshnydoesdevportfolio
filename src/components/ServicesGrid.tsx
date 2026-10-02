import { skillGroups } from '@/data/portfolio'

export default function ServicesGrid() {
  return (
    <section className="pgrid portfolio-page" aria-labelledby="services-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Services</span>
        <h1 className="pgrid__title" id="services-title">Practical support. Clear digital experiences.</h1>
        <p className="pgrid__lede">I offer practical IT support, responsive web development, and user-centered UI/UX design for people and community-focused organizations.</p>
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
