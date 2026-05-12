import type { Metadata } from "next"
import WorkPageContent from "@/components/work-page-content"
import { getWorkBySlug } from "@/lib/works"

const work = getWorkBySlug("smooth-corners")

export const metadata: Metadata = {
  description: work?.description,
}

export default function SmoothCornersPage() {
  if (!work) return null
  return <WorkPageContent item={work} />
}
