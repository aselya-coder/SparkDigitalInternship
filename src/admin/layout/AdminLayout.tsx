import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarFooter,
  SidebarTrigger,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarInset
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Home, 
  CheckCircle, 
  TrendingUp, 
  BookOpen, 
  Users, 
  DollarSign, 
  MessageSquare, 
  Megaphone, 
  ShieldCheck, 
  UserCheck, 
  LogOut,
  ChevronRight,
  Settings,
  Globe
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const landingPageItems = [
  { icon: Home, label: "Hero Section", path: "/admin/hero" },
  { icon: CheckCircle, label: "Benefits Section", path: "/admin/benefits" },
  { icon: TrendingUp, label: "Steps Section", path: "/admin/steps" },
  { icon: BookOpen, label: "Curriculum Section", path: "/admin/curriculum" },
  { icon: Users, label: "Audience Section", path: "/admin/audience" },
  { icon: DollarSign, label: "Commission Section", path: "/admin/commission" },
  { icon: MessageSquare, label: "Testimonial Section", path: "/admin/testimonial" },
  { icon: Megaphone, label: "CTA Section", path: "/admin/cta" },
];

const managementItems = [
  { icon: ShieldCheck, label: "Manage Admins", path: "/admin/users" },
  { icon: UserCheck, label: "WhatsApp Registrations", path: "/admin/registrations" },
];

const allItems = [
  { label: "Dashboard", path: "/admin" },
  ...landingPageItems,
  ...managementItems,
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

  const isActive = (path: string) => location.pathname === path;
  const isLandingPageActive = landingPageItems.some(item => isActive(item.path));
  const isManagementActive = managementItems.some(item => isActive(item.path));

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar collapsible="icon">
          <SidebarHeader className="p-4 border-b">
            <div className="flex items-center gap-2 px-2">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg overflow-hidden">
                <img src="/favicon.ico" alt="Logo" className="size-full object-contain" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-lg">Admin Panel</span>
                <span className="truncate text-xs text-muted-foreground">Digital Marketing</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/admin")}>
                    <Link to="/admin">
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Content Management</SidebarGroupLabel>
              <SidebarMenu>
                <Collapsible defaultOpen={isLandingPageActive} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip="Landing Page">
                        <Globe className="h-4 w-4" />
                        <span>Landing Page</span>
                        <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {landingPageItems.map((item) => (
                          <SidebarMenuSubItem key={item.path}>
                            <SidebarMenuSubButton asChild isActive={isActive(item.path)}>
                              <Link to={item.path}>
                                <item.icon className="h-4 w-4" />
                                <span>{item.label}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>System</SidebarGroupLabel>
              <SidebarMenu>
                <Collapsible defaultOpen={isManagementActive} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip="Management">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Management</span>
                        <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {managementItems.map((item) => (
                          <SidebarMenuSubItem key={item.path}>
                            <SidebarMenuSubButton asChild isActive={isActive(item.path)}>
                              <Link to={item.path}>
                                <item.icon className="h-4 w-4" />
                                <span>{item.label}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Links</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/">
                      <Home className="h-4 w-4" />
                      <span>Back to Website</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
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
        
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1">
               <h1 className="text-sm font-medium text-muted-foreground md:text-base">
                 {allItems.find(i => i.path === location.pathname)?.label || "Dashboard"}
               </h1>
             </div>
          </header>
          <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-muted/30">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
