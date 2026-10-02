import { useMemo } from 'react'































type Tool = {
  name: string
  iconPath: string

  color?: string
}

export const tools: Tool[] = [
  { name: 'Claude Code',          iconPath: '/icons/claude-code-logo.png' },
  { name: 'Codex',                iconPath: '/icons/codex.svg',           color: '#000000' },
  { name: 'Cursor',               iconPath: '/icons/cursor.svg',          color: '#0F172A' },
  { name: 'Hermes AI',            iconPath: '/icons/nousresearch.svg',    color: '#18181B' },
  { name: 'VS Code',              iconPath: '/icons/vscode.svg' },
  { name: 'GoHighLevel',          iconPath: '/icons/gohighlevel.png' },
  { name: 'Lightspeed X-Series',  iconPath: '/icons/lightspeed.png' },
  { name: 'Google Workspace',     iconPath: '/icons/googleworkspace.svg' },
  { name: 'Zendesk',              iconPath: '/icons/zendesk.svg',         color: '#03363D' },
  { name: 'Intercom',             iconPath: '/icons/intercom.svg',        color: '#1F8DED' },
  { name: 'Slack',                iconPath: '/icons/slack.svg',           color: '#611F69' },
]

export default function ToolsMarquee() {


  const doubled = useMemo(() => [...tools, ...tools], [])

  return (
    <section className="tools-marquee" aria-label="Tools I work with" data-reveal>
      <div className="tools-marquee__track" aria-hidden="true">
        {doubled.map((tool, i) => {
          const useMask = tool.iconPath.endsWith('.svg') && !!tool.color
          return (
            <div key={`${tool.name}-${i}`} className="tools-marquee__item">
              {

}
              <span className="tools-marquee__tile">
                {useMask ? (
                  <span
                    className="tools-marquee__icon"
                    style={{
                      ['--icon-url' as string]: `url('${tool.iconPath}')`,
                      ['--brand-color' as string]: tool.color ?? 'var(--navy)',
                    }}
                  />
                ) : (
                  <img
                    className="tools-marquee__img"
                    src={tool.iconPath}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    width={20}
                    height={20}
                  />
                )}
              </span>
              <span className="tools-marquee__label">{tool.name}</span>
            </div>
          )
        })}
      </div>

      { }
      <ul className="sr-only">
        {tools.map((t) => (
          <li key={t.name}>{t.name}</li>
        ))}
      </ul>
    </section>
  )
}
