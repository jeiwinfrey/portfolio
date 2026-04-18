export const springTransition = {
  type: "spring",
  stiffness: 200,
  damping: 20,
} as const

export const workRowTransition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
} as const

export const pageTransitionVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -8 },
} as const

export const contentEntryVariants = (index: number, staggerMs = 60) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { ...springTransition, delay: index * (staggerMs / 1000) },
}) as const

export const reducedMotionTransition = {
  duration: 0.08,
} as const
