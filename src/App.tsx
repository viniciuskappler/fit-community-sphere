import React from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from '@/contexts/AuthContext';
import Index from "./pages/Index";
import Praticante from "./pages/Praticante";
import Esportes from "./pages/Esportes";
import Hub from "./pages/Hub";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import CadastroRealizado from "./pages/CadastroRealizado";
import Busca from "./pages/Busca";
import Grupos from "./pages/Grupos";
import Locais from "./pages/Locais";
import Assinaturas from "./pages/Assinaturas";
import CadastroEstabelecimento from "./pages/CadastroEstabelecimento";
import CriarGrupoEsportivo from "./pages/CriarGrupoEsportivo";
import CadastroFinalizadoEstabelecimento from "./pages/CadastroFinalizadoEstabelecimento";
import CadastroFinalizadoGrupo from "./pages/CadastroFinalizadoGrupo";
import LandingEstabelecimento from "./pages/LandingEstabelecimento";
import LandingGrupo from "./pages/LandingGrupo";
import Estabelecimento from "./pages/Estabelecimento";
import GrupoEsportivo from "./pages/GrupoEsportivo";
import SportsModalities from "./pages/SportsModalities";
import EstablishmentProfile from "./pages/EstablishmentProfile";
import GroupProfile from "./pages/GroupProfile";
import MeusReferrals from "./pages/MeusReferrals";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import TermosUso from "./pages/TermosUso";
import TermosPrivacidade from "./pages/TermosPrivacidade";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import Profissionais from "./pages/Profissionais";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingScreen from "./components/LoadingScreen";
import { useAuth } from './contexts/AuthContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  const { loading } = useAuth();
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  return (
    <BrowserRouter>
      <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/praticante" element={<Praticante />} />
              <Route path="/esportes" element={<Esportes />} />
              <Route path="/hub" element={<Hub />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/cadastro-realizado" element={<CadastroRealizado />} />
              <Route path="/busca" element={<Busca />} />
              <Route path="/grupos" element={<Grupos />} />
              <Route path="/locais" element={<Locais />} />
              <Route path="/assinaturas" element={<Assinaturas />} />
              <Route path="/cadastro-estabelecimento" element={<CadastroEstabelecimento />} />
              <Route path="/criar-grupo-esportivo" element={<CriarGrupoEsportivo />} />
              <Route path="/cadastro-finalizado-estabelecimento" element={<CadastroFinalizadoEstabelecimento />} />
              <Route path="/cadastro-finalizado-grupo" element={<CadastroFinalizadoGrupo />} />
              <Route path="/landing-estabelecimento" element={<LandingEstabelecimento />} />
              <Route path="/landing-grupo" element={<LandingGrupo />} />
              <Route path="/estabelecimento/:id" element={<Estabelecimento />} />
              <Route path="/grupo/:id" element={<GrupoEsportivo />} />
              <Route path="/modalidades" element={<SportsModalities />} />
              <Route path="/establishment-profile/:id" element={<EstablishmentProfile />} />
              <Route path="/group-profile/:id" element={<GroupProfile />} />
              <Route path="/meus-referrals" element={<MeusReferrals />} />
              <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
              <Route path="/termos-uso" element={<TermosUso />} />
              <Route path="/termos-privacidade" element={<TermosPrivacidade />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/profissionais" element={<Profissionais />} />
              <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <AppContent />
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
