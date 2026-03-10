import { Handshake, CheckCircle, TrendingUp } from "lucide-react";

const steps = [
  { icon: Handshake, text: "Kamu membantu mendapatkan klien digital marketing" },
  { icon: CheckCircle, text: "Setiap klien yang deal → kamu mendapat komisi" },
  { icon: TrendingUp, text: "Tidak ada batas penghasilan!" },
];

const CommissionSection = () => {
  return (
    <section className="section-padding">
      <div className="container-narrow text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Belajar Sambil <span className="text-gradient">Menghasilkan</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
          Sistem komisi transparan yang memberi kamu penghasilan nyata.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center max-w-xs">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-hero text-primary-foreground shadow-lg shadow-primary/20">
                <step.icon className="h-7 w-7" />
              </div>
              <p className="font-semibold text-foreground">{step.text}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommissionSection;
