"use client"

import { useState } from "react"
import { AnimatePresence } from "motion/react"

import NavBar from "@/components/navbar"
import Hero from "@/components/sections/hero"
import Works from "@/components/sections/works"
import Stack from "@/components/sections/stack"
import Education from "@/components/sections/education"
import Contact from "@/components/sections/contact"
import { WorkDrawer, type WorkItem } from "@/components/work-drawer"
import { useViewportShell } from "@/components/viewport-shell"

export default function Page() {
  const [selected, setSelected] = useState<WorkItem | null>(null)
  const { drawerProgress, setDrawerActive } = useViewportShell()

  return (
    <div className="mx-auto max-w-xl">
      <NavBar />
      <div>
        <Hero />
        <Stack />
        <Works
          onSelect={(item) => {
            setSelected(item)
            setDrawerActive(true)
          }}
        />
        <Education />
        <Contact />
      </div>

      <AnimatePresence onExitComplete={() => setDrawerActive(false)}>
        {selected && (
          <WorkDrawer
            item={selected}
            onClose={() => setSelected(null)}
            progress={drawerProgress}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
