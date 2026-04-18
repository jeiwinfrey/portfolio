"use client"

import { useId, useState } from "react"
import { motion, useReducedMotion } from "motion/react"

import { IconAt } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconAt"
import { IconChevronDownMedium } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconChevronDownMedium"
import { IconChevronRightMedium } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconChevronRightMedium"
import { IconImages1 } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconImages1"
import { IconInfinity } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconInfinity"
import { IconSend } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconSend"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const focusRing =
  "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"

/** Tile surface: border matches fill so edges don’t read as a harsh outline. */
const toolbarTile =
  "border border-muted/35 bg-muted/35 text-muted-foreground transition-colors hover:bg-muted/50"

function pressProps(reduceMotion: boolean) {
  if (reduceMotion) return {}
  return {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.96 },
  } as const
}

export function AiCommandBarDemo() {
  const reduceMotion = useReducedMotion()
  const reduce = !!reduceMotion
  const fieldId = useId()
  const [draft, setDraft] = useState("")
  const [generationMode, setGenerationMode] = useState("standard")
  const [model, setModel] = useState("opus-4.5")

  const press = pressProps(reduce)

  return (
    <div className="w-full">
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: reduce ? 0 : 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="relative flex w-full flex-col">
          <div className="relative z-0 w-full translate-y-5">
            <div className="w-full origin-bottom scale-[0.92] opacity-90">
              <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-muted/60">
                <div className="flex w-full shrink-0 items-center justify-between gap-1.5 px-3 pt-1.5 pb-1.5">
                  <div className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
                    <IconChevronRightMedium
                      size={18}
                      className="shrink-0 opacity-80"
                      ariaHidden
                    />
                    <span className="truncate">1 File</span>
                  </div>
                  <button
                    type="button"
                    className={cn(
                      "shrink-0 rounded-md border border-muted/60 bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground",
                      focusRing
                    )}
                  >
                    Review
                  </button>
                </div>
                <div
                  className="min-h-[7.5rem] w-full shrink-0 bg-muted/35"
                  aria-hidden
                />
              </div>
            </div>
          </div>

          <div className="relative z-10 -mt-[5.75rem] rounded-2xl border border-border bg-background p-3">
            <label htmlFor={fieldId} className="sr-only">
              Command input
            </label>
            <textarea
              id={fieldId}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={2}
              placeholder="Plan, @ for context, / for commands"
              className="max-h-28 min-h-[3.5rem] w-full resize-none bg-transparent text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground"
            />

            <div
              className="mt-3"
              role="toolbar"
              aria-label="Composer actions"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <motion.button
                        type="button"
                        aria-label="Generation mode"
                        className={cn(
                          "inline-flex h-8 shrink-0 items-center gap-1 rounded-xl px-2.5 text-xs font-medium",
                          toolbarTile,
                          focusRing
                        )}
                        {...press}
                      >
                        <IconInfinity size={16} className="shrink-0" ariaHidden />
                        <IconChevronDownMedium
                          size={14}
                          className="shrink-0 opacity-70"
                          ariaHidden
                        />
                      </motion.button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="min-w-40">
                      <DropdownMenuLabel>Generation</DropdownMenuLabel>
                      <DropdownMenuRadioGroup
                        value={generationMode}
                        onValueChange={setGenerationMode}
                      >
                        <DropdownMenuRadioItem value="standard">
                          Standard
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="extended">
                          Extended context
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="fast">
                          Fast replies
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <motion.button
                        type="button"
                        aria-label="Choose model"
                        className={cn(
                          "inline-flex h-8 max-w-[12rem] min-w-0 items-center gap-1 rounded-xl px-2.5 text-left text-xs font-medium sm:max-w-none",
                          toolbarTile,
                          focusRing
                        )}
                        {...press}
                      >
                        <span className="truncate">
                          {model === "opus-4.5"
                            ? "Opus 4.5"
                            : model === "sonnet-4"
                              ? "Sonnet 4"
                              : "Haiku 3.5"}
                        </span>
                        <IconChevronDownMedium
                          size={14}
                          className="shrink-0 opacity-70"
                          ariaHidden
                        />
                      </motion.button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="min-w-44">
                      <DropdownMenuLabel>Model</DropdownMenuLabel>
                      <DropdownMenuRadioGroup
                        value={model}
                        onValueChange={setModel}
                      >
                        <DropdownMenuRadioItem value="opus-4.5">
                          Opus 4.5
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="sonnet-4">
                          Sonnet 4
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="haiku-3.5">
                          Haiku 3.5
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-2">
                  <motion.button
                    type="button"
                    aria-label="Add context"
                    className={cn(
                      "flex size-8 items-center justify-center rounded-xl",
                      toolbarTile,
                      focusRing
                    )}
                    {...press}
                  >
                    <IconAt size={16} className="shrink-0" ariaHidden />
                  </motion.button>
                  <motion.button
                    type="button"
                    aria-label="Attach image"
                    className={cn(
                      "flex size-8 items-center justify-center rounded-xl",
                      toolbarTile,
                      focusRing
                    )}
                    {...press}
                  >
                    <IconImages1 size={16} className="shrink-0" ariaHidden />
                  </motion.button>
                  <motion.button
                    type="button"
                    aria-label="Send"
                    className={cn(
                      "inline-flex size-9 shrink-0 items-center justify-center rounded-xl",
                      toolbarTile,
                      focusRing
                    )}
                    {...press}
                  >
                    <IconSend size={17} className="shrink-0" ariaHidden />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
