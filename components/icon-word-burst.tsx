"use client"

import type { FC, SVGProps } from "react"
import { useRef, useState } from "react"
import { motion, useReducedMotion } from "motion/react"

import { workRowTransition } from "@/lib/animations"
import { cn } from "@/lib/utils"

export type IconWordBurstIcon = FC<
  SVGProps<SVGSVGElement> & {
    size?: string | number
    ariaHidden?: boolean
  }
>

/** `block` avoids inline-SVG baseline strut so icons sit with prose like the stroke icons. */
const iconBase = "block size-[1.05em] shrink-0 text-muted-foreground"

/** Native emoji only — random picks on each hover */
const EMOJI_POOL = [
  "✨",
  "💥",
  "⭐",
  "🔥",
  "💫",
  "🎉",
  "⚡",
  "💖",
  "🌟",
  "🌀",
  "🎊",
  "👏",
  "🙌",
  "✅",
  "🫧",
  "💯",
  "🔮",
  "🦄",
  "🌈",
  "☄️",
  "🍀",
  "🦋",
  "🎈",
  "🎁",
  "🏆",
  "💡",
  "🚀",
  "🛸",
  "🌙",
  "☀️",
  "🌊",
  "🔔",
  "💕",
  "💛",
  "💚",
  "💙",
  "💜",
  "🤍",
  "🎵",
  "🫶",
  "👀",
  "🦾",
  "📎",
  "🧨",
  "🍕",
  "🧁",
  "🍩",
  "🥤",
  "🐙",
  "🦊",
  "🐝",
  "🌸",
  "🌺",
  "🌴",
  "⛅",
  "🌤️",
  "❄️",
  "💨",
  "🫠",
  "🥳",
  "😮",
  "🤩",
  "🤯",
  "💪",
  "✊",
  "🎯",
  "🧩",
  "🔑",
  "🧲",
  "📣",
  "🎬",
  "🖌️",
  "✏️",
  "📌",
  "🗯️",
] as const

type BurstSpec = {
  emoji: string
  x: number
  y: number
  rotate: number
  delay: number
}

/**
 * Each hover: random placement (spread, height, slide, slight tilt) with a
 * gentle arc only — arcDepth kept small so it never reads too “bent”.
 */
function randomTopBurst(): BurstSpec[] {
  const count = Math.random() < 0.5 ? 5 : 6
  const picks: BurstSpec[] = []

  const halfSpread = 26 + Math.random() * 16
  const baseY = -(17 + Math.random() * 10)
  const arcDepth = 2.5 + Math.random() * 3.5

  const tiltDeg = Math.random() * 24 - 12
  const tiltRad = (tiltDeg * Math.PI) / 180
  const cosT = Math.cos(tiltRad)
  const sinT = Math.sin(tiltRad)
  const slideX = Math.random() * 22 - 11
  const slideY = Math.random() * 10 - 5

  for (let i = 0; i < count; i += 1) {
    const t = i / (count - 1)
    const x = -halfSpread + t * (2 * halfSpread) + (Math.random() * 5 - 2.5)
    const arc = arcDepth * 4 * t * (1 - t)
    const y = baseY - arc + (Math.random() * 2.5 - 1.25)

    const xr = x * cosT - y * sinT + slideX
    const yr = x * sinT + y * cosT + slideY

    picks.push({
      emoji: EMOJI_POOL[Math.floor(Math.random() * EMOJI_POOL.length)]!,
      x: xr,
      y: yr,
      rotate: Math.random() * 36 - 18,
      delay: i * 0.024 + Math.random() * 0.04,
    })
  }
  return picks
}

const burstMotion = { type: "tween" as const }

type IconWordBurstBase = {
  icon: IconWordBurstIcon
  children: string
  /** Optical nudge for SVGs that sit high vs x-height (e.g. code icons) */
  iconClassName?: string
  className?: string
}

export type IconWordBurstProps =
  | (IconWordBurstBase & { href?: undefined })
  | (IconWordBurstBase & { href: string; ariaLabel: string })

export function IconWordBurst({
  icon: Icon,
  children,
  iconClassName,
  className,
  ...rest
}: IconWordBurstProps) {
  const reduceMotion = useReducedMotion()
  const [hovered, setHovered] = useState(false)
  const [burst, setBurst] = useState<BurstSpec[]>([])
  const burstGen = useRef(0)

  const href = typeof rest.href === "string" ? rest.href : undefined

  const motionInteractive = {
    onMouseEnter: () => {
      if (reduceMotion) return
      burstGen.current += 1
      setBurst(randomTopBurst())
      setHovered(true)
    },
    onMouseLeave: () => {
      setHovered(false)
    },
    ...(!reduceMotion && {
      whileHover: { scale: 1.04, y: -1 },
      whileTap: { scale: 0.97 },
      transition: workRowTransition,
    }),
  }

  const shellClassName = cn(
    "group/iconword relative isolate z-0 -mx-0.5 inline-flex items-baseline overflow-visible whitespace-nowrap rounded-md px-0.5 py-px align-baseline font-inherit text-inherit leading-inherit transition-colors",
    "hover:bg-muted/50",
    href
      ? "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      : "cursor-default",
    className
  )

  const inner = (
    <>
      <span className="relative z-30 inline-flex items-baseline gap-[0.2em] leading-inherit">
        <Icon
          className={cn(
            iconBase,
            "origin-[55%_85%] transition duration-200 ease-out",
            "group-hover/iconword:-rotate-6 group-hover/iconword:scale-110 group-hover/iconword:text-foreground",
            iconClassName
          )}
          aria-hidden
        />
        <span className="transition duration-200 ease-out group-hover/iconword:text-foreground">
          {children}
        </span>
      </span>

      {!reduceMotion ? (
        <span
          className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-0 w-0 -translate-y-[0.25em]"
          aria-hidden
        >
          {burst.map((b, i) => (
            <motion.span
              key={`${burstGen.current}-${i}`}
              className="absolute left-0 top-0 block text-[12px] leading-none select-none sm:text-[13px]"
              initial={{
                opacity: 0,
                scale: 0.35,
                x: 0,
                y: 5,
                rotate: 0,
              }}
              animate={
                hovered
                  ? {
                      opacity: 1,
                      scale: 1,
                      x: b.x,
                      y: b.y,
                      rotate: b.rotate,
                    }
                  : {
                      opacity: 0,
                      scale: 0.35,
                      x: 0,
                      y: 6,
                      rotate: 0,
                    }
              }
              transition={{
                ...burstMotion,
                delay: b.delay,
                duration: hovered ? 0.2 : 0.15,
                ease: hovered
                  ? ([0.22, 1, 0.36, 1] as const)
                  : ([0.4, 0, 1, 1] as const),
              }}
            >
              {b.emoji}
            </motion.span>
          ))}
        </span>
      ) : null}
    </>
  )

  if (typeof rest.href === "string") {
    return (
      <motion.a
        href={rest.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={rest.ariaLabel}
        className={shellClassName}
        {...motionInteractive}
      >
        {inner}
      </motion.a>
    )
  }

  return (
    <motion.span className={shellClassName} {...motionInteractive}>
      {inner}
    </motion.span>
  )
}
