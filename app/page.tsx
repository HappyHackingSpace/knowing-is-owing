// One node passing what it knows to many: a fixed-seed tree so the server
// render, the hydrated page and the printed poster are always identical.
const W = 500
const H = 700
const ACCENT = "#ff4f1f"
const INK = "#141414"
const PAPER = "#f3efe4"

type Node = { x: number; y: number; gen: number; angle: number; parent?: Node }

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildTree() {
  const rand = mulberry32(7)
  const root: Node = { x: 0, y: 0, gen: 0, angle: 0 }
  const nodes: Node[] = [root]
  let frontier = [root]
  const steps = [80, 70, 60, 52, 44]
  const spreads = [0.62, 0.36, 0.24, 0.17, 0.12]

  steps.forEach((step, i) => {
    const next: Node[] = []
    frontier.forEach((node) => {
      const children = i === 0 ? 3 : 2
      for (let c = 0; c < children; c++) {
        const angle = node.angle + (c - (children - 1) / 2) * spreads[i] + (rand() - 0.5) * 0.12
        const len = step * (0.9 + rand() * 0.2)
        const child = {
          x: node.x + Math.cos(angle) * len,
          y: node.y + Math.sin(angle) * len,
          gen: i + 1,
          angle,
          parent: node,
        }
        nodes.push(child)
        next.push(child)
      }
    })
    frontier = next
  })

  // Scale into the open band between the header and the heading block.
  const box = { x0: 70, x1: W - 40, y0: 120, y1: 318 }
  const xs = nodes.map((n) => n.x)
  const ys = nodes.map((n) => n.y)
  const [minX, maxX, minY, maxY] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)]
  const scaleX = (box.x1 - box.x0) / (maxX - minX)
  const scaleY = (box.y1 - box.y0) / (maxY - minY)
  nodes.forEach((n) => {
    n.x = box.x0 + (n.x - minX) * scaleX
    n.y = box.y0 + (n.y - minY) * scaleY
  })

  return nodes
}

const nodes = buildTree()
const lastGen = Math.max(...nodes.map((n) => n.gen))

export default function PosterPage() {
  return (
    <main
      className="relative min-h-screen w-full bg-[#1a1a1a] flex items-center justify-center p-8 print:p-0 print:bg-white"
      style={{ printColorAdjust: "exact", WebkitPrintColorAdjust: "exact" }}
    >
      {/* Sizes use cqw (percent of the poster width) so the layout scales as one
          piece on phones, desktops and in print. */}
      <div
        className="relative w-full max-w-[50cm] aspect-[5/7] bg-[#f3efe4] text-[#141414] overflow-hidden"
        style={{ containerType: "inline-size" }}
      >
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 w-full h-full" aria-hidden="true">
          <defs>
            <pattern id="dots" width="9" height="9" patternUnits="userSpaceOnUse">
              <circle cx="4.5" cy="4.5" r="0.45" fill={INK} fillOpacity="0.35" />
            </pattern>
          </defs>
          <rect width={W} height={H} fill="url(#dots)" />
          {nodes.map(
            (n, i) =>
              n.parent && (
                <line
                  key={`l${i}`}
                  x1={n.parent.x}
                  y1={n.parent.y}
                  x2={n.x}
                  y2={n.y}
                  stroke={INK}
                  strokeWidth={Math.max(0.5, 2.6 - n.gen * 0.45)}
                  strokeLinecap="round"
                />
              ),
          )}
          {nodes.map((n, i) => {
            const lit = n.gen === lastGen && i % 2 === 0
            return (
              <circle
                key={`c${i}`}
                cx={n.x}
                cy={n.y}
                r={n.gen === 0 ? 11 : Math.max(2.2, 7 - n.gen * 1.1)}
                fill={n.gen === 0 ? INK : lit ? ACCENT : PAPER}
                stroke={n.gen === 0 || lit ? "none" : INK}
                strokeWidth={1.2}
              />
            )
          })}
          <circle cx={nodes[0].x} cy={nodes[0].y} r={20} fill="none" stroke={ACCENT} strokeWidth={1.5} />
        </svg>

        <div className="relative z-10 h-full flex flex-col justify-between" style={{ padding: "9cqw" }}>
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="font-sans font-black tracking-tighter leading-none" style={{ fontSize: "3.6cqw" }}>
                HAPPY
                <br />
                HACKING
                <br />
                SPACE
              </div>
              <div className="font-mono tracking-wider" style={{ color: ACCENT, fontSize: "1.45cqw" }}>
                {">"} COMMUNITY_GUIDELINES.TXT
              </div>
            </div>
            <div className="font-mono tracking-widest border border-[#141414] bg-[#f3efe4]" style={{ fontSize: "1.8cqw", padding: "0.4cqw 1.2cqw" }}>
              — RULE #3 —
            </div>
          </div>

          <div className="mt-auto flex flex-col" style={{ marginBottom: "5cqw", gap: "3cqw" }}>
            <h1 className="font-sans font-black lowercase leading-[0.82] tracking-[-0.06em]" style={{ fontSize: "17.5cqw" }}>
              knowing
              <br />
              is
              <br />
              <span style={{ color: ACCENT }}>owing</span>
            </h1>
            <p
              className="font-mono tracking-tight"
              style={{ borderLeft: `0.5cqw solid ${ACCENT}`, paddingLeft: "1.6cqw", fontSize: "2.4cqw" }}
            >
              what you know is not yours to keep.
            </p>
          </div>

          <div className="flex flex-col" style={{ gap: "2cqw" }}>
            <div className="h-px bg-[#141414]" />
            <div className="flex justify-between items-end font-mono" style={{ fontSize: "1.45cqw", lineHeight: 1.6 }}>
              <div>
                <div className="text-[#141414]/50">EST. 2022</div>
                <div className="text-[#141414]/70">A COMMUNITY SPACE FOR</div>
                <div>HACKERS • CRAFTERS • EXPLORERS</div>
              </div>
              <div className="text-right">
                <div style={{ color: ACCENT }}>v1.0.0</div>
                <div>PRINT_READY</div>
              </div>
            </div>
            <div className="text-center text-[#141414]/40 font-mono tracking-wider" style={{ fontSize: "1.3cqw" }}>HAPPYHACKING.SPACE</div>
          </div>
        </div>
      </div>
    </main>
  )
}
