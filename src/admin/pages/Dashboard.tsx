import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LayoutDashboard, Users, MessageSquare, TrendingUp, ShieldCheck } from "lucide-react";
import { useSiteData } from "@/hooks/use-site-data";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { siteData } = useSiteData();
  const { testimonials, admins, benefits, curriculum } = siteData;

  const stats = [
    { label: "Total Views", value: "1,234", icon: LayoutDashboard },
    { label: "Admins", value: admins.length.toString(), icon: ShieldCheck },
    { label: "Curriculum Modules", value: curriculum.length.toString(), icon: TrendingUp },
    { label: "Testimonials", value: testimonials.length.toString(), icon: MessageSquare },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Testimonials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testimonials.slice(0, 3).map((t: any) => (
                <div key={t.id} className="border-b pb-2 last:border-0">
                  <p className="text-sm italic">"{t.text.slice(0, 100)}..."</p>
                  <p className="text-xs font-bold mt-1">— {t.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            <Button variant="outline" asChild className="justify-start">
              <a href="/admin/hero">Edit Hero</a>
            </Button>
            <Button variant="outline" asChild className="justify-start">
              <a href="/admin/testimonial">Edit Testimonials</a>
            </Button>
            <Button variant="outline" asChild className="justify-start">
              <a href="/admin/users">Manage Admins</a>
            </Button>
            <Button variant="outline" asChild className="justify-start">
              <a href="/">View Site</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
