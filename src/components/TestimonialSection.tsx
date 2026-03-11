import { Quote } from "lucide-react";
import { useSiteData } from "@/hooks/use-site-data";

const TestimonialSection = () => {
  const { siteData } = useSiteData();
  const { testimonials } = siteData;

  return (
    <section className="section-padding">
      <div className="container-narrow">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
          Apa Kata <span className="text-gradient">Mereka?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t: any, i: number) => (
            <div
              key={t.id || i}
              className="rounded-2xl border border-border bg-card p-6 relative hover:shadow-lg transition-shadow duration-300"
            >
              <Quote className="h-8 w-8 text-primary/20 mb-3" />
              <p className="text-foreground mb-4 italic leading-relaxed">"{t.text}"</p>
              <div>
                <p className="font-bold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
