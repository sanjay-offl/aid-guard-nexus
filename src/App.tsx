import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/layout";
import Dashboard from "./pages/Dashboard";
import RealTimeMonitor from "./pages/RealTimeMonitor";
import QualityTesting from "./pages/QualityTesting";
import Analytics from "./pages/Analytics";
import Hospitals from "./pages/Hospitals";
import Compliance from "./pages/Compliance";
import Users from "./pages/Users";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";
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
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/hospitals" element={<Hospitals />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/users" element={<Users />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
