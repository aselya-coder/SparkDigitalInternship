import { BookOpen, DollarSign, Wifi, Building, Award } from "lucide-react";
import { useSiteData } from "@/hooks/use-site-data";

const iconMap: Record<string, any> = {
  BookOpen,
  DollarSign,
  Wifi,
  Building,
  Award,
};

const BenefitsSection = () => {
  const { siteData } = useSiteData();
  const { benefits } = siteData;

  return (
    <section className="section-padding">
      <div className="container-narrow">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
          Kenapa Ikut <span className="text-gradient">Program Ini?</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b: any, i: number) => {
            const Icon = iconMap[b.icon] || BookOpen;
            return (
              <div
                key={b.id || i}
                className="group rounded-2xl border border-border bg-card p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-gradient-hero group-hover:text-primary-foreground transition-colors duration-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-1 text-foreground">{b.title}</h3>
                <p className="text-muted-foreground text-sm">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
