




type IconProps = { size?: number }

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
}


export function FlowIcon({ size = 22 }: IconProps) {
  return (
    <svg className="picon" width={size} height={size} {...base}>
      <rect className="picon__node-a" x="3" y="3" width="6" height="6" rx="1.5" />
      <rect className="picon__node-b" x="15" y="15" width="6" height="6" rx="1.5" />
      <path className="picon__cable" d="M9 6h4a2 2 0 0 1 2 2v7" />
    </svg>
  )
}


export function PlanIcon({ size = 22 }: IconProps) {
  return (
    <svg className="picon" width={size} height={size} {...base}>
      <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="2" />
      <path className="picon__line picon__line--1" d="M9 12h6" />
      <path className="picon__line picon__line--2" d="M9 16h6" />
    </svg>
  )
}


export function TicketIcon({ size = 22 }: IconProps) {
  return (
    <svg className="picon" width={size} height={size} {...base}>
      <g className="picon__ticket">
        <path d="M15 5l0 2" />
        <path d="M15 11l0 2" />
        <path d="M15 17l0 2" />
        <path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2" />
      </g>
    </svg>
  )
}


export function GlobeIcon({ size = 22 }: IconProps) {
  return (
    <svg className="picon" width={size} height={size} {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.6 9h16.8" />
      <path d="M3.6 15h16.8" />
      <path className="picon__meridian" d="M11.5 3a17 17 0 0 0 0 18" />
      <path className="picon__meridian picon__meridian--b" d="M12.5 3a17 17 0 0 1 0 18" />
    </svg>
  )
}


export function SparkIcon({ size = 22 }: IconProps) {
  return (
    <svg className="picon" width={size} height={size} {...base}>
      <path
        className="picon__spark"
        d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zM16 6a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2z"
      />
      <path className="picon__spark-big" d="M9 18a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" />
    </svg>
  )
}


export function DeviceIcon({ size = 22 }: IconProps) {
  return (
    <svg className="picon" width={size} height={size} {...base}>
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <path className="picon__screen" d="M11 4h2" />
      <path className="picon__home" d="M12 17v.01" />
      <path className="picon__glyph" d="M9.5 12h5M12 9.5v5" />
    </svg>
  )
}
