import { Share2, FileText, PenTool, Target, Users, BookOpen, DollarSign, Wifi, Building, Award, Handshake, CheckCircle, TrendingUp, GraduationCap, Briefcase, Rocket, Sparkles } from "lucide-react";

export const INITIAL_SITE_DATA = {
  hero: {
    badge: "🔥 Limited Slot — Daftar Sekarang!",
    title: "Magang Digital Marketing + Dapat Komisi!",
    description: "Belajar digital marketing langsung dari praktik nyata dan dapatkan penghasilan dari setiap klien yang kamu dapatkan.",
    buttonText: "Daftar Magang Sekarang"
  },
  benefits: [
    { id: "1", icon: "BookOpen", title: "Belajar Digital Marketing dari Nol", desc: "Materi terstruktur untuk pemula" },
    { id: "2", icon: "DollarSign", title: "Dapat Komisi dari Klien", desc: "Penghasilan nyata selama magang" },
    { id: "3", icon: "Wifi", title: "Kerja Remote / Fleksibel", desc: "Bisa dikerjakan dari mana saja" },
    { id: "4", icon: "Building", title: "Cocok untuk PKL / Magang Kampus", desc: "Bisa dijadikan laporan PKL/magang" },
    { id: "5", icon: "Award", title: "Sertifikat Magang", desc: "Bukti pengalaman profesional" },
  ],
  curriculum: [
    { id: "1", icon: "Share2", title: "Social Media Marketing" },
    { id: "2", icon: "FileText", title: "Content Marketing" },
    { id: "3", icon: "PenTool", title: "Copywriting" },
    { id: "4", icon: "Target", title: "Lead Generation" },
    { id: "5", icon: "Users", title: "Cara Mendapatkan Klien Digital Marketing" },
  ],
  commission: [
    { id: "1", icon: "Handshake", text: "Kamu membantu mendapatkan klien digital marketing" },
    { id: "2", icon: "CheckCircle", text: "Setiap klien yang deal → kamu mendapat komisi" },
    { id: "3", icon: "TrendingUp", text: "Tidak ada batas penghasilan!" },
  ],
  audience: [
    { id: "1", icon: "GraduationCap", text: "Mahasiswa jurusan marketing / bisnis / komunikasi" },
    { id: "2", icon: "Briefcase", text: "Siswa SMK yang sedang PKL" },
    { id: "3", icon: "Rocket", text: "Fresh graduate yang ingin pengalaman" },
    { id: "4", icon: "Sparkles", text: "Siapa saja yang ingin belajar digital marketing" },
  ],
  testimonials: [
    {
      id: "1",
      text: "Selama magang saya dapat pengalaman dan komisi pertama saya. Sangat worth it!",
      name: "Rina M.",
      role: "Mahasiswa Komunikasi",
    },
    {
      id: "2",
      text: "Belajar digital marketing tapi juga bisa menghasilkan. Program ini beda dari yang lain.",
      name: "Andi S.",
      role: "Siswa SMK",
    },
    {
      id: "3",
      text: "Saya fresh graduate dan program ini memberikan saya portofolio nyata untuk melamar kerja.",
      name: "Dina P.",
      role: "Fresh Graduate",
    },
  ],
  steps: [
    { id: "1", num: "1", title: "Daftar melalui form", desc: "Isi data diri dan kirim pendaftaran" },
    { id: "2", num: "2", title: "Ikuti onboarding", desc: "Pelajari sistem dan alur kerja" },
    { id: "3", num: "3", title: "Mulai belajar & cari klien", desc: "Praktik langsung digital marketing" },
    { id: "4", num: "4", title: "Dapatkan komisi", desc: "Setiap deal klien = penghasilan untukmu" },
  ],
  cta: {
    badge: "⚡ Limited Slot",
    title: "Mulai Karirmu di Digital Marketing Sekarang",
    description: "Jangan lewatkan kesempatan magang sambil menghasilkan. Slot terbatas!",
    buttonText: "Daftar Program Magang"
  },
  admins: [
    { id: "1", username: "admin", email: "admin@areakerja.com", role: "Super Admin" },
    { id: "2", username: "marketing", email: "marketing@areakerja.com", role: "Marketing Admin" },
  ],
  settings: {
    whatsapp_number: "6285646420488",
    whatsapp_message: "Halo, saya tertarik untuk mendaftar program magang digital marketing di areakerja.com. Mohon info lebih lanjut."
  },
  registrations: [] as any[]
};
