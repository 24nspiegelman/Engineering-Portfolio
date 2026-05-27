"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight, Lightbulb, AlertTriangle, Wrench, Target, Database, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Project } from "@/components/project-card"
import { useTechnicalMode } from "@/components/technical-mode-context"
import { BlueprintOverlay, type BlueprintHotspot } from "@/components/blueprint-overlay"

interface ProjectDetailData extends Project {
  problemStatement: string
  designAnalysis: string
  implementation: string
  lessonsLearned: string
  gallery: string[]
  codeSnippet?: string
}

interface ProjectDetailProps {
  project: Project
  onClose: () => void
}

// Extended project data for the detailed view
const projectDetails: Record<string, Omit<ProjectDetailData, keyof Project>> = {
  "1": {
    problemStatement: "Design an autonomous mobile robot capable of navigating complex indoor environments while avoiding dynamic obstacles. The system must operate in real-time with sensor fusion from LiDAR, IMU, and wheel encoders.",
    designAnalysis: "The chassis design utilized SolidWorks for 3D modeling with FEA analysis to optimize weight distribution. The drive system employs a differential drive configuration with high-torque NEMA 17 stepper motors. Kinematic modeling was performed using MATLAB to simulate motion trajectories and validate the control algorithm.",
    implementation: "The robot was fabricated using a combination of 3D-printed PLA components and laser-cut aluminum brackets. ROS2 was used for the software stack, implementing SLAM for mapping and A* pathfinding for navigation. The embedded system runs on a Raspberry Pi 4 with real-time sensor processing on an Arduino Mega.",
    lessonsLearned: "Initial motor selection underestimated torque requirements, leading to wheel slippage on inclines. This was resolved by upgrading to planetary gear motors. Additionally, sensor noise from the IMU required implementing a complementary filter, which significantly improved pose estimation accuracy.",
    gallery: [
      "/images/project-1-1.svg",
      "/images/project-1-2.svg",
      "/images/project-1-3.svg",
    ],
    codeSnippet: `# A* Pathfinding Implementation
def a_star(start, goal, grid):
    open_set = PriorityQueue()
    open_set.put((0, start))
    came_from = {}
    g_score = {start: 0}
    
    while not open_set.empty():
        current = open_set.get()[1]
        if current == goal:
            return reconstruct_path(came_from, current)
        
        for neighbor in get_neighbors(current, grid):
            tentative_g = g_score[current] + 1
            if tentative_g < g_score.get(neighbor, inf):
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g
                f_score = tentative_g + heuristic(neighbor, goal)
                open_set.put((f_score, neighbor))
    
    return None`,
  },
  "2": {
    problemStatement: "Develop a lightweight prosthetic hand mechanism that provides 5-DOF grasping capability while minimizing actuator count. The design must be manufacturable using consumer-grade 3D printers and cost under $200 in materials.",
    designAnalysis: "Topology optimization in Fusion 360 reduced finger link mass by 40% while maintaining structural integrity. The underactuated mechanism design uses a single motor per finger with tendon-driven transmission, enabling adaptive grasping through mechanical compliance. Stress analysis verified factor of safety > 2.5 under maximum grip force.",
    implementation: "All structural components were printed in PETG for durability and chemical resistance. Dyneema fishing line serves as artificial tendons, routed through PTFE tubing for low-friction operation. Control is achieved via an Arduino Nano with myoelectric sensors detecting forearm muscle signals.",
    lessonsLearned: "The initial tendon routing caused significant friction losses, reducing grip strength by 60%. Redesigning the pulley system with ball bearings and optimizing tendon paths recovered most of the lost efficiency. Future iterations should consider cable-driven mechanisms with Bowden tubes.",
    gallery: [
      "/images/project-2-1.svg",
      "/images/project-2-2.svg",
      "/images/project-2-3.svg",
    ],
  },
  "3": {
    problemStatement: "Create a thermal management system for high-performance computing that can dissipate 500W of heat while maintaining junction temperatures below 85°C in a compact form factor suitable for desktop deployment.",
    designAnalysis: "CFD simulation in ANSYS Fluent modeled airflow patterns and heat transfer coefficients. The cold plate design features a micro-channel architecture with 0.5mm channels, achieving heat transfer coefficients of 15,000 W/m²K. Thermal resistance modeling predicted a total system thermal resistance of 0.08°C/W.",
    implementation: "The cold plate was CNC machined from C110 copper with nickel plating for corrosion resistance. A custom pump selection based on system curve analysis ensures optimal flow rate of 2.5 LPM. The radiator utilizes a cross-flow design with louvered fins for enhanced air-side heat transfer.",
    lessonsLearned: "Initial testing revealed flow maldistribution in the parallel micro-channels, causing hot spots. Adding a jet impingement inlet plenum improved flow uniformity. Pump cavitation at high temperatures was mitigated by pressurizing the loop with an expansion tank.",
    gallery: [
      "/images/project-3-1.svg",
      "/images/project-3-2.svg",
      "/images/project-3-3.svg",
    ],
  },
}

const deepDiveSpecs: Record<string, Partial<Record<"problem" | "design" | "implementation" | "lessons", string>>> = {
  "1": {
    problem:
      "Target constraints: < 45 ms control loop latency, < 6 cm RMS localization drift over 30 m path, dynamic obstacle avoidance with minimum clearance 0.25 m.",
    design:
      "FEA on motor mount bracket shows max 22 MPa under 2.4x nominal torque; first mode at 148 Hz. GD&T: perpendicularity 0.15 mm between wheel axle datum A and sensor mast datum B.",
    implementation:
      "ROS2 Foxy nodes distributed across Raspberry Pi + microcontroller bridge, EKF fusion update at 100 Hz, planner replan interval 120 ms.",
  },
  "2": {
    problem:
      "Design envelope constrained to hand span 185 mm, total mass < 420 g, and BOM under USD 200 while sustaining pinch force > 18 N.",
    design:
      "Finger links optimized in Fusion 360; FEA indicates 31 MPa peak stress at MCP fillet with FoS 2.6. Material selection: PETG (body), PA12 inserts (wear points), Dyneema SK75 tendons.",
    implementation:
      "Tendon routing via PTFE guides reduces friction losses; cable preload calibrated to 6 N. GD&T callouts: profile +/-0.35 mm on guide channels and positional tolerance 0.2 mm for pulley bores.",
  },
  "3": {
    problem:
      "Thermal objective: dissipate 500 W at junction < 85 C with acoustic cap < 38 dBA and pump power budget < 18 W.",
    design:
      "CFD converged with k-omega SST turbulence model; channel Reynolds 1700-2100. Copper C110 chosen for thermal conductivity and machinability with electroless nickel for corrosion mitigation.",
    implementation:
      "Measured flow 2.47 LPM at operating head; manifold redesign equalized channel distribution and cut hotspot gradient by 14 C.",
  },
}

const detailHotspots: Record<string, BlueprintHotspot[]> = {
  "1": [
    { id: "d1", x: 31, y: 39, label: "MOUNTING_BRACKET", value: "Torque: 2.5Nm" },
    { id: "d2", x: 62, y: 59, label: "DRIVE_CHASSIS", value: "Material: 6061-T6 Aluminum" },
  ],
  "2": [
    { id: "d1", x: 33, y: 46, label: "ACTUATION_LINK", value: "Pinch Force: 22N" },
    { id: "d2", x: 67, y: 61, label: "TENDON_CHANNEL", value: "Tolerance: +/-0.35mm" },
  ],
  "3": [
    { id: "d1", x: 41, y: 48, label: "MICRO_CHANNELS", value: "Flow: 2.5LPM" },
    { id: "d2", x: 70, y: 58, label: "THERMAL_FACE", value: "Rth: 0.08 C/W" },
  ],
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { technicalMode } = useTechnicalMode()
  const details = projectDetails[project.id]
  const gallery = details?.gallery || [project.image]
  const deepDive = deepDiveSpecs[project.id] ?? {}

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-200/95">
      {/* Grid background */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-30"
        style={{
          backgroundImage: 'linear-gradient(rgba(56, 189, 248, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.05) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Scan line */}
      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
        <div className="animate-scan absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-sky-400/5 to-transparent" />
      </div>
      
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-sky-500/30 bg-slate-100/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded border border-sky-400/30 bg-sky-400/10 px-3 py-1">
              <Cpu className="h-4 w-4 text-sky-400" />
              <span className="font-mono text-xs text-sky-400">PRJ_{project.id.padStart(3, '0')}</span>
            </div>
            <div className="hidden h-4 w-px bg-slate-700 sm:block" />
            <h2 className="hidden font-heading text-lg font-semibold tracking-tight text-slate-900 sm:block">
              {project.title}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close project details"
            className="rounded border border-slate-700 text-slate-400 hover:border-sky-400 hover:bg-transparent hover:text-sky-400"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-8">
        <div className="relative z-20">
        {/* Mobile title */}
        <h2 className="mb-6 font-heading text-2xl font-semibold tracking-tight text-slate-900 sm:hidden">
          {project.title}
        </h2>

        {/* Image Gallery */}
        <div className="relative mb-8 aspect-video overflow-hidden rounded border-2 border-slate-700 bg-[#233348]">
          {/* Corner brackets */}
          <div className="pointer-events-none absolute inset-0 z-10">
            <svg className="absolute left-2 top-2 h-8 w-8 text-sky-400/50" viewBox="0 0 32 32" fill="none">
              <path d="M0 16 L0 0 L16 0" stroke="currentColor" strokeWidth="2" />
            </svg>
            <svg className="absolute right-2 top-2 h-8 w-8 text-sky-400/50" viewBox="0 0 32 32" fill="none">
              <path d="M32 16 L32 0 L16 0" stroke="currentColor" strokeWidth="2" />
            </svg>
            <svg className="absolute bottom-2 left-2 h-8 w-8 text-sky-400/50" viewBox="0 0 32 32" fill="none">
              <path d="M0 16 L0 32 L16 32" stroke="currentColor" strokeWidth="2" />
            </svg>
            <svg className="absolute bottom-2 right-2 h-8 w-8 text-sky-400/50" viewBox="0 0 32 32" fill="none">
              <path d="M32 16 L32 32 L16 32" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>

          <BlueprintOverlay
            image={gallery[currentImageIndex]}
            alt={`${project.title} - Image ${currentImageIndex + 1}`}
            hotspots={detailHotspots[project.id] ?? []}
            priority={currentImageIndex === 0}
            loading={currentImageIndex === 0 ? "eager" : "lazy"}
          />
          
          {/* Image overlay data */}
          <div className="absolute left-4 top-4 z-20 rounded bg-[#233348]/90 px-3 py-1 border border-slate-700">
            <span className="font-mono text-xs text-sky-400">IMG_{(currentImageIndex + 1).toString().padStart(2, '0')}/{gallery.length.toString().padStart(2, '0')}</span>
          </div>
          <div className="absolute right-4 top-4 z-20 flex items-center gap-2 rounded bg-[#233348]/90 px-3 py-1 border border-slate-700">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] text-emerald-400">LOADED</span>
          </div>

          {gallery.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded border border-slate-700 bg-[#233348]/80 hover:border-sky-400 hover:text-sky-400"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded border border-slate-700 bg-[#233348]/80 hover:border-sky-400 hover:text-sky-400"
                onClick={nextImage}
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
              <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                {gallery.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 w-6 rounded transition-all ${
                      index === currentImageIndex 
                        ? "bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]" 
                        : "bg-slate-700 hover:bg-slate-600"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Tags */}
        <div className="mb-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-slate-700 bg-[#233348] px-3 py-1 font-mono text-xs text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Wire divider */}
        <div className="mb-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />
          <Database className="h-4 w-4 text-sky-400/50" />
          <span className="font-mono text-[10px] text-slate-600">TECHNICAL_DATA</span>
          <Database className="h-4 w-4 text-sky-400/50" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />
        </div>

        {/* Content Sections */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Problem Statement */}
          <Card className="rounded border-2 border-slate-700 bg-[#233348]">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded border border-sky-400/30 bg-sky-400/10">
                  <Target className="h-5 w-5 text-sky-400" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold tracking-tight text-white">
                    Problem Statement
                  </h3>
                  <span className="font-mono text-[10px] text-slate-600">OBJECTIVE_DEFINITION</span>
                </div>
              </div>
              <p className="leading-relaxed text-slate-400">
                {technicalMode ? deepDive.problem || details?.problemStatement || project.summary : details?.problemStatement || project.summary}
              </p>
            </CardContent>
          </Card>

          {/* Design & Analysis */}
          <Card className="rounded border-2 border-slate-700 bg-[#233348]">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded border border-emerald-400/30 bg-emerald-400/10">
                  <Lightbulb className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold tracking-tight text-white">
                    Design & Analysis
                  </h3>
                  <span className="font-mono text-[10px] text-slate-600">ENGINEERING_APPROACH</span>
                </div>
              </div>
              <p className="leading-relaxed text-slate-400">
                {technicalMode ? deepDive.design || details?.designAnalysis || "Technical design documentation pending." : details?.designAnalysis || "Technical design documentation pending."}
              </p>
            </CardContent>
          </Card>

          {/* Implementation */}
          <Card className="rounded border-2 border-slate-700 bg-[#233348]">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded border border-violet-400/30 bg-violet-400/10">
                  <Wrench className="h-5 w-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold tracking-tight text-white">
                    Implementation
                  </h3>
                  <span className="font-mono text-[10px] text-slate-600">BUILD_PROCESS</span>
                </div>
              </div>
              <p className="leading-relaxed text-slate-400">
                {technicalMode ? deepDive.implementation || details?.implementation || "Implementation details pending." : details?.implementation || "Implementation details pending."}
              </p>
            </CardContent>
          </Card>

          {/* Lessons Learned */}
          <Card className="rounded border-2 border-slate-700 bg-[#233348]">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded border border-amber-400/30 bg-amber-400/10">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold tracking-tight text-white">
                    Lessons Learned
                  </h3>
                  <span className="font-mono text-[10px] text-slate-600">FAILURE_ANALYSIS</span>
                </div>
              </div>
              <p className="leading-relaxed text-slate-400">
                {technicalMode ? deepDive.lessons || details?.lessonsLearned || "Reflection and analysis pending." : details?.lessonsLearned || "Reflection and analysis pending."}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Code Snippet */}
        {details?.codeSnippet && (
          <Card className="mt-6 rounded border-2 border-slate-700 bg-[#233348] overflow-hidden">
            <CardContent className="p-0">
              {/* Terminal header */}
              <div className="flex items-center justify-between border-b border-slate-700 bg-[#233348] px-4 py-2">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="font-mono text-xs text-slate-500">algorithm.py</span>
                </div>
                <span className="font-mono text-[10px] text-slate-600">PYTHON</span>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-sm text-slate-300">
                <code>{details.codeSnippet}</code>
              </pre>
            </CardContent>
          </Card>
        )}

        {/* Back Button */}
        <div className="mt-12 flex items-center justify-between border-t border-slate-800 pt-8">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="rounded border-slate-700 bg-transparent font-mono text-xs uppercase tracking-wider text-slate-400 transition-all hover:border-sky-400 hover:bg-transparent hover:text-sky-400"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
          <span className="font-mono text-[10px] text-slate-600">END_OF_DOCUMENT</span>
        </div>
        </div>
      </div>
    </div>
  )
}
