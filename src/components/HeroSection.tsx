import heroChibi from "@/assets/hero-chibi.png";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WHATSAPP_URL } from "@/lib/constants";
import { useSiteData } from "@/hooks/use-site-data";

const HeroSection = () => {
  const { siteData, trackRegistration } = useSiteData();
  const { hero } = siteData;

  const handleRegister = async () => {
    await trackRegistration('hero');
    window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-card section-padding">
      <div className="container-narrow flex flex-col items-center text-center">
        <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 font-semibold text-sm px-4 py-1.5 animate-pulse-soft">
          {hero.badge}
        </Badge>

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          <span className="text-gradient">{(hero.title || "").split("+")[0]}</span>
          <br />
          {(hero.title || "").includes("+") && (
            <span className="text-foreground">+{(hero.title || "").split("+")[1]}</span>
          )}
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
          {hero.description}
        </p>

        <Button 
          variant="hero" 
          size="lg" 
          className="text-lg px-10 py-6 rounded-full"
          onClick={handleRegister}
        >
          {hero.buttonText || "Daftar Sekarang"}
        </Button>

        <img
          src={heroChibi}
          alt="Ilustrasi anak muda belajar digital marketing"
          className="mt-10 w-64 md:w-80 animate-float"
        />
      </div>
    </section>
  );
};

export default HeroSection;
