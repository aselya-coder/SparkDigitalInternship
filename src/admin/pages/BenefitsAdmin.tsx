import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, DollarSign, Wifi, Building, Award, Plus, Trash2, Edit2 } from "lucide-react";
import { useSiteData } from "@/hooks/use-site-data";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const iconMap: Record<string, any> = {
  BookOpen,
  DollarSign,
  Wifi,
  Building,
  Award,
};

const BenefitsAdmin = () => {
  const { siteData, addItem, updateItem, deleteItem } = useSiteData();
  const { benefits } = siteData;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ icon: "BookOpen", title: "", desc: "" });

  const handleOpenDialog = (benefit?: any) => {
    if (benefit) {
      setEditingId(benefit.id);
      setFormData({ icon: benefit.icon, title: benefit.title, desc: benefit.desc });
    } else {
      setEditingId(null);
      setFormData({ icon: "BookOpen", title: "", desc: "" });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      updateItem("benefits", editingId, formData);
      toast.success("Benefit updated!");
    } else {
      addItem("benefits", formData);
      toast.success("Benefit added!");
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure?")) {
      deleteItem("benefits", id);
      toast.success("Benefit deleted!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Benefits Section</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="flex gap-2">
              <Plus className="h-4 w-4" /> Add Benefit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Benefit" : "Add New Benefit"}</DialogTitle>
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
                <label className="text-sm font-medium">Title</label>
                <Input 
                  value={formData.title} 
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Sertifikat Magang"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  value={formData.desc} 
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  placeholder="e.g. Bukti pengalaman profesional"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSave}>{editingId ? "Save Changes" : "Add Benefit"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((b: any) => {
          const Icon = iconMap[b.icon] || BookOpen;
          return (
            <Card key={b.id} className="relative">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(b)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(b.id)} className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-bold text-lg">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BenefitsAdmin;
