import heroChibi from "@/assets/hero-chibi.png";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-card section-padding">
      <div className="container-narrow flex flex-col items-center text-center">
        <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 font-semibold text-sm px-4 py-1.5 animate-pulse-soft">
          🔥 Limited Slot — Daftar Sekarang!
        </Badge>

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          <span className="text-gradient">Magang Digital Marketing</span>
          <br />
          <span className="text-foreground">+ Dapat Komisi!</span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
          Belajar digital marketing langsung dari praktik nyata dan dapatkan penghasilan dari setiap klien yang kamu dapatkan.
        </p>

        <Button variant="hero" size="lg" className="text-lg px-10 py-6 rounded-full">
          Daftar Magang Sekarang
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
