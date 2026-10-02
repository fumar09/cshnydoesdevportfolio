import { ArrowUpRight, SealCheck } from '@/components/slab'
import { credentials, recognitions } from '@/data/portfolio'

export default function CredentialsGrid() {
  return (
    <section className="pgrid portfolio-page" aria-labelledby="credentials-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Certificates & recognition</span>
        <h1 className="pgrid__title" id="credentials-title">Learning, made tangible.</h1>
        <p className="pgrid__lede">Professional certificates, technical training, and distinctions from my studies and creative work.</p>
      </header>

      <div className="portfolio-credentials-layout">
        <div className="portfolio-credential-grid">
          {credentials.map((credential, index) => (
            <article className="portfolio-panel portfolio-credential-card" key={credential.title}>
              <div className="portfolio-credential-card__image">
                {credential.image ? <img src={credential.image} alt={credential.imageAlt} loading="lazy" decoding="async" /> : <SealCheck size={40} weight="duotone" aria-hidden="true" />}
              </div>
              <div className="portfolio-panel__eyebrow">{String(index + 1).padStart(2, '0')} / {credential.issuer}</div>
              <h2>{credential.title}</h2>
              <p>{credential.detail}</p>
              {credential.href && <a className="portfolio-inline-link" href={credential.href} target="_blank" rel="noopener noreferrer">Open certificate <ArrowUpRight size={15} weight="bold" aria-hidden="true" /></a>}
            </article>
          ))}
        </div>

        <section className="portfolio-panel portfolio-recognition" aria-labelledby="recognition-title">
          <div className="portfolio-panel__eyebrow">Non-academic distinctions</div>
          <h2 id="recognition-title">Recognition</h2>
          <ul className="portfolio-recognition-list">
            {recognitions.map((recognition) => <li key={recognition}><SealCheck size={17} weight="fill" aria-hidden="true" /><span>{recognition}</span></li>)}
          </ul>
        </section>
      </div>
    </section>
  )
}
