"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"

interface Point {
  x: number
  y: number
}

function buildPidResponse(kp: number): Point[] {
  const pts: Point[] = []
  const steps = 60
  for (let i = 0; i <= steps; i += 1) {
    const t = (i / steps) * 8
    const damping = Math.max(0.15, 0.82 - kp * 0.16)
    const naturalFreq = 0.95 + kp * 0.45
    const response = 1 - Math.exp(-damping * t) * Math.cos(naturalFreq * t)
    pts.push({ x: i / steps, y: Math.min(1.28, Math.max(0, response)) })
  }
  return pts
}

export function SimulationCanvas() {
  const [gain, setGain] = useState(1.4)
  const points = useMemo(() => buildPidResponse(gain), [gain])

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${(p.x * 100).toFixed(2)} ${(100 - p.y * 70).toFixed(2)}`)
    .join(" ")

  return (
    <section id="engineering-sim" className="rounded border border-sky-400/25 bg-[#233348] p-4 shadow-[0_0_24px_rgba(56,189,248,0.12)]">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-sky-300">SIMULATION // PID_RESPONSE</p>
          <p className="font-mono text-[10px] text-slate-400">SYS_STATUS: OPTIMAL // BUILD_STABLE</p>
        </div>
        <label className="flex min-w-[180px] items-center gap-2 font-mono text-[10px] text-slate-300">
          Gain (Kp): {gain.toFixed(2)}
          <input
            type="range"
            min={0.4}
            max={3.4}
            step={0.05}
            value={gain}
            onChange={(event) => setGain(Number(event.target.value))}
            className="w-full accent-sky-400"
          />
        </label>
      </div>

      <div className="relative rounded border border-slate-600/70 bg-slate-900 p-2">
        <svg viewBox="0 0 100 100" className="h-[240px] w-full md:h-[280px]">
          {Array.from({ length: 11 }).map((_, idx) => (
            <g key={`grid-${idx}`}>
              <line x1={idx * 10} y1={0} x2={idx * 10} y2={100} stroke="rgba(56,189,248,0.12)" strokeWidth={0.35} />
              <line x1={0} y1={idx * 10} x2={100} y2={idx * 10} stroke="rgba(56,189,248,0.12)" strokeWidth={0.35} />
            </g>
          ))}
          <line x1={0} y1={30} x2={100} y2={30} stroke="rgba(52,211,153,0.45)" strokeDasharray="2 2" strokeWidth={0.6} />

          <motion.path
            d={path}
            fill="none"
            stroke="rgba(56,189,248,0.95)"
            strokeWidth={1.2}
            initial={false}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{ filter: "drop-shadow(0 0 6px rgba(56,189,248,0.7))" }}
          />

          {points.filter((_, idx) => idx % 8 === 0).map((p, idx) => (
            <circle
              key={`pt-${idx}`}
              cx={p.x * 100}
              cy={100 - p.y * 70}
              r={0.9}
              fill="rgba(125,211,252,0.92)"
              style={{ filter: "drop-shadow(0 0 5px rgba(56,189,248,0.9))" }}
            />
          ))}
        </svg>
        <div className="pointer-events-none absolute bottom-2 left-2 font-mono text-[10px] text-slate-400">
          TARGET: 1.0 | LAT: 42.3601 | LONG: -71.0589
        </div>
      </div>
    </section>
  )
}
