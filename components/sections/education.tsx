"use client"

import { useState } from "react"
import type { MouseEvent } from "react"
import { motion, useMotionValue } from "motion/react"
import { workRowTransition } from "@/lib/animations"
import Tooltip from "@/components/ui/tooltip"

const educationItems = [
  {
    school: "Mariano Marcos State University",
    program: "Bachelor of Science in Computer Science",
    period: "2023 - Present",
    details: ["3rd Year Student", "Dean's Lister"],
    memory:
      "✨ The first time I made a complex animation feel 'right' in a project, I stayed up until 3 AM just watching it loop 🌙 That's when I knew I loved design engineering.",
  },
  {
    school: "Ilocos Norte National High School",
    program: "Science, Technology, Engineering, and Mathematics Strand",
    period: "2021 - 2023",
    details: ["With High Honors"],
    memory:
      "☁️ Aspiring to be a cloud engineer just because my last name literally means 'cloud'.",
  },
  {
    school: "Ilocos Norte National High School",
    program: "Special Science Class",
    period: "2017 - 2021",
    details: ["With Honors"],
    memory: "📝 Writing my first HTML and CSS code in Notepad💻.",
  },
]

export default function Education() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: MouseEvent) => {
    mouseX.set(e.clientX + 15)
    mouseY.set(e.clientY + 15)
  }

  return (
    <section id="education" className="pt-12">
      <div className="flex flex-col gap-5 text-sm leading-relaxed">
        <div className="flex flex-col gap-1">
          <h1 className="font-medium">Education</h1>
          <p className="text-muted-foreground">
            My academic background and the path that shaped my foundation in
            science and computing.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          {educationItems.map((item, index) => (
            <motion.div
              key={`${item.school}-${item.program}`}
              className="group relative flex w-full flex-col gap-0.5 rounded-2xl px-4 py-2 text-left transition-colors hover:bg-muted/90"
              whileHover={{ x: 15, scale: 1.02 }}
              whileTap={{ scale: 0.985 }}
              transition={workRowTransition}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onMouseMove={handleMouseMove}
            >
              <div className="flex items-start gap-3">
                <span className="mt-1 font-mono text-xs text-muted-foreground/40 transition-transform select-none group-hover:translate-x-1">
                  +
                </span>
                <div className="flex flex-col gap-0.5">
                  <p className="font-medium text-foreground">{item.school}</p>
                  <p className="text-muted-foreground">{item.program}</p>
                  <p className="text-muted-foreground">{item.period}</p>
                  {item.details.map((detail) => (
                    <p
                      key={detail}
                      className="text-pretty text-muted-foreground/80"
                    >
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Tooltip
        open={hoveredIndex !== null}
        x={mouseX}
        y={mouseY}
        text={hoveredIndex !== null ? educationItems[hoveredIndex].memory : ""}
      />
    </section>
  )
}
