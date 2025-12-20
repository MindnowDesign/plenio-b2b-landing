"use client"

import * as React from "react"
import { useState, useMemo } from "react"
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

interface WaitlistDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WaitlistDialog({ open, onOpenChange }: WaitlistDialogProps) {
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
      newErrors.email = "Email is required"
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address"
    }
    
    // Validate privacy checkbox
    if (!privacyAccepted) {
      newErrors.privacy = "You must accept the privacy policy"
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
      setErrors({ email: "Something went wrong. Please try again." })
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

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden sm:max-w-[90vw] min-h-[550px]">
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
              You're on the list!
            </h3>
            <p className="mt-2 text-muted-foreground text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              We'll be in touch soon.
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
              Close
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Column - Form */}
            <div className="p-8 sm:p-10 md:p-12 flex flex-col items-center justify-center">
              <div className="w-full h-full flex flex-col justify-center">
                <DialogHeader className="text-left mb-6">
                  <DialogTitle className="text-2xl font-medium mb-2">
                    Join the waitlist
                  </DialogTitle>
                  <DialogDescription className="text-base">
                    Be among the first to experience Plenio's AI-powered talent discovery platform.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium cursor-pointer">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@company.com"
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
                <div className="space-y-2">
                  <label htmlFor="industry" className="text-sm font-medium cursor-pointer">
                    Industry <span className="text-muted-foreground text-xs">(optional)</span>
                  </label>
                  <Input
                    id="industry"
                    type="text"
                    placeholder="e.g., Technology, Healthcare, Finance"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    disabled={isSubmitting}
                    className="cursor-text"
                  />
                </div>

                {/* Privacy Checkbox */}
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
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
                        "mt-0.5",
                        errors.privacy && "border-destructive"
                      )}
                    />
                    <label
                      htmlFor="privacy"
                      className="text-sm leading-5 cursor-pointer"
                    >
                      I accept the{" "}
                      <a
                        href="#privacy"
                        className="underline hover:no-underline cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Privacy Policy
                      </a>{" "}
                      <span className="text-destructive">*</span>
                    </label>
                  </div>
                  {errors.privacy && (
                    <p className="text-sm text-destructive ml-7 animate-in fade-in slide-in-from-top-1">
                      {errors.privacy}
                    </p>
                  )}
                </div>

                {/* Newsletter Checkbox */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="newsletter"
                    checked={newsletterSubscribed}
                    onCheckedChange={(checked) =>
                      setNewsletterSubscribed(checked === true)
                    }
                    disabled={isSubmitting}
                    className="mt-0.5"
                  />
                  <label
                    htmlFor="newsletter"
                    className="text-sm leading-5 cursor-pointer"
                  >
                    Subscribe to our newsletter for updates and insights
                  </label>
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
                      Submitting...
                    </>
                  ) : (
                    "Join waitlist"
                  )}
                </Button>
                </form>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="hidden md:block relative bg-muted">
              <Image
                src="https://i.pinimg.com/1200x/e9/18/92/e918921add60cfbb2e641949055c78c4.jpg"
                alt="Join waitlist"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

