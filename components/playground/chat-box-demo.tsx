"use client"

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import type { KeyboardEvent } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { IconCrossMedium } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconCrossMedium"
import { IconImages1 } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconImages1"
import { IconSend } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconSend"

import { cn } from "@/lib/utils"

const AI_NAME = "Jeiwinfrey"

function pressProps(reduceMotion: boolean) {
  if (reduceMotion) return {}
  return {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.96 },
  } as const
}

type Role = "user" | "assistant"

type ChatLine = { id: string; role: Role; content: string }

const INITIAL_MESSAGES: ChatLine[] = [
  {
    id: "m0",
    role: "assistant",
    content: "Short demo thread—same muted surfaces as the composer, no inner rules.",
  },
  {
    id: "m1",
    role: "user",
    content: "Got it.",
  },
]

const SCRIPTED_REPLIES = [
  "Still static copy from a tiny array.",
  "No network—swap the handler when you wire a backend.",
]

function nextId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

/** Visible “thinking” delay before the assistant bubble appears (typing indicator fills this gap). */
const TYPING_MS = { reduced: 500, full: 1650 } as const

function TypingIndicator({ reduce }: { reduce: boolean }) {
  return (
    <div className="flex w-full justify-start">
      <div
        className="flex items-center gap-1.5 rounded-2xl bg-muted px-3 py-2.5"
        aria-hidden
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="size-1.5 rounded-full bg-muted-foreground/55"
            animate={
              reduce
                ? undefined
                : { opacity: [0.28, 1, 0.28], scale: [0.92, 1, 0.92] }
            }
            transition={
              reduce
                ? undefined
                : {
                    duration: 0.85,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.14,
                  }
            }
          />
        ))}
      </div>
      <span className="sr-only">Assistant is typing</span>
    </div>
  )
}

export function ChatBoxDemo() {
  const reduceMotion = useReducedMotion()
  const reduce = !!reduceMotion
  const fieldId = useId()
  const [messages, setMessages] = useState<ChatLine[]>(INITIAL_MESSAGES)
  const [draft, setDraft] = useState("")
  const [busy, setBusy] = useState(false)
  const replyIx = useRef(0)
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const scrollMessagesRef = useRef<HTMLDivElement>(null)
  const press = pressProps(reduce)

  useEffect(() => {
    return () => {
      if (replyTimer.current) clearTimeout(replyTimer.current)
    }
  }, [])

  useLayoutEffect(() => {
    const el = scrollMessagesRef.current
    if (!el) return
    el.scrollTo({
      top: el.scrollHeight,
      behavior: reduce ? "auto" : "smooth",
    })
  }, [messages, busy, reduce])

  const send = useCallback(() => {
    const text = draft.trim()
    if (!text || busy) return
    setDraft("")
    setBusy(true)
    setMessages((m) => [...m, { id: nextId(), role: "user", content: text }])

    const delay = reduce ? TYPING_MS.reduced : TYPING_MS.full
    if (replyTimer.current) clearTimeout(replyTimer.current)
    replyTimer.current = setTimeout(() => {
      const reply =
        SCRIPTED_REPLIES[replyIx.current % SCRIPTED_REPLIES.length] ?? ""
      replyIx.current += 1
      setMessages((m) => [
        ...m,
        { id: nextId(), role: "assistant", content: reply },
      ])
      setBusy(false)
      replyTimer.current = null
    }, delay)
  }, [busy, draft, reduce])

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <motion.div
      className="mx-auto flex w-full max-w-md flex-col gap-2"
      initial={{ opacity: 0, y: reduce ? 0 : 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="flex w-full items-center justify-between gap-2 rounded-full bg-background px-2 py-2">
        <span className="inline-flex h-9 min-w-0 max-w-[min(100%,14rem)] items-center rounded-full border border-muted/35 bg-muted/35 px-3 text-sm font-semibold tracking-tight text-foreground">
          <span className="truncate text-">{AI_NAME}</span>
        </span>
        <motion.button
          type="button"
          aria-label="Close"
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-muted/35 bg-muted/35 text-muted-foreground transition-colors hover:bg-muted/50 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
          {...press}
        >
          <IconCrossMedium size={16} className="shrink-0" ariaHidden />
        </motion.button>
      </div>

      <div className="flex h-[34rem] flex-col gap-3 overflow-hidden rounded-2xl bg-background p-4">
        <div
          ref={scrollMessagesRef}
          className="min-h-0 flex-1 space-y-3 overflow-y-auto overflow-x-hidden overscroll-y-contain"
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          aria-busy={busy}
        >
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: reduce ? 0 : 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.16, ease: "easeOut" }}
                className={cn(
                  "flex w-full",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[90%] rounded-2xl px-3 py-2.5 text-sm leading-relaxed text-pretty",
                    msg.role === "user"
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-foreground"
                  )}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <AnimatePresence>
            {busy ? (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: reduce ? 0 : 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -2 }}
                transition={{ duration: reduce ? 0 : 0.14, ease: "easeOut" }}
              >
                <TypingIndicator reduce={reduce} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <label htmlFor={fieldId} className="sr-only">
            Message
          </label>
          <div className="flex h-9 min-w-0 flex-1 items-center rounded-xl bg-muted px-3 transition-colors focus-within:bg-muted/80 focus-within:ring-2 focus-within:ring-ring/25 focus-within:ring-offset-2 focus-within:ring-offset-background">
            <textarea
              id={fieldId}
              rows={1}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onKeyDown}
              disabled={busy}
              placeholder="Write a message…"
              className="h-9 min-h-9 max-h-9 w-full min-w-0 resize-none overflow-y-hidden bg-transparent py-0 text-sm leading-9 text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <motion.button
              type="button"
              aria-label="Attach image"
              className="flex size-9 items-center justify-center rounded-xl border border-muted/35 bg-muted/35 text-muted-foreground transition-colors hover:bg-muted/50 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
              {...press}
            >
              <IconImages1 size={16} className="shrink-0" ariaHidden />
            </motion.button>
            <motion.button
              type="button"
              aria-label="Send"
              disabled={busy || !draft.trim()}
              onClick={send}
              className="flex size-9 items-center justify-center rounded-xl border border-muted/35 bg-muted/35 text-muted-foreground transition-colors hover:bg-muted/50 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
              {...press}
            >
              <IconSend size={17} className="shrink-0" ariaHidden />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
