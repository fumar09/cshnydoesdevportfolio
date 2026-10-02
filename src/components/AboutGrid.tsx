import { MapPin } from '@/components/slab'
import { community, interests, workExperience } from '@/data/portfolio'
import { profile } from '@/data/profile'

export default function AboutGrid() {
  return (
    <section className="pgrid portfolio-page" aria-labelledby="about-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">About Connie</span>
        <h1 className="pgrid__title" id="about-title">People-first service. Practical problem-solving.</h1>
        <p className="pgrid__lede">{profile.hero.body}</p>
      </header>

      <div className="portfolio-page-grid portfolio-about-grid">
        <section className="portfolio-panel portfolio-about-intro">
          <div className="portfolio-panel__eyebrow">A little about me</div>
          <h2>Support-minded.<br />Design-aware.</h2>
          <p>I’m building a career around helpful technology: listening to people, understanding the problem, and shaping clear, usable solutions.</p>
          <p className="portfolio-location"><MapPin size={17} weight="fill" aria-hidden="true" />{profile.location}</p>
        </section>

        <section className="portfolio-panel portfolio-work-history" aria-labelledby="experience-title">
          <div className="portfolio-panel__eyebrow">Work experience</div>
          <h2 id="experience-title">Service, teamwork, and practical problem-solving.</h2>
          <div className="portfolio-timeline">
            {workExperience.map((job) => (
              <article key={job.organization} className="portfolio-timeline__item">
                <div className="portfolio-timeline__meta"><span>{job.period}</span><span>{job.location}</span></div>
                <h3>{job.role}</h3>
                <p className="portfolio-timeline__organization">{job.organization}</p>
                <ul>{job.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="portfolio-panel" aria-labelledby="community-title">
          <div className="portfolio-panel__eyebrow">Community & interests</div>
          <h2 id="community-title">Creative work, on and off the job.</h2>
          <div className="portfolio-community-list">
            {community.map((item) => (
              <article key={item.organization} className="portfolio-community-item">
                <span className="portfolio-community-item__period">{item.period}</span>
                <h3>{item.organization}</h3>
                <p>{item.role}</p>
              </article>
            ))}
          </div>
          <h3 className="portfolio-subheading">Creative interests</h3>
          <ul className="portfolio-tags" role="list">
            {interests.map((interest) => <li key={interest}>{interest}</li>)}
          </ul>
        </section>
      </div>
    </section>
  )
}
