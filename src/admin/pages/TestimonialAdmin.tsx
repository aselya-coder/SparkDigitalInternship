import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Quote, Plus, Trash2, Edit2 } from "lucide-react";
import { useSiteData } from "@/hooks/use-site-data";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";

const TestimonialAdmin = () => {
  const { siteData, addItem, updateItem, deleteItem } = useSiteData();
  const { testimonials } = siteData;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ text: "", name: "", role: "" });

  const handleOpenDialog = (testimonial?: any) => {
    if (testimonial) {
      setEditingId(testimonial.id);
      setFormData({ text: testimonial.text, name: testimonial.name, role: testimonial.role });
    } else {
      setEditingId(null);
      setFormData({ text: "", name: "", role: "" });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      updateItem("testimonials", editingId, formData);
      toast.success("Testimonial updated!");
    } else {
      addItem("testimonials", formData);
      toast.success("Testimonial added!");
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      deleteItem("testimonials", id);
      toast.success("Testimonial deleted!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Testimonials</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="flex gap-2">
              <Plus className="h-4 w-4" /> Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
              <DialogDescription>
                Fill in the details below to {editingId ? "update the existing" : "create a new"} testimonial.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rina M."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Input 
                  value={formData.role} 
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. Mahasiswa Komunikasi"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Testimonial Text</label>
                <Textarea 
                  value={formData.text} 
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  placeholder="Enter the testimonial message..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSave}>{editingId ? "Save Changes" : "Add Testimonial"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t: any) => (
          <Card key={t.id} className="relative">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <Quote className="h-8 w-8 text-primary/20" />
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => handleOpenDialog(t)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => handleDelete(t.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground mb-4 italic leading-relaxed">"{t.text}"</p>
              <div>
                <p className="font-bold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestimonialAdmin;
