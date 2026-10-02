import Flagship from '@/components/Flagship'









export default function ShowcaseGrid() {
  return (
    <section className="pgrid ktools" aria-labelledby="showcase-title">
      <header className="pgrid__head ktools__head">
        <div className="ktools__head-copy">
          <span className="pgrid__eyebrow">Showcase</span>
          <h1 className="pgrid__title" id="showcase-title">
            Your flagship product, and the people using it.
          </h1>
          <p className="pgrid__lede">
            PLACEHOLDER - tell me what to put here: one line on what this product is and why a visitor should look at it.
          </p>
        </div>

        {

}
        <div className="ktools__vote">
          <p className="ktools__vote-label">
            Featured on
            <span aria-hidden="true" className="ktools__vote-dot" />
            <span className="ktools__vote-ask">Placeholder</span>
          </p>
          <a className="ktools__vote-frame ktools__vote-card" href="#">
            <img src="/placeholders/badge.svg" alt="" width="48" height="48" />
            <span className="ktools__vote-text">
              PLACEHOLDER - a badge, award or launch link
            </span>
          </a>
        </div>
      </header>

      <div className="home__glass ktools__glass">
        <Flagship eyebrow="Flagship build" />
      </div>
    </section>
  )
}
