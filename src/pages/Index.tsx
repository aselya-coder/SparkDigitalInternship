import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import CurriculumSection from "@/components/CurriculumSection";
import CommissionSection from "@/components/CommissionSection";
import AudienceSection from "@/components/AudienceSection";
import TestimonialSection from "@/components/TestimonialSection";
import StepsSection from "@/components/StepsSection";
import CtaSection from "@/components/CtaSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <BenefitsSection />
      <CurriculumSection />
      <CommissionSection />
      <AudienceSection />
      <TestimonialSection />
      <StepsSection />
      <CtaSection />

      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border">
        © 2026 areakerja.com — Program Magang Digital Marketing
      </footer>
    </div>
  );
};

export default Index;
