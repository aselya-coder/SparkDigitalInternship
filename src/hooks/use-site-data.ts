import { useState, useEffect } from "react";
import { INITIAL_SITE_DATA } from "@/lib/site-data";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const useSiteData = () => {
  const [data, setData] = useState(INITIAL_SITE_DATA);
  const [loading, setLoading] = useState(true);

  // 1. Fetch data from Supabase on Mount
  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      const [
        { data: hero },
        { data: benefits },
        { data: curriculum },
        { data: commission },
        { data: audience },
        { data: testimonials },
        { data: steps },
        { data: cta },
        { data: settings },
        { data: section_configs },
        { data: admins },
        { data: registrations }
      ] = await Promise.all([
        supabase.from('hero').select('*').single(),
        supabase.from('benefits').select('*').order('order_index'),
        supabase.from('curriculum').select('*').order('order_index'),
        supabase.from('commission').select('*').order('order_index'),
        supabase.from('audience').select('*').order('order_index'),
        supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
        supabase.from('steps').select('*').order('order_index'),
        supabase.from('cta').select('*').single(),
        supabase.from('settings').select('*'),
        supabase.from('section_configs').select('*'),
        supabase.from('admin_users').select('*'),
        supabase.from('registrations').select('*').order('created_at', { ascending: false })
      ]);

      setData({
        hero: hero ? { ...hero, buttonText: hero.button_text || hero.buttonText } : INITIAL_SITE_DATA.hero,
        benefits: benefits || INITIAL_SITE_DATA.benefits,
        curriculum: curriculum || INITIAL_SITE_DATA.curriculum,
        commission: commission || INITIAL_SITE_DATA.commission,
        audience: audience || INITIAL_SITE_DATA.audience,
        testimonials: testimonials || INITIAL_SITE_DATA.testimonials,
        steps: steps || INITIAL_SITE_DATA.steps,
        cta: cta ? { ...cta, buttonText: cta.button_text || cta.buttonText } : INITIAL_SITE_DATA.cta,
        admins: admins || INITIAL_SITE_DATA.admins,
        registrations: registrations || [],
      });
    } catch (error: any) {
      console.error("Error fetching from Supabase:", error);
      
      // Jika error 401 atau session invalid, paksa logout
      if (error.code === 'PGRST301' || error.status === 401 || error.message?.includes('fetch')) {
        toast.error("Sesi berakhir atau server tidak terjangkau. Mengalihkan ke login...");
        supabase.auth.signOut().then(() => {
          window.location.href = '/admin/login';
        });
      }

      // Fallback to initial data if Supabase fails (e.g. not configured)
      setData(INITIAL_SITE_DATA);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // 2. Generic Update for Single Object (Hero, CTA)
  const updateSection = async (section: keyof typeof INITIAL_SITE_DATA, newData: any) => {
    try {
      // Map camelCase to snake_case for Supabase
      const mappedData = { ...newData };
      if (mappedData.buttonText) {
        mappedData.button_text = mappedData.buttonText;
        delete mappedData.buttonText;
      }

      const { error } = await supabase
        .from(section as string)
        .update(mappedData)
        .eq('id', (data[section] as any).id);

      if (error) throw error;
      
      setData((prev: any) => ({ ...prev, [section]: newData }));
      toast.success(`${section} updated successfully!`);
    } catch (error) {
      toast.error(`Failed to update ${section}`);
      console.error(error);
    }
  };

  // 3. CRUD for Arrays (Benefits, Curriculum, etc.)
  const addItem = async (section: keyof typeof INITIAL_SITE_DATA, item: any) => {
    try {
      const tableName = section === 'admins' ? 'admin_users' : section;
      const { data: insertedData, error } = await supabase
        .from(tableName as string)
        .insert([item])
        .select()
        .single();

      if (error) throw error;

      setData((prev: any) => ({
        ...prev,
        [section]: [...(prev[section] as any[]), insertedData]
      }));
      toast.success(`Item added to ${section}!`);
    } catch (error) {
      toast.error(`Failed to add item to ${section}`);
      console.error(error);
    }
  };

  const updateItem = async (section: keyof typeof INITIAL_SITE_DATA, id: string, newData: any) => {
    try {
      const tableName = section === 'admins' ? 'admin_users' : section;
      const { error } = await supabase
        .from(tableName as string)
        .update(newData)
        .eq('id', id);

      if (error) throw error;

      setData((prev: any) => ({
        ...prev,
        [section]: (prev[section] as any[]).map((item: any) => 
          item.id === id ? { ...item, ...newData } : item
        )
      }));
      toast.success(`Item in ${section} updated!`);
    } catch (error) {
      toast.error(`Failed to update item in ${section}`);
      console.error(error);
    }
  };

  const deleteItem = async (section: keyof typeof INITIAL_SITE_DATA, id: string) => {
    try {
      const tableName = section === 'admins' ? 'admin_users' : section;
      const { error } = await supabase
        .from(tableName as string)
        .delete()
        .eq('id', id);

      if (error) throw error;

      setData((prev: any) => ({
        ...prev,
        [section]: (prev[section] as any[]).filter((item: any) => item.id !== id)
      }));
      toast.success(`Item deleted from ${section}!`);
    } catch (error) {
      toast.error(`Failed to delete item from ${section}`);
      console.error(error);
    }
  };

  const trackRegistration = async (source: string) => {
    try {
      const { error } = await supabase
        .from('registrations')
        .insert([{ source, created_at: new Date().toISOString() }]);
      
      if (error) {
        console.error("Supabase error:", error);
      } else {
        // Refresh data agar langsung muncul di admin tanpa reload
        fetchAllData();
      }
    } catch (error) {
      console.error("Failed to track registration:", error);
    }
  };

  return { 
    siteData: data, 
    loading,
    updateSection, 
    addItem, 
    updateItem, 
    deleteItem,
    trackRegistration,
    fetchAllData
  };
};
