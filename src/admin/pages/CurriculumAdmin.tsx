import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Share2, FileText, PenTool, Target, Users, Plus, Trash2, Edit2 } from "lucide-react";
import { useSiteData } from "@/hooks/use-site-data";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const iconMap: Record<string, any> = {
  Share2,
  FileText,
  PenTool,
  Target,
  Users,
};

const CurriculumAdmin = () => {
  const { siteData, addItem, updateItem, deleteItem } = useSiteData();
  const { curriculum } = siteData;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ icon: "Share2", title: "" });

  const handleOpenDialog = (item?: any) => {
    if (item) {
      setEditingId(item.id);
      setFormData({ icon: item.icon, title: item.title });
    } else {
      setEditingId(null);
      setFormData({ icon: "Share2", title: "" });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      updateItem("curriculum", editingId, formData);
      toast.success("Curriculum item updated!");
    } else {
      addItem("curriculum", formData);
      toast.success("Curriculum item added!");
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure?")) {
      deleteItem("curriculum", id);
      toast.success("Curriculum item deleted!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Curriculum Section</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="flex gap-2">
              <Plus className="h-4 w-4" /> Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Item" : "Add New Item"}</DialogTitle>
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
                  placeholder="e.g. Social Media Marketing"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSave}>{editingId ? "Save Changes" : "Add Item"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {curriculum.map((item: any) => {
          const Icon = iconMap[item.icon] || Share2;
          return (
            <Card key={item.id} className="relative">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-semibold">{item.title}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(item)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="text-destructive">
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

export default CurriculumAdmin;
