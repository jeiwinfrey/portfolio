"use client"

import { useEffect, useId, useRef, useState } from "react"
import { IconEmail1 } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconEmail1"
import { IconLinkedin } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconLinkedin"
import { IconCall } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconCall"
import { IconX } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconX"
import { motion, useReducedMotion } from "motion/react"

import type { IconWordBurstIcon } from "@/components/icon-word-burst"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { workRowTransition } from "@/lib/animations"

type ContactItem = {
  id: string
  label: string
  href: string
  external?: boolean
  copyValue?: string
  icon: IconWordBurstIcon
  /** Optical nudge for SVGs that sit high vs x-height (same as IconWordBurst / hero) */
  iconClassName?: string
}

const linkAriaLabel: Record<string, string> = {
  email: "Email options",
  linkedin: "Open LinkedIn profile",
  x: "Open X profile",
  phone: "Phone options",
}

const contactItems: ContactItem[] = [
  {
    id: "email",
    label: "Email",
    href: "mailto:hello@jeiwinfrey.com",
    copyValue: "hello@jeiwinfrey.com",
    icon: IconEmail1,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jeiwinfrey-ulep",
    external: true,
    icon: IconLinkedin,
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com/jwinpacis",
    external: true,
    icon: IconX,
  },
  {
    id: "phone",
    label: "Phone",
    href: "tel:+639562267208",
    copyValue: "+639562267208",
    icon: IconCall,
  },
]

/** Shared chip styles; underline lives on `<a>` or on the label span for menu triggers (see below). */
const contactLinkSurface =
  "rounded-sm font-inherit text-inherit font-medium leading-inherit text-foreground underline decoration-muted-foreground/50 underline-offset-4 outline-none transition-colors hover:decoration-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 align-baseline"

/** `<button>` triggers (Radix) often do not paint underline like anchors; decorate the text span instead. */
const contactLinkSurfaceTrigger =
  "rounded-sm font-inherit text-inherit font-medium leading-inherit text-foreground outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 align-baseline"

const contactLinkLabelUnderline =
  "underline decoration-muted-foreground/50 underline-offset-4 decoration-from-font group-hover/contact:decoration-foreground group-focus-visible/contact:decoration-foreground"

/** Same inner row as IconWordBurst: baseline + em-sized icon gap. */
const contactRowInner =
  "relative z-30 inline-flex items-baseline gap-[0.2em] leading-inherit"

function contactIconClass(extra?: string) {
  return cn(
    "block size-[1.05em] shrink-0 text-muted-foreground",
    "translate-y-[0.14em]",
    "origin-[55%_85%] transition duration-200 ease-out",
    "group-hover/contact:-rotate-6 group-hover/contact:scale-110 group-hover/contact:text-foreground",
    extra
  )
}

function sentenceSeparator(index: number, total: number) {
  if (index === 0) return null
  if (index === total - 1) {
    return (
      <span className="text-muted-foreground" aria-hidden>
        , and{" "}
      </span>
    )
  }
  return (
    <span className="text-muted-foreground" aria-hidden>
      ,{" "}
    </span>
  )
}

export default function Contact() {
  const reduceMotion = useReducedMotion()
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const statusId = useId()

  useEffect(() => {
    if (!copiedId) return
    if (clearTimer.current) clearTimeout(clearTimer.current)
    clearTimer.current = setTimeout(() => setCopiedId(null), 2000)
    return () => {
      if (clearTimer.current) clearTimeout(clearTimer.current)
    }
  }, [copiedId])

  const linkMotion = reduceMotion
    ? {}
    : { whileHover: { y: -1 }, whileTap: { scale: 0.98 } }

  const copiedItem = copiedId
    ? contactItems.find((c) => c.id === copiedId)
    : null
  const statusMessage =
    copiedItem && copiedItem.copyValue ? "Copied to clipboard" : ""

  const n = contactItems.length

  return (
    <section id="contact" className="pt-12 pb-12">
      <p id={statusId} className="sr-only" aria-live="polite">
        {statusMessage}
      </p>

      <div className="flex flex-col gap-5 text-sm leading-relaxed">
        <div className="flex flex-col gap-1">
          <h1 className="font-medium">Contact</h1>
          <p className="text-muted-foreground">
            Reach out for collaborations, questions, or just to say hello.
          </p>
        </div>

        <p className="text-pretty leading-relaxed">
          {contactItems.map((item, index) => {
            const Icon = item.icon

            if (item.copyValue) {
              const isEmail = item.id === "email"
              return (
                <span key={item.id} className="inline">
                  {sentenceSeparator(index, n)}
                  <DropdownMenu>
                    <motion.span
                      className="inline-flex"
                      transition={workRowTransition}
                      {...linkMotion}
                    >
                      <DropdownMenuTrigger
                        className={cn(
                          "group/contact cursor-pointer border-0 bg-transparent p-0",
                          contactLinkSurfaceTrigger
                        )}
                        aria-label={linkAriaLabel[item.id] ?? item.label}
                      >
                        <span className={contactRowInner}>
                          <Icon
                            className={contactIconClass(item.iconClassName)}
                            aria-hidden
                          />
                          <span
                            className={cn(
                              "transition duration-200 ease-out group-hover/contact:text-foreground",
                              contactLinkLabelUnderline
                            )}
                          >
                            {item.label}
                          </span>
                        </span>
                      </DropdownMenuTrigger>
                    </motion.span>
                    <DropdownMenuContent align="start" className="min-w-48 max-w-xs">
                      <DropdownMenuLabel className="cursor-default select-text break-all font-mono text-[11px] leading-snug font-normal text-muted-foreground">
                        {item.copyValue}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <a href={item.href}>{isEmail ? "Open in mail" : "Call"}</a>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => {
                          void (async () => {
                            try {
                              await navigator.clipboard.writeText(
                                item.copyValue!
                              )
                              setCopiedId(item.id)
                            } catch {
                              setCopiedId(null)
                            }
                          })()
                        }}
                      >
                        {isEmail ? "Copy email" : "Copy number"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </span>
              )
            }

            return (
              <span key={item.id} className="inline">
                {sentenceSeparator(index, n)}
                <motion.span
                  className="inline-flex"
                  transition={workRowTransition}
                  {...linkMotion}
                >
                  <a
                    href={item.href}
                    aria-label={linkAriaLabel[item.id] ?? item.label}
                    {...(item.external
                      ? {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }
                      : {})}
                    className={cn(
                      "group/contact inline-flex",
                      contactLinkSurface
                    )}
                  >
                    <span className={contactRowInner}>
                      <Icon
                        className={contactIconClass(item.iconClassName)}
                        aria-hidden
                      />
                      <span className="transition duration-200 ease-out group-hover/contact:text-foreground">
                        {item.label}
                      </span>
                    </span>
                  </a>
                </motion.span>
              </span>
            )
          })}
          <span className="text-muted-foreground" aria-hidden>
            .
          </span>
        </p>
      </div>
    </section>
  )
}
