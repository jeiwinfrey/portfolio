import type { Metadata } from "next"
import { workAssetBaseUrl } from "@/lib/works"

export const metadata: Metadata = {
  title: "Jeiwinfrey",
  description:
    "My personal portfolio website, designed to showcase my work, stack, and background in a clean way.",
}

export default function JeiwinfreyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <article className="flex flex-col gap-6">
        <div className="overflow-hidden rounded-3xl border border-border/50 bg-muted/20">
          <video
            className="block h-auto w-full"
            src={`${workAssetBaseUrl}/nav.mp4`}
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
            Jeiwinfrey
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            My personal portfolio website, designed to showcase my work, stack,
            and background in a clean way.
          </p>
        </div>
      </article>
    </div>
  )
}
