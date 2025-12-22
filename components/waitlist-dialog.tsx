"use client"

import * as React from "react"
import { useState, useMemo, useRef, useEffect } from "react"
import Image from "next/image"
import { Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/translations"

interface WaitlistDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WaitlistDialog({ open, onOpenChange }: WaitlistDialogProps) {
  const { language } = useLanguage();
  const t = (key: keyof typeof import("@/lib/translations").translations.EN) => getTranslation(language, key);
  const [email, setEmail] = useState("")
  const [industry, setIndustry] = useState("")
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false)
  const [errors, setErrors] = useState<{
    email?: string
    privacy?: string
  }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const [imageTransform, setImageTransform] = useState({ x: 0, y: 0 })
  const animationRef = useRef({ x: 0, y: 0 })

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Check if form is valid for submit button
  const isFormValid = useMemo(() => {
    return email.trim() !== "" && validateEmail(email) && privacyAccepted
  }, [email, privacyAccepted])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Reset errors
    const newErrors: { email?: string; privacy?: string } = {}
    
    // Validate email
    if (!email.trim()) {
      newErrors.email = t("emailRequiredError")
    } else if (!validateEmail(email)) {
      newErrors.email = t("emailInvalidError")
    }
    
    // Validate privacy checkbox
    if (!privacyAccepted) {
      newErrors.privacy = t("privacyError")
    }
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length > 0) {
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // Here you would make the actual API call
      // await fetch('/api/waitlist', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, industry, newsletterSubscribed })
      // })
      
      setIsSuccess(true)
      
      // Don't auto-close, user will click close button
    } catch (error) {
      setErrors({ email: t("somethingWentWrong") })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !isSubmitting) {
      // Reset form when closing
      setEmail("")
      setIndustry("")
      setPrivacyAccepted(false)
      setNewsletterSubscribed(false)
      setErrors({})
      setIsSuccess(false)
    }
    onOpenChange(newOpen)
  }

  // Parallax effect for image - track mouse on entire viewport
  useEffect(() => {
    if (!open) {
      setImageTransform({ x: 0, y: 0 })
      setMousePosition({ x: 0.5, y: 0.5 })
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to 0-1 range based on viewport
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [open])

  // Smooth animation loop
  useEffect(() => {
    if (!open) {
      setImageTransform({ x: 0, y: 0 })
      animationRef.current = { x: 0, y: 0 }
      return
    }
    
    let animationId: number

    const animate = () => {
      const targetX = (mousePosition.x - 0.5) * 20 // Max 20px movement
      const targetY = (mousePosition.y - 0.5) * 20
      
      // Smooth easing with more gentle lerp
      animationRef.current.x += (targetX - animationRef.current.x) * 0.05
      animationRef.current.y += (targetY - animationRef.current.y) * 0.05
      
      setImageTransform({ 
        x: animationRef.current.x, 
        y: animationRef.current.y 
      })
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [open, mousePosition])

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden sm:max-w-[90vw] lg:max-w-4xl xl:max-w-5xl min-h-[550px]">
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center p-12 min-h-[550px]">
            <div className="relative">
              <div className="relative w-32 h-16 logo-fade-in">
                <Image
                  src="/Logo/plenio-logotype.svg"
                  alt="Plenio"
                  fill
                  className="object-contain brightness-0 dark:brightness-0 dark:invert"
                />
              </div>
            </div>
            <h3 className="mt-6 text-2xl font-medium animate-in fade-in slide-in-from-bottom-4 duration-500">
              {t("successTitle")}
            </h3>
            <p className="mt-2 text-muted-foreground text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              {t("successMessage")}
            </p>
            <Button
              variant="ghost"
              onClick={() => {
                setEmail("")
                setIndustry("")
                setPrivacyAccepted(false)
                setNewsletterSubscribed(false)
                setIsSuccess(false)
                onOpenChange(false)
              }}
              className="mt-6"
            >
              {t("close")}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Column - Form */}
            <div className="p-8 sm:p-10 md:p-12 flex flex-col items-center justify-center">
              <div className="w-full h-full flex flex-col justify-center">
                <DialogHeader className="text-left mb-8">
                  <DialogTitle className="text-2xl font-medium mb-2">
                    {t("waitlistDialogTitle")}
                  </DialogTitle>
                  <DialogDescription className="text-base">
                    {t("waitlistDialogDescription")}
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-10">
                {/* Input Fields Container */}
                <div className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="text-[15px] font-medium cursor-pointer block mb-1.5">
                      {t("email")} <span className="text-destructive">{t("emailRequired")}</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("emailPlaceholder")}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (errors.email) {
                          setErrors((prev) => ({ ...prev, email: undefined }))
                        }
                      }}
                      aria-invalid={!!errors.email}
                      className={cn(errors.email && "border-destructive", "cursor-text")}
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Industry Field */}
                  <div>
                    <label htmlFor="industry" className="text-[15px] font-medium cursor-pointer block mb-1.5">
                      {t("industry")} <span className="text-muted-foreground text-xs">{t("industryOptional")}</span>
                    </label>
                    <Input
                      id="industry"
                      type="text"
                      placeholder={t("industryPlaceholder")}
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      disabled={isSubmitting}
                      className="cursor-text"
                    />
                  </div>
                </div>

                {/* Checkboxes Container */}
                <div className="space-y-4">
                  {/* Privacy Checkbox */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="privacy"
                        checked={privacyAccepted}
                        onCheckedChange={(checked) => {
                          setPrivacyAccepted(checked === true)
                          if (errors.privacy) {
                            setErrors((prev) => ({ ...prev, privacy: undefined }))
                          }
                        }}
                        disabled={isSubmitting}
                        className={cn(
                          errors.privacy && "border-destructive"
                        )}
                      />
                      <label
                        htmlFor="privacy"
                        className="text-sm leading-5 cursor-pointer"
                      >
                        {t("privacyAccept")}{" "}
                        <a
                          href="#privacy"
                          className="underline hover:no-underline cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {t("privacyPolicyLink")}
                        </a>{" "}
                        <span className="text-destructive">{t("privacyRequired")}</span>
                      </label>
                    </div>
                    {errors.privacy && (
                      <p className="text-sm text-destructive ml-8 animate-in fade-in slide-in-from-top-1">
                        {errors.privacy}
                      </p>
                    )}
                  </div>

                  {/* Newsletter Checkbox */}
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="newsletter"
                      checked={newsletterSubscribed}
                      onCheckedChange={(checked) =>
                        setNewsletterSubscribed(checked === true)
                      }
                      disabled={isSubmitting}
                    />
                    <label
                      htmlFor="newsletter"
                      className="text-sm leading-5 cursor-pointer"
                    >
                      {t("newsletterSubscribe")}
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full cursor-pointer"
                  disabled={isSubmitting || !isFormValid}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("submitting")}
                    </>
                  ) : (
                    t("joinWaitlist")
                  )}
                </Button>
                </form>
              </div>
            </div>

            {/* Right Column - Image */}
            <div 
              ref={imageContainerRef}
              className="hidden md:block relative bg-muted overflow-hidden"
            >
              <div
                className="absolute inset-0"
                style={{
                  transform: `scale(1.15) translate(${imageTransform.x}px, ${imageTransform.y}px)`,
                  willChange: "transform",
                }}
              >
                <Image
                  src="https://i.pinimg.com/1200x/e9/18/92/e918921add60cfbb2e641949055c78c4.jpg"
                  alt="Join waitlist"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

