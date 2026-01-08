"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { ScrollRevealCard } from "@/components/scroll-reveal-card";
import { WaitlistTrigger } from "@/components/waitlist-trigger";
import { useLanguage } from "@/lib/language-context";
import { getTranslation } from "@/lib/translations";
import { cn } from "@/lib/utils";

interface PillarCardProps {
  title: string;
  description: string;
  details: string;
  expandedContent: string;
  imageUrl: string;
  delay?: number;
}

function PillarCard({ title, description, details, expandedContent, imageUrl, delay = 0 }: PillarCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ScrollRevealCard delay={delay}>
        <Card 
          onClick={() => setIsOpen(true)}
          className="group relative h-full overflow-hidden bg-card hover:border-foreground/20 transition-colors cursor-pointer border-0 outline-none !p-0 !gap-0 rounded-2xl"
        >
          {/* Background Image with overlay */}
          <div className="relative h-full min-h-[280px] w-full overflow-hidden rounded-2xl">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
            
            {/* Dark gradient overlay from bottom to top */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-medium flex-1 text-white">{title}</h3>
                {/* Plus button */}
                <button
                  onClick={() => setIsOpen(true)}
                  className="h-10 w-10 shrink-0 rounded-full bg-white text-foreground flex items-center justify-center hover:scale-110 transition-transform duration-300 ease-out shadow-lg"
                  aria-label={`Learn more about ${title}`}
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </Card>
      </ScrollRevealCard>

      {/* Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl sm:max-w-[90vw] lg:max-w-4xl xl:max-w-5xl max-h-[90vh] overflow-y-auto p-0 border-0 shadow-none bg-transparent !animate-none !transition-none data-[state=open]:!animate-none data-[state=closed]:!animate-none [&>button]:hidden [&>div[data-radix-dialog-overlay]]:!animate-none [&>div[data-radix-dialog-overlay]]:!transition-none">
          <div className="bg-background rounded-xl border shadow-lg overflow-hidden">
            {/* Image */}
            <div 
              className="relative h-48 w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
            
            {/* Content */}
            <div className="p-6 space-y-4">
              <DialogHeader>
                <DialogTitle className="text-2xl font-medium leading-tight mb-4">{title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {expandedContent.split('\n\n').map((paragraph, index) => (
                  <p
                    key={index}
                    className={cn(
                      "text-base leading-7",
                      index === 0 ? "text-foreground font-medium" : "text-muted-foreground"
                    )}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

interface PillarsSectionProps {
  onWaitlistClick?: () => void;
}

export function PillarsSection({ onWaitlistClick }: PillarsSectionProps) {
  const { language } = useLanguage();
  const t = (key: keyof typeof import("@/lib/translations").translations.EN) => getTranslation(language, key);

  // Unsplash images for each pillar
  // Using Unsplash Source for direct image URLs
  const pillar1Image = "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop&q=80";
  const pillar2Image = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80";
  const pillar3Image = "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&q=80";

  return (
    <section id="pillars" className="bg-background py-32 sm:py-40">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="text-3xl font-medium tracking-tight mb-6 sm:text-4xl">
            {t("pillarsSubtitle")}
          </h2>
          <p className="text-lg text-muted-foreground leading-8 sm:text-xl">
            {t("pillarsDescription")}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <PillarCard
            title={t("pillar1Title")}
            description={t("pillar1Description")}
            details={t("pillar1Details")}
            expandedContent={t("pillar1Expanded")}
            imageUrl={pillar1Image}
            delay={0.1}
          />
          <PillarCard
            title={t("pillar2Title")}
            description={t("pillar2Description")}
            details={t("pillar2Details")}
            expandedContent={t("pillar2Expanded")}
            imageUrl={pillar2Image}
            delay={0.2}
          />
          <PillarCard
            title={t("pillar3Title")}
            description={t("pillar3Description")}
            details={t("pillar3Details")}
            expandedContent={t("pillar3Expanded")}
            imageUrl={pillar3Image}
            delay={0.3}
          />
        </div>

        {/* CTA */}
        <div className="flex items-center justify-center mt-12">
          <WaitlistTrigger size="lg" onClick={onWaitlistClick} showIcon={false} />
        </div>
      </div>
    </section>
  );
}
