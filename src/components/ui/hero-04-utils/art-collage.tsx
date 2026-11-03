import * as React from "react"
import { cn } from "@/lib/utils"

export interface ArtCollageProps {
  primaryImage: string
  secondaryImage: string
  primaryAlt?: string
  secondaryAlt?: string
  className?: string
}

export function ArtCollage({
  primaryImage,
  secondaryImage,
  primaryAlt = "",
  secondaryAlt = "",
  className,
}: ArtCollageProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-md sm:max-w-lg lg:max-w-none aspect-[16/13] sm:aspect-[16/12] flex items-center justify-start",
        className
      )}
    >
      {/* Decorative ambient aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 z-0 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-400/5"
      />

      {/* Primary Main Image */}
      <div className="relative z-10 w-[74%] aspect-[4/5] overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl ring-1 ring-black/10 dark:ring-white/10 bg-muted">
        <img
          src={primaryImage}
          alt={primaryAlt}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
          loading="eager"
        />
      </div>

      {/* Secondary Overlapping Image */}
      <div className="absolute -bottom-4 right-0 sm:bottom-0 sm:right-4 z-20 w-[52%] aspect-[4/5] overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl ring-4 sm:ring-8 ring-background bg-muted">
        <img
          src={secondaryImage}
          alt={secondaryAlt}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
          loading="lazy"
        />
      </div>
    </div>
  )
}

