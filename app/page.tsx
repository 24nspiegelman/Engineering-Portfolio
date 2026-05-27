"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ProjectGrid } from "@/components/project-grid"
import { ProjectDetail } from "@/components/project-detail"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"
import { Model3DViewer } from "@/components/3d-model-viewer"
import { SimulationCanvas } from "@/components/simulation-canvas"
import { TechnicalModeProvider } from "@/components/technical-mode-context"
import type { Project } from "@/components/project-card"

const projects: Project[] = [
  {
    id: "1",
    title: "Autonomous Navigation Robot",
    summary: "A differential-drive mobile robot with real-time obstacle avoidance using sensor fusion from LiDAR, IMU, and wheel encoders. Implemented SLAM and A* pathfinding in ROS2.",
    technicalSummary:
      "Fusion EKF @100 Hz with LiDAR occupancy grids, A* re-plan latency 42 ms, wheel slip reduced 18% after traction model compensation and tuned PID (Kp 1.8 / Ki 0.12 / Kd 0.05).",
    image: "/images/project-1.svg",
    tags: ["ROS2", "SolidWorks", "Python", "SLAM"],
  },
  {
    id: "2",
    title: "Low-Cost Prosthetic Hand",
    summary: "Underactuated 5-DOF prosthetic hand design optimized for 3D printing. Features tendon-driven actuation with myoelectric control for intuitive grasping.",
    technicalSummary:
      "PETG chassis with Dyneema tendons, 5-DOF underactuated topology, peak pinch force 22 N, FEA max von Mises 31 MPa at MCP hinge, GD&T profile tolerance +/-0.35 mm on tendon channels.",
    image: "/images/project-2.svg",
    tags: ["Fusion 360", "FEA", "Arduino", "3D Printing"],
  },
  {
    id: "3",
    title: "High-Performance Thermal System",
    summary: "Custom liquid cooling solution designed for 500W heat dissipation. Micro-channel cold plate with CFD-optimized flow paths and CNC machined copper construction.",
    technicalSummary:
      "C110 copper cold plate with 0.5 mm channels, predicted Rth 0.08 C/W (CFD), flow setpoint 2.5 LPM, hotspot delta-T reduced 14 C after inlet plenum revision and manifold balancing.",
    image: "/images/project-3.svg",
    tags: ["ANSYS Fluent", "CFD", "CNC Machining", "Thermal Analysis"],
  },
]

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <TechnicalModeProvider>
      <main className="min-h-screen bg-slate-100">
        <Navigation />
        <HeroSection />

        <section className="px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
            <Model3DViewer />
            <SimulationCanvas />
          </div>
        </section>

        <ProjectGrid projects={projects} onSelectProject={setSelectedProject} />
        <AboutSection />
        <Footer />

        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </main>
    </TechnicalModeProvider>
  )
}
