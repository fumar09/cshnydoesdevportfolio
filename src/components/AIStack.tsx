import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
} from 'react'
import { CaretDown, Circle } from '@/components/slab'
import { aiStack, type StackNode } from '@/data/ai-stack'








































const COMPACT_QUERY = '(max-width: 900px)'


const CORNER = 12


const RAIL_INSET = 15

type Box = { x: number; y: number; w: number; h: number }
type Wire = { id: string; branchId: string; d: string; delay: number }

type Flat = {
  node: StackNode
  depth: number
  parentId: string | null

  branchId: string

  index: number
}

const LEVEL = ['root', 'branch', 'leaf'] as const


function flatten(root: StackNode): Flat[] {
  const out: Flat[] = []
  const walk = (
    node: StackNode,
    depth: number,
    parentId: string | null,
    branchId: string,
    index: number,
  ) => {
    out.push({ node, depth, parentId, branchId, index })
    const kids = node.children ?? []
    kids.forEach((kid, i) => {

      walk(kid, depth + 1, node.id, depth === 0 ? kid.id : branchId, i)
    })
  }
  walk(root, 0, null, root.id, 0)
  return out
}

const r2 = (n: number) => Math.round(n * 100) / 100


function dropPath(p: Box, c: Box): string {
  const sx = p.x + p.w / 2
  const sy = p.y + p.h
  const ex = c.x + c.w / 2
  const ey = c.y
  const dy = ey - sy
  const dx = ex - sx
  if (dy <= 1 || Math.abs(dx) < 1) {
    return `M ${r2(sx)} ${r2(sy)} L ${r2(ex)} ${r2(ey)}`
  }
  const my = sy + dy / 2
  const r = Math.min(CORNER, Math.abs(dx) / 2, dy / 2)
  const s = dx > 0 ? 1 : -1
  return [
    `M ${r2(sx)} ${r2(sy)}`,
    `L ${r2(sx)} ${r2(my - r)}`,
    `Q ${r2(sx)} ${r2(my)} ${r2(sx + s * r)} ${r2(my)}`,
    `L ${r2(ex - s * r)} ${r2(my)}`,
    `Q ${r2(ex)} ${r2(my)} ${r2(ex)} ${r2(my + r)}`,
    `L ${r2(ex)} ${r2(ey)}`,
  ].join(' ')
}


function railPath(p: Box, c: Box): string {
  const sx = p.x + RAIL_INSET
  const sy = p.y + p.h
  const ex = c.x
  const ey = c.y + c.h / 2
  const dy = ey - sy
  const dx = ex - sx
  if (dy <= 1 || dx <= 1) {
    return `M ${r2(sx)} ${r2(sy)} L ${r2(ex)} ${r2(ey)}`
  }
  const r = Math.min(CORNER, dx, dy)
  return [
    `M ${r2(sx)} ${r2(sy)}`,
    `L ${r2(sx)} ${r2(ey - r)}`,
    `Q ${r2(sx)} ${r2(ey)} ${r2(sx + r)} ${r2(ey)}`,
    `L ${r2(ex)} ${r2(ey)}`,
  ].join(' ')
}

export default function AIStack({ root = aiStack }: { root?: StackNode }) {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const nodeRefs = useRef(new Map<string, HTMLElement>())
  const frame = useRef(0)


  const signature = useRef('')

  const [geom, setGeom] = useState<{ w: number; h: number; wires: Wire[] }>({
    w: 0,
    h: 0,
    wires: [],
  })
  const [compact, setCompact] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(COMPACT_QUERY).matches,
  )
  const [drawn, setDrawn] = useState(false)
  const [active, setActive] = useState<string | null>(null)



  const [open, setOpen] = useState<ReadonlySet<string>>(() => new Set())

  const flat = useMemo(() => flatten(root), [root])

  const toggleBranch = useCallback((id: string) => {
    setOpen((prev) => {
      const next = new Set(prev)
      if (!next.delete(id)) next.add(id)
      return next
    })
  }, [])

  const registerNode = useCallback((id: string) => {
    return (el: HTMLElement | null) => {
      if (el) nodeRefs.current.set(id, el)
      else nodeRefs.current.delete(id)
    }
  }, [])

  const measure = useCallback(() => {
    const host = hostRef.current
    if (!host) return
    const hb = host.getBoundingClientRect()
    if (hb.width === 0) return

    const boxOf = (id: string): Box | null => {
      const el = nodeRefs.current.get(id)
      if (!el) return null
      const r = el.getBoundingClientRect()




      if (r.width === 0 && r.height === 0) return null
      return { x: r.left - hb.left, y: r.top - hb.top, w: r.width, h: r.height }
    }

    const wires: Wire[] = []
    for (const f of flat) {
      if (!f.parentId) continue
      const p = boxOf(f.parentId)
      const c = boxOf(f.node.id)
      if (!p || !c) continue


      const wide = f.depth === 1 && !compact
      wires.push({
        id: f.node.id,
        branchId: f.branchId,
        d: wide ? dropPath(p, c) : railPath(p, c),
        delay: f.depth === 1 ? 90 : 400 + f.index * 70,
      })
    }

    const next = { w: hb.width, h: hb.height, wires }
    const sig = JSON.stringify(next)
    if (sig === signature.current) return
    signature.current = sig
    setGeom(next)
  }, [flat, compact])

  const schedule = useCallback(() => {
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(measure)
  }, [measure])







  useLayoutEffect(() => {
    schedule()
  }, [open, schedule])

  useLayoutEffect(() => {
    measure()
    const host = hostRef.current
    if (!host) return
    const ro = new ResizeObserver(schedule)
    ro.observe(host)
    return () => {
      ro.disconnect()
      cancelAnimationFrame(frame.current)
    }
  }, [measure, schedule])



  useEffect(() => {
    if (!document.fonts) return
    let alive = true
    document.fonts.ready.then(() => {
      if (alive) schedule()
    })
    return () => {
      alive = false
    }
  }, [schedule])

  useEffect(() => {
    const mq = window.matchMedia(COMPACT_QUERY)



    const onChange = () => {
      setCompact(mq.matches)
      setActive(null)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])



  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setDrawn(true)
        io.disconnect()
      },
      { threshold: 0.15 },
    )
    io.observe(host)
    return () => io.disconnect()
  }, [])

  const renderNode = (node: StackNode, depth: number, branchId: string, index: number) => {
    const level = LEVEL[Math.min(depth, 2)]
    const kids = node.children ?? []

    const state = active === null || depth === 0 ? '' : branchId === active ? ' is-lit' : ' is-dim'

    const target = depth === 0 ? null : branchId
    const NodeIcon = node.Icon

    const listId = `ai-stack-${node.id}-children`



    const collapsible = compact && depth > 0 && kids.length > 0
    const isOpen = !collapsible || open.has(node.id)




    const interaction: HTMLAttributes<HTMLDivElement> = compact
      ? {}
      : {
          tabIndex: 0,
          onMouseEnter: () => setActive(target),
          onMouseLeave: () => setActive(null),
          onFocus: () => setActive(target),
          onBlur: () => setActive(null),
        }




    const enter = compact && depth > 1 ? index * 45 : depth * 150 + index * 60

    return (
      <li
        key={node.id}
        className={`ai-stack__item ai-stack__item--${level}`}
        style={{ ['--enter' as string]: `${enter}ms` }}
      >
        <div
          ref={registerNode(node.id)}
          className={`ai-stack__node ai-stack__node--${level}${state}${
            collapsible ? ' is-collapsible' : ''
          }`}
          {...interaction}
        >
          <span className="ai-stack__head">
            {

}
            <span className="ai-stack__mark" aria-hidden="true">
              <NodeIcon weight={depth === 0 ? 'fill' : 'bold'} size={depth === 0 ? 15 : 13} />
            </span>
            <span className="ai-stack__name">{node.name}</span>
            {node.status && (
              <span
                className={`ai-stack__status ai-stack__status--${node.status.toLowerCase()}`}
              >
                <Circle weight="fill" size={6} aria-hidden="true" />
                {node.status}
              </span>
            )}
          </span>
          <p className="ai-stack__what">{node.what}</p>
          {(node.stack || node.logos) && (
            <span className="ai-stack__meta">
              {node.logos?.map((logo) => (



                <span
                  key={logo.src}
                  className="ai-stack__logo"
                  style={{ ['--logo-mask' as string]: `url('${logo.src}')` }}
                  role="img"
                  aria-label={logo.name}
                />
              ))}
              {node.stack}
            </span>
          )}

          {


}
          {collapsible && (
            <button
              type="button"
              className="ai-stack__toggle"
              aria-expanded={isOpen}
              aria-controls={listId}
              aria-label={`${kids.length} sub-systems under ${node.name}`}
              onClick={() => toggleBranch(node.id)}
            >
              <span className="ai-stack__caret" aria-hidden="true">
                <CaretDown weight="bold" size={13} />
              </span>
            </button>
          )}
        </div>

        {kids.length > 0 && (
          <ul
            id={listId}
            hidden={!isOpen}
            className={`ai-stack__level ai-stack__level--${LEVEL[Math.min(depth + 1, 2)]}`}
            style={depth === 0 ? { ['--cols' as string]: kids.length } : undefined}
          >
            {kids.map((kid, i) =>
              renderNode(kid, depth + 1, depth === 0 ? kid.id : branchId, i),
            )}
          </ul>
        )}
      </li>
    )
  }

  return (
    <div ref={hostRef} className={`ai-stack${drawn ? ' is-drawn' : ''}`}>
      {geom.w > 0 && (
        <svg
          className="ai-stack__wires"
          viewBox={`0 0 ${r2(geom.w)} ${r2(geom.h)}`}
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          {geom.wires.map((wire) => (
            <path
              key={wire.id}
              className={`ai-stack__wire${
                active === null ? '' : wire.branchId === active ? ' is-lit' : ' is-dim'
              }`}
              d={wire.d}
              pathLength={1}
              vectorEffect="non-scaling-stroke"
              style={{ ['--wire-delay' as string]: `${wire.delay}ms` }}
            />
          ))}
        </svg>
      )}

      <ul className="ai-stack__level ai-stack__level--trunk">
        {renderNode(root, 0, root.id, 0)}
      </ul>
    </div>
  )
}
