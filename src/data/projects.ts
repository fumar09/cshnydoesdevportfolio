export type AppStat = { value: string; label: string }

export type AppProject = {
  name: string
  tagline: string
  description: string

  imageSrc?: string

  imagePosition?: string

  accentColor: string
  stats: AppStat[]
  badge: string
}


export type MobileApp = AppProject





const STATS: AppStat[] = [
  { value: '0', label: 'Stat one' },
  { value: '0', label: 'Stat two' },
  { value: '0', label: 'Stat three' },
]

const DESC = 'PLACEHOLDER - tell me what to put here: what the app does, who it is for, and where it is published.'

export const mobileApps: MobileApp[] = [
  {
    name: 'App Name One',
    tagline: 'PLACEHOLDER - one-line tagline.',
    description: DESC,
    imageSrc: '/placeholders/app-1.jpg',
    imagePosition: '50% 30%',
    accentColor: '#2563EB',
    stats: STATS,
    badge: 'Badge',
  },
  {
    name: 'App Name Two',
    tagline: 'PLACEHOLDER - one-line tagline.',
    description: DESC,
    imageSrc: '/placeholders/app-2.jpg',
    accentColor: '#7C3AED',
    stats: STATS,
    badge: 'Badge',
  },
  {
    name: 'App Name Three',
    tagline: 'PLACEHOLDER - one-line tagline.',
    description: DESC,
    imageSrc: '/placeholders/app-3.jpg',
    accentColor: '#16A34A',
    stats: STATS,
    badge: 'Badge',
  },
]

export const webApps: AppProject[] = [
  {
    name: 'Web App One',
    tagline: 'PLACEHOLDER - one-line tagline.',
    description: DESC,
    accentColor: '#0EA5E9',
    stats: STATS,
    badge: 'Badge',
  },
  {
    name: 'Web App Two',
    tagline: 'PLACEHOLDER - one-line tagline.',
    description: DESC,
    accentColor: '#EF4444',
    stats: STATS,
    badge: 'Badge',
  },
  {
    name: 'Web App Three',
    tagline: 'PLACEHOLDER - one-line tagline.',
    description: DESC,
    imageSrc: '/placeholders/project-3.jpg',
    accentColor: '#0891B2',
    stats: STATS,
    badge: 'Badge',
  },
  {
    name: 'Web App Four',
    tagline: 'PLACEHOLDER - one-line tagline.',
    description: DESC,
    imageSrc: '/placeholders/project-4.jpg',
    accentColor: '#F59E0B',
    stats: STATS,
    badge: 'Badge',
  },
]
