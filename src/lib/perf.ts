






















export type PerfTier = 'high' | 'mid' | 'low'

const KEY = 'perf-tier'
export const PERF_TIER_EVENT = 'perftierchange'


const BAD_FRAME_MS = 22

const SAMPLE_MS = 1500

const OUTLIER_MS = 100

const MIN_SAMPLES = 20




const MAX_SAMPLE_MS = 5000

const MAX_CHECKS = 6

function read(): PerfTier | null {
  try {
    const v = sessionStorage.getItem(KEY)
    return v === 'mid' || v === 'low' ? v : null
  } catch {
    return null
  }
}

export function getPerfTier(): PerfTier {
  const v = document.documentElement.dataset.perf
  return v === 'mid' || v === 'low' ? v : 'high'
}

function setPerfTier(tier: PerfTier) {
  if (tier === getPerfTier()) return
  document.documentElement.dataset.perf = tier
  try {
    sessionStorage.setItem(KEY, tier)
  } catch {
    /* private mode - the tier still applies for this page */
  }
  window.dispatchEvent(new CustomEvent<PerfTier>(PERF_TIER_EVENT, { detail: tier }))
}





export function restorePerfTier() {
  const saved = read()
  if (saved) document.documentElement.dataset.perf = saved
}


function measure(): Promise<number | null> {
  return new Promise((resolve) => {
    const deltas: number[] = []
    let last = performance.now()
    const end = last + SAMPLE_MS
    const hardEnd = last + MAX_SAMPLE_MS

    const tick = (now: number) => {
      const dt = now - last
      last = now
      if (document.visibilityState === 'hidden') return resolve(null)
      if (dt < OUTLIER_MS) deltas.push(dt)
      const enough = now >= end && deltas.length >= MIN_SAMPLES
      if (!enough && now < hardEnd) return void requestAnimationFrame(tick)
      if (deltas.length < MIN_SAMPLES) return resolve(null)
      deltas.sort((a, b) => a - b)
      resolve(deltas[deltas.length >> 1])
    }
    requestAnimationFrame(tick)
  })
}

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))











function settled(): Promise<void> {
  return new Promise((resolve) => {
    const ready = () =>
      !document.documentElement.classList.contains('is-intro') &&
      (!!document.querySelector('.hero-canvas canvas') || getPerfTier() === 'low')

    const done = () => {
      window.clearInterval(id)
      window.clearTimeout(bail)
      setTimeout(resolve, 800)
    }
    const id = window.setInterval(() => {
      if (ready()) done()
    }, 200)


    const bail = window.setTimeout(done, 10000)
    if (ready()) done()
  })
}










export async function watchFrameHealth() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (read() === 'low') return

  await settled()

  for (let check = 0; check < MAX_CHECKS; check++) {
    if (getPerfTier() === 'low') return
    const median = await measure()
    if (median === null) {
      await wait(1200)
      continue
    }
    if (median <= BAD_FRAME_MS) {
      await wait(2500)
      continue
    }
    setPerfTier(getPerfTier() === 'high' ? 'mid' : 'low')

    await wait(600)
  }
}
