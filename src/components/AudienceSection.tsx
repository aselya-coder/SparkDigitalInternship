import { GraduationCap, Briefcase, Rocket, Sparkles } from "lucide-react";
import { useSiteData } from "@/hooks/use-site-data";

const iconMap: Record<string, any> = {
  GraduationCap,
  Briefcase,
  Rocket,
  Sparkles,
};

const AudienceSection = () => {
  const { siteData } = useSiteData();
  const { audience } = siteData;

  return (
    <section className="section-padding bg-gradient-card">
      <div className="container-narrow">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
          Cocok Untuk <span className="text-gradient">Siapa?</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {audience.map((a: any, i: number) => {
            const Icon = iconMap[a.icon] || GraduationCap;
            return (
              <div
                key={a.id || i}
                className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 hover:shadow-md transition-all duration-300"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-medium text-foreground pt-1.5">{a.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
