import type { ReactNode } from "react"

type MotionShowcaseProps = {
  title: string
  description: string
  children: ReactNode
}

export function MotionShowcase({
  title,
  description,
  children,
}: MotionShowcaseProps) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="font-medium">{title}</h2>
        <p className="text-pretty text-muted-foreground">{description}</p>
      </div>

      <div className="flex min-h-[12rem] items-center justify-center rounded-3xl border border-border bg-muted/50 p-8 sm:p-10">
        <div className="w-full">{children}</div>
      </div>
    </section>
  )
}
