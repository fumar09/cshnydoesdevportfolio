import { VideoCamera } from '@/components/slab'

export default function TestimonialsGrid() {
  return (
    <section className="pgrid portfolio-page" aria-labelledby="testimonials-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Client feedback</span>
        <h1 className="pgrid__title" id="testimonials-title">Testimonials</h1>
        <p className="pgrid__lede">Video testimonials from clients will be shared here.</p>
      </header>

      <div className="testimonials-coming">
        <div className="testimonials-coming__screen" aria-hidden="true">
          <VideoCamera size={48} weight="duotone" />
          <span>Client videos</span>
        </div>
        <div className="portfolio-panel testimonials-coming__message">
          <span className="portfolio-panel__eyebrow">More to come</span>
          <h2>Coming soon</h2>
          <p>Client video testimonials will be added here soon.</p>
        </div>
      </div>
    </section>
  )
}
