"use client"

import { createPortal } from "react-dom"
import type { MotionValue } from "motion/react"
import { motion, useTransform } from "motion/react"
export type WorkItem = {
  name: string
  description: string
  liveUrl?: string
  githubUrl?: string
  techStack?: string[]
}

import { ChatcnCliMiniBlog } from "@/components/work-mini-blog/chatcn-cli-mini-blog"
import { JeiwinfreyMiniBlog } from "@/components/work-mini-blog/jeiwinfrey-mini-blog"
import { KlaudeStudioMiniBlog } from "@/components/work-mini-blog/klaude-studio-mini-blog"
import { KlaudeUiMiniBlog } from "@/components/work-mini-blog/klaude-ui-mini-blog"
import { SmoothDivMiniBlog } from "@/components/work-mini-blog/smooth-div-mini-blog"
import { WidgetlyMiniBlog } from "@/components/work-mini-blog/widgetly-mini-blog"

function renderDialog(item: WorkItem) {
  switch (item.name) {
    case "Widgetly":
      return <WidgetlyMiniBlog item={item} />
    case "Klaude Studio":
      return <KlaudeStudioMiniBlog item={item} />
    case "Klaude UI":
      return <KlaudeUiMiniBlog item={item} />
    case "Jeiwinfrey":
      return <JeiwinfreyMiniBlog item={item} />
    case "chatcn-cli":
      return <ChatcnCliMiniBlog item={item} />
    case "smooth-div":
      return <SmoothDivMiniBlog item={item} />
    default:
      return (
        <div className="space-y-6">
          <h2 className="text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            {item.name}
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
            {item.description}
          </p>
        </div>
      )
  }
}

export function WorkDrawer({
  item,
  onClose,
  progress,
}: {
  item: WorkItem
  onClose: () => void
  progress: MotionValue<number>
}) {
  const portalRoot = typeof document === "undefined" ? null : document.body
  const sheetHeight =
    typeof window !== "undefined" ? window.innerHeight * 0.95 : 0
  const backdropOpacity = useTransform(progress, [0, 1], [0, 0.4])
  const backdropBlur = useTransform(progress, [0, 1], ["0px", "8px"])

  if (!portalRoot) {
    return null
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex flex-col justify-end focus:outline-none">
      <motion.div
        style={{
          opacity: backdropOpacity,
          backdropFilter: backdropBlur,
          WebkitBackdropFilter: backdropBlur,
        }}
        className="absolute inset-0 bg-black"
        onClick={onClose}
      />

      <motion.div
        initial={{ y: sheetHeight }}
        animate={{ y: 0 }}
        exit={{ y: sheetHeight }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: sheetHeight }}
        dragElastic={0.05}
        onUpdate={({ y }) => {
          const currentY = typeof y === "number" ? y : Number.parseFloat(`${y}`)

          if (!sheetHeight || Number.isNaN(currentY)) {
            return
          }

          progress.set(Math.max(0, Math.min(1, 1 - currentY / sheetHeight)))
        }}
        onDragEnd={(e, info) => {
          if (info.offset.y > 100 || info.velocity.y > 500) {
            onClose()
          }
        }}
        className="relative z-10 mx-auto flex h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-4xl rounded-b-none bg-background"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full cursor-grab justify-center pt-2 active:cursor-grabbing">
          <div className="h-1.5 w-20 shrink-0 rounded-full bg-muted-foreground/25" />
        </div>

        <div className="flex h-full w-full flex-col overflow-y-auto outline-none">
          <div className="mx-auto flex w-full max-w-6xl flex-col p-6 pt-6 sm:p-10 sm:pt-10 lg:p-12 lg:pt-12">
            {renderDialog(item)}
          </div>
        </div>
      </motion.div>
    </div>,
    portalRoot
  )
}
