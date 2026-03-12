import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Check current session
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        // Verifikasi apakah session masih valid di server (Supabase)
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          setSession(null);
        } else {
          setSession(session);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes (SIGNED_OUT, TOKEN_REFRESHED, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth event:", event);
      if (event === 'SIGNED_OUT' || event === 'USER_UPDATED') {
        setSession(null);
      } else if (session) {
        setSession(session);
      }
    });

    // Pengecekan berkala (setiap 30 detik) untuk memastikan server masih terjangkau
    const interval = setInterval(async () => {
      const { error } = await supabase.from('hero').select('id').limit(1);
      if (error && (error.code === 'PGRST301' || error.message.includes('fetch'))) {
        // Jika error koneksi atau session invalid
        console.error("Server unreachable or session expired, logging out...");
        
        // Hapus localStorage manual untuk memastikan tidak ada sisa sesi yang tersangkut
        localStorage.removeItem('supabase.auth.token');
        Object.keys(localStorage).forEach(key => {
          if (key.includes('sb-') && key.includes('-auth-token')) {
            localStorage.removeItem(key);
          }
        });

        await supabase.auth.signOut();
        setSession(null);
      }
    }, 30000);

    return () => {
      subscription.unsubscribe();
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
