"use client"

import { useEffect, useState } from "react"
import { InteractiveTerminal } from "@/components/interactive-terminal"

export function HeroSection() {
  const [displayText, setDisplayText] = useState("")
  const fullText = "Robotics & Mechatronics Enthusiast"
  
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative overflow-hidden bg-[#233348] px-6 py-24 md:py-32">
      {/* Scan line effect */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-scan absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-sky-400/5 to-transparent" />
      </div>

      {/* Grid overlay */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'linear-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.1) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Corner HUD elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top left corner */}
        <svg className="absolute left-4 top-4 h-24 w-24 text-sky-400/40" viewBox="0 0 96 96" fill="none">
          <path d="M0 32 L0 0 L32 0" stroke="currentColor" strokeWidth="1" />
          <path d="M8 24 L8 8 L24 8" stroke="currentColor" strokeWidth="1" />
          <circle cx="4" cy="4" r="2" fill="currentColor" className="animate-pulse" />
        </svg>
        
        {/* Top right corner */}
        <svg className="absolute right-4 top-4 h-24 w-24 text-sky-400/40" viewBox="0 0 96 96" fill="none">
          <path d="M96 32 L96 0 L64 0" stroke="currentColor" strokeWidth="1" />
          <path d="M88 24 L88 8 L72 8" stroke="currentColor" strokeWidth="1" />
          <circle cx="92" cy="4" r="2" fill="currentColor" className="animate-pulse" />
        </svg>
        
        {/* Bottom left corner */}
        <svg className="absolute bottom-4 left-4 h-24 w-24 text-sky-400/40" viewBox="0 0 96 96" fill="none">
          <path d="M0 64 L0 96 L32 96" stroke="currentColor" strokeWidth="1" />
          <path d="M8 72 L8 88 L24 88" stroke="currentColor" strokeWidth="1" />
          <circle cx="4" cy="92" r="2" fill="currentColor" className="animate-pulse" />
        </svg>
        
        {/* Bottom right corner */}
        <svg className="absolute bottom-4 right-4 h-24 w-24 text-sky-400/40" viewBox="0 0 96 96" fill="none">
          <path d="M96 64 L96 96 L64 96" stroke="currentColor" strokeWidth="1" />
          <path d="M88 72 L88 88 L72 88" stroke="currentColor" strokeWidth="1" />
          <circle cx="92" cy="92" r="2" fill="currentColor" className="animate-pulse" />
        </svg>

        {/* Horizontal data lines */}
        <div className="absolute left-0 top-1/4 flex items-center gap-2 px-4">
          <div className="h-px w-16 bg-gradient-to-r from-sky-400/50 to-transparent" />
          <span className="font-mono text-[10px] text-sky-400/50">LAT: 42.3601</span>
        </div>
        <div className="absolute right-0 top-1/4 flex items-center gap-2 px-4">
          <span className="font-mono text-[10px] text-sky-400/50">LONG: -71.0589</span>
          <div className="h-px w-16 bg-gradient-to-l from-sky-400/50 to-transparent" />
        </div>
        <div className="absolute bottom-1/4 left-0 flex items-center gap-2 px-4">
          <div className="h-px w-12 bg-gradient-to-r from-sky-400/50 to-transparent" />
          <span className="font-mono text-[10px] text-sky-400/50">SECTOR: EDU</span>
        </div>
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <div className="mx-auto mb-6 max-w-xl">
          <InteractiveTerminal />
        </div>

        <p className="font-mono text-xs uppercase tracking-[0.3em] text-sky-400">
          {"<"} Mechanical Engineering Portfolio {"/>"}
        </p>
        
        <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
          Hi, I&apos;m <span className="relative text-sky-400">
            Noah
            <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-sky-400/50" />
          </span>
        </h1>
        
        <p className="mt-4 font-heading text-xl text-slate-300 md:text-2xl">
          {displayText}
          <span className="animate-cursor inline-block w-0.5 h-5 ml-1 bg-sky-400 align-middle" />
        </p>
        
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
          Passionate about designing innovative mechanical systems and leveraging computational
          tools to solve complex engineering challenges. Currently focused on autonomous systems
          and advanced manufacturing techniques.
        </p>

        {/* Stats row */}
        <div className="mt-10 flex items-center justify-center gap-8 border-t border-b border-sky-400/20 py-4">
          <div className="text-center">
            <p className="font-mono text-2xl font-bold text-sky-400">3+</p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Projects</p>
          </div>
          <div className="h-8 w-px bg-sky-400/20" />
          <div className="text-center">
            <p className="font-mono text-2xl font-bold text-sky-400">2</p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Years Exp</p>
          </div>
          <div className="h-8 w-px bg-sky-400/20" />
          <div className="text-center">
            <p className="font-mono text-2xl font-bold text-emerald-400">ACTIVE</p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Status</p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3 font-mono text-xs text-slate-500">
          <span className="inline-flex items-center gap-2 rounded border border-sky-400/30 bg-sky-400/10 px-3 py-1">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            <span className="text-sky-400">SYSTEM_ONLINE</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-500">READY_FOR_CONNECTION</span>
        </div>
      </div>
    </section>
  )
}
