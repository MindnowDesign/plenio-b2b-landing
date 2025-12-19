import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, CheckCircle2, Zap, Shield, TrendingUp, Users, BarChart3, Filter, UserSearch, Clock, DollarSign, Sparkles, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogoTicker } from "@/components/logo-ticker";
import { AnimatedIcon } from "@/components/animated-icon";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
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
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              className="text-background hover:bg-background/10 hover:text-background dark:text-background dark:hover:bg-background/10 dark:hover:text-background"
              asChild
            >
              <Link href="#contact">Contacts</Link>
            </Button>
            <Button 
              className="bg-background text-foreground hover:bg-background/90 dark:bg-background dark:text-foreground dark:hover:bg-background/90"
              asChild
            >
              <Link href="#contact">Join waitlist</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="secondary">
              Enterprise Ready
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Cutting-edge
              <span className="text-primary"> B2B Solutions</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
              Transform your business with innovative platforms designed to scale.
              Manage complex operations with simplicity and efficiency.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link href="#contact">
                  Get started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Learn more</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Ticker */}
      <LogoTicker />

      {/* Features Section */}
      <section id="features" className="py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Designed to make hiring smarter
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            {/* First Row */}
            <div className="flex flex-col gap-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground dark:bg-background">
                <AnimatedIcon delay={0}>
                  <Filter />
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
                  <UserSearch />
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
                  <Clock />
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
                  <DollarSign />
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
                  <Sparkles />
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
                  <LayoutDashboard />
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
      <section id="solutions" className="py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
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

      {/* CTA Section */}
      <section id="contact" className="py-24 sm:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg opacity-90">
              Contact us today for a personalized demo and discover how we can transform your business.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" variant="secondary" asChild>
                <Link href="mailto:info@plenio.com">
                  Contact us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link href="#features">Book a demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left side - Title */}
            <div className="flex flex-col">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">
                FAQ
              </h3>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Have questions? We're happy to chat.
              </h2>
            </div>
            
            {/* Right side - Accordion */}
            <div className="flex flex-col">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b mb-4">
                  <AccordionTrigger className="text-left text-base font-medium py-5">What does "brand OS" mean?</AccordionTrigger>
                  <AccordionContent className="text-base">
                    While there has been talk of brand operating systems for a while, they've still been static frameworks or ways of thinking that remain hard to implement. We have built a true living platform that is interactive, dynamic and able to power your brand at scale.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-b mb-4">
                  <AccordionTrigger className="text-left text-base font-medium py-5">How does Plenio bring my brand to life?</AccordionTrigger>
                  <AccordionContent className="text-base">
                    Brand is now more than a linear narrative. It's an expanding mosaic of touch-points that needs more than guidelines to power it to be cohesive and effective. Brand leaders can't be everywhere at once, so Plenio translates what's in your head and strategy docs into a living tool to empower partners.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-b mb-4">
                  <AccordionTrigger className="text-left text-base font-medium py-5">What is the Plenio Early Access Program?</AccordionTrigger>
                  <AccordionContent className="text-base">
                    The Plenio Early Access Program is an exclusive opportunity for select partners to test-drive our groundbreaking AI-powered brand management platform before it's publicly available. Early partners gain preferred pricing.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-b mb-4">
                  <AccordionTrigger className="text-left text-base font-medium py-5">How can I join the Early Access Program?</AccordionTrigger>
                  <AccordionContent className="text-base">
                    We're currently working with a limited number of partners who share our vision for reducing the time and space spent between the brand and the end consumer. If you're interested in being considered for the program, please join our waitlist and share some information about your brand challenges.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5" className="border-b">
                  <AccordionTrigger className="text-left text-base font-medium py-5">How do I get in touch?</AccordionTrigger>
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
      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                  P
                </div>
                <span className="text-xl font-semibold">Plenio</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Innovative B2B solutions for your business.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="#solutions" className="hover:text-foreground transition-colors">Solutions</Link></li>
                <li><Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#about" className="hover:text-foreground transition-colors">About us</Link></li>
                <li><Link href="#blog" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="#careers" className="hover:text-foreground transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#contact" className="hover:text-foreground transition-colors">Contact</Link></li>
                <li><Link href="#docs" className="hover:text-foreground transition-colors">Documentation</Link></li>
                <li><Link href="#support" className="hover:text-foreground transition-colors">Support</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Plenio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
