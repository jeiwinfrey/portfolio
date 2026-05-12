export const workAssetBaseUrl = "https://gallery.jeiwinfrey.com"
export const workPreviewAssetBaseUrl = "https://gallery.jeiwinfrey.com/works"

export type WorkItem = {
  slug: string
  name: string
  description: string
  asset: string
  previewAsset: string
  previewAssetBaseUrl?: string
}

export const works: WorkItem[] = [
  {
    slug: "widgetly",
    name: "Widgetly",
    description:
      "A simple, visual link-in-bio page for sharing links, projects, and socials in one place.",
    asset: "widgets.mp4",
    previewAsset: "widgetly.me.png",
  },
  {
    slug: "klaude-studio",
    name: "Klaude Studio",
    description:
      "An infinity canvas that curates X posts for design inspiration and presents them in a clean, focused experience.",
    asset: "klaude.studio.mp4",
    previewAsset: "klaude.studio.mp4",
  },
  {
    slug: "klaude-ui",
    name: "Klaude UI",
    description:
      "A frontend-first UI library for shadcn components, built with motion.",
    asset: "drawer.mp4",
    previewAsset: "klaude-ui.mp4",
  },
  {
    slug: "mapa",
    name: "Mapa",
    description:
      "A web mapping project focused on presenting location-based information in a clear, usable interface.",
    asset: "klaude.studio.mp4",
    previewAsset: "mapa.mp4",
  },
  {
    slug: "jeiwinfrey",
    name: "Jeiwinfrey",
    description:
      "My personal portfolio website, designed to showcase my work, stack, and background in a clean way.",
    asset: "nav.mp4",
    previewAsset: "portfolio.mp4",
  },
  {
    slug: "chatcn-cli",
    name: "chatcn-cli",
    description:
      "A CLI tool to scaffold and manage chat UI components built on shadcn.",
    asset: "chatcn.mp4",
    previewAsset: "chatcn.mp4",
  },
  {
    slug: "smooth-div",
    name: "smooth-div",
    description:
      "An open-source web component for squircle-style corner smoothing, published to npm.",
    asset: "pop.mp4",
    previewAsset: "smooth-div.mp4",
  },
  {
    slug: "smooth-corners",
    name: "smooth-corners",
    description:
      "A motion study exploring softened corners and interface transitions in the browser.",
    asset: "pop.mp4",
    previewAsset: "smooth-corners.mp4",
  },
]

export function getWorkBySlug(slug: string) {
  return works.find((work) => work.slug === slug)
}
