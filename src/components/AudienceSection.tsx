import { GraduationCap, Briefcase, Rocket, Sparkles } from "lucide-react";

const audiences = [
  { icon: GraduationCap, text: "Mahasiswa jurusan marketing / bisnis / komunikasi" },
  { icon: Briefcase, text: "Siswa SMK yang sedang PKL" },
  { icon: Rocket, text: "Fresh graduate yang ingin pengalaman" },
  { icon: Sparkles, text: "Siapa saja yang ingin belajar digital marketing" },
];

const AudienceSection = () => {
  return (
    <section className="section-padding bg-gradient-card">
      <div className="container-narrow">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
          Cocok Untuk <span className="text-gradient">Siapa?</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {audiences.map((a, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 hover:shadow-md transition-all duration-300"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <a.icon className="h-5 w-5" />
              </div>
              <span className="font-medium text-foreground pt-1.5">{a.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
