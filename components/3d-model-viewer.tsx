"use client"

import { Suspense, useEffect, useMemo, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import { Mesh, type Group, type MeshStandardMaterial } from "three"
import { Box, RotateCcw, ScanLine } from "lucide-react"

function ProstheticModel({
  modelPath,
  wireframe,
}: {
  modelPath: string
  wireframe: boolean
}) {
  const gltf = useGLTF(modelPath)
  const scene = useMemo(() => gltf.scene.clone(), [gltf.scene])

  scene.traverse((node) => {
    if (node instanceof Mesh) {
      const material = node.material as MeshStandardMaterial
      material.wireframe = wireframe
      material.roughness = 0.58
      material.metalness = 0.32
    }
  })

  return <primitive object={scene} scale={1.1} />
}

function ModelFallback({ wireframe }: { wireframe: boolean }) {
  const groupRef = useRef<Group>(null)
  return (
    <group ref={groupRef} rotation={[0.3, 0.8, 0]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.3, 0.45, 0.8]} />
        <meshStandardMaterial color="#9ca3af" wireframe={wireframe} />
      </mesh>
      <mesh position={[0.7, 0.25, 0.25]}>
        <boxGeometry args={[0.45, 0.22, 0.22]} />
        <meshStandardMaterial color="#cbd5e1" wireframe={wireframe} />
      </mesh>
      <mesh position={[0.7, 0.25, -0.25]}>
        <boxGeometry args={[0.45, 0.22, 0.22]} />
        <meshStandardMaterial color="#cbd5e1" wireframe={wireframe} />
      </mesh>
    </group>
  )
}

export function Model3DViewer({ modelPath = "/models/prosthetic-hand.glb" }: { modelPath?: string }) {
  const [wireframe, setWireframe] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [modelAvailable, setModelAvailable] = useState<boolean | null>(null)

  useEffect(() => {
    let active = true
    const checkModel = async () => {
      try {
        const res = await fetch(modelPath, { method: "HEAD" })
        if (active) setModelAvailable(res.ok)
      } catch {
        if (active) setModelAvailable(false)
      }
    }
    checkModel()
    return () => {
      active = false
    }
  }, [modelPath])

  return (
    <section className="rounded border border-sky-400/25 bg-[#233348] p-4 shadow-[0_0_24px_rgba(56,189,248,0.12)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-sky-300">MODEL_VIEWER // Prosthetic Hand</p>
          <p className="font-mono text-[10px] text-slate-400">SYS_STATUS: OPTIMAL</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setWireframe((prev) => !prev)}
            className="flex items-center gap-1 rounded border border-slate-500/50 px-2 py-1 font-mono text-[10px] text-slate-200 hover:border-sky-400/70"
          >
            <Box className="h-3 w-3" />
            {wireframe ? "SOLID" : "WIREFRAME"}
          </button>
          <button
            type="button"
            onClick={() => setAutoRotate((prev) => !prev)}
            className="flex items-center gap-1 rounded border border-slate-500/50 px-2 py-1 font-mono text-[10px] text-slate-200 hover:border-sky-400/70"
          >
            <RotateCcw className="h-3 w-3" />
            {autoRotate ? "AUTO: ON" : "AUTO: OFF"}
          </button>
        </div>
      </div>

      <div className="relative h-[280px] w-full overflow-hidden rounded border border-slate-600/70 bg-slate-900 md:h-[360px]">
        <Canvas camera={{ position: [2.4, 1.8, 2.8], fov: 48 }}>
          <color attach="background" args={["#0f172a"]} />
          <ambientLight intensity={0.45} />
          <hemisphereLight args={["#67e8f9", "#0f172a", 0.45]} />
          <pointLight position={[2.5, 2, 2]} color="#67e8f9" intensity={2.2} />
          <pointLight position={[-2, 1.4, -2]} color="#f8fafc" intensity={0.85} />
          <spotLight position={[-2, 3, 1]} angle={0.45} penumbra={0.4} intensity={1.2} color="#7dd3fc" />

          <Suspense fallback={<ModelFallback wireframe={wireframe} />}>
            {modelAvailable ? (
              <group onPointerMissed={() => undefined}>
                <ProstheticModel modelPath={modelPath} wireframe={wireframe} />
              </group>
            ) : (
              <ModelFallback wireframe={wireframe} />
            )}
          </Suspense>

          <OrbitControls
            enablePan={false}
            minDistance={1.3}
            maxDistance={5.2}
            autoRotate={autoRotate}
            autoRotateSpeed={0.85}
          />
        </Canvas>
        <div className="pointer-events-none absolute right-2 top-2 flex items-center gap-1 rounded bg-slate-900/70 px-2 py-1 font-mono text-[10px] text-sky-300">
          <ScanLine className="h-3 w-3" />
          {modelAvailable === false ? "MODEL_FALLBACK_ACTIVE" : "RIM_LIGHT: CYAN"}
        </div>
      </div>
      {modelAvailable === false && (
        <p className="mt-2 font-mono text-[10px] text-amber-300/90">
          Missing model: place your file at <span className="text-sky-300">public/models/prosthetic-hand.glb</span>
        </p>
      )}
    </section>
  )
}
