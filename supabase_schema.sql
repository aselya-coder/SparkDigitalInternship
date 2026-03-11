-- SUPABASE SCHEMA LENGKAP UNTUK AREAKERJA ADMIN PANEL
-- Script ini bisa dijalankan berulang kali (Idempotent)

-- 0. CLEAN UP (Hapus jika sudah ada agar tidak error duplicate)
DROP TRIGGER IF EXISTS update_hero_updated_at ON public.hero;
DROP TRIGGER IF EXISTS update_cta_updated_at ON public.cta;
DROP TRIGGER IF EXISTS update_settings_updated_at ON public.settings;
DROP TRIGGER IF EXISTS update_configs_updated_at ON public.section_configs;
DROP FUNCTION IF EXISTS update_updated_at_column();

DROP TABLE IF EXISTS public.registrations;
DROP TABLE IF EXISTS public.admin_users;
DROP TABLE IF EXISTS public.cta;
DROP TABLE IF EXISTS public.steps;
DROP TABLE IF EXISTS public.testimonials;
DROP TABLE IF EXISTS public.audience;
DROP TABLE IF EXISTS public.commission;
DROP TABLE IF EXISTS public.curriculum;
DROP TABLE IF EXISTS public.benefits;
DROP TABLE IF EXISTS public.hero;
DROP TABLE IF EXISTS public.section_configs;
DROP TABLE IF EXISTS public.settings;

-- 1. Create Tables

-- 1.1 Konfigurasi Umum
CREATE TABLE public.settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 1.2 Judul & Subjudul Section
CREATE TABLE public.section_configs (
    section_id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 1.3 Hero Section
CREATE TABLE public.hero (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    badge TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    button_text TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 1.4 Benefits Section
CREATE TABLE public.benefits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    icon TEXT NOT NULL,
    title TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 1.5 Curriculum Section
CREATE TABLE public.curriculum (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    icon TEXT NOT NULL,
    title TEXT NOT NULL,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 1.6 Commission Section
CREATE TABLE public.commission (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    icon TEXT NOT NULL,
    text TEXT NOT NULL,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 1.7 Audience Section
CREATE TABLE public.audience (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    icon TEXT NOT NULL,
    text TEXT NOT NULL,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 1.8 Testimonials Section
CREATE TABLE public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    text TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 1.9 Steps Section
CREATE TABLE public.steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    num TEXT NOT NULL,
    title TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 1.10 CTA Section
CREATE TABLE public.cta (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    badge TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    button_text TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 1.11 Admin Users Section
CREATE TABLE public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 1.12 Registrations Table
CREATE TABLE public.registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    source TEXT, -- 'hero', 'cta', 'floating'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.section_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculum ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commission ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cta ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies

-- SETTINGS
CREATE POLICY "Public Read Settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Admin CRUD Settings" ON public.settings FOR ALL TO authenticated USING (true);

-- SECTION CONFIGS
CREATE POLICY "Public Read Configs" ON public.section_configs FOR SELECT USING (true);
CREATE POLICY "Admin CRUD Configs" ON public.section_configs FOR ALL TO authenticated USING (true);

-- HERO
CREATE POLICY "Public Read Hero" ON public.hero FOR SELECT USING (true);
CREATE POLICY "Admin CRUD Hero" ON public.hero FOR ALL TO authenticated USING (true);

-- BENEFITS
CREATE POLICY "Public Read Benefits" ON public.benefits FOR SELECT USING (true);
CREATE POLICY "Admin CRUD Benefits" ON public.benefits FOR ALL TO authenticated USING (true);

-- CURRICULUM
CREATE POLICY "Public Read Curriculum" ON public.curriculum FOR SELECT USING (true);
CREATE POLICY "Admin CRUD Curriculum" ON public.curriculum FOR ALL TO authenticated USING (true);

-- COMMISSION
CREATE POLICY "Public Read Commission" ON public.commission FOR SELECT USING (true);
CREATE POLICY "Admin CRUD Commission" ON public.commission FOR ALL TO authenticated USING (true);

-- AUDIENCE
CREATE POLICY "Public Read Audience" ON public.audience FOR SELECT USING (true);
CREATE POLICY "Admin CRUD Audience" ON public.audience FOR ALL TO authenticated USING (true);

-- TESTIMONIALS
CREATE POLICY "Public Read Testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Admin CRUD Testimonials" ON public.testimonials FOR ALL TO authenticated USING (true);

-- STEPS
CREATE POLICY "Public Read Steps" ON public.steps FOR SELECT USING (true);
CREATE POLICY "Admin CRUD Steps" ON public.steps FOR ALL TO authenticated USING (true);

-- CTA
CREATE POLICY "Public Read CTA" ON public.cta FOR SELECT USING (true);
CREATE POLICY "Admin CRUD CTA" ON public.cta FOR ALL TO authenticated USING (true);

-- REGISTRATIONS
CREATE POLICY "Enable insert for all users" ON public.registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read/delete for authenticated admins" ON public.registrations FOR ALL TO authenticated USING (true);

-- ADMIN USERS
CREATE POLICY "Admin Read Admin Users" ON public.admin_users FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin CRUD Admin Users" ON public.admin_users FOR ALL TO authenticated USING (true);

-- 4. INSERT DATA AWAL (LENGKAP 100%)

-- Settings
INSERT INTO public.settings (key, value) VALUES 
('whatsapp_number', '6285646420488'),
('whatsapp_message', 'Halo, saya tertarik untuk mendaftar program magang digital marketing di areakerja.com. Mohon info lebih lanjut.');

-- Section Configs
INSERT INTO public.section_configs (section_id, title, subtitle) VALUES 
('benefits', 'Kenapa Ikut Program Ini?', NULL),
('curriculum', 'Apa yang Akan Dipelajari?', NULL),
('commission', 'Belajar Sambil Menghasilkan', 'Sistem komisi transparan yang memberi kamu penghasilan nyata.'),
('audience', 'Cocok Untuk Siapa?', NULL),
('testimonials', 'Apa Kata Mereka?', NULL),
('steps', 'Cara Bergabung', NULL);

-- Hero
INSERT INTO public.hero (badge, title, description, button_text)
VALUES ('🔥 Limited Slot — Daftar Sekarang!', 'Magang Digital Marketing + Dapat Komisi!', 'Belajar digital marketing langsung dari praktik nyata dan dapatkan penghasilan dari setiap klien yang kamu dapatkan.', 'Daftar Magang Sekarang');

-- Benefits
INSERT INTO public.benefits (icon, title, "desc", order_index) VALUES 
('BookOpen', 'Belajar Digital Marketing dari Nol', 'Materi terstruktur untuk pemula', 0),
('DollarSign', 'Dapat Komisi dari Klien', 'Penghasilan nyata selama magang', 1),
('Wifi', 'Kerja Remote / Fleksibel', 'Bisa dikerjakan dari mana saja', 2),
('Building', 'Cocok untuk PKL / Magang Kampus', 'Bisa dijadikan laporan PKL/magang', 3),
('Award', 'Sertifikat Magang', 'Bukti pengalaman profesional', 4);

-- Curriculum
INSERT INTO public.curriculum (icon, title, order_index) VALUES 
('Share2', 'Social Media Marketing', 0),
('FileText', 'Content Marketing', 1),
('PenTool', 'Copywriting', 2),
('Target', 'Lead Generation', 3),
('Users', 'Cara Mendapatkan Klien Digital Marketing', 4);

-- Commission
INSERT INTO public.commission (icon, text, order_index) VALUES 
('Handshake', 'Kamu membantu mendapatkan klien digital marketing', 0),
('CheckCircle', 'Setiap klien yang deal → kamu mendapat komisi', 1),
('TrendingUp', 'Tidak ada batas penghasilan!', 2);

-- Audience
INSERT INTO public.audience (icon, text, order_index) VALUES 
('GraduationCap', 'Mahasiswa jurusan marketing / bisnis / komunikasi', 0),
('Briefcase', 'Siswa SMK yang sedang PKL', 1),
('Rocket', 'Fresh graduate yang ingin pengalaman', 2),
('Sparkles', 'Siapa saja yang ingin belajar digital marketing', 3);

-- Testimonials
INSERT INTO public.testimonials (text, name, role) VALUES 
('Selama magang saya dapat pengalaman dan komisi pertama saya. Sangat worth it!', 'Rina M.', 'Mahasiswa Komunikasi'),
('Belajar digital marketing tapi juga bisa menghasilkan. Program ini beda dari yang lain.', 'Andi S.', 'Siswa SMK'),
('Saya fresh graduate dan program ini memberikan saya portofolio nyata untuk melamar kerja.', 'Dina P.', 'Fresh Graduate');

-- Steps
INSERT INTO public.steps (num, title, "desc", order_index) VALUES 
('1', 'Daftar melalui form', 'Isi data diri dan kirim pendaftaran', 0),
('2', 'Ikuti onboarding', 'Pelajari sistem dan alur kerja', 1),
('3', 'Mulai belajar & cari klien', 'Praktik langsung digital marketing', 2),
('4', 'Dapatkan komisi', 'Setiap deal klien = penghasilan untukmu', 3);

-- CTA
INSERT INTO public.cta (badge, title, description, button_text)
VALUES ('⚡ Limited Slot', 'Mulai Karirmu di Digital Marketing Sekarang', 'Jangan lewatkan kesempatan magang sambil menghasilkan. Slot terbatas!', 'Daftar Program Magang');

-- Admin Users (Hanya Super Admin)
INSERT INTO public.admin_users (username, email, role) VALUES 
('admin', 'admin@areakerja.com', 'Super Admin');

-- 5. Helper Function for Updating Timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_hero_updated_at BEFORE UPDATE ON public.hero FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_cta_updated_at BEFORE UPDATE ON public.cta FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON public.settings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_configs_updated_at BEFORE UPDATE ON public.section_configs FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
