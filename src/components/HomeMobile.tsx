import { Link } from 'react-router-dom'
import { ArrowUpRight, Briefcase, Certificate, FolderOpen, GraduationCap, User, Wrench } from '@/components/slab'
import { profile } from '@/data/profile'
import { portfolioProjects } from '@/data/portfolio'
import QuickMenu from './QuickMenu'

export function HomeProfile() {
  return (
    <header className="hprofile">
      <img className="hprofile__avatar" src={profile.avatarSrc} alt="" width={56} height={56} />
      <div className="hprofile__who">
        <span className="hprofile__name">{profile.name}</span>
        <span className="hprofile__handle">{profile.handle} · {profile.role}</span>
      </div>
      <QuickMenu className="hprofile__menu" />
    </header>
  )
}

export function HomeStats() {
  return (
    <ul className="hstats" role="list">
      {profile.stats.map(({ value, label, Icon }) => (
        <li key={label}>
          <Icon className="hstats__icon" size={18} weight="duotone" aria-hidden="true" />
          <b className="hstats__value">{value}</b>
          <span className="hstats__label">{label}</span>
        </li>
      ))}
    </ul>
  )
}

const tiles = [
  { label: 'Projects', to: '/projects', title: 'Selected work', description: 'Four projects across public services, records, music, and career tools.', Icon: FolderOpen, image: portfolioProjects[0].image },
  { label: 'Experience', to: '/about', title: 'People-first service', description: 'Customer-facing leadership and event service experience.', Icon: Briefcase },
  { label: 'Skills', to: '/services', title: 'Design and technology', description: 'UI/UX, web applications, IT support, and visual design.', Icon: Wrench },
  { label: 'Education', to: '/showcase', title: 'Web application development', description: 'A foundation in information technology and design.', Icon: GraduationCap },
  { label: 'Credentials', to: '/credentials', title: 'Learning, made tangible', description: 'Google UX Design and TESDA certifications.', Icon: Certificate },
  { label: 'About', to: '/about', title: `Hi, I’m ${profile.firstName}.`, description: 'Based in Alcantara, Romblon, Philippines.', Icon: User, image: profile.avatarSrc },
]

export function HomeExplore() {
  return (
    <>
      <div className="hsec"><h2 className="hsec__title">Explore</h2></div>
      <ul className="portfolio-mobile-tiles" role="list">
        {tiles.map(({ label, to, title, description, Icon, image }) => (
          <li key={label}>
            <Link to={to} className="portfolio-mobile-tile">
              <span className="portfolio-mobile-tile__media">
                {image ? <img src={image} alt="" loading="lazy" /> : <Icon size={32} weight="duotone" aria-hidden="true" />}
              </span>
              <span className="portfolio-mobile-tile__copy">
                <span className="portfolio-mobile-tile__label">{label}</span>
                <span className="portfolio-mobile-tile__title">{title}</span>
                <span className="portfolio-mobile-tile__detail">{description}</span>
              </span>
              <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
