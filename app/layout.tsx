import { Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { PageTransitionWrapper } from "@/components/page-transition-wrapper"
import { ThemeProvider } from "@/components/theme-provider"
import { ViewportShell, ViewportShellProvider } from "@/components/viewport-shell"
import NavBar from "@/components/navbar"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

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
          <ViewportShellProvider>
            <ViewportShell>
              <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                <NavBar />
              </div>
              <PageTransitionWrapper>{children}</PageTransitionWrapper>
            </ViewportShell>
          </ViewportShellProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
