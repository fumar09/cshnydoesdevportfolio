import { Link } from 'react-router-dom'
import { ArrowUpRight, EnvelopeSimple, FolderOpen, GraduationCap, SealCheck, User, Wrench } from '@/components/slab'
import { credentials, education, portfolioProjects, skillGroups } from '@/data/portfolio'
import { profile } from '@/data/profile'

const sections = [
  {
    to: '/projects',
    label: 'Selected work',
    title: 'Four projects',
    detail: 'Community services, records, music, and career tools.',
    Icon: FolderOpen,
    image: portfolioProjects[0].image,
    imageAlt: portfolioProjects[0].imageAlt,
  },
  {
    to: '/about',
    label: 'About Connie',
    title: 'People-first service.',
    detail: 'Support-minded, design-aware, and grounded in customer care.',
    Icon: User,
    image: profile.avatarSrc,
    imageAlt: profile.hero.portraitAlt,
  },
  {
    to: '/services',
    label: 'Skills',
    title: 'Design-minded. Detail-focused.',
    detail: skillGroups[0].items.slice(0, 3).join(' · '),
    Icon: Wrench,
  },
  {
    to: '/showcase',
    label: 'Education',
    title: 'Web application development.',
    detail: education[0].school,
    Icon: GraduationCap,
  },
  {
    to: '/credentials',
    label: 'Credentials',
    title: 'Learning, made tangible.',
    detail: credentials[0].title,
    Icon: SealCheck,
  },
  {
    to: '/contact',
    label: 'Contact',
    title: 'Let’s make it make sense.',
    detail: profile.location,
    Icon: EnvelopeSimple,
  },
]

export default function HomeBento() {
  return (
    <nav className="portfolio-home-grid" aria-label="Explore Connie’s portfolio">
      {sections.map(({ to, label, title, detail, Icon, image, imageAlt }, index) => (
        <Link key={to} to={to} className={`portfolio-home-card portfolio-home-card--${index + 1}`}>
          <span className="portfolio-home-card__top">
            <span className="portfolio-home-card__icon"><Icon size={19} weight="duotone" aria-hidden="true" /></span>
            <span className="portfolio-home-card__label">{label}</span>
            <ArrowUpRight size={17} weight="bold" aria-hidden="true" className="portfolio-home-card__arrow" />
          </span>
          <span className="portfolio-home-card__title">{title}</span>
          <span className="portfolio-home-card__detail">{detail}</span>
          {image && <img className="portfolio-home-card__image" src={image} alt={imageAlt ?? ''} loading="lazy" decoding="async" />}
        </Link>
      ))}
    </nav>
  )
}
