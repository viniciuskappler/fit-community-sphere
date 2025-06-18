
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SportsModalities from "./pages/SportsModalities";
import Esportes from "./pages/Esportes";
import Praticante from "./pages/Praticante";
import Estabelecimento from "./pages/Estabelecimento";
import GrupoEsportivo from "./pages/GrupoEsportivo";
import Busca from "./pages/Busca";
import CadastroRealizado from "./pages/CadastroRealizado";
import CadastroFinalizadoEstabelecimento from "./pages/CadastroFinalizadoEstabelecimento";
import CadastroFinalizadoGrupo from "./pages/CadastroFinalizadoGrupo";
import Hub from "./pages/Hub";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/modalidades-esportivas" element={<SportsModalities />} />
            <Route path="/esportes" element={<Esportes />} />
            <Route path="/praticante" element={<Praticante />} />
            <Route path="/estabelecimento" element={<Estabelecimento />} />
            <Route path="/grupo-esportivo" element={<GrupoEsportivo />} />
            <Route path="/busca" element={<Busca />} />
            <Route path="/cadastro-realizado" element={<CadastroRealizado />} />
            <Route path="/cadastro-finalizado-estabelecimento" element={<CadastroFinalizadoEstabelecimento />} />
            <Route path="/cadastro-finalizado-grupo" element={<CadastroFinalizadoGrupo />} />
            <Route path="/hub" element={<Hub />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
