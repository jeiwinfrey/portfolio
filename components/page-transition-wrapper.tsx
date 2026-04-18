"use client"

interface PageTransitionWrapperProps {
  children: React.ReactNode
}

export function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  return <>{children}</>
}
