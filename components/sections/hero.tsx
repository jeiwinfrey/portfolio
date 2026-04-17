"use client"

import { IconAnimatePath } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconAnimatePath"
import { IconCode } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconCode"
import { IconCursorClick } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconCursorClick"
import { IconDraw } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconDraw"
import { IconGithub } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconGithub"
import { IconX } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconX"

import { IconWordBurst } from "@/components/icon-word-burst"

export default function Hero() {
  return (
    <section id="home" className="pt-12">
      <div className="flex flex-col gap-5 text-sm leading-relaxed">
        <div className="flex flex-col gap-1">
          <h1 className="font-medium">Hello, I&apos;m Jeiwinfrey!</h1>
          <p className="text-muted-foreground">Frontend Developer</p>
        </div>

        <p className="text-pretty">
          I believe <IconWordBurst icon={IconAnimatePath}>motion</IconWordBurst>{" "}
          is what makes designs feel alive. I like building{" "}
          <IconWordBurst icon={IconCursorClick}>interactions</IconWordBurst> that
          don&apos;t just look good, but feel right when you use them.
        </p>

        <p className="text-pretty">
          I&apos;m a programmer who loves{" "}
          <IconWordBurst icon={IconDraw}>design</IconWordBurst>, and I&apos;m
          learning to build with craft and intent. I study web development, then
          taught myself design by building, iterating, and obsessing over how
          things move. I sometimes share
          snippets on{" "}
          <IconWordBurst
            icon={IconX}
            href="https://x.com/jwinpacis"
            ariaLabel="Open X profile"
            iconClassName="translate-y-[0.14em]"
          >
            X
          </IconWordBurst>
          {" "}
          and keep public work on{" "}
          <IconWordBurst
            icon={IconGithub}
            href="https://github.com/jeiwinfrey"
            ariaLabel="Open GitHub profile"
            iconClassName="translate-y-[0.14em]"
          >
            GitHub
          </IconWordBurst>
          .
        </p>

        <p className="text-pretty">
          I write{" "}
          <IconWordBurst icon={IconCode} iconClassName="translate-y-[0.14em]">
            code
          </IconWordBurst>{" "}
          first – but I bring a designer&apos;s eye to every project I touch.
        </p>
      </div>
    </section>
  )
}
