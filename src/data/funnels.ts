export type FunnelTag = 'Lead Capture' | 'Booking' | 'Checkout' | 'Website'

export type Funnel = {
  file: string
  label: string
  tag: FunnelTag
  desc: string

  dir?: 'funnels' | 'samples'
}










const funnel = (n: string, tag: FunnelTag): Funnel => ({
  file: `placeholder-funnel-${n}.html`,
  label: `Placeholder Funnel ${n}`,
  tag,
  desc: 'PLACEHOLDER - tell me what to put here: who this page was for and what it does.',
})

const site = (n: string): Funnel => ({
  file: `placeholder-site-${n}.html`,
  label: `Placeholder Website ${n}`,
  tag: 'Website',
  desc: 'PLACEHOLDER - tell me what to put here: the client, the industry, and what the site had to do.',
  dir: 'samples',
})

export const gymFunnel: Funnel[] = [
  funnel('01', 'Lead Capture'),
  funnel('02', 'Checkout'),
  funnel('03', 'Lead Capture'),
]

export const bookingFunnel: Funnel[] = [
  funnel('04', 'Booking'),
  funnel('05', 'Booking'),
  funnel('06', 'Booking'),
]

export const websiteFunnel: Funnel[] = ['01', '02', '03', '04', '05', '06'].map(site)





export const tagColors: Record<FunnelTag, string> = {
  'Lead Capture': '#8b5cf6',
  Booking: '#ec4899',
  Checkout: '#f59e0b',
  Website: '#FF7A1A',
}
