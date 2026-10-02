











import { Briefcase, SealCheck, Clock, type Icon } from '@/components/slab'

export type SocialLink = {
  label: string
  href: string
  iconPath: string
}


export type Stat = { value: string; label: string; Icon: Icon }

export type Profile = {
  name: string

  firstName: string
  handle: string

  role: string

  avatarSrc: string

  verifiedLabel: string
  email: string
  location: string

  stats: Stat[]
  displayName: { line1: string; line2: string }
  hero: {
    body: string
    portraitSrc: string
    portraitAlt: string
  }
  socials: SocialLink[]
}

export const profile: Profile = {
  name: 'Your Name',
  firstName: 'Your Name',
  handle: '@yourhandle',
  role: 'PLACEHOLDER - your title',
  avatarSrc: '/avatar.svg',
  verifiedLabel: 'PLACEHOLDER - what the tick means (e.g. a certification)',
  email: 'you@example.com',
  location: 'PLACEHOLDER - your city or timezone',

  stats: [
    { value: '0 yrs', label: 'PLACEHOLDER', Icon: Briefcase },
    { value: '#000', label: 'PLACEHOLDER', Icon: SealCheck },
    { value: 'GMT+0', label: 'PLACEHOLDER', Icon: Clock },
  ],


  displayName: { line1: 'Your headline here.', line2: 'Keep it short.' },
  hero: {
    body: 'PLACEHOLDER - one line on what you do and who you do it for.',
    portraitSrc: '/avatar.svg',
    portraitAlt: 'Portrait placeholder',
  },
  socials: [
    { label: 'Facebook profile', href: '#', iconPath: '/icons/facebook.svg' },
    { label: 'LinkedIn profile', href: '#', iconPath: '/icons/linkedin.svg' },
    { label: 'Discord profile', href: '#', iconPath: '/icons/discord.svg' },
  ],
}
