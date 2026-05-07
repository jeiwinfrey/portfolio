"use client"

import Hero from "@/components/sections/hero"
import Works from "@/components/sections/works"
import Stack from "@/components/sections/stack"
import Education from "@/components/sections/education"
import Contact from "@/components/sections/contact"
import { ContentMotionWrapper } from "@/components/content-motion-wrapper"

export default function Page() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
      <ContentMotionWrapper>
        <Hero />
        <Stack />
        <Works />
        <Education />
        <Contact />
      </ContentMotionWrapper>
    </div>
  )
}
