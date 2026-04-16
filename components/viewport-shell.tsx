"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "motion/react"

type ViewportShellContextValue = {
  drawerActive: boolean
  setDrawerActive: (active: boolean) => void
  drawerProgress: MotionValue<number>
}

const ViewportShellContext =
  React.createContext<ViewportShellContextValue | null>(null)

export function ViewportShellProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [drawerActive, setDrawerActive] = React.useState(false)
  const drawerProgress = useMotionValue(0)

  React.useEffect(() => {
    setDrawerActive(false)
    drawerProgress.set(0)
  }, [drawerProgress, pathname])

  React.useEffect(() => {
    if (!drawerActive) {
      drawerProgress.set(0)
      return
    }

    const { body, documentElement } = document
    const previousBodyOverflow = body.style.overflow
    const previousHtmlOverflow = documentElement.style.overflow
    const previousOverscroll = documentElement.style.overscrollBehavior

    body.style.overflow = "hidden"
    documentElement.style.overflow = "hidden"
    documentElement.style.overscrollBehavior = "none"

    return () => {
      body.style.overflow = previousBodyOverflow
      documentElement.style.overflow = previousHtmlOverflow
      documentElement.style.overscrollBehavior = previousOverscroll
    }
  }, [drawerActive, drawerProgress])

  const value = React.useMemo(
    () => ({ drawerActive, setDrawerActive, drawerProgress }),
    [drawerActive, drawerProgress]
  )

  return (
    <ViewportShellContext.Provider value={value}>
      {children}
    </ViewportShellContext.Provider>
  )
}

export function useViewportShell() {
  const value = React.useContext(ViewportShellContext)

  if (!value) {
    throw new Error(
      "useViewportShell must be used within ViewportShellProvider"
    )
  }

  return value
}

export function ViewportShell({ children }: { children: React.ReactNode }) {
  const { drawerProgress } = useViewportShell()
  const scale = useTransform(drawerProgress, [0, 1], [1, 0.965])
  const y = useTransform(drawerProgress, [0, 1], [0, -12])
  const borderRadius = useTransform(drawerProgress, [0, 1], ["0px", "2.25rem"])

  return (
    <motion.div
      style={{ scale, y, borderRadius }}
      className="relative min-h-dvh origin-top overflow-hidden bg-background will-change-transform"
    >
      {children}
    </motion.div>
  )
}
