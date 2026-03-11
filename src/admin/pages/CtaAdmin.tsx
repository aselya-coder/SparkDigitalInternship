import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSiteData } from "@/hooks/use-site-data";
import { toast } from "sonner";

const CtaAdmin = () => {
  const { siteData, updateSection } = useSiteData();
  const { cta } = siteData;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(cta);

  // Sync formData with cta when it's fetched or isEditing is toggled
  useEffect(() => {
    if (!isEditing) {
      setFormData(cta);
    }
  }, [cta, isEditing]);

  const handleSave = () => {
    updateSection("cta", formData);
    setIsEditing(false);
    toast.success("CTA section updated!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage CTA Section</h1>
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit CTA Content"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "Edit CTA Content" : "Current CTA Content"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Badge Text</label>
                <Input 
                  value={formData.badge} 
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Main Title</label>
                <Input 
                  value={formData.title} 
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  value={formData.description} 
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Button Label</label>
                <Input 
                  value={formData.buttonText} 
                  onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                />
              </div>
              <Button onClick={handleSave} className="w-full">Save Changes</Button>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Badge Text</label>
                <div className="p-3 bg-muted rounded-md">
                  <Badge>{cta.badge}</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Main Title</label>
                <div className="p-3 bg-muted rounded-md font-bold text-xl">
                  {cta.title}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <div className="p-3 bg-muted rounded-md">
                  {cta.description}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Button Label</label>
                <div className="p-3 bg-muted rounded-md">
                  {cta.buttonText}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CtaAdmin;
