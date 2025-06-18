
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from '@/contexts/AuthContext';
import Index from "./pages/Index";
import Hub from "./pages/Hub";
import Estabelecimento from "./pages/Estabelecimento";
import GrupoEsportivo from "./pages/GrupoEsportivo";
import Praticante from "./pages/Praticante";
import Esportes from "./pages/Esportes";
import SportsModalities from "./pages/SportsModalities";
import Busca from "./pages/Busca";
import CadastroRealizado from "./pages/CadastroRealizado";
import CadastroFinalizadoEstabelecimento from "./pages/CadastroFinalizadoEstabelecimento";
import CadastroFinalizadoGrupo from "./pages/CadastroFinalizadoGrupo";
import TermosPrivacidade from "./pages/TermosPrivacidade";
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
            <Route path="/" element={<Index />} />
            <Route path="/hub" element={<Hub />} />
            <Route path="/estabelecimento" element={<Estabelecimento />} />
            <Route path="/grupo-esportivo" element={<GrupoEsportivo />} />
            <Route path="/praticante" element={<Praticante />} />
            <Route path="/esportes" element={<Esportes />} />
            <Route path="/modalidades" element={<SportsModalities />} />
            <Route path="/busca" element={<Busca />} />
            <Route path="/cadastro-realizado" element={<CadastroRealizado />} />
            <Route path="/cadastro-finalizado-estabelecimento" element={<CadastroFinalizadoEstabelecimento />} />
            <Route path="/cadastro-finalizado-grupo" element={<CadastroFinalizadoGrupo />} />
            <Route path="/termos-privacidade" element={<TermosPrivacidade />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
