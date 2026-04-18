"use client"

import React from "react"
import { motion, useReducedMotion } from "motion/react"
import { contentEntryVariants } from "@/lib/animations"

interface ContentMotionWrapperProps {
  children: React.ReactNode
  staggerMs?: number
}

export function ContentMotionWrapper({ children, staggerMs = 60 }: ContentMotionWrapperProps) {
  const reduceMotion = useReducedMotion()

  return (
    <>
      {React.Children.toArray(children).map((child, index) => {
        if (!React.isValidElement(child)) {
          return child
        }

        const key = (child as React.ReactElement).key ?? index

        if (reduceMotion) {
          return (
            <motion.div
              key={key}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0 }}
            >
              {child}
            </motion.div>
          )
        }

        const variants = contentEntryVariants(index, staggerMs)

        return (
          <motion.div
            key={key}
            initial={variants.initial}
            animate={variants.animate}
            transition={variants.transition}
          >
            {child}
          </motion.div>
        )
      })}
    </>
  )
}
