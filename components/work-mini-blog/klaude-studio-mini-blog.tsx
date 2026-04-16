import type { WorkItem } from "../work-drawer"

export function KlaudeStudioMiniBlog({ item }: { item: WorkItem }) {
  return (
    <div className="space-y-4">
      <h2 className="text-4xl font-medium tracking-tight sm:text-5xl">
        {item.name}
      </h2>
      <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
        {item.description}
      </p>
    </div>
  )
}
