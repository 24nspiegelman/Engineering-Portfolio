"use client"

import { motion } from "framer-motion"
import { Cpu, ScanLine } from "lucide-react"
import { useTechnicalMode } from "@/components/technical-mode-context"

export function NerdModeToggle() {
  const { technicalMode, toggleTechnicalMode } = useTechnicalMode()

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleTechnicalMode}
        className="group relative flex items-center gap-2 rounded border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-sky-300 transition-colors hover:border-sky-400 hover:bg-sky-400/20"
        aria-pressed={technicalMode}
      >
        <Cpu className="h-3.5 w-3.5" />
        TECHNICAL_DEEP_DIVE
        <span
          className={`rounded border px-1.5 py-0.5 text-[9px] ${technicalMode ? "border-emerald-400/40 text-emerald-300" : "border-slate-500/40 text-slate-400"}`}
        >
          {technicalMode ? "ON" : "OFF"}
        </span>
      </button>

      {technicalMode && (
        <motion.div
          key="scan"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: [0, 0.65, 0], y: [0, 8, 26] }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="pointer-events-none absolute inset-x-0 top-0 h-8 rounded bg-gradient-to-b from-sky-300/30 via-sky-400/10 to-transparent"
        />
      )}

      <motion.div
        aria-hidden
        initial={false}
        animate={{
          opacity: technicalMode ? [0.2, 0.8, 0.2] : 0,
          x: technicalMode ? [0, -2, 2, 0] : 0,
        }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute -right-2 -top-2 text-sky-300"
      >
        <ScanLine className="h-3.5 w-3.5" />
      </motion.div>
    </div>
  )
}
