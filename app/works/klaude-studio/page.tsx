import type { Metadata } from "next"
import { workAssetBaseUrl } from "@/lib/works"

export const metadata: Metadata = {
  title: "Klaude Studio",
  description:
    "An infinity canvas that curates X posts for design inspiration and presents them in a clean, focused experience.",
}

export default function KlaudeStudioPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <article className="flex flex-col gap-6">
        <div className="overflow-hidden rounded-3xl border border-border/50 bg-muted/20">
          <video
            className="block h-auto w-full"
            src={`${workAssetBaseUrl}/klaude.studio.mp4`}
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            preload="metadata"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
            Klaude Studio
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            An infinity canvas that curates X posts for design inspiration and
            presents them in a clean, focused experience.
          </p>
        </div>
      </article>
    </div>
  )
}
