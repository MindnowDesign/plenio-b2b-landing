"use client"

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, CheckCircle2, Zap, Shield, TrendingUp, Users, BarChart3, Filter, UserSearch, Clock, CreditCard, Sparkles, LayoutDashboard, Linkedin, Instagram, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogoTicker } from "@/components/logo-ticker";
import { AnimatedIcon } from "@/components/animated-icon";
import { ScrollRevealText } from "@/components/scroll-reveal-text";
import { ScrollRevealCard } from "@/components/scroll-reveal-card";
import { LanguageSelector } from "@/components/language-selector";
import { WaitlistDialog } from "@/components/waitlist-dialog";
import { WaitlistTrigger } from "@/components/waitlist-trigger";
import { IntegrationsDock } from "@/components/integrations-dock";
import { HeroSection } from "@/components/hero-section";
import { ScrollTiltImage } from "@/components/scroll-tilt-image";

export default function Home() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuClosing, setMobileMenuClosing] = useState(false);
  const mobileHeaderRef = useRef<HTMLElement>(null);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && mobileHeaderRef.current) {
        const target = event.target as Node;
        // Don't close if clicking inside the header/menu
        if (mobileHeaderRef.current.contains(target)) {
          return;
        }
        // Don't close if clicking on a dropdown menu (like language selector)
        const dropdownMenu = (target as Element).closest('[data-radix-menu-content]');
        if (dropdownMenu) {
          return;
        }
        // Close menu if clicking outside
        setMobileMenuClosing(true);
        setTimeout(() => {
          setMobileMenuOpen(false);
          setMobileMenuClosing(false);
        }, 200);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);
  
  const renderHeader = (isMobile: boolean) => (
    <header 
      ref={isMobile ? mobileHeaderRef : null}
      className={`sticky ${isMobile ? 'bottom-0' : 'top-0'} z-50 pt-4 pb-4 px-4 ${isMobile ? 'md:hidden' : 'hidden md:block'}`}
    >
      <nav className="mx-auto flex max-w-xl items-center justify-between rounded-2xl bg-foreground px-4 md:px-6 py-3 text-background outline-none dark:bg-foreground dark:text-background">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/Logo/plenio-logo.svg"
            alt="Plenio"
            width={111}
            height={24}
            className="h-6 w-auto dark:invert"
            priority
          />
        </Link>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSelector />
          <ThemeToggle />
          <Button 
            className="group relative overflow-hidden bg-background text-foreground hover:bg-background/90 dark:bg-background dark:text-foreground dark:hover:bg-background/90 h-9"
            onClick={() => setWaitlistOpen(true)}
          >
            <span className="relative inline-block overflow-hidden">
              <span className="block transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-y-full">
                Join waitlist
              </span>
              <span className="absolute inset-0 block transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] -translate-y-full group-hover:translate-y-0">
                Join waitlist
              </span>
            </span>
          </Button>
        </div>

        {/* Mobile navigation */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => {
              if (mobileMenuOpen) {
                setMobileMenuClosing(true);
                setTimeout(() => {
                  setMobileMenuOpen(false);
                  setMobileMenuClosing(false);
                }, 200);
              } else {
                setMobileMenuOpen(true);
              }
            }}
            className="relative flex items-center justify-center h-9 w-9 text-background hover:bg-background/10 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            <Menu 
              className={`h-5 w-5 absolute transition-all duration-300 ease-in-out ${
                mobileMenuOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
              }`}
            />
            <X 
              className={`h-5 w-5 absolute transition-all duration-300 ease-in-out ${
                mobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className={`absolute ${isMobile ? 'bottom-full mb-0' : 'top-full mt-2'} left-4 right-4 rounded-2xl bg-foreground dark:bg-foreground border border-background/10 shadow-lg z-50 md:hidden ${
          mobileMenuClosing 
            ? 'animate-out slide-out-to-bottom-2 fade-out-0 duration-200' 
            : 'animate-in slide-in-from-bottom-2 fade-in-0 duration-200'
        }`}>
          <div className="flex flex-col gap-4 p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-background">Language</span>
              <div className="[&_button]:h-11 [&_button]:px-4">
                <LanguageSelector />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-background">Theme</span>
              <div className="[&_button]:h-11 [&_button]:w-11">
                <ThemeToggle />
              </div>
            </div>
            <Separator className="bg-background/20" />
              <Button 
                className="group relative overflow-hidden bg-background text-foreground hover:bg-background/90 dark:bg-background dark:text-foreground dark:hover:bg-background/90 h-9 w-full"
                onClick={() => {
                  setWaitlistOpen(true);
                  setMobileMenuClosing(true);
                  setTimeout(() => {
                    setMobileMenuOpen(false);
                    setMobileMenuClosing(false);
                  }, 200);
                }}
              >
              <span className="relative inline-block overflow-hidden">
                <span className="block transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-y-full">
                  Join waitlist
                </span>
                <span className="absolute inset-0 block transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] -translate-y-full group-hover:translate-y-0">
                  Join waitlist
                </span>
              </span>
            </Button>
          </div>
        </div>
      )}
    </header>
  );

  return (
    <>
      <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
      {/* Main content wrapper */}
      <main className="main-content-wrapper">
      {/* Desktop Navigation - top */}
      {renderHeader(false)}

      {/* Hero Section */}
      <HeroSection onWaitlistClick={() => setWaitlistOpen(true)} />

      {/* Scroll Tilt Image */}
      <ScrollTiltImage 
        videoSrc="https://cdn.dribbble.com/userupload/19052941/file/original-8861eb29d3e66793a25358a5e5e1ce88.mp4"
      />

      {/* Logo Ticker */}
      <LogoTicker />

      {/* Features List Section */}
      <section id="features-list" className="bg-background py-32 sm:py-40">
        <div className="container mx-auto px-4">
          {/* Introduction Text */}
          <div className="mb-24 max-w-4xl">
            <h3 className="text-sm font-medium text-muted-foreground mb-6">
              Features
            </h3>
            <ScrollRevealText className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight">
              <span className="text-muted-foreground">Plenio</span> is an operating system that brings your brand to life,<br />
              making it easier for teams and partners to deliver.
            </ScrollRevealText>
          </div>

          {/* Feature 1 */}
          <ScrollRevealCard className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24" delay={0}>
            <div>
              <h2 className="text-3xl font-medium tracking-tight mb-4">
                Placeholder Title 1
              </h2>
              <p className="text-lg text-muted-foreground leading-8 mb-6">
                Placeholder description text. This is where the feature description will go. 
                Placeholder description text. This is where the feature description will go.
              </p>
              <WaitlistTrigger variant="link" onClick={() => setWaitlistOpen(true)} />
            </div>
            <div className="w-full h-96 bg-foreground/10 dark:bg-muted rounded-2xl overflow-hidden">
              <video
                src="https://cdn.dribbble.com/userupload/15982653/file/original-2916eedc1ec4162cd8069f253d9e9f5c.mov"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollRevealCard>

          {/* Feature 2 */}
          <ScrollRevealCard className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24" delay={0.15}>
            <div>
              <h2 className="text-3xl font-medium tracking-tight mb-4">
                Placeholder Title 2
              </h2>
              <p className="text-lg text-muted-foreground leading-8 mb-6">
                Placeholder description text. This is where the feature description will go. 
                Placeholder description text. This is where the feature description will go.
              </p>
              <WaitlistTrigger variant="link" onClick={() => setWaitlistOpen(true)} />
            </div>
            <div className="w-full h-96 bg-foreground/10 dark:bg-muted rounded-2xl overflow-hidden">
              <video
                src="https://cdn.dribbble.com/userupload/43460030/file/original-88147efc26f589721dea0cdfd22da3bd.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollRevealCard>

          {/* Feature 3 */}
          <ScrollRevealCard className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center" delay={0.3}>
            <div>
              <h2 className="text-3xl font-medium tracking-tight mb-4">
                Placeholder Title 3
              </h2>
              <p className="text-lg text-muted-foreground leading-8 mb-6">
                Placeholder description text. This is where the feature description will go. 
                Placeholder description text. This is where the feature description will go.
              </p>
              <WaitlistTrigger variant="link" onClick={() => setWaitlistOpen(true)} />
            </div>
            <div className="w-full h-96 bg-foreground/10 dark:bg-muted rounded-2xl overflow-hidden">
              <video
                src="https://cdn.dribbble.com/userupload/13667104/file/original-e039b91c6bb824279ad0a54bd2fb9264.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollRevealCard>
        </div>
      </section>

      {/* Integrations Section */}
      <section id="integrations" className="bg-background py-32 sm:py-40">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 className="text-3xl font-medium tracking-tight mb-6 sm:text-4xl">
              Works seamlessly with your existing tools
            </h2>
            <p className="text-lg text-muted-foreground leading-8 sm:text-xl">
              Plenio integrates with the apps your team already uses, so you can streamline your hiring process without disrupting your workflow.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <IntegrationsDock />
          </div>
          <div className="flex items-center justify-center mt-12">
            <WaitlistTrigger size="lg" onClick={() => setWaitlistOpen(true)} showIcon={false} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-background py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-medium tracking-tight mb-6 sm:text-4xl">
              Designed to make hiring smarter
            </h2>
            <p className="text-lg text-muted-foreground leading-8 sm:text-xl">
              Our platform combines AI-powered matching with deep insights to help you find the right talent faster and more efficiently.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 lg:gap-20 mt-4">
            {/* First Row */}
            <div className="flex flex-col gap-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground dark:bg-foreground">
                <AnimatedIcon delay={0}>
                  <Filter className="h-6 w-6" />
                </AnimatedIcon>
              </div>
              <p className="text-lg md:text-base leading-7">
                Get only qualified matches,{" "}
                <span className="text-muted-foreground">no more endless filtering through irrelevant profiles.</span>
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground dark:bg-foreground">
                <AnimatedIcon delay={0.1}>
                  <UserSearch className="h-6 w-6" />
                </AnimatedIcon>
              </div>
              <p className="text-lg md:text-base leading-7">
                Go beyond hard skills,{" "}
                <span className="text-muted-foreground">understand the person behind every CV.</span>
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground dark:bg-foreground">
                <AnimatedIcon delay={0.2}>
                  <Clock className="h-6 w-6" />
                </AnimatedIcon>
              </div>
              <p className="text-lg md:text-base leading-7">
                Cut hiring time and costs,{" "}
                <span className="text-muted-foreground">streamline your recruitment process effortlessly.</span>
              </p>
            </div>
            {/* Second Row */}
            <div className="flex flex-col gap-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground dark:bg-foreground">
                <AnimatedIcon delay={0.3}>
                  <CreditCard className="h-6 w-6" />
                </AnimatedIcon>
              </div>
              <p className="text-lg md:text-base leading-7">
                Hire top talent at fair market rates,{" "}
                <span className="text-muted-foreground">with full pricing transparency.</span>
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground dark:bg-foreground">
                <AnimatedIcon delay={0.4}>
                  <Sparkles className="h-6 w-6" />
                </AnimatedIcon>
              </div>
              <p className="text-lg md:text-base leading-7">
                Find new candidates every day,{" "}
                <span className="text-muted-foreground">powered by Plenio's AI matching engine.</span>
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground dark:bg-foreground">
                <AnimatedIcon delay={0.5}>
                  <LayoutDashboard className="h-6 w-6" />
                </AnimatedIcon>
              </div>
              <p className="text-lg md:text-base leading-7">
                Access smart insights,{" "}
                <span className="text-muted-foreground">and manage your entire hiring flow in one dashboard.</span>
              </p>
            </div>
          </div>
          <div className="mt-16 flex items-center justify-center">
            <WaitlistTrigger size="lg" onClick={() => setWaitlistOpen(true)} showIcon={false} />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-background py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left side - Title */}
            <div className="flex flex-col">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">
                FAQ
              </h3>
              <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
                Have questions?<br />We're happy to chat.
              </h2>
            </div>
            
            {/* Right side - Accordion */}
            <div className="flex flex-col">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b">
                  <AccordionTrigger className="text-left text-lg font-normal py-7">What does "brand OS" mean?</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    While there has been talk of brand operating systems for a while, they've still been static frameworks or ways of thinking that remain hard to implement. We have built a true living platform that is interactive, dynamic and able to power your brand at scale.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-b">
                  <AccordionTrigger className="text-left text-lg font-normal py-7">How does Plenio bring my brand to life?</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    Brand is now more than a linear narrative. It's an expanding mosaic of touch-points that needs more than guidelines to power it to be cohesive and effective. Brand leaders can't be everywhere at once, so Plenio translates what's in your head and strategy docs into a living tool to empower partners.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-b">
                  <AccordionTrigger className="text-left text-lg font-normal py-7">What is the Plenio Early Access Program?</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    The Plenio Early Access Program is an exclusive opportunity for select partners to test-drive our groundbreaking AI-powered brand management platform before it's publicly available. Early partners gain preferred pricing.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-b">
                  <AccordionTrigger className="text-left text-lg font-normal py-7">How can I join the Early Access Program?</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    We're currently working with a limited number of partners who share our vision for reducing the time and space spent between the brand and the end consumer. If you're interested in being considered for the program, please join our waitlist and share some information about your brand challenges.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5" className="border-b">
                  <AccordionTrigger className="text-left text-lg font-normal py-7">How do I get in touch?</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    Request early access or email us at hello@plenio.com
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
      {/* Mobile Navigation - bottom */}
      {renderHeader(true)}
      </main>

      {/* Footer */}
      <footer className="footer-sticky-reveal bg-foreground dark:bg-foreground rounded-t-2xl sm:rounded-t-3xl">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Large Logo Section */}
            <div className="flex justify-center py-8 sm:py-20">
              <Image
                src="/Logo/plenio-logo.svg"
                alt="Plenio"
                width={1200}
                height={300}
                className="h-auto w-full dark:invert"
                priority
              />
            </div>

            {/* Divider */}
            <Separator className="bg-border/20 dark:bg-border/20" />

            {/* Footer Content */}
            <div className="flex flex-col gap-16 sm:gap-8 py-12 items-start sm:items-end sm:flex-row sm:justify-between">
              {/* Left Side - Links in two columns */}
              <div className="flex flex-col gap-8 sm:flex-row sm:gap-24 w-full sm:w-auto items-start">
                {/* First column of links */}
                <div className="flex flex-col gap-4">
                  <Link 
                    href="#impressum" 
                    className="footer-link text-base leading-5 text-background/80 dark:text-background/80 opacity-40 hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  >
                    Impressum
                  </Link>
                  <Link 
                    href="#privacy" 
                    className="footer-link text-base leading-5 text-background/80 dark:text-background/80 opacity-40 hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  >
                    Privacy Policy
                  </Link>
                  <Link 
                    href="#terms" 
                    className="footer-link text-base leading-5 text-background/80 dark:text-background/80 opacity-40 hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  >
                    Terms & Conditions
                  </Link>
                  <Link 
                    href="#support" 
                    className="footer-link text-base leading-5 text-background/80 dark:text-background/80 opacity-40 hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  >
                    Support
                  </Link>
                </div>

                {/* Second column of links */}
                <div className="flex flex-col gap-4">
                  <Link 
                    href="https://linkedin.com/company/plenio" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="footer-link text-base leading-5 text-background/80 dark:text-background/80 opacity-40 hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  >
                    Linkedin
                  </Link>
                  <Link 
                    href="https://instagram.com/plenio" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="footer-link text-base leading-5 text-background/80 dark:text-background/80 opacity-40 hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  >
                    Instagram
                  </Link>
                  <Link 
                    href="https://plenio.com"
                    className="footer-link text-base leading-5 text-background/80 dark:text-background/80 opacity-40 hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  >
                    Plenio for candidate
                  </Link>
                </div>
              </div>

              {/* Right Side - Status badge and copyright */}
              <div className="flex flex-col gap-8 items-center sm:items-end w-full sm:w-auto">
                {/* In progress badge */}
                <div className="bg-background/10 dark:bg-background/10 flex gap-2 items-center px-3 py-1 rounded-full">
                  <div className="relative shrink-0 w-2 h-2">
                    <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-100"></div>
                    <div className="relative bg-blue-500 rounded-full w-2 h-2"></div>
                  </div>
                  <p className="text-sm leading-6 text-white dark:text-background">
                    In progress
                  </p>
                </div>

                {/* Copyright and Address */}
                <div className="flex flex-col gap-2 text-base leading-6 text-background/80 dark:text-background/80 opacity-40 items-center sm:items-end">
                  <p>© {new Date().getFullYear()} Plenio</p>
                  <p>Weite Gasse 13, 5400 Baden, Switzerland</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
    </>
  );
}
