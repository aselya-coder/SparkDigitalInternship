import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Edit2, UserCog } from "lucide-react";
import { useSiteData } from "@/hooks/use-site-data";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminManagement = () => {
  const { siteData, addItem, updateItem, deleteItem } = useSiteData();
  const { admins } = siteData;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ username: "", email: "", role: "" });

  const handleOpenDialog = (admin?: any) => {
    if (admin) {
      setEditingId(admin.id);
      setFormData({ username: admin.username, email: admin.email, role: admin.role });
    } else {
      setEditingId(null);
      setFormData({ username: "", email: "", role: "" });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      updateItem("admins", editingId, formData);
      toast.success("Admin user updated!");
    } else {
      addItem("admins", formData);
      toast.success("Admin user added!");
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this admin user?")) {
      deleteItem("admins", id);
      toast.success("Admin user deleted!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <UserCog className="h-8 w-8 text-primary" />
          Manage Admin Users
        </h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="flex gap-2">
              <Plus className="h-4 w-4" /> Add Admin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Admin User" : "Add New Admin User"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Username</label>
                <Input 
                  value={formData.username} 
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="e.g. jdoe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input 
                  type="email"
                  value={formData.email} 
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. john@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Input 
                  value={formData.role} 
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. Editor / Admin"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSave}>{editingId ? "Save Changes" : "Add Admin"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registered Admins</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((admin: any) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">{admin.username}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.role}</TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(admin)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(admin.id)} className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminManagement;
