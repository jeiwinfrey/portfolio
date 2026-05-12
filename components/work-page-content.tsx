"use client"

import { IconGithub } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconGithub"
import { IconSquareArrowOutTopLeft } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconSquareArrowOutTopLeft"
import { isVideoAsset, workAssetBaseUrl, type WorkItem } from "@/lib/works"
import { ContentMotionWrapper } from "@/components/content-motion-wrapper"

const buttonBase =
  "inline-flex h-8 items-center gap-2 rounded-full border border-muted/35 bg-muted/35 px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted/50 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"

export default function WorkPageContent({ item }: { item: WorkItem }) {
  const mediaSrc = `${item.assetBaseUrl ?? workAssetBaseUrl}/${item.asset}`
  const mediaIsVideo = isVideoAsset(item.asset)

  return (
    <div className="mx-auto max-w-2xl px-4 pt-12 sm:px-6 lg:px-8">
      <article className="flex flex-col gap-6 text-sm leading-relaxed">
        <ContentMotionWrapper>
          <div className="flex flex-col gap-1">
            <h1 className="font-medium">{item.name}</h1>
            <p className="text-muted-foreground">{item.description}</p>
          </div>

          {(item.liveUrl || item.githubUrl) && (
            <div className="flex flex-wrap items-center gap-2">
              {item.liveUrl ? (
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonBase}
                >
                  <IconSquareArrowOutTopLeft size={14} className="shrink-0" />
                  Live
                </a>
              ) : null}
              {item.githubUrl ? (
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonBase}
                >
                  <IconGithub size={14} className="shrink-0" />
                  GitHub
                </a>
              ) : null}
            </div>
          )}

          {item.techStack && item.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border/60 bg-muted/25 px-2.5 py-0.5 text-xs text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 overflow-hidden rounded-[28px] border border-border/50 bg-muted/20">
            {mediaIsVideo ? (
              <video
                className="block h-auto w-full"
                src={mediaSrc}
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
                src={mediaSrc}
                alt={item.name}
              />
            )}
          </div>
        </ContentMotionWrapper>
      </article>
    </div>
  )
}
