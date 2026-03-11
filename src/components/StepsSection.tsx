import { useSiteData } from "@/hooks/use-site-data";

const StepsSection = () => {
  const { siteData } = useSiteData();
  const { steps } = siteData;

  return (
    <section className="section-padding bg-gradient-card">
      <div className="container-narrow">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
          Cara <span className="text-gradient">Bergabung</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s: any, i: number) => (
            <div key={s.id || i} className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-hero text-primary-foreground font-extrabold text-xl shadow-lg shadow-primary/20">
                {s.num}
              </div>
              <h3 className="font-bold text-foreground mb-1">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
