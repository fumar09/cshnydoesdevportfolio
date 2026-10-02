export type PortfolioProject = {
  id: string
  name: string
  category: string
  period: string
  role: string
  description: string
  image: string
  imageAlt: string
  tags: string[]
  outcome?: string
  href?: string
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'e-barangay',
    name: 'E-Barangay ni Kap',
    category: 'Service platform',
    period: '2024–2025',
    role: 'UI/UX Designer & Co-Developer',
    description: 'Helped digitize barangay document requests through accessible navigation, wireframes, and features shaped by constituent feedback.',
    image: '/images/e-barangay-preview.jpg',
    imageAlt: 'Preview of the E-Barangay ni Kap interface',
    tags: ['Service flows', 'Resident access', 'Community services'],
    outcome: 'My resume reports an approximately 30% increase in user satisfaction.',
  },
  {
    id: 'archivia',
    name: 'ARCHIVIA',
    category: 'Records interface',
    period: '2025–2026',
    role: 'UI/UX Designer & Frontend Developer',
    description: 'Designed a document management and retrieval system, created Figma workflows, and built responsive HTML, CSS, and JavaScript components. Tested with users and worked with a cross-functional team to refine the experience.',
    image: '/images/archivia-preview.jpg',
    imageAlt: 'Preview of the ARCHIVIA interface',
    tags: ['Record retrieval', 'Admin workflow', 'Responsive frontend'],
  },
  {
    id: 'romantic-music-player',
    name: 'Romantic Music Player',
    category: 'Portfolio project',
    period: 'Independent concept',
    role: 'UI/UX & Frontend',
    description: 'An independent music-player interface concept exploring a softer visual direction, readable controls, and responsive frontend presentation.',
    image: '/images/romantic-music-player-preview.jpg',
    imageAlt: 'Preview of the Romantic Music Player interface',
    tags: ['Visual mood', 'Playback clarity', 'Responsive frontend'],
    href: 'https://ikaw-pa-rin-romantic-music-player-c.vercel.app',
  },
  {
    id: 'resumay',
    name: 'ResuMay!',
    category: 'Career tool',
    period: '2025–2026',
    role: 'Developer',
    description: 'Built an interactive ATS resume optimizer with modern frontend components, refined it with user feedback and design collaborators, and improved performance to support user retention.',
    image: '/images/resumay-preview.png',
    imageAlt: 'Preview of the ResuMay ATS Resume Optimizer interface',
    tags: ['ATS scoring', 'Resume optimization', 'PDF export'],
    outcome: 'My portfolio reports an approximately 25% reduction in load times.',
    href: 'https://resumaybuilder.vercel.app/',
  },
]

export const skillGroups = [
  {
    title: 'Design & user experience',
    items: ['Figma', 'Wireframing', 'User-centered interface design', 'Visual graphic design', 'User testing'],
  },
  {
    title: 'Web applications',
    items: ['HTML', 'CSS', 'JavaScript', 'Responsive interfaces', 'Web application development'],
  },
  {
    title: 'IT support',
    items: ['Technical support', 'Hardware troubleshooting', 'Computer systems servicing', 'Microsoft 365', 'Google Workspace'],
  },
  {
    title: 'People & operations',
    items: ['Customer service', 'Team leadership', 'Data encoding', 'Product listing', 'Problem-solving', 'Team communication', 'AI-assisted media editing'],
  },
]

export const workExperience = [
  {
    period: '2021–2022',
    location: 'Leyte',
    organization: 'Chowking',
    role: 'Service Crew Team Leader',
    details: [
      'Led team members to keep daily operations organized and customer service consistent.',
      'Handled customer inquiries, cash operations, troubleshooting, and task delegation in a fast-paced environment.',
      'Trained team members on service protocols and monitored feedback; my resume reports an approximately 20% increase in customer ratings.',
    ],
  },
  {
    period: '2018–2020',
    location: 'Leyte',
    organization: 'Eboy’s Catering Services',
    role: 'On-Call Banquet Waiter',
    details: [
      'Supported food and beverage service during events while maintaining quality and guest service.',
      'Assisted with event setup and logistics, coordinated with teammates, and helped resolve service issues.',
      'Maintained clean service areas and supported training for new staff.',
    ],
  },
]

export const education = [
  {
    period: '2023–2026',
    location: 'Leyte',
    school: 'ACLC College of Tacloban',
    program: 'Bachelor of Science in Information Technology, specializing in Web Application Development',
  },
  {
    period: '2017–2019',
    location: 'Leyte',
    school: 'Tanauan School of Craftsmanship and Home Industries',
    program: 'Senior High School',
  },
  {
    period: '2014–2018',
    location: 'Romblon',
    school: 'Alcantara National High School',
    program: 'Junior High School',
  },
  {
    period: '2009–2014',
    location: 'Romblon',
    school: 'Sacred Heart School',
    program: 'Elementary',
  },
]

export const credentials = [
  {
    title: 'Google UX Design Professional Certificate',
    issuer: 'Google · Coursera',
    detail: 'UX design studies through Google and Coursera.',
    image: '/images/coursera-badge.png',
    imageAlt: 'Coursera Google UX Design Professional Certificate badge',
    href: '/documents/Coursera-UX-Design-Professional-Certificate.pdf',
  },
  {
    title: 'TESDA National Certificate II in Computer Systems Servicing',
    issuer: 'TESDA · Technical',
    detail: 'Issued August 12, 2025 · Valid through August 11, 2030.',
    image: '/images/tesda-css-nc-ii.jpg',
    imageAlt: 'TESDA National Certificate II in Computer Systems Servicing awarded to Connie Frances Fumar',
    href: '/images/tesda-css-nc-ii.jpg',
  },
  {
    title: 'Visual Graphic Design NC III',
    issuer: 'TESDA · Visual design',
    detail: 'TESDA certification listed on my portfolio.',
    image: '',
    imageAlt: '',
    href: '',
  },
]

export const recognitions = [
  'Service Awardee',
  'Merit Awardee',
  'Editorial Cartoonist for MARQUEE',
  'Outstanding Student',
  'Best in Visual Graphic Design NC III',
  '3rd Placer · National PhilHealth Digital Art Competition',
]

export const community = [
  {
    period: '2019–2026',
    organization: 'MARQUEE Student Publication',
    role: 'Editorial cartoonist and publication member',
  },
  {
    period: '2020–2023',
    organization: 'Samar Artist Guild',
    role: 'Member',
  },
]

export const interests = ['Rust painting and medium artistry', 'Editorial cartooning', 'Fine arts and visual design']

export const resumeHref = '/documents/Connie-Frances-Fumar-Resume.pdf'
