"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

export interface BlueprintHotspot {
  id: string
  x: number
  y: number
  label: string
  value: string
}

interface BlueprintOverlayProps {
  image: string
  alt: string
  hotspots: BlueprintHotspot[]
  className?: string
  priority?: boolean
  loading?: "eager" | "lazy"
}

export function BlueprintOverlay({ image, alt, hotspots, className, priority = false, loading = "lazy" }: BlueprintOverlayProps) {
  const [technicalView, setTechnicalView] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  const activeHotspot = useMemo(() => hotspots.find((spot) => spot.id === hovered) ?? null, [hovered, hotspots])

  return (
    <div className={`relative h-full w-full ${className ?? ""}`}>
      <div className="absolute left-3 top-3 z-30">
        <motion.button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            setTechnicalView((prev) => !prev)
          }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 520, damping: 28 }}
          className="rounded border border-cyan-400/40 bg-slate-950/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan-300"
        >
          TECHNICAL_VIEW: {technicalView ? "ON" : "OFF"}
        </motion.button>
      </div>

      <div className="absolute inset-0">
        <Image
          src={image}
          alt={`${alt} blueprint render`}
          fill
          priority={priority}
          loading={loading}
          className="object-cover hue-rotate-[170deg] saturate-[1.2] contrast-[1.15] brightness-[0.65]"
        />
        <motion.div
          className="absolute inset-0 bg-[#0b2c57]/75 mix-blend-screen"
          animate={{ opacity: technicalView ? 0.75 : 0.22 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(190,220,255,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(190,220,255,0.22) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
          animate={{ opacity: technicalView ? 0.48 : 0.1 }}
          transition={{ duration: 0.2 }}
        />
      </div>

      <motion.div
        className="absolute inset-0"
        animate={{ opacity: technicalView ? 0.35 : 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Image src={image} alt={alt} fill priority={priority} loading={loading} className="object-cover" />
      </motion.div>

      <AnimatePresence>
        {technicalView &&
          hotspots.map((hotspot) => (
            <motion.button
              key={hotspot.id}
              type="button"
              className="absolute z-30 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200 bg-cyan-300/80 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              onMouseEnter={() => setHovered(hotspot.id)}
              onMouseLeave={() => setHovered((prev) => (prev === hotspot.id ? null : prev))}
              onFocus={() => setHovered(hotspot.id)}
              onBlur={() => setHovered((prev) => (prev === hotspot.id ? null : prev))}
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: 1, scale: [1, 1.25, 1] }}
              exit={{ opacity: 0, scale: 0.2 }}
              transition={{ duration: 0.45, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.2, ease: "easeInOut" }}
              aria-label={`${hotspot.label}: ${hotspot.value}`}
            />
          ))}
      </AnimatePresence>

      <AnimatePresence>
        {technicalView && activeHotspot ? (
          <motion.div
            className="absolute bottom-3 right-3 z-40 rounded border border-cyan-400/40 bg-slate-950/85 px-3 py-2 font-mono text-[10px] text-cyan-200 backdrop-blur-sm"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.16 }}
          >
            <p className="text-slate-500">MOUNTING_POINT: {activeHotspot.label}</p>
            <p>{activeHotspot.value}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
