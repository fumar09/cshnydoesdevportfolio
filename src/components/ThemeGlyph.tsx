








export default function ThemeGlyph({ theme, size = 18 }: { theme: 'light' | 'dark'; size?: number }) {
  return (
    <svg
      className="tg"
      data-theme={theme}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
    >
      <g className="tg__rays" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <line x1="12" y1="1.6" x2="12" y2="3.4" />
        <line x1="12" y1="20.6" x2="12" y2="22.4" />
        <line x1="1.6" y1="12" x2="3.4" y2="12" />
        <line x1="20.6" y1="12" x2="22.4" y2="12" />
        <line x1="4.65" y1="4.65" x2="5.9" y2="5.9" />
        <line x1="18.1" y1="18.1" x2="19.35" y2="19.35" />
        <line x1="4.65" y1="19.35" x2="5.9" y2="18.1" />
        <line x1="18.1" y1="5.9" x2="19.35" y2="4.65" />
      </g>
      <circle className="tg__disc" cx="12" cy="12" r="7" fill="currentColor" />
      <circle className="tg__cut" cx="12" cy="12" r="6.5" />
    </svg>
  )
}
