"use client"

import { motion } from "motion/react"

import { workRowTransition } from "@/lib/animations"

const demoItems = [
  {
    name: "Sample product",
    description:
      "Same motion as each row in Works: springy hover nudge and a light press on tap.",
  },
  {
    name: "Another row",
    description:
      "The pattern is shared with the Education cards—rounded surface, muted hover fill.",
  },
]

export function WorkRowButtonsDemo() {
  return (
    <div className="flex w-full flex-col gap-1">
      {demoItems.map((item) => (
        <motion.button
          key={item.name}
          type="button"
          className="relative flex w-full cursor-pointer items-center rounded-2xl px-4 py-2 text-left transition-colors outline-none hover:bg-muted/90"
          whileHover={{ x: 15, scale: 1.02 }}
          whileTap={{ scale: 0.985 }}
          transition={workRowTransition}
        >
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="relative z-10 leading-snug font-medium">{item.name}</p>
            <p className="relative z-10 leading-snug text-pretty text-muted-foreground">
              {item.description}
            </p>
          </div>
        </motion.button>
      ))}
    </div>
  )
}
