import { Geist_Mono, Inter } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import { PageTransitionWrapper } from "@/components/page-transition-wrapper"
import { ThemeProvider } from "@/components/theme-provider"
import NavBar from "@/components/navbar"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Jeiwinfrey Ulep",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <ThemeProvider>
          <div className="relative min-h-dvh bg-background">
            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
              <NavBar />
            </div>
            <PageTransitionWrapper>{children}</PageTransitionWrapper>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
