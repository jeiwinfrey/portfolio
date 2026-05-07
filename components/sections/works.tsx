"use client"

import Link from "next/link"
import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { springTransition } from "@/lib/animations"
import { works, workAssetBaseUrl, type WorkItem } from "@/lib/works"

function WorkRow({
  item,
  onHoverStart,
  onHoverEnd,
  onPointerMove,
}: {
  item: WorkItem
  onHoverStart: (item: WorkItem) => void
  onHoverEnd: () => void
  onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void
}) {
  return (
    <motion.div
      className="border-b border-border/50 py-4 last:border-b-0"
      whileHover={{ x: 8 }}
      transition={springTransition}
      onHoverStart={() => onHoverStart(item)}
      onHoverEnd={onHoverEnd}
      onPointerMove={onPointerMove}
    >
      <Link
        href={`/works/${item.slug}`}
        className="flex flex-col gap-1 outline-none"
        aria-label={`Open ${item.name}`}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="leading-snug font-medium">{item.name}</p>
          <p className="leading-snug text-pretty text-muted-foreground">
            {item.description}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

export default function Works() {
  const [activeItem, setActiveItem] = useState<WorkItem | null>(null)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  const previewIsVideo = activeItem
    ? activeItem.asset.endsWith(".mp4") ||
      activeItem.asset.endsWith(".webm") ||
      activeItem.asset.endsWith(".mov")
    : false

  return (
    <div>
      <section id="projects" className="pt-12">
        <div className="flex flex-col gap-5 text-sm leading-relaxed">
          <div className="flex flex-col gap-1">
            <h1 className="font-medium">Works</h1>
            <p className="text-muted-foreground">
              A selection of websites and launched products I&apos;ve built.
            </p>
          </div>

          <div className="relative">
            <AnimatePresence>
              {activeItem ? (
                <motion.div
                  key={activeItem.slug}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="pointer-events-none fixed left-0 top-0 z-50 hidden w-[min(26rem,42vw)] rounded-[32px] border border-border/60 bg-muted/60 p-1 shadow-[0_24px_80px_rgba(0,0,0,0.12)] backdrop-blur-sm md:block"
                  style={{
                    x: cursorPosition.x + 20,
                    y: cursorPosition.y - 260,
                  }}
                >
                  <div className="overflow-hidden rounded-[28px] border border-border/50 bg-background/90">
                    {previewIsVideo ? (
                      <video
                        className="block h-auto w-full"
                        src={`${workAssetBaseUrl}/${activeItem.asset}`}
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls={false}
                        preload="metadata"
                      />
                    ) : (
                      <img
                        className="block h-auto w-full"
                        src={`${workAssetBaseUrl}/${activeItem.asset}`}
                        alt={activeItem.name}
                      />
                    )}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="flex flex-col">
            {works.map((item) => (
              <WorkRow
                key={item.slug}
                item={item}
                onHoverStart={setActiveItem}
                onHoverEnd={() => setActiveItem(null)}
                onPointerMove={(event) =>
                  setCursorPosition({
                    x: event.clientX,
                    y: event.clientY,
                  })
                }
              />
            ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
