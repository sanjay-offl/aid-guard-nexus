import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/layout";
import Dashboard from "./pages/Dashboard";
import RealTimeMonitor from "./pages/RealTimeMonitor";
import QualityTesting from "./pages/QualityTesting";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/monitor" element={<RealTimeMonitor />} />
            <Route path="/testing" element={<QualityTesting />} />
            {/* Placeholder routes - will be implemented in future iterations */}
            <Route path="/analytics" element={<Dashboard />} />
            <Route path="/hospitals" element={<Dashboard />} />
            <Route path="/compliance" element={<Dashboard />} />
            <Route path="/users" element={<Dashboard />} />
            <Route path="/alerts" element={<Dashboard />} />
            <Route path="/settings" element={<Dashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
