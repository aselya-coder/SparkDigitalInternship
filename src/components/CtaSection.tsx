import ctaChibi from "@/assets/cta-chibi.png";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSiteData } from "@/hooks/use-site-data";

const CtaSection = () => {
  const { siteData, trackRegistration, getWhatsAppUrl } = useSiteData();
  const { cta } = siteData;

  const handleRegister = async () => {
    await trackRegistration('cta');
    window.open(getWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="section-padding">
      <div className="container-narrow">
        <div className="rounded-3xl bg-gradient-hero p-8 md:p-14 text-center relative overflow-hidden">
          <Badge className="mb-4 bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 font-semibold text-sm px-4 py-1.5">
            {cta.badge}
          </Badge>

          <h2 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4">
            {cta.title}
          </h2>

          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            {cta.description}
          </p>

          <Button
            variant="hero"
            size="lg"
            className="text-lg px-10 py-6 rounded-full bg-card text-foreground hover:bg-card/90 shadow-xl"
            onClick={handleRegister}
          >
            {cta.buttonText || "Daftar Program Magang"}
          </Button>

          <img
            src={ctaChibi}
            alt="Ilustrasi anak muda sukses digital marketing"
            className="mx-auto mt-8 w-48 md:w-56 animate-float"
          />
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
