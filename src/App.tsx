import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

// Admin Imports
import AdminLayout from "@/admin/layout/AdminLayout";
import Dashboard from "@/admin/pages/Dashboard";
import HeroAdmin from "@/admin/pages/HeroAdmin";
import BenefitsAdmin from "@/admin/pages/BenefitsAdmin";
import StepsAdmin from "@/admin/pages/StepsAdmin";
import CurriculumAdmin from "@/admin/pages/CurriculumAdmin";
import AudienceAdmin from "@/admin/pages/AudienceAdmin";
import CommissionAdmin from "@/admin/pages/CommissionAdmin";
import TestimonialAdmin from "@/admin/pages/TestimonialAdmin";
import CtaAdmin from "@/admin/pages/CtaAdmin";
import AdminManagement from "@/admin/pages/AdminManagement";
import RegistrationsAdmin from "@/admin/pages/RegistrationsAdmin";
import SettingsAdmin from "@/admin/pages/SettingsAdmin";
import Login from "@/admin/pages/Login";
import ProtectedRoute from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            
            {/* Admin Login */}
            <Route path="/admin/login" element={<Login />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="hero" element={<HeroAdmin />} />
              <Route path="benefits" element={<BenefitsAdmin />} />
              <Route path="steps" element={<StepsAdmin />} />
              <Route path="curriculum" element={<CurriculumAdmin />} />
              <Route path="audience" element={<AudienceAdmin />} />
              <Route path="commission" element={<CommissionAdmin />} />
              <Route path="testimonial" element={<TestimonialAdmin />} />
              <Route path="cta" element={<CtaAdmin />} />
              <Route path="users" element={<AdminManagement />} />
              <Route path="registrations" element={<RegistrationsAdmin />} />
              <Route path="settings" element={<SettingsAdmin />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
  </QueryClientProvider>
);

export default App;
