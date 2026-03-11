import { Outlet, Link, useNavigate } from "react-router-dom";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter } from "@/components/ui/sidebar";
import { LayoutDashboard, Home, CheckCircle, TrendingUp, BookOpen, Users, DollarSign, MessageSquare, Megaphone, ShieldCheck, UserCheck, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Home, label: "Hero Section", path: "/admin/hero" },
  { icon: CheckCircle, label: "Benefits Section", path: "/admin/benefits" },
  { icon: TrendingUp, label: "Steps Section", path: "/admin/steps" },
  { icon: BookOpen, label: "Curriculum Section", path: "/admin/curriculum" },
  { icon: Users, label: "Audience Section", path: "/admin/audience" },
  { icon: DollarSign, label: "Commission Section", path: "/admin/commission" },
  { icon: MessageSquare, label: "Testimonial Section", path: "/admin/testimonial" },
  { icon: Megaphone, label: "CTA Section", path: "/admin/cta" },
  { icon: ShieldCheck, label: "Manage Admins", path: "/admin/users" },
  { icon: UserCheck, label: "WhatsApp Registrations", path: "/admin/registrations" },
];

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Logged out successfully");
      navigate("/admin/login");
    } catch (error: any) {
      toast.error(error.message || "Failed to logout");
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="p-4 border-b">
            <h2 className="font-bold text-lg">Admin Digital Marketing</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton asChild>
                        <Link to={item.path} className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/" className="flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        <span>Back to Website</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 p-8 bg-muted/30">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
