export const workAssetBaseUrl = "https://gallery.jeiwinfrey.com"
export const workPreviewAssetBaseUrl = "https://gallery.jeiwinfrey.com/works"

export type WorkItem = {
  slug: string
  name: string
  description: string
  asset: string
  assetBaseUrl?: string
  previewAsset: string
  previewAssetBaseUrl?: string
  techStack: string[]
  liveUrl?: string
  githubUrl?: string
}

export const works: WorkItem[] = [
  {
    slug: "widgetly",
    name: "Widgetly",
    description:
      "A simple, visual link-in-bio page for sharing links, projects, and socials in one place.",
    asset: "widgetly.me.png",
    assetBaseUrl: workPreviewAssetBaseUrl,
    previewAsset: "widgetly.me.png",
    techStack: ["Next.js", "Tailwind CSS", "Supabase", "Motion"],
    liveUrl: "https://widgetly.me",
  },
  {
    slug: "klaude-studio",
    name: "Klaude Studio",
    description:
      "An infinity canvas that curates X posts for design inspiration and presents them in a clean, focused experience.",
    asset: "klaude.studio.mp4",
    assetBaseUrl: workPreviewAssetBaseUrl,
    previewAsset: "klaude.studio.mp4",
    techStack: ["React", "Convex", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://app.klaude.studio",
  },
  {
    slug: "klaude-ui",
    name: "Klaude UI",
    description:
      "A frontend-first UI library for shadcn components, built with motion.",
    asset: "klaude-ui.mp4",
    assetBaseUrl: workPreviewAssetBaseUrl,
    previewAsset: "klaude-ui.mp4",
    techStack: ["React", "shadcn/ui", "Tailwind CSS", "Motion"],
    liveUrl: "https://klaude-ui.com",
    githubUrl: "https://github.com/jeiwinfrey/klaude",
  },
  {
    slug: "mapa",
    name: "Mapa",
    description:
      "A web mapping project focused on presenting location-based information in a clear, usable interface.",
    asset: "mapa.mp4",
    assetBaseUrl: workPreviewAssetBaseUrl,
    previewAsset: "mapa.mp4",
    techStack: ["Next.js", "Tailwind CSS", "Mapbox"],
    liveUrl: "https://mapa.jeiwinfrey.com",
    githubUrl: "https://github.com/jeiwinfrey/Mapa",
  },
  {
    slug: "jeiwinfrey",
    name: "Jeiwinfrey",
    description:
      "My personal portfolio website, designed to showcase my work, stack, and background in a clean way.",
    asset: "portfolio.mp4",
    assetBaseUrl: workPreviewAssetBaseUrl,
    previewAsset: "portfolio.mp4",
    techStack: ["Next.js", "Tailwind CSS", "MDX"],
    liveUrl: "https://jeiwinfrey.com",
    githubUrl: "https://github.com/jeiwinfrey/portfolio",
  },
  {
    slug: "chatcn-cli",
    name: "chatcn-cli",
    description:
      "A CLI tool to scaffold and manage chat UI components built on shadcn.",
    asset: "chatcn.mp4",
    assetBaseUrl: workPreviewAssetBaseUrl,
    previewAsset: "chatcn.mp4",
    techStack: ["Node.js", "TypeScript", "Commander.js"],
    liveUrl: "https://npmjs.com/package/chatcn-cli",
    githubUrl: "https://github.com/jeiwinfrey/chatcn-cli",
  },
  {
    slug: "smooth-corners",
    name: "smooth-corners",
    description:
      "A motion study exploring softened corners and interface transitions in the browser.",
    asset: "smooth-corners.mp4",
    assetBaseUrl: workPreviewAssetBaseUrl,
    previewAsset: "smooth-corners.mp4",
    techStack: ["CSS", "JavaScript", "Motion"],
    liveUrl: "https://smooth-corners.jeiwinfrey.com/",
  },
  {
    slug: "smooth-div",
    name: "smooth-div",
    description:
      "An open-source web component for squircle-style corner smoothing, published to npm.",
    asset: "smooth-div.mp4",
    assetBaseUrl: workPreviewAssetBaseUrl,
    previewAsset: "smooth-div.mp4",
    techStack: ["TypeScript", "Lit", "Web Components"],
    liveUrl: "https://smooth-div.jeiwinfrey.com/",
    githubUrl: "https://github.com/jeiwinfrey/smooth-div",
  },
]

export function getWorkBySlug(slug: string) {
  return works.find((work) => work.slug === slug)
}

export function isVideoAsset(asset: string) {
  return (
    asset.endsWith(".mp4") || asset.endsWith(".webm") || asset.endsWith(".mov")
  )
}
