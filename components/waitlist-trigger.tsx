"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface WaitlistTriggerProps {
  variant?: "default" | "link"
  size?: "default" | "sm" | "lg"
  className?: string
  onClick: () => void
  children?: React.ReactNode
  showIcon?: boolean
}

export function WaitlistTrigger({
  variant = "default",
  size = "default",
  className,
  onClick,
  children,
  showIcon = true,
}: WaitlistTriggerProps) {
  if (variant === "link") {
    return (
      <button
        onClick={onClick}
        className={cn(
          "group flex items-center gap-2 text-foreground opacity-70 hover:opacity-100 transition-opacity cursor-pointer",
          className
        )}
      >
        {children || (
          <>
            <span>Join waitlist</span>
            {showIcon && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
          </>
        )}
      </button>
    )
  }

  return (
    <Button
      size={size}
      onClick={onClick}
      className={className}
    >
      {children || (
        <>
          Join waitlist
          {showIcon && <ArrowRight className="ml-2 h-4 w-4" />}
        </>
      )}
    </Button>
  )
}

