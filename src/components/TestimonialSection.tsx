import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "Selama magang saya dapat pengalaman dan komisi pertama saya. Sangat worth it!",
    name: "Rina M.",
    role: "Mahasiswa Komunikasi",
  },
  {
    text: "Belajar digital marketing tapi juga bisa menghasilkan. Program ini beda dari yang lain.",
    name: "Andi S.",
    role: "Siswa SMK",
  },
  {
    text: "Saya fresh graduate dan program ini memberikan saya portofolio nyata untuk melamar kerja.",
    name: "Dina P.",
    role: "Fresh Graduate",
  },
];

const TestimonialSection = () => {
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
          Apa Kata <span className="text-gradient">Mereka?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
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
