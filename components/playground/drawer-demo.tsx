"use client"

import { useState } from "react"
import { AnimatePresence } from "motion/react"

import { Button } from "@/components/ui/button"
import { WorkDrawer, type WorkItem } from "@/components/work-drawer"
import { useViewportShell } from "@/components/viewport-shell"

const demoItem: WorkItem = {
  name: "Drawer",
  description:
    "This is the same bottom sheet used for work on the home page: spring entrance, drag to dismiss, and a backdrop that follows your finger.",
}

export function DrawerDemo() {
  const [open, setOpen] = useState(false)
  const { drawerProgress, setDrawerActive } = useViewportShell()

  return (
    <div className="mx-auto flex max-w-xs flex-col items-center">
      <Button
        type="button"
        onClick={() => {
          setOpen(true)
          setDrawerActive(true)
        }}
      >
        Open drawer
      </Button>

      <AnimatePresence onExitComplete={() => setDrawerActive(false)}>
        {open ? (
          <WorkDrawer
            item={demoItem}
            onClose={() => setOpen(false)}
            progress={drawerProgress}
          />
        ) : null}
      </AnimatePresence>
    </div>
  )
}
