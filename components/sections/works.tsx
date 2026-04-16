"use client"

import { motion } from "motion/react"
import type { WorkItem } from "@/components/work-drawer"
import { workRowTransition } from "@/lib/animations"

type WorkSection = {
  label: string
  items: WorkItem[]
}

const workSections: WorkSection[] = [
  {
    label: "Products",
    items: [
      {
        name: "Widgetly",
        description:
          "A simple, visual link-in-bio page for sharing links, projects, and socials in one place.",
        techStack: ["Next.js", "Tailwind CSS", "Supabase", "motion"],
      },
      {
        name: "Klaude Studio",
        description:
          "An infinity canvas that curates X posts for design inspiration and presents them in a clean, focused experience.",
        techStack: ["React", "Convex", "Tailwind CSS", "Framer Motion"],
      },
      {
        name: "Klaude UI",
        description:
          "A frontend-first UI library for shadcn components, built with motion.",
        techStack: ["React", "shadcn/ui", "motion", "Tailwind CSS"],
        liveUrl: "https://klaude.co",
      },
    ],
  },
  {
    label: "Projects",
    items: [
      {
        name: "Jeiwinfrey",
        description:
          "My personal portfolio website, designed to showcase my work, stack, and background in a clean way.",
        techStack: ["Next.js", "Tailwind CSS", "MDX"],
        githubUrl: "https://github.com/jeiwinfrey/portfolio",
      },
      {
        name: "chatcn-cli",
        description:
          "A CLI tool to scaffold and manage chat UI components built on shadcn.",
        techStack: ["Node.js", "TypeScript", "Commander.js"],
        githubUrl: "https://github.com/jeiwinfrey/chatcn-cli",
        liveUrl: "https://npmjs.com/package/chatcn-cli",
      },
      {
        name: "smooth-div",
        description:
          "An open-source web component for squircle-style corner smoothing, published to npm.",
        liveUrl: "https://smooth-div.vercel.app",
        githubUrl: "https://github.com/jeiwinfrey/smooth-div",
        techStack: ["TypeScript", "Lit", "Web Components"],
      },
    ],
  },
]

function WorkRow({
  item,
  onSelect,
}: {
  item: WorkItem
  onSelect: (item: WorkItem) => void
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(item)}
      className="relative flex w-full cursor-pointer items-center rounded-2xl px-4 py-2 text-left transition-colors outline-none hover:bg-muted/90"
      whileHover={{ x: 15, scale: 1.02 }}
      whileTap={{ scale: 0.985 }}
      transition={workRowTransition}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="relative z-10 leading-snug font-medium">{item.name}</p>
        <p className="relative z-10 leading-snug text-pretty text-muted-foreground">
          {item.description}
        </p>
      </div>
    </motion.button>
  )
}

function WorkSection({
  label,
  items,
  onSelect,
}: WorkSection & {
  onSelect: (item: WorkItem) => void
}) {
  return (
    <section className="flex flex-col gap-0.5">
      <p className="text-md font-medium text-muted-foreground">{label}</p>
      <div className="flex flex-col gap-1">
        {items.map((item) => (
          <WorkRow key={item.name} item={item} onSelect={onSelect} />
        ))}
      </div>
    </section>
  )
}

export default function Works({
  onSelect,
}: {
  onSelect: (item: WorkItem) => void
}) {
  return (
    <div>
      <section id="projects" className="pt-12">
        <div className="flex flex-col gap-5 text-sm leading-relaxed">
          <div className="flex flex-col gap-1">
            <h1 className="font-medium">Works</h1>
            <p className="text-muted-foreground">
              A selection of websites and launched products I&apos;ve built.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {workSections.map((section) => (
              <WorkSection
                key={section.label}
                label={section.label}
                items={section.items}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
