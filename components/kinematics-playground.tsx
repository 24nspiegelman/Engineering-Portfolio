"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { useTwoLinkIK } from "@/hooks/use-two-link-ik"

const CANVAS_WIDTH = 320
const CANVAS_HEIGHT = 240
const BASE_X = 160
const BASE_Y = 170

function toDegrees(radians: number) {
  return (radians * 180) / Math.PI
}

export function KinematicsPlayground() {
  const linkA = 90
  const linkB = 70
  const [isDragging, setIsDragging] = useState(false)

  const { theta1, theta2, elbow, end, target, setTargetFromCartesian, maxReach } = useTwoLinkIK({
    linkA,
    linkB,
    initialTarget: { x: 105, y: -80 },
  })

  const debug = useMemo(
    () => ({
      theta1Deg: toDegrees(theta1),
      theta2Deg: toDegrees(theta2),
      radius: Math.hypot(target.x, target.y),
    }),
    [target.x, target.y, theta1, theta2],
  )

  return (
    <section className="rounded border border-cyan-400/30 bg-[#0f1d2b] p-4 shadow-[0_0_24px_rgba(34,211,238,0.18)]">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-cyan-300">KINEMATICS_PLAYGROUND // VECTOR_CALC</p>
          <p className="font-mono text-[10px] text-slate-500">MOUNTING_POINT: BASE_A1 // LINK_MODEL: 2DOF_PLANAR</p>
        </div>
        <span className="rounded border border-cyan-400/25 bg-cyan-500/10 px-2 py-1 font-mono text-[10px] text-cyan-300">
          {isDragging ? "GRIPPER_LOCK: ACTIVE" : "GRIPPER_LOCK: IDLE"}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
        <motion.svg
          viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
          className="h-[240px] w-full rounded border border-slate-700 bg-slate-950"
          onPointerMove={(event) => {
            if (!isDragging) {
              return
            }
            const rect = event.currentTarget.getBoundingClientRect()
            const localX = event.clientX - rect.left
            const localY = event.clientY - rect.top
            setTargetFromCartesian(localX - BASE_X, localY - BASE_Y)
          }}
          onPointerUp={() => setIsDragging(false)}
          onPointerLeave={() => setIsDragging(false)}
        >
          {Array.from({ length: 12 }).map((_, idx) => (
            <g key={`grid-${idx}`}>
              <line x1={idx * (CANVAS_WIDTH / 11)} y1={0} x2={idx * (CANVAS_WIDTH / 11)} y2={CANVAS_HEIGHT} stroke="rgba(34,211,238,0.12)" strokeWidth={0.7} />
              <line x1={0} y1={idx * (CANVAS_HEIGHT / 11)} x2={CANVAS_WIDTH} y2={idx * (CANVAS_HEIGHT / 11)} stroke="rgba(34,211,238,0.12)" strokeWidth={0.7} />
            </g>
          ))}

          <circle cx={BASE_X} cy={BASE_Y} r={maxReach} fill="none" stroke="rgba(34,211,238,0.18)" strokeDasharray="5 6" />

          <line x1={BASE_X} y1={BASE_Y} x2={BASE_X + elbow.x} y2={BASE_Y + elbow.y} stroke="rgba(34,211,238,0.92)" strokeWidth={8} strokeLinecap="round" />
          <line x1={BASE_X + elbow.x} y1={BASE_Y + elbow.y} x2={BASE_X + end.x} y2={BASE_Y + end.y} stroke="rgba(125,211,252,0.95)" strokeWidth={7} strokeLinecap="round" />

          <circle cx={BASE_X} cy={BASE_Y} r={7} fill="#22d3ee" />
          <circle cx={BASE_X + elbow.x} cy={BASE_Y + elbow.y} r={6} fill="#38bdf8" />

          <motion.circle
            cx={BASE_X + end.x}
            cy={BASE_Y + end.y}
            r={8}
            fill="#a5f3fc"
            style={{ filter: "drop-shadow(0 0 8px rgba(34,211,238,0.9))" }}
            animate={{ scale: isDragging ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId)
              setIsDragging(true)
            }}
          />

          <circle cx={BASE_X + target.x} cy={BASE_Y + target.y} r={3.5} fill="rgba(16,185,129,0.9)" />
        </motion.svg>

        <div className="rounded border border-slate-700 bg-slate-950 p-3">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-emerald-300">DEBUG_WINDOW // STRESS_ANALYSIS</p>
          <div className="space-y-2 font-mono text-xs text-slate-300">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1">
              <span className="text-slate-500">THETA_1</span>
              <span className="text-cyan-300">{debug.theta1Deg.toFixed(2)} deg</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-1">
              <span className="text-slate-500">THETA_2</span>
              <span className="text-cyan-300">{debug.theta2Deg.toFixed(2)} deg</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-1">
              <span className="text-slate-500">VECTOR_XY</span>
              <span className="text-emerald-300">
                {target.x.toFixed(1)}, {target.y.toFixed(1)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">REACH_RADIUS</span>
              <span className="text-emerald-300">{debug.radius.toFixed(1)} px</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
