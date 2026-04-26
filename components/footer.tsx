import Link from "next/link"
import { Github, Linkedin, Mail, Terminal, ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-slate-600 bg-[#233348] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Logo and info */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded border border-sky-400/30 bg-sky-400/10">
              <Terminal className="h-6 w-6 text-sky-400" />
            </div>
            <div>
              <p className="font-heading text-lg font-bold tracking-tight text-white">
                Noah Spiegelman
              </p>
              <p className="font-mono text-xs uppercase tracking-wider text-slate-500">
                Mechanical Engineering // Robotics
              </p>
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            <Link
              href="mailto:noah@example.com"
              className="flex h-10 w-10 items-center justify-center rounded border border-slate-700 text-slate-500 transition-all hover:border-sky-400 hover:text-sky-400 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)]"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded border border-slate-700 text-slate-500 transition-all hover:border-sky-400 hover:text-sky-400 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)]"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded border border-slate-700 text-slate-500 transition-all hover:border-sky-400 hover:text-sky-400 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)]"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
          </div>
        </div>
        
        {/* Data bar */}
        <div className="mt-8 flex items-center justify-center gap-4 border-t border-b border-slate-800 py-4">
          <span className="font-mono text-[10px] text-slate-600">UPTIME: 99.9%</span>
          <span className="text-slate-800">|</span>
          <span className="font-mono text-[10px] text-slate-600">LAST_UPDATE: 2026</span>
          <span className="text-slate-800">|</span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400/70">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            ONLINE
          </span>
        </div>
        
        {/* Copyright */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="font-mono text-xs text-slate-600">
            © {new Date().getFullYear()} Noah Spiegelman. All rights reserved.
          </p>
          <Link 
            href="#" 
            className="flex items-center gap-1 font-mono text-xs text-slate-600 transition-colors hover:text-sky-400"
          >
            Built with Next.js
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
