const SIGNAL = "#ff3d00"
const INK = "#0a0a0a"

const hazard = {
  height: "2.6cqw",
  backgroundImage: `repeating-linear-gradient(-45deg, ${INK} 0 2.2cqw, ${SIGNAL} 2.2cqw 4.4cqw)`,
}

export default function PosterPage() {
  return (
    <main
      className="relative min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center p-8 print:p-0"
      style={{ printColorAdjust: "exact", WebkitPrintColorAdjust: "exact" }}
    >
      {/* Sizes use cqw (percent of the poster width) so the layout scales as one
          piece on phones, desktops and in print. */}
      <div
        className="relative w-full max-w-[50cm] aspect-[5/7] overflow-hidden flex flex-col"
        style={{ containerType: "inline-size", backgroundColor: SIGNAL, color: INK }}
      >
        <div className="absolute top-0 inset-x-0" style={hazard} />
        <div className="absolute bottom-0 inset-x-0" style={hazard} />

        <div
          aria-hidden="true"
          className="absolute font-sans font-black leading-none select-none pointer-events-none"
          style={{ fontSize: "118cqw", right: "-14cqw", top: "6cqw", color: "rgba(0,0,0,0.09)", letterSpacing: "-0.08em" }}
        >
          3
        </div>

        <div className="relative z-10 h-full flex flex-col justify-between" style={{ padding: "9cqw 8cqw" }}>
          <div className="flex justify-between items-start">
            <div>
              <div className="font-sans font-black tracking-tighter leading-[0.9]" style={{ fontSize: "4cqw" }}>
                HAPPY
                <br />
                HACKING
                <br />
                SPACE
              </div>
              <div className="font-mono font-bold tracking-wider" style={{ fontSize: "1.6cqw", marginTop: "1.2cqw" }}>
                {">"} COMMUNITY_GUIDELINES.TXT
              </div>
            </div>
            <div
              className="font-mono font-bold tracking-widest"
              style={{ fontSize: "2cqw", padding: "0.8cqw 1.6cqw", backgroundColor: INK, color: SIGNAL }}
            >
              — RULE #3 —
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="font-sans font-black lowercase leading-[0.8] tracking-[-0.065em]">
              <span className="block" style={{ fontSize: "19.8cqw" }}>
                knowing
              </span>
              <span className="block" style={{ fontSize: "19.8cqw", marginTop: "-1cqw" }}>
                is
              </span>
              <span
                className="block w-fit"
                style={{
                  fontSize: "19.8cqw",
                  backgroundColor: INK,
                  color: SIGNAL,
                  padding: "0 2.4cqw 3.6cqw 1.4cqw",
                  marginTop: "1.4cqw",
                  marginLeft: "-1.4cqw",
                }}
              >
                owing
              </span>
            </h1>
            <p
              className="font-mono font-bold"
              style={{ fontSize: "2.9cqw", marginTop: "4cqw", borderTop: `0.6cqw solid ${INK}`, paddingTop: "2cqw" }}
            >
              what you know is not yours to keep.
            </p>
          </div>

          <div className="flex flex-col" style={{ gap: "1.8cqw" }}>
            <div className="flex justify-between items-end font-mono font-bold" style={{ fontSize: "1.5cqw", lineHeight: 1.6 }}>
              <div>
                <div className="opacity-60">EST. 2022</div>
                <div className="opacity-80">A COMMUNITY SPACE FOR</div>
                <div>HACKERS • CRAFTERS • EXPLORERS</div>
              </div>
              <div className="text-right">
                <div>v1.0.0</div>
                <div className="opacity-80">PRINT_READY</div>
              </div>
            </div>
            <div className="text-center font-mono font-bold tracking-[0.3em] opacity-70" style={{ fontSize: "1.4cqw" }}>
              HAPPYHACKING.SPACE
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
