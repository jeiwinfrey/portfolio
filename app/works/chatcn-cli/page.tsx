import type { Metadata } from "next"
import WorkPageContent from "@/components/work-page-content"
import { getWorkBySlug } from "@/lib/works"

const work = getWorkBySlug("chatcn-cli")

export const metadata: Metadata = {
  description: work?.description,
}

export default function ChatcnCliPage() {
  if (!work) return null
  return <WorkPageContent item={work} />
}
