"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import {
  AnimatePresence,
  motion,
  useSpring,
  type MotionValue,
} from "motion/react"
import { springTransition } from "@/lib/animations"

type TooltipProps = {
  open: boolean
  x: MotionValue<number>
  y: MotionValue<number>
  text: string
  label?: string
}

function TooltipContent({
  text,
  label = "memory",
}: {
  text: string
  label?: string
}) {
  const words = text.split(" ")

  return (
    <div className="flex flex-col gap-1.5">
      <motion.p
        className="text-[10px] font-medium text-muted-foreground/70 uppercase"
        initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ type: "spring", duration: 0.15, bounce: 0 }}
      >
        {label}
      </motion.p>
      <p className="leading-snug text-muted-foreground">
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="inline-block [overflow-wrap:anywhere]"
            initial={{ opacity: 0, y: 5, filter: "blur(3px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              type: "spring",
              stiffness: 520,
              damping: 32,
              delay: 0.02 + i * 0.018,
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : null}
          </motion.span>
        ))}
      </p>
    </div>
  )
}

export default function Tooltip({ open, x, y, text, label }: TooltipProps) {
  const [mounted, setMounted] = useState(false)
  const springX = useSpring(x, { stiffness: 500, damping: 30 })
  const springY = useSpring(y, { stiffness: 500, damping: 30 })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          style={{
            position: "fixed",
            left: springX,
            top: springY,
            pointerEvents: "none",
            zIndex: 9999,
          }}
          initial={{ opacity: 0, scale: 0.94, y: 8, rotate: -0.6 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 6 }}
          transition={springTransition}
          className="max-w-xl rounded-lg border border-border/80 bg-background px-4 py-3 text-lg"
        >
          <TooltipContent text={text} label={label} />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
