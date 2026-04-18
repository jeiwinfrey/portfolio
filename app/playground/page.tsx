import { MotionShowcase } from "@/components/motion-showcase"
import { DrawerDemo } from "@/components/playground/drawer-demo"
import { IconBurstDemo } from "@/components/playground/icon-burst-demo"
import { AiCommandBarDemo } from "@/components/playground/ai-command-bar"
import { ChatBoxDemo } from "@/components/playground/chat-box-demo"
import { WorkRowButtonsDemo } from "@/components/playground/work-row-buttons-demo"
import { ContentMotionWrapper } from "@/components/content-motion-wrapper"

export default function PlaygroundPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col gap-12 text-sm leading-relaxed">
        <ContentMotionWrapper>
            <MotionShowcase
              title="Bottom sheet"
              description="A spring-driven drawer with drag-to-close. The page behind scales and lifts using the same motion value as the sheet, so the transition stays glued together."
            >
              <DrawerDemo />
            </MotionShowcase>

            <MotionShowcase
              title="Inline icon burst"
              description="Small icons sit inline with body copy; on hover, emoji burst upward while the word and icon pick up a little weight—same treatment as the hero on the home page."
            >
              <IconBurstDemo />
            </MotionShowcase>

            <MotionShowcase
              title="List row buttons"
              description="Works uses full-width motion buttons: hover slides the row right and scales it up slightly; tap eases in for feedback. Education cards share the same spring transition."
            >
              <WorkRowButtonsDemo />
            </MotionShowcase>

            <MotionShowcase
              title="Command composer"
              description="A static UI shell inspired by AI chat apps—borders and type only, no shadows. Motion is for mount, the optional file strip, and button press feedback; there is no backend."
            >
              <AiCommandBarDemo />
            </MotionShowcase>

            <MotionShowcase
              title="Chat box"
              description="A fixed-height thread with an in-panel scroll area—same tile styling as the command composer. Sends show a typing indicator, then append short scripted replies (no page scroll)."
            >
              <ChatBoxDemo />
            </MotionShowcase>
          </ContentMotionWrapper>
      </div>
    </div>
  )
}
