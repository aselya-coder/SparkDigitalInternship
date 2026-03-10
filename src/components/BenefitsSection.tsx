import { BookOpen, DollarSign, Wifi, Building, Award } from "lucide-react";

const benefits = [
  { icon: BookOpen, title: "Belajar Digital Marketing dari Nol", desc: "Materi terstruktur untuk pemula" },
  { icon: DollarSign, title: "Dapat Komisi dari Klien", desc: "Penghasilan nyata selama magang" },
  { icon: Wifi, title: "Kerja Remote / Fleksibel", desc: "Bisa dikerjakan dari mana saja" },
  { icon: Building, title: "Cocok untuk PKL / Magang Kampus", desc: "Bisa dijadikan laporan PKL/magang" },
  { icon: Award, title: "Sertifikat Magang", desc: "Bukti pengalaman profesional" },
];

const BenefitsSection = () => {
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
          Kenapa Ikut <span className="text-gradient">Program Ini?</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-border bg-card p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-gradient-hero group-hover:text-primary-foreground transition-colors duration-300">
                <b.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg mb-1 text-foreground">{b.title}</h3>
              <p className="text-muted-foreground text-sm">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
