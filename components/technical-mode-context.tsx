"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"

interface TechnicalModeContextValue {
  technicalMode: boolean
  setTechnicalMode: (value: boolean) => void
  toggleTechnicalMode: () => void
}

const TechnicalModeContext = createContext<TechnicalModeContextValue | null>(null)

export function TechnicalModeProvider({ children }: { children: ReactNode }) {
  const [technicalMode, setTechnicalMode] = useState(false)

  const value = useMemo(
    () => ({
      technicalMode,
      setTechnicalMode,
      toggleTechnicalMode: () => setTechnicalMode((prev) => !prev),
    }),
    [technicalMode],
  )

  return <TechnicalModeContext.Provider value={value}>{children}</TechnicalModeContext.Provider>
}

export function useTechnicalMode() {
  const context = useContext(TechnicalModeContext)
  if (!context) {
    throw new Error("useTechnicalMode must be used within TechnicalModeProvider")
  }
  return context
}
