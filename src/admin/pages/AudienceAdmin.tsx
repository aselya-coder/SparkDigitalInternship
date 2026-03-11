import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GraduationCap, Briefcase, Rocket, Sparkles, Plus, Trash2, Edit2 } from "lucide-react";
import { useSiteData } from "@/hooks/use-site-data";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const iconMap: Record<string, any> = {
  GraduationCap,
  Briefcase,
  Rocket,
  Sparkles,
};

const AudienceAdmin = () => {
  const { siteData, addItem, updateItem, deleteItem } = useSiteData();
  const { audience } = siteData;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ icon: "GraduationCap", text: "" });

  const handleOpenDialog = (item?: any) => {
    if (item) {
      setEditingId(item.id);
      setFormData({ icon: item.icon, text: item.text });
    } else {
      setEditingId(null);
      setFormData({ icon: "GraduationCap", text: "" });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      updateItem("audience", editingId, formData);
      toast.success("Audience item updated!");
    } else {
      addItem("audience", formData);
      toast.success("Audience item added!");
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure?")) {
      deleteItem("audience", id);
      toast.success("Audience item deleted!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Audience Section</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="flex gap-2">
              <Plus className="h-4 w-4" /> Add Audience
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Audience" : "Add New Audience"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Icon</label>
                <Select value={formData.icon} onValueChange={(v) => setFormData({ ...formData, icon: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(iconMap).map((iconName) => (
                      <SelectItem key={iconName} value={iconName}>
                        <div className="flex items-center gap-2">
                          {iconName}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description Text</label>
                <Input 
                  value={formData.text} 
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  placeholder="e.g. Mahasiswa jurusan marketing"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSave}>{editingId ? "Save Changes" : "Add Audience"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {audience.map((a: any) => {
          const Icon = iconMap[a.icon] || GraduationCap;
          return (
            <Card key={a.id} className="relative">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{a.text}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(a)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(a.id)} className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AudienceAdmin;
