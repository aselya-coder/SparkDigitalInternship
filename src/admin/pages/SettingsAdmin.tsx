import { useState, useEffect } from "react";
import { useSiteData } from "@/hooks/use-site-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, Phone, MessageSquare } from "lucide-react";

const SettingsAdmin = () => {
  const { data, loading, updateSettings } = useSiteData();
  const [formData, setFormData] = useState({
    whatsapp_number: "",
    whatsapp_message: ""
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data.settings) {
      setFormData({
        whatsapp_number: data.settings.whatsapp_number || "",
        whatsapp_message: data.settings.whatsapp_message || ""
      });
    }
  }, [data.settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSettings(formData);
    setIsSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">General Settings</h2>
        <p className="text-muted-foreground">
          Kelola konfigurasi umum website seperti nomor WhatsApp dan pesan pendaftaran.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Konfigurasi WhatsApp
          </CardTitle>
          <CardDescription>
            Nomor ini akan digunakan untuk semua tombol "Daftar" di landing page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp_number">Nomor WhatsApp (Gunakan kode negara, misal: 628...)</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="whatsapp_number"
                  value={formData.whatsapp_number}
                  onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
                  placeholder="62856..."
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp_message">Pesan Otomatis WhatsApp</Label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="whatsapp_message"
                  value={formData.whatsapp_message}
                  onChange={(e) => setFormData({ ...formData, whatsapp_message: e.target.value })}
                  placeholder="Halo, saya tertarik..."
                  className="pl-10 min-h-[100px]"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-muted/50 border-dashed">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Informasi Penting</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>• Pastikan nomor WhatsApp diawali dengan kode negara (62 untuk Indonesia) tanpa tanda + atau spasi.</p>
          <p>• Pesan otomatis akan muncul di layar chat WhatsApp calon pendaftar saat mereka klik tombol daftar.</p>
          <p>• Perubahan akan langsung diterapkan ke seluruh tombol pendaftaran di landing page secara real-time.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsAdmin;