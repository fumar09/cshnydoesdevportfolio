import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@/components/slab'
import { profile } from '@/data/profile'
import ToolsMarquee from './ToolsMarquee'
import HomeBento from './HomeBento'
import { HomeProfile, HomeStats, HomeExplore } from './HomeMobile'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useIsPhone } from '@/hooks/useMediaQuery'





















export default function Home() {
  useScrollReveal()
  const phone = useIsPhone()
  const { displayName, hero } = profile

  return (
    <section className="home" aria-labelledby="home-title">
      {phone && <HomeProfile />}

      <div className="home__head">
        <div className="home__headline">
          <h1 className="home__title" id="home-title">
            <span className="home__line">
              {displayName.line1} {displayName.line2}
            </span>
          </h1>

          {!phone && (
            <Link className="home__cta" to="/contact">
              Get in touch
              <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
            </Link>
          )}
        </div>

        <p className="home__lede">{hero.body}</p>
        {phone && <HomeStats />}
      </div>

      {

}
      <div className="home__glass home__glass--tools">
        <div className="home__tools">
          <div className="home__tools-head">
            <span className="home__tools-eyebrow">Daily drivers</span>
            <h2 className="home__tools-label">Tools I work with</h2>
          </div>
          <ToolsMarquee />
        </div>
      </div>

      {phone ? (
        <HomeExplore />
      ) : (
        <div className="home__glass home__glass--showcase">
          <div className="home__showcase">
            <HomeBento />
          </div>
        </div>
      )}
    </section>
  )
}
