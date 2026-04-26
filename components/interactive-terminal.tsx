"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type TerminalEntry = { command?: string; response: string }

const HELP_TEXT = [
  "Available commands:",
  "- help            // show command list",
  "- view-resume     // open resume",
  "- run-sim         // jump to simulation module",
  "- contact         // open email client",
  "- status          // show system status",
  "- clear           // clear terminal output",
]

function useTypewriter(text: string, speed = 16) {
  const [displayed, setDisplayed] = useState("")
  useEffect(() => {
    let index = 0
    setDisplayed("")
    const timer = setInterval(() => {
      index += 1
      setDisplayed(text.slice(0, index))
      if (index >= text.length) clearInterval(timer)
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])
  return displayed
}

export function InteractiveTerminal() {
  const [history, setHistory] = useState<TerminalEntry[]>([
    { response: "SYS_STATUS: OPTIMAL // BUILD_STABLE // awaiting command..." },
  ])
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  const lastResponse = history[history.length - 1]?.response ?? ""
  const typedResponse = useTypewriter(lastResponse)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [history, typedResponse])

  const handleCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return

    if (cmd === "clear") {
      setHistory([{ command: "clear", response: "Terminal buffer cleared." }])
      return
    }

    let response = "Command not recognized. Type `help`."
    if (cmd === "help") response = HELP_TEXT.join("\n")
    if (cmd === "view-resume") {
      response = "Opening resume endpoint..."
      window.open("#", "_blank", "noopener,noreferrer")
    }
    if (cmd === "run-sim") {
      response = "Routing to simulation canvas..."
      document.getElementById("engineering-sim")?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    if (cmd === "contact") {
      response = "Launching contact channel..."
      window.location.href = "mailto:noah@example.com"
    }
    if (cmd === "status") {
      response = "SYS_STATUS: OPTIMAL\nLAT: 42.3601 | LONG: -71.0589\nBUILD_STABLE: TRUE"
    }

    setHistory((prev) => [...prev, { command: raw, response }])
  }

  const lines = useMemo(() => {
    return history.map((entry, index) => ({
      ...entry,
      response: index === history.length - 1 ? typedResponse : entry.response,
    }))
  }, [history, typedResponse])

  return (
    <div className="rounded border border-sky-400/30 bg-black/35 p-3 text-left shadow-[0_0_20px_rgba(56,189,248,0.12)] backdrop-blur-sm">
      <div ref={scrollRef} className="max-h-40 overflow-y-auto pr-1 font-mono text-xs text-slate-200">
        {lines.map((entry, idx) => (
          <div key={`${idx}-${entry.command ?? "sys"}`} className="mb-2 whitespace-pre-line">
            {entry.command && <div className="text-sky-300">$ {entry.command}</div>}
            <div className="text-slate-300">{entry.response}</div>
          </div>
        ))}
      </div>
      <form
        className="mt-2 flex items-center gap-2 border-t border-sky-400/20 pt-2"
        onSubmit={(event) => {
          event.preventDefault()
          handleCommand(input)
          setInput("")
        }}
      >
        <span className="font-mono text-xs text-sky-300">~/terminal&gt;</span>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="type help"
          className="w-full bg-transparent font-mono text-xs text-slate-100 outline-none placeholder:text-slate-500"
        />
      </form>
    </div>
  )
}
