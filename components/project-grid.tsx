"use client"

import { ProjectCard, type Project } from "@/components/project-card"
import { Database, Zap } from "lucide-react"

interface ProjectGridProps {
  projects: Project[]
  onSelectProject: (project: Project) => void
}

export function ProjectGrid({ projects, onSelectProject }: ProjectGridProps) {
  return (
    <section id="projects" className="relative px-6 py-20">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-sky-100/70 via-transparent to-slate-200/60" />
      
      <div className="relative z-20 mx-auto max-w-6xl">
        {/* Section header with HUD styling */}
        <div className="mb-12">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-sky-400" />
              <div className="h-px w-12 bg-gradient-to-r from-sky-400 to-transparent" />
            </div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Featured <span className="text-sky-400">Projects</span>
            </h2>
            <div className="hidden items-center gap-2 md:flex">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-sky-400/30 to-transparent min-w-[100px]" />
              <span className="rounded border border-sky-400/30 bg-sky-400/10 px-2 py-0.5 font-mono text-[10px] text-sky-400">
                {projects.length} LOADED
              </span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <Zap className="h-3 w-3 text-emerald-400" />
            <p className="font-mono text-xs uppercase tracking-wider text-slate-600">
              Technical projects showcasing design, analysis, and implementation
            </p>
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
              eagerImage={index < 3}
            />
          ))}
        </div>

        {/* Bottom data bar */}
        <div className="mt-12 flex items-center justify-center gap-6 border-t border-slate-300 pt-6">
          <span className="font-mono text-[10px] text-slate-500">RENDER_TIME: 0.042s</span>
          <span className="text-slate-400">|</span>
          <span className="font-mono text-[10px] text-slate-500">CACHE: HIT</span>
          <span className="text-slate-400">|</span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400/70">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            ALL_SYSTEMS_NOMINAL
          </span>
        </div>
      </div>
    </section>
  )
}
