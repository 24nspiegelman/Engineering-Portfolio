"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Github, Linkedin, Menu, X, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NerdModeToggle } from "@/components/nerd-mode-toggle"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <nav className="sticky top-0 z-50 border-b border-sky-400/30 bg-[#233348]/95 backdrop-blur-sm">
      {/* Top data bar */}
      <div className="border-b border-sky-400/20 bg-[#233348]/60 px-6 py-1">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-sky-400/70">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400" />
              SYS_ONLINE
            </span>
            <span className="font-mono text-[10px] text-slate-500">|</span>
            <span className="font-mono text-[10px] text-slate-500 animate-flicker">{time}</span>
          </div>
          <div className="hidden items-center gap-4 sm:flex">
            <span className="font-mono text-[10px] text-slate-500">PORTFOLIO_v2.4.1</span>
            <span className="font-mono text-[10px] text-slate-500">|</span>
            <span className="font-mono text-[10px] text-emerald-400/70">BUILD: STABLE</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded border border-sky-400/50 bg-sky-400/10 transition-all group-hover:border-sky-400 group-hover:bg-sky-400/20 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.3)]">
              <Terminal className="h-4 w-4 text-sky-400" />
            </div>
            <span className="font-heading text-lg font-bold tracking-tight text-white">
              NOAH<span className="text-sky-400">_</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="#projects"
              className="group relative font-mono text-xs uppercase tracking-wider text-slate-400 transition-colors hover:text-sky-400"
            >
              <span className="opacity-0 transition-opacity group-hover:opacity-100 text-sky-400/50">[</span>
              Projects
              <span className="opacity-0 transition-opacity group-hover:opacity-100 text-sky-400/50">]</span>
            </Link>
            <Link
              href="#about"
              className="group relative font-mono text-xs uppercase tracking-wider text-slate-400 transition-colors hover:text-sky-400"
            >
              <span className="opacity-0 transition-opacity group-hover:opacity-100 text-sky-400/50">[</span>
              About
              <span className="opacity-0 transition-opacity group-hover:opacity-100 text-sky-400/50">]</span>
            </Link>
            <Link
              href="#"
              className="group relative font-mono text-xs uppercase tracking-wider text-slate-400 transition-colors hover:text-sky-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="opacity-0 transition-opacity group-hover:opacity-100 text-sky-400/50">[</span>
              Resume
              <span className="opacity-0 transition-opacity group-hover:opacity-100 text-sky-400/50">]</span>
            </Link>
            <NerdModeToggle />
            <div className="flex items-center gap-3 border-l border-sky-400/30 pl-6">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded border border-slate-700 text-slate-500 transition-all hover:border-sky-400 hover:text-sky-400 hover:shadow-[0_0_10px_rgba(56,189,248,0.2)]"
                aria-label="GitHub Profile"
              >
                <Github className="h-4 w-4" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded border border-slate-700 text-slate-500 transition-all hover:border-sky-400 hover:text-sky-400 hover:shadow-[0_0_10px_rgba(56,189,248,0.2)]"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="border border-slate-700 text-slate-400 hover:border-sky-400 hover:text-sky-400 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="mt-4 flex flex-col gap-4 border-t border-sky-400/20 pt-4 md:hidden">
            <Link
              href="#projects"
              className="font-mono text-xs uppercase tracking-wider text-slate-400 transition-colors hover:text-sky-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              [_Projects]
            </Link>
            <Link
              href="#about"
              className="font-mono text-xs uppercase tracking-wider text-slate-400 transition-colors hover:text-sky-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              [_About]
            </Link>
            <Link
              href="#"
              className="font-mono text-xs uppercase tracking-wider text-slate-400 transition-colors hover:text-sky-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              [_Resume]
            </Link>
            <NerdModeToggle />
            <div className="flex items-center gap-4 pt-2">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded border border-slate-700 text-slate-500 transition-all hover:border-sky-400 hover:text-sky-400"
                aria-label="GitHub Profile"
              >
                <Github className="h-4 w-4" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded border border-slate-700 text-slate-500 transition-all hover:border-sky-400 hover:text-sky-400"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
