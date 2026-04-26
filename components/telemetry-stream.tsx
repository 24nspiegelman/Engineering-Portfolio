"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

interface LidarPoint {
  id: number
  x: number
  y: number
  intensity: number
}

const POWER_POINTS = 42
const BASELINE_POWER = 126.4

function randomPower() {
  return 118 + Math.random() * 48
}

function buildLidarPoint(id: number): LidarPoint {
  const angle = Math.random() * Math.PI * 2
  const radius = 8 + Math.random() * 40
  return {
    id,
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    intensity: 0.45 + Math.random() * 0.55,
  }
}

export function TelemetryStream() {
  const [powerSamples, setPowerSamples] = useState<number[]>(() => Array.from({ length: POWER_POINTS }, () => BASELINE_POWER))
  const [lidarPoints, setLidarPoints] = useState<LidarPoint[]>([])
  const pointIdRef = useRef(0)

  useEffect(() => {
    setPowerSamples(Array.from({ length: POWER_POINTS }, () => randomPower()))

    const stream = window.setInterval(() => {
      setPowerSamples((prev) => [...prev.slice(1), randomPower()])
      setLidarPoints((prev) => {
        const retained = prev.filter(() => Math.random() > 0.36)
        const additions = Array.from({ length: 3 + Math.floor(Math.random() * 4) }, () => {
          pointIdRef.current += 1
          return buildLidarPoint(pointIdRef.current)
        })
        return [...retained, ...additions].slice(-45)
      })
    }, 340)

    return () => window.clearInterval(stream)
  }, [])

  const powerPath = useMemo(() => {
    return powerSamples
      .map((value, index) => {
        const x = (index / (POWER_POINTS - 1)) * 100
        const normalized = (value - 100) / 80
        const y = 82 - normalized * 56
        return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`
      })
      .join(" ")
  }, [powerSamples])

  const latestPower = powerSamples[powerSamples.length - 1] ?? 0

  return (
    <div className="mt-4 rounded border border-cyan-400/30 bg-slate-950/80 p-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-wider text-cyan-300">AUTONOMOUS_ROBOT // TELEMETRY_STREAM</p>
        <span className="font-mono text-[10px] text-emerald-300">POWER: {latestPower.toFixed(1)}W</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded border border-cyan-400/20 bg-[#05131f] p-2">
          <p className="mb-1 font-mono text-[10px] text-slate-500">POWER_CONSUMPTION (W)</p>
          <svg viewBox="0 0 100 84" className="h-24 w-full">
            {Array.from({ length: 6 }).map((_, idx) => (
              <line key={`h-${idx}`} x1="0" y1={14 + idx * 12} x2="100" y2={14 + idx * 12} stroke="rgba(34,211,238,0.12)" strokeWidth="0.6" />
            ))}
            <motion.path
              d={powerPath}
              fill="none"
              stroke="rgba(34,211,238,0.96)"
              strokeWidth="1.6"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              style={{ filter: "drop-shadow(0 0 6px rgba(34,211,238,0.75))" }}
            />
          </svg>
        </div>

        <div className="rounded border border-cyan-400/20 bg-[#05131f] p-2">
          <p className="mb-1 font-mono text-[10px] text-slate-500">LIDAR_SCAN // RANGE_12M</p>
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-cyan-400/30">
            <div className="absolute inset-2 rounded-full border border-cyan-400/20" />
            <div className="absolute inset-4 rounded-full border border-cyan-400/15" />
            <AnimatePresence mode="sync">
              {lidarPoints.map((point) => (
                <motion.span
                  key={point.id}
                  className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300"
                  style={{
                    left: `calc(50% + ${point.x}px)`,
                    top: `calc(50% + ${point.y}px)`,
                    opacity: point.intensity,
                    boxShadow: "0 0 10px rgba(34,211,238,0.8)",
                  }}
                  initial={{ scale: 0.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: point.intensity }}
                  exit={{ scale: 0.2, opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
