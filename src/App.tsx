import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import { AuthPage } from "./pages/AuthPage";
import { BecomeHostPage } from "./pages/BecomeHostPage";
import { HostIndex } from "./host/pages/HostIndex";
import { AdminDashboard } from "./admin/pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<Index />} />
            <Route 
              path="/become-host" 
              element={
                <ProtectedRoute>
                  <BecomeHostPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/host/*"
              element={
                <ProtectedRoute requireHost>
                  <HostIndex />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
