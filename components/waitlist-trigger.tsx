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

  const textContent = children || "Join waitlist"
  const hasIcon = showIcon && !children

  return (
    <Button
      size={size}
      onClick={onClick}
      className={cn("group relative overflow-hidden", className)}
    >
      <span className="relative inline-block overflow-hidden">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-y-full">
          {textContent}
        </span>
        <span className="absolute inset-0 block transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] -translate-y-full group-hover:translate-y-0">
          {textContent}
        </span>
      </span>
      {hasIcon && (
        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-1" />
      )}
    </Button>
  )
}

