"use client"

export default function Hero() {
  return (
    <section id="home" className="pt-12">
      <div className="flex flex-col gap-5 text-sm leading-relaxed">
        <div className="flex flex-col gap-1">
          <h1 className="font-medium">Hello, I&apos;m Jeiwinfrey!</h1>
          <p className="text-muted-foreground">Frontend Developer</p>
        </div>

        <p className="text-pretty">
          I believe motion is what makes designs feel alive. I like building
          interactions that don&apos;t just look good, but feel right when you
          use them.
        </p>

        <p className="text-pretty">
          I&apos;m a programmer who loves design, and I&apos;m learning to build
          with craft and intent. I study web development, then taught myself
          design by building, iterating, and obsessing over how things move,
          read, and hold up under real use.
        </p>

        <p className="text-pretty">
          I write code first – but I bring a designer&apos;s eye to every
          project I touch.
        </p>
      </div>
    </section>
  )
}
