import { education } from '@/data/portfolio'

export default function ShowcaseGrid() {
  return (
    <section className="pgrid portfolio-page" aria-labelledby="education-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Education</span>
        <h1 className="pgrid__title" id="education-title">Building a foundation in web applications.</h1>
        <p className="pgrid__lede">Formal studies in web application development, alongside senior high school in Leyte.</p>
      </header>

      <div className="portfolio-education-list">
        {education.map((entry, index) => (
          <article key={entry.school} className={`portfolio-education-card${index === 0 ? ' portfolio-education-card--current' : ''}`}>
            <span className="portfolio-education-card__number">{String(index + 1).padStart(2, '0')}</span>
            <div className="portfolio-education-card__period">{entry.period}<span>{entry.location}</span></div>
            <div className="portfolio-education-card__copy">
              <h2>{entry.school}</h2>
              <p>{entry.program}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
