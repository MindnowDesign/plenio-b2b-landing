"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, CheckCircle2, Zap, Shield, TrendingUp, Users, BarChart3, Filter, UserSearch, Clock, CreditCard, Sparkles, LayoutDashboard, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogoTicker } from "@/components/logo-ticker";
import { AnimatedIcon } from "@/components/animated-icon";
import { ScrollRevealText } from "@/components/scroll-reveal-text";
import { LanguageSelector } from "@/components/language-selector";
import { WaitlistDialog } from "@/components/waitlist-dialog";
import { WaitlistTrigger } from "@/components/waitlist-trigger";
import { IntegrationsDock } from "@/components/integrations-dock";

export default function Home() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  return (
    <>
      <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
      <div className="flex min-h-screen flex-col">
        {/* Main content wrapper */}
        <main className="main-content-wrapper">
      {/* Navigation */}
      <header className="sticky top-0 z-50 pt-4 pb-4">
        <nav className="mx-auto flex max-w-xl items-center justify-between rounded-2xl bg-foreground px-6 py-3 text-background outline-none dark:bg-foreground dark:text-background">
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
          
          {/* Right side navigation */}
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <ThemeToggle />
            <Button 
              className="bg-background text-foreground hover:bg-background/90 dark:bg-background dark:text-foreground dark:hover:bg-background/90 h-9"
              onClick={() => setWaitlistOpen(true)}
            >
              Join waitlist
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-24 sm:py-32">
        {/* Floating decorative elements */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Left side elements - 3 elements with different aspect ratios */}
          <div className="absolute left-4 top-20 w-40 h-32 bg-muted rounded-2xl animate-float-1 hidden md:block" />
          <div className="absolute left-8 top-64 w-36 h-48 bg-muted rounded-xl animate-float-2 hidden md:block" />
          <div className="absolute left-12 bottom-32 w-44 h-36 bg-muted rounded-2xl animate-float-3 hidden md:block" />
          
          {/* Right side elements - 3 elements with different aspect ratios */}
          <div className="absolute right-4 top-32 w-48 h-40 bg-muted rounded-2xl animate-float-4 hidden md:block" />
          <div className="absolute right-8 top-80 w-32 h-44 bg-muted rounded-xl animate-float-5 hidden md:block" />
          <div className="absolute right-12 bottom-40 w-40 h-32 bg-muted rounded-2xl animate-float-6 hidden md:block" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-medium tracking-tight sm:text-6xl lg:text-7xl">
              AI-powered talent discovery for modern companies
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
              Define the person you need, not just the role. Our AI-powered platform understands context, culture fit, and what truly matters for your team.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" variant="outline" asChild>
                <Link href="#features-list">Learn more</Link>
              </Button>
              <WaitlistTrigger size="lg" onClick={() => setWaitlistOpen(true)} />
            </div>
          </div>
        </div>
      </section>

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
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
            <div className="w-full h-96 bg-muted rounded-2xl" />
          </div>

          {/* Feature 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
            <div className="w-full h-96 bg-muted rounded-2xl" />
          </div>
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
          <div className="flex items-center justify-center py-12">
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
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
              Designed to make hiring smarter
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            {/* First Row */}
            <div className="flex flex-col gap-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground dark:bg-background">
                <AnimatedIcon delay={0}>
                  <Filter className="h-6 w-6" />
                </AnimatedIcon>
              </div>
              <p className="text-base leading-7">
                Get only qualified matches,{" "}
                <span className="text-muted-foreground">no more endless filtering through irrelevant profiles.</span>
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground dark:bg-background">
                <AnimatedIcon delay={0.1}>
                  <UserSearch className="h-6 w-6" />
                </AnimatedIcon>
              </div>
              <p className="text-base leading-7">
                Go beyond hard skills,{" "}
                <span className="text-muted-foreground">understand the person behind every CV.</span>
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground dark:bg-background">
                <AnimatedIcon delay={0.2}>
                  <Clock className="h-6 w-6" />
                </AnimatedIcon>
              </div>
              <p className="text-base leading-7">
                Cut hiring time and costs,{" "}
                <span className="text-muted-foreground">streamline your recruitment process effortlessly.</span>
              </p>
            </div>
            {/* Second Row */}
            <div className="flex flex-col gap-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground dark:bg-background">
                <AnimatedIcon delay={0.3}>
                  <CreditCard className="h-6 w-6" />
                </AnimatedIcon>
              </div>
              <p className="text-base leading-7">
                Hire top talent at fair market rates,{" "}
                <span className="text-muted-foreground">with full pricing transparency.</span>
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground dark:bg-background">
                <AnimatedIcon delay={0.4}>
                  <Sparkles className="h-6 w-6" />
                </AnimatedIcon>
              </div>
              <p className="text-base leading-7">
                Find new candidates every day,{" "}
                <span className="text-muted-foreground">powered by Plenio's AI matching engine.</span>
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground dark:bg-background">
                <AnimatedIcon delay={0.5}>
                  <LayoutDashboard className="h-6 w-6" />
                </AnimatedIcon>
              </div>
              <p className="text-base leading-7">
                Access smart insights,{" "}
                <span className="text-muted-foreground">and manage your entire hiring flow in one dashboard.</span>
              </p>
            </div>
          </div>
          <div className="mt-16 flex items-center justify-center">
            <WaitlistTrigger size="lg" onClick={() => setWaitlistOpen(true)} />
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
                Have questions? We're happy to chat.
              </h2>
            </div>
            
            {/* Right side - Accordion */}
            <div className="flex flex-col">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b mb-4">
                  <AccordionTrigger className="text-left text-base font-normal py-5">What does "brand OS" mean?</AccordionTrigger>
                  <AccordionContent className="text-base">
                    While there has been talk of brand operating systems for a while, they've still been static frameworks or ways of thinking that remain hard to implement. We have built a true living platform that is interactive, dynamic and able to power your brand at scale.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-b mb-4">
                  <AccordionTrigger className="text-left text-base font-normal py-5">How does Plenio bring my brand to life?</AccordionTrigger>
                  <AccordionContent className="text-base">
                    Brand is now more than a linear narrative. It's an expanding mosaic of touch-points that needs more than guidelines to power it to be cohesive and effective. Brand leaders can't be everywhere at once, so Plenio translates what's in your head and strategy docs into a living tool to empower partners.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-b mb-4">
                  <AccordionTrigger className="text-left text-base font-normal py-5">What is the Plenio Early Access Program?</AccordionTrigger>
                  <AccordionContent className="text-base">
                    The Plenio Early Access Program is an exclusive opportunity for select partners to test-drive our groundbreaking AI-powered brand management platform before it's publicly available. Early partners gain preferred pricing.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-b mb-4">
                  <AccordionTrigger className="text-left text-base font-normal py-5">How can I join the Early Access Program?</AccordionTrigger>
                  <AccordionContent className="text-base">
                    We're currently working with a limited number of partners who share our vision for reducing the time and space spent between the brand and the end consumer. If you're interested in being considered for the program, please join our waitlist and share some information about your brand challenges.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5" className="border-b">
                  <AccordionTrigger className="text-left text-base font-normal py-5">How do I get in touch?</AccordionTrigger>
                  <AccordionContent className="text-base">
                    Request early access or email us at hello@plenio.com
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground dark:bg-foreground rounded-t-2xl sm:rounded-t-3xl">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Large Logo Section */}
            <div className="flex justify-center py-16 sm:py-20">
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
            <div className="flex flex-col gap-8 py-12 sm:flex-row sm:items-end sm:justify-between">
              {/* Left Side - Links in two columns */}
              <div className="flex flex-col gap-8 sm:flex-row sm:gap-24">
                {/* First column of links */}
                <div className="flex flex-col gap-2 opacity-40">
                  <Link 
                    href="#impressum" 
                    className="text-base leading-5 text-background/80 hover:text-white dark:text-background/80 dark:hover:text-white transition-colors"
                  >
                    Impressum
                  </Link>
                  <Link 
                    href="#privacy" 
                    className="text-base leading-5 text-background/80 hover:text-white dark:text-background/80 dark:hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <Link 
                    href="#terms" 
                    className="text-base leading-5 text-background/80 hover:text-white dark:text-background/80 dark:hover:text-white transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                  <Link 
                    href="#support" 
                    className="text-base leading-5 text-background/80 hover:text-white dark:text-background/80 dark:hover:text-white transition-colors"
                  >
                    Support
                  </Link>
                </div>

                {/* Second column of links */}
                <div className="flex flex-col gap-2 opacity-40">
                  <Link 
                    href="https://linkedin.com/company/plenio" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-base leading-5 text-background/80 hover:text-white dark:text-background/80 dark:hover:text-white transition-colors"
                  >
                    Linkedin
                  </Link>
                  <Link 
                    href="https://instagram.com/plenio" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-base leading-5 text-background/80 hover:text-white dark:text-background/80 dark:hover:text-white transition-colors"
                  >
                    Instagram
                  </Link>
                  <Link 
                    href="https://plenio.com"
                    className="text-base leading-5 text-background/80 hover:text-white dark:text-background/80 dark:hover:text-white transition-colors"
                  >
                    Plenio for candidate
                  </Link>
                </div>
              </div>

              {/* Right Side - Status badge and copyright */}
              <div className="flex flex-col gap-6 items-end">
                {/* In progress badge */}
                <div className="bg-[#262626] flex gap-2 items-center px-3 py-1 rounded-full">
                  <div className="relative shrink-0 w-2 h-2">
                    <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-100"></div>
                    <div className="relative bg-blue-500 rounded-full w-2 h-2"></div>
                  </div>
                  <p className="text-sm leading-6 text-[#e8e7ed]">
                    In progress
                  </p>
                </div>

                {/* Copyright and Address */}
                <div className="flex flex-col gap-4 text-base leading-6 text-background/50 dark:text-background/50 sm:flex-row sm:items-center sm:gap-4">
                  <p>© {new Date().getFullYear()} Plenio</p>
                  <p className="hidden sm:inline">•</p>
                  <p>Weite Gasse 13, 5400 Baden, Switzerland</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
    </>
  );
}
