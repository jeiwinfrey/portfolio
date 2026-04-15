"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { springTransition } from "@/lib/animations";

const tabs = [
  { label: "Home", href: "/" },
  { label: "Playground", href: "/playground" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const active = pathname === "/playground" ? "/playground" : "/";

  return (
    <nav className="fixed top-0 inset-x-0 z-40 px-6 py-4">
      <div className="mx-auto flex max-w-xl items-center justify-between">
        <div className="size-8 bg-muted/90 rounded-full" />

        <div className="flex items-center gap-0.5 rounded-full bg-muted/90 px-1 py-1 backdrop-blur-sm">
          {tabs.map(({ label, href }) => {
            const isActive = active === href;
            return (
              <button
                key={href}
                onClick={() => router.push(href)}
                className="relative h-8 rounded-full px-3 text-xs font-normal transition-colors"
                style={{
                  color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-background"
                    transition={springTransition}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
