"use client"

import { IconAnimatePath } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconAnimatePath"
import { IconCursorClick } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconCursorClick"

import { IconWordBurst } from "@/components/icon-word-burst"

export function IconBurstDemo() {
  return (
    <p className="text-pretty">
      Hover the word with an icon. I believe{" "}
      <IconWordBurst icon={IconAnimatePath}>motion</IconWordBurst> is what
      makes designs feel alive.
    </p>
  )
}
