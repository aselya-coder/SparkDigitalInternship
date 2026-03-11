import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, UserCheck, Calendar, Info, RefreshCw } from "lucide-react";
import { useSiteData } from "@/hooks/use-site-data";
import { toast } from "sonner";
import { format } from "date-fns";

const RegistrationsAdmin = () => {
  const { siteData, deleteItem, loading, fetchAllData } = useSiteData();
  const { registrations } = siteData;

  const handleRefresh = async () => {
    await fetchAllData();
    toast.success("Data refreshed!");
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this registration record?")) {
      await deleteItem("registrations" as any, id);
    }
  };

  const getSourceBadge = (source: string) => {
    switch (source) {
      case 'hero':
        return <Badge className="bg-blue-500">Hero Section</Badge>;
      case 'cta':
        return <Badge className="bg-purple-500">CTA Section</Badge>;
      default:
        return <Badge variant="outline">{source}</Badge>;
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading registrations...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <UserCheck className="h-8 w-8 text-primary" />
          WhatsApp Registrations
        </h1>
        <Button variant="outline" size="sm" onClick={handleRefresh} className="flex gap-2">
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{registrations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Hero Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{registrations.filter(r => r.source === 'hero').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">CTA Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{registrations.filter(r => r.source === 'cta').length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registration Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Date & Time</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                      No registrations recorded yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  registrations.map((reg: any) => (
                    <TableRow key={reg.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {format(new Date(reg.created_at), "PPP p")}
                        </div>
                      </TableCell>
                      <TableCell>{getSourceBadge(reg.source)}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                          WhatsApp Clicked
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDelete(reg.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Info className="h-3 w-3" />
            <span>This log tracks every time a user clicks the registration button before being redirected to WhatsApp.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationsAdmin;
