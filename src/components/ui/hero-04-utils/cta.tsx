import * as React from "react"
import Link from "next/link"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface CtaProps {
  ctaEnabled?: boolean
  text: string
  link?: string
  variant?: ButtonProps["variant"]
  size?: ButtonProps["size"]
  className?: string
  onClick?: () => void
}

export function Cta({ cta }: { cta: CtaProps }) {
  if (!cta.ctaEnabled) return null

  if (cta.link && cta.link.trim() !== "") {
    return (
      <Button
        variant={cta.variant}
        size={cta.size}
        className={cn("cursor-pointer", cta.className)}
        onClick={cta.onClick}
        asChild
      >
        <Link href={cta.link}>{cta.text}</Link>
      </Button>
    )
  }

  return (
    <Button
      variant={cta.variant}
      size={cta.size}
      className={cn("cursor-pointer", cta.className)}
      onClick={cta.onClick}
    >
      {cta.text}
    </Button>
  )
}

