const assets = [
  "accordion.mp4",
  "download.mp4",
  "drawer.mp4",
  "input.mp4",
  "nav.mp4",
  "pop.mp4",
  "widgets.mp4",
  "tabs.mp4",
  "table.mp4",
  "klaude.studio.mp4",
  "chatcn-1.mp4",
]

const assetBaseUrl = "https://gallery.jeiwinfrey.com"

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
        {assets.map((asset) => (
          <div
            key={asset}
            className="mb-4 break-inside-avoid overflow-hidden border border-border/50 bg-muted/20"
          >
            <video
              className="block h-auto w-full"
              src={`${assetBaseUrl}/${asset}`}
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              preload="metadata"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
