import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Agriculture from "./pages/Agriculture";
import Climate from "./pages/Climate";
import CelestialEvents from "./pages/CelestialEvents";
import CosmicWeather from "./pages/CosmicWeather";
import Missions from "./pages/Missions";
import Learn from "./pages/Learn";
import Impact from "./pages/Impact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/agriculture" element={<Agriculture />} />
          <Route path="/climate" element={<Climate />} />
          <Route path="/celestial" element={<CelestialEvents />} />
          <Route path="/cosmic-weather" element={<CosmicWeather />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/impact" element={<Impact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
