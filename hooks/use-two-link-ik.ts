"use client"

import { useCallback, useMemo, useState } from "react"

interface IkTarget {
  x: number
  y: number
}

interface UseTwoLinkIkOptions {
  linkA: number
  linkB: number
  initialTarget?: IkTarget
}

function clampTarget(x: number, y: number, minReach: number, maxReach: number): IkTarget {
  const distance = Math.hypot(x, y)
  if (distance === 0) {
    return { x: minReach, y: 0 }
  }

  if (distance > maxReach) {
    const scale = maxReach / distance
    return { x: x * scale, y: y * scale }
  }

  if (distance < minReach) {
    const scale = minReach / distance
    return { x: x * scale, y: y * scale }
  }

  return { x, y }
}

export function useTwoLinkIK({ linkA, linkB, initialTarget = { x: 110, y: -70 } }: UseTwoLinkIkOptions) {
  const maxReach = linkA + linkB
  const minReach = Math.abs(linkA - linkB)

  const [target, setTarget] = useState<IkTarget>(() =>
    clampTarget(initialTarget.x, initialTarget.y, minReach, maxReach),
  )

  const solved = useMemo(() => {
    const clamped = clampTarget(target.x, target.y, minReach, maxReach)
    const { x, y } = clamped
    const distanceSq = x * x + y * y

    const cosTheta2 = (distanceSq - linkA * linkA - linkB * linkB) / (2 * linkA * linkB)
    const safeCosTheta2 = Math.max(-1, Math.min(1, cosTheta2))
    const theta2 = Math.acos(safeCosTheta2)

    const k1 = linkA + linkB * Math.cos(theta2)
    const k2 = linkB * Math.sin(theta2)
    const theta1 = Math.atan2(y, x) - Math.atan2(k2, k1)

    const elbow = {
      x: linkA * Math.cos(theta1),
      y: linkA * Math.sin(theta1),
    }

    const end = {
      x: elbow.x + linkB * Math.cos(theta1 + theta2),
      y: elbow.y + linkB * Math.sin(theta1 + theta2),
    }

    return { clamped, theta1, theta2, elbow, end }
  }, [linkA, linkB, minReach, maxReach, target.x, target.y])

  const setTargetFromCartesian = useCallback(
    (x: number, y: number) => {
      setTarget(clampTarget(x, y, minReach, maxReach))
    },
    [minReach, maxReach],
  )

  return {
    target: solved.clamped,
    theta1: solved.theta1,
    theta2: solved.theta2,
    elbow: solved.elbow,
    end: solved.end,
    setTargetFromCartesian,
    maxReach,
    minReach,
  }
}
