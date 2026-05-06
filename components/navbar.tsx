"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { IconCloud } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconCloud";
import { useTheme } from "next-themes";
import { IconMoon } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconMoon";
import { IconSun } from "@central-icons-react/round-filled-radius-3-stroke-1.5/IconSun";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { springTransition, reducedMotionTransition } from "@/lib/animations";
import { Button } from "@/components/ui/button";

const tabs = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
];

const navTransition = {
  type: "spring",
  stiffness: 340,
  damping: 28,
} as const;

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const active = pathname === "/gallery" ? "/gallery" : "/";
  const reduceMotion = useReducedMotion();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="top-0 inset-x-0 z-40 pt-4">
      <div className="mx-auto flex max-w-2xl items-center justify-between">
        <div className="flex size-11 items-center justify-center rounded-full bg-muted/90 text-muted-foreground backdrop-blur-sm">
          <IconCloud className="size-5" />
        </div>

        <div className="flex items-center gap-2">
          <Button
            aria-label={
              mounted
                ? isDark
                  ? "Switch to light mode"
                  : "Switch to dark mode"
                : "Toggle color theme"
            }
            onClick={() => setTheme(isDark ? "light" : "dark")}
            variant="ghost"
            size="icon-lg"
            className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-muted/90 text-muted-foreground backdrop-blur-sm hover:bg-muted/90 hover:text-muted-foreground"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mounted && isDark ? "dark" : "light"}
                initial={reduceMotion ? false : { opacity: 0, rotate: -24, scale: 0.75 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 24, scale: 0.75 }}
                transition={reduceMotion ? reducedMotionTransition : navTransition}
                className="relative z-10 flex items-center justify-center"
              >
                {mounted && isDark ? (
                  <IconSun className="size-4.5" />
                ) : (
                  <IconMoon className="size-4.5" />
                )}
              </motion.span>
            </AnimatePresence>
          </Button>

          <div className="flex items-center gap-0.5 rounded-full bg-muted/90 px-1 py-1 backdrop-blur-sm">
            {tabs.map(({ label, href }) => {
              const isActive = active === href;
              return (
                <button
                  key={href}
                  onClick={() => router.push(href)}
                  className="relative h-9 rounded-full px-3.5 text-xs font-normal transition-colors"
                  style={{
                    color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-background"
                      transition={reduceMotion ? reducedMotionTransition : navTransition}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
