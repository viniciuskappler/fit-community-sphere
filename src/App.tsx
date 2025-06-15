
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SportsModalities from "./pages/SportsModalities";
import Praticante from "./pages/Praticante";
import Estabelecimento from "./pages/Estabelecimento";
import GrupoEsportivo from "./pages/GrupoEsportivo";
import Busca from "./pages/Busca";
import CadastroRealizado from "./pages/CadastroRealizado";
import Hub from "./pages/Hub";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/modalidades-esportivas" element={<SportsModalities />} />
          <Route path="/praticante" element={<Praticante />} />
          <Route path="/estabelecimento" element={<Estabelecimento />} />
          <Route path="/grupo-esportivo" element={<GrupoEsportivo />} />
          <Route path="/busca" element={<Busca />} />
          <Route path="/cadastro-realizado" element={<CadastroRealizado />} />
          <Route path="/hub" element={<Hub />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
