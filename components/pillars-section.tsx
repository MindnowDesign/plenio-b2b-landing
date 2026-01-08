"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { WaitlistTrigger } from "@/components/waitlist-trigger";
import { useLanguage } from "@/lib/language-context";
import { getTranslation } from "@/lib/translations";

interface PillarCardProps {
  title: string;
  description: string;
  details: string;
  expandedContent: string;
  imageUrl: string;
}

function PillarCard({ title, description, details, expandedContent, imageUrl }: PillarCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
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
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(true);
                }}
                className="h-10 w-10 shrink-0 rounded-full bg-white text-black dark:text-black flex items-center justify-center hover:scale-110 transition-transform duration-300 ease-out shadow-lg"
                aria-label={`Learn more about ${title}`}
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl sm:max-w-[90vw] lg:max-w-4xl xl:max-w-5xl max-h-[90vh] overflow-y-auto p-0 [&>button:last-child]:hidden">
          <div className="bg-background rounded-xl border shadow-lg relative">
            {/* Close button */}
            <DialogClose className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none bg-background/80 backdrop-blur-sm p-2">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </DialogClose>
            
            {/* Image */}
            <div 
              className="relative h-96 w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
            
            {/* Content */}
            <div className="p-8 sm:p-12">
              <div className="max-w-3xl mx-auto">
                <DialogHeader className="mb-8">
                  <DialogTitle className="text-3xl sm:text-4xl font-medium leading-tight">{title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  {expandedContent.split('\n\n').map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base leading-8 text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
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
          />
          <PillarCard
            title={t("pillar2Title")}
            description={t("pillar2Description")}
            details={t("pillar2Details")}
            expandedContent={t("pillar2Expanded")}
            imageUrl={pillar2Image}
          />
          <PillarCard
            title={t("pillar3Title")}
            description={t("pillar3Description")}
            details={t("pillar3Details")}
            expandedContent={t("pillar3Expanded")}
            imageUrl={pillar3Image}
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
