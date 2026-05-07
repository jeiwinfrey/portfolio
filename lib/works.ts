export const workAssetBaseUrl = "https://gallery.jeiwinfrey.com"

export type WorkItem = {
  slug: string
  name: string
  description: string
  asset: string
}

export const works: WorkItem[] = [
  {
    slug: "widgetly",
    name: "Widgetly",
    description:
      "A simple, visual link-in-bio page for sharing links, projects, and socials in one place.",
    asset: "widgets.mp4",
  },
  {
    slug: "klaude-studio",
    name: "Klaude Studio",
    description:
      "An infinity canvas that curates X posts for design inspiration and presents them in a clean, focused experience.",
    asset: "klaude.studio.mp4",
  },
  {
    slug: "klaude-ui",
    name: "Klaude UI",
    description:
      "A frontend-first UI library for shadcn components, built with motion.",
    asset: "drawer.mp4",
  },
  {
    slug: "jeiwinfrey",
    name: "Jeiwinfrey",
    description:
      "My personal portfolio website, designed to showcase my work, stack, and background in a clean way.",
    asset: "nav.mp4",
  },
  {
    slug: "chatcn-cli",
    name: "chatcn-cli",
    description:
      "A CLI tool to scaffold and manage chat UI components built on shadcn.",
    asset: "chatcn-1.mp4",
  },
  {
    slug: "smooth-div",
    name: "smooth-div",
    description:
      "An open-source web component for squircle-style corner smoothing, published to npm.",
    asset: "pop.mp4",
  },
]

export function getWorkBySlug(slug: string) {
  return works.find((work) => work.slug === slug)
}
