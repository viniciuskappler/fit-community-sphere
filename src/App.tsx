import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Hub from "./pages/Hub";
import Praticante from "./pages/Praticante";
import CompletarPerfil from "./pages/CompletarPerfil";
import LandingEstabelecimento from "./pages/LandingEstabelecimento";
import LandingGrupo from "./pages/LandingGrupo";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import CadastroRealizado from "./pages/CadastroRealizado";
import CadastroFinalizadoEstabelecimento from "./pages/CadastroFinalizadoEstabelecimento";
import CadastroFinalizadoGrupo from "./pages/CadastroFinalizadoGrupo";
import TermosUso from "./pages/TermosUso";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/hub" element={<Hub />} />
            <Route path="/praticante" element={<Praticante />} />
            <Route path="/completar-perfil" element={<CompletarPerfil />} />
            <Route path="/landing-estabelecimento/:referralCode?" element={<LandingEstabelecimento />} />
            <Route path="/landing-grupo/:referralCode?" element={<LandingGrupo />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/cadastro-realizado" element={<CadastroRealizado />} />
            <Route path="/cadastro-finalizado-estabelecimento" element={<CadastroFinalizadoEstabelecimento />} />
            <Route path="/cadastro-finalizado-grupo" element={<CadastroFinalizadoGrupo />} />
            <Route path="/termos-uso" element={<TermosUso />} />
            <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;