import { VideoCamera } from '@/components/slab'
import { profile } from '@/data/profile'

const VIDEOS = ['01', '02']

export default function TestimonialsGrid() {
  return (
    <section className="pgrid tgrid" aria-labelledby="testimonials-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Testimonials</span>
        <h1 className="pgrid__title" id="testimonials-title">What clients say</h1>
        <p className="pgrid__lede">Video testimonials from clients will be shared here when they are ready.</p>
      </header>

      <div className="home__glass tgrid__glass">
        <div className="tgrid__reel">
          <div className="tgrid__stage">
            <div className="tgrid__cover tgrid__cover--soon" role="img" aria-label="Client testimonial videos coming soon">
              <span className="tgrid__cover-shade" aria-hidden="true" />
              <span className="tgrid__cover-play" aria-hidden="true"><VideoCamera size={26} weight="duotone" /></span>
              <span className="tgrid__cover-meta">
                <span className="tgrid__cover-kicker">Client video testimonials</span>
                <span className="tgrid__cover-sub">Coming soon</span>
              </span>
            </div>
          </div>

          <div className="tgrid__picker" aria-label="Upcoming testimonial videos">
            {VIDEOS.map((index) => (
              <div key={index} className={`tgrid__pick${index === '01' ? ' is-active' : ''}`}>
                <span className="tgrid__pick-thumb" aria-hidden="true"><VideoCamera size={17} weight="duotone" /></span>
                <span className="tgrid__pick-copy">
                  <span className="tgrid__pick-kicker">Video {index}</span>
                  <span className="tgrid__pick-meta">Coming soon</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="tgrid__ledger">
          <div className="tgrid__ledger-head">
            <h2 className="tgrid__ledger-title">Client feedback</h2>
            <p className="tgrid__ledger-sub">Video testimonials will appear here.</p>
          </div>

          <ul className="tgrid__clients tgrid__clients--soon" role="list">
            <li className="tgrid__client">
              <span className="tgrid__client-mark" aria-hidden="true"><VideoCamera size={22} weight="duotone" /></span>
              <span className="tgrid__client-body">
                <span className="tgrid__client-head">
                  <span className="tgrid__client-name">Testimonials coming soon</span>
                  <span className="tgrid__client-role">Video updates</span>
                </span>
                <span className="tgrid__client-daily">{profile.firstName} will add client videos here as they become available.</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
