"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useTechnicalMode } from "@/components/technical-mode-context"

export interface Project {
  id: string
  title: string
  summary: string
  technicalSummary?: string
  image: string
  tags: string[]
}

interface ProjectCardProps {
  project: Project
  onSelect: (project: Project) => void
  eagerImage?: boolean
}

export function ProjectCard({ project, onSelect, eagerImage = false }: ProjectCardProps) {
  const { technicalMode } = useTechnicalMode()
  const displayedSummary = technicalMode ? project.technicalSummary || project.summary : project.summary

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => onSelect(project)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onSelect(project)
        }
      }}
      className="group relative cursor-pointer overflow-hidden rounded border-2 border-slate-700 bg-[#233348] transition-all duration-300 hover:border-sky-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#233348]"
    >
      {/* Corner brackets */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <svg className="absolute left-2 top-2 h-6 w-6 text-slate-600 transition-colors group-hover:text-sky-400" viewBox="0 0 24 24" fill="none">
          <path d="M0 12 L0 0 L12 0" stroke="currentColor" strokeWidth="2" />
        </svg>
        <svg className="absolute right-2 top-2 h-6 w-6 text-slate-600 transition-colors group-hover:text-sky-400" viewBox="0 0 24 24" fill="none">
          <path d="M24 12 L24 0 L12 0" stroke="currentColor" strokeWidth="2" />
        </svg>
        <svg className="absolute bottom-2 left-2 h-6 w-6 text-slate-600 transition-colors group-hover:text-sky-400" viewBox="0 0 24 24" fill="none">
          <path d="M0 12 L0 24 L12 24" stroke="currentColor" strokeWidth="2" />
        </svg>
        <svg className="absolute bottom-2 right-2 h-6 w-6 text-slate-600 transition-colors group-hover:text-sky-400" viewBox="0 0 24 24" fill="none">
          <path d="M24 12 L24 24 L12 24" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      {/* Project ID badge */}
      <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded bg-[#233348]/90 px-2 py-1 border border-slate-700">
        <Cpu className="h-3 w-3 text-sky-400" />
        <span className="font-mono text-[10px] text-sky-400">PRJ_{project.id.padStart(3, '0')}</span>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden bg-[#233348]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority={eagerImage}
          loading={eagerImage ? "eager" : "lazy"}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Scan line overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400/0 via-sky-400/5 to-sky-400/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-30"
          style={{
            backgroundImage: 'linear-gradient(rgba(56, 189, 248, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.3) 1px, transparent 1px)',
            backgroundSize: '16px 16px'
          }}
        />
        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#233348] to-transparent" />
      </div>

      <CardContent className="relative p-5">
        {/* Title with glow effect */}
        <h3 className="font-heading text-lg font-semibold tracking-tight text-white transition-all group-hover:text-sky-400">
          {project.title}
        </h3>

        {/* Tags with tech styling */}
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-slate-700 bg-[#233348] px-2 py-0.5 font-mono text-[10px] text-slate-400 transition-colors group-hover:border-sky-400/50 group-hover:text-sky-400/80"
            >
              {tag}
            </span>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={technicalMode ? "technical" : "general"}
            initial={{ opacity: 0, y: 4, filter: "blur(1px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -4, filter: "blur(1px)" }}
            transition={{ duration: 0.22 }}
            className="mt-4 line-clamp-2 text-sm leading-relaxed text-slate-500"
          >
            {displayedSummary}
          </motion.p>
        </AnimatePresence>

        {/* Divider line */}
        <div className="my-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-slate-700 transition-colors group-hover:bg-sky-400/30" />
          <div className="h-1.5 w-1.5 rounded-full bg-slate-700 transition-colors group-hover:bg-sky-400" />
          <div className="h-px flex-1 bg-slate-700 transition-colors group-hover:bg-sky-400/30" />
        </div>

        <Button
          variant="ghost"
          className="h-auto w-full justify-between p-0 font-mono text-xs uppercase tracking-wider text-slate-400 transition-all hover:bg-transparent hover:text-sky-400"
          onClick={(event) => {
            event.stopPropagation()
            onSelect(project)
          }}
        >
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 group-hover:animate-pulse" />
            Access Case Study
          </span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  )
}
