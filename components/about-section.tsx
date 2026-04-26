import { GraduationCap, Cpu, Cog, Code, User, MapPin, Calendar, Briefcase } from "lucide-react"

export function AboutSection() {
  const skills = [
    {
      category: "CAD & Modeling",
      items: ["SolidWorks", "Fusion 360", "AutoCAD", "CATIA"],
      icon: Cog,
      color: "sky",
    },
    {
      category: "Analysis & Simulation",
      items: ["ANSYS", "MATLAB", "Simulink", "FEA/CFD"],
      icon: Cpu,
      color: "emerald",
    },
    {
      category: "Programming",
      items: ["Python", "C++", "ROS2", "Arduino"],
      icon: Code,
      color: "violet",
    },
    {
      category: "Manufacturing",
      items: ["3D Printing", "CNC", "Laser Cut", "GD&T"],
      icon: GraduationCap,
      color: "amber",
    },
  ]

  return (
    <section id="about" className="relative border-t border-slate-200 bg-white px-6 py-20">

      <div className="relative z-20 mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-12 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-sky-400" />
            <div className="h-px w-12 bg-gradient-to-r from-sky-400 to-transparent" />
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            About <span className="text-sky-400">Me</span>
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Bio section */}
          <div className="rounded border border-slate-300 bg-white/90 p-6 shadow-sm">
            {/* Terminal header */}
            <div className="mb-4 flex items-center gap-3 border-b border-slate-200 pb-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <span className="font-mono text-xs text-slate-500">user_profile.md</span>
            </div>

            <p className="text-base leading-relaxed text-slate-700">
              I&apos;m a sophomore Mechanical Engineering student at Boston University with a concentration
              in Robotics. My work bridges the gap between
              theoretical analysis and hands-on implementation.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              Currently, I&apos;m conducting research in the Biomechatronics Lab, where I&apos;m
              developing novel actuator designs for prosthetic limbs. I&apos;m particularly
              interested in the intersection of mechanical design, control systems, and
              machine learning.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              When I&apos;m not in the lab, you&apos;ll find me competing with the university&apos;s
              robotics team or mentoring high school students in FIRST Robotics.
            </p>
            
            {/* Info cards */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 rounded border border-slate-300 bg-slate-50 px-3 py-2">
                <MapPin className="h-4 w-4 text-sky-400" />
                <span className="font-mono text-xs text-slate-600">Boston, MA</span>
              </div>
              <div className="flex items-center gap-2 rounded border border-slate-300 bg-slate-50 px-3 py-2">
                <Calendar className="h-4 w-4 text-sky-400" />
                <span className="font-mono text-xs text-slate-600">Class of 2027</span>
              </div>
            </div>
            
            {/* Status indicator */}
            <div className="mt-6 flex items-center gap-2 rounded border border-emerald-400/30 bg-emerald-400/10 px-4 py-2">
              <Briefcase className="h-4 w-4 text-emerald-400" />
              <span className="font-mono text-xs text-emerald-400">SEEKING: Summer 2026 Internship</span>
            </div>
          </div>

          {/* Skills grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {skills.map((skill) => (
              <div
                key={skill.category}
                className="group rounded border border-slate-300 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:border-sky-400/60 hover:shadow-[0_8px_24px_rgba(56,189,248,0.12)]"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded border border-slate-300 bg-slate-50 transition-all group-hover:border-sky-400 group-hover:shadow-[0_0_10px_rgba(56,189,248,0.25)]`}>
                    <skill.icon className="h-5 w-5 text-sky-400" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-semibold tracking-tight text-slate-900">
                      {skill.category}
                    </h3>
                    <span className="font-mono text-[10px] text-slate-500">{skill.items.length} SKILLS</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="rounded border border-slate-300 bg-slate-50 px-2 py-0.5 font-mono text-[10px] text-slate-600 transition-colors group-hover:border-sky-400/40 group-hover:text-sky-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                {/* Progress bar decoration */}
                <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-sky-400 to-sky-400/50 transition-all group-hover:w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
