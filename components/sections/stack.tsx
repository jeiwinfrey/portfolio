"use client"

export default function Stack() {
  return (
    <section id="stack" className="pt-12">
      <div className="flex flex-col gap-5 text-sm leading-relaxed">
        <div className="flex flex-col gap-1">
          <h1 className="font-medium">Tech Stack</h1>
          <p className="text-muted-foreground">What I use to build websites</p>
        </div>

        <p className="text-pretty">
          Languages: TypeScript, JavaScript, HTML, CSS.
        </p>

        <p className="text-pretty">
          Frontend: React, Next.js, Tailwind CSS, shadcn/ui, Motion.
        </p>

        <p className="text-pretty">
          Backend: Next.js, PostgreSQL, Drizzle ORM.
        </p>

        <p className="text-pretty">Design: Figma, Framer, Canva, Photoshop.</p>

        <p className="text-pretty">
          Tools: Git, GitHub, Vercel, Cloudflare, DigitalOcean.
        </p>

        <p className="text-pretty">
          Currently learning: Accessibility, TypeScript patterns, performance
          optimization, and testing.
        </p>
      </div>
    </section>
  )
}
