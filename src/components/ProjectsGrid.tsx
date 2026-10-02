import { ArrowUpRight } from '@/components/slab'
import { portfolioProjects } from '@/data/portfolio'

export default function ProjectsGrid() {
  return (
    <section className="pgrid portfolio-page" aria-labelledby="projects-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Selected work</span>
        <h1 className="pgrid__title" id="projects-title">A few things I’ve helped shape.</h1>
        <p className="pgrid__lede">Four projects exploring public services, information systems, music, and career tools.</p>
      </header>

      <div className="portfolio-project-grid" aria-label="Portfolio projects">
        {portfolioProjects.map((project, index) => (
          <article key={project.id} className="portfolio-project-card">
            <div className="portfolio-project-card__image-wrap">
              <img src={project.image} alt={project.imageAlt} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" />
              <span className="portfolio-project-card__index">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className="portfolio-project-card__body">
              <div className="portfolio-project-card__meta">
                <span>{project.category}</span>
                <span>{project.period}</span>
              </div>
              <h2>{project.name}</h2>
              <p className="portfolio-project-card__role">{project.role}</p>
              <p className="portfolio-project-card__description">{project.description}</p>
              {project.outcome && <p className="portfolio-project-card__outcome">{project.outcome}</p>}
              <ul className="portfolio-tags" role="list">
                {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
              {project.href && (
                <a className="portfolio-project-card__link" href={project.href} target="_blank" rel="noopener noreferrer">
                  Open project <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
