import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, CheckCircle2, Zap, Shield, TrendingUp, Users, BarChart3, Filter, UserSearch, Clock, CreditCard, Sparkles, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogoTicker } from "@/components/logo-ticker";
import { AnimatedIcon } from "@/components/animated-icon";
import { ScrollRevealText } from "@/components/scroll-reveal-text";
import { LanguageSelector } from "@/components/language-selector";
import { FooterReveal } from "@/components/footer-reveal";

export default function Home() {
  return (
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
              asChild
            >
              <Link href="#contact">Join waitlist</Link>
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
              <Button size="lg" asChild>
                <Link href="#contact">
                  Join waitlist
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
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
              <button className="group flex items-center gap-2 text-foreground opacity-70 hover:opacity-100 transition-opacity">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
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
              <button className="group flex items-center gap-2 text-foreground opacity-70 hover:opacity-100 transition-opacity">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            <div className="w-full h-96 bg-muted rounded-2xl" />
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
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="bg-background py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
              Solutions for every need
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Modular platforms that adapt to your industry
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Order Management</CardTitle>
                <CardDescription className="text-base">
                  Complete system for managing the B2B order lifecycle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Workflow automation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">ERP system integration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Real-time tracking</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Advanced CRM</CardTitle>
                <CardDescription className="text-base">
                  Manage customer relationships with advanced intelligence tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Customizable pipelines</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Predictive analytics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">Marketing automation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-background py-24 sm:py-32" data-footer-trigger>
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
      <FooterReveal>
        <div className="border-t bg-foreground dark:bg-foreground dark:border-background/20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background text-foreground font-medium dark:bg-background dark:text-foreground">
                  P
                </div>
                <span className="text-xl font-medium text-background dark:text-background">Plenio</span>
              </div>
              <p className="text-sm text-background/70 dark:text-background/70">
                Innovative B2B solutions for your business.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium text-background dark:text-background">Product</h3>
              <ul className="space-y-2 text-sm text-background/70 dark:text-background/70">
                <li><Link href="#features" className="hover:text-background dark:hover:text-background transition-colors">Features</Link></li>
                <li><Link href="#solutions" className="hover:text-background dark:hover:text-background transition-colors">Solutions</Link></li>
                <li><Link href="#pricing" className="hover:text-background dark:hover:text-background transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium text-background dark:text-background">Company</h3>
              <ul className="space-y-2 text-sm text-background/70 dark:text-background/70">
                <li><Link href="#about" className="hover:text-background dark:hover:text-background transition-colors">About us</Link></li>
                <li><Link href="#blog" className="hover:text-background dark:hover:text-background transition-colors">Blog</Link></li>
                <li><Link href="#careers" className="hover:text-background dark:hover:text-background transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium text-background dark:text-background">Support</h3>
              <ul className="space-y-2 text-sm text-background/70 dark:text-background/70">
                <li><Link href="#contact" className="hover:text-background dark:hover:text-background transition-colors">Contact</Link></li>
                <li><Link href="#docs" className="hover:text-background dark:hover:text-background transition-colors">Documentation</Link></li>
                <li><Link href="#support" className="hover:text-background dark:hover:text-background transition-colors">Support</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-background/20 dark:border-background/20 pt-8 text-center text-sm text-background/70 dark:text-background/70">
            <p>&copy; {new Date().getFullYear()} Plenio. All rights reserved.</p>
          </div>
        </div>
        </div>
      </FooterReveal>
      </main>
    </div>
  );
}
