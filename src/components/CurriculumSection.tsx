import { Share2, FileText, PenTool, Target, Users } from "lucide-react";
import { useSiteData } from "@/hooks/use-site-data";

const iconMap: Record<string, any> = {
  Share2,
  FileText,
  PenTool,
  Target,
  Users,
};

const CurriculumSection = () => {
  const { siteData } = useSiteData();
  const { curriculum } = siteData;

  return (
    <section className="section-padding bg-gradient-card">
      <div className="container-narrow">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
          Apa yang Akan <span className="text-gradient">Dipelajari?</span>
        </h2>

        <div className="space-y-4 max-w-2xl mx-auto">
          {curriculum.map((item: any, i: number) => {
            const Icon = iconMap[item.icon] || Share2;
            return (
              <div
                key={item.id || i}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-semibold text-foreground">{item.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;
