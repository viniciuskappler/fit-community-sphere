
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from '@/pages/Index';
import Hub from '@/pages/Hub';
import Busca from '@/pages/Busca';
import Esportes from '@/pages/Esportes';
import SportsModalities from '@/pages/SportsModalities';
import Praticante from '@/pages/Praticante';
import Estabelecimento from '@/pages/Estabelecimento';
import GrupoEsportivo from '@/pages/GrupoEsportivo';
import LandingEstabelecimento from '@/pages/LandingEstabelecimento';
import LandingGrupo from '@/pages/LandingGrupo';
import CadastroRealizado from '@/pages/CadastroRealizado';
import CadastroFinalizadoEstabelecimento from '@/pages/CadastroFinalizadoEstabelecimento';
import CadastroFinalizadoGrupo from '@/pages/CadastroFinalizadoGrupo';
import MeusReferrals from '@/pages/MeusReferrals';
import TermosPrivacidade from '@/pages/TermosPrivacidade';
import TermosUso from '@/pages/TermosUso';
import PoliticaPrivacidade from '@/pages/PoliticaPrivacidade';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import Assinaturas from '@/pages/Assinaturas';
import NotFound from '@/pages/NotFound';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EstablishmentProfile from './pages/EstablishmentProfile';
import GroupProfile from './pages/GroupProfile';
import CriarGrupoEsportivo from './pages/CriarGrupoEsportivo';
import CadastroEstabelecimento from './pages/CadastroEstabelecimento';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background font-sans antialiased">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/hub" element={<Hub />} />
              <Route path="/busca" element={<Busca />} />
              <Route path="/esportes" element={<Esportes />} />
              <Route path="/modalidades-esportivas" element={<SportsModalities />} />
              <Route path="/praticante" element={<Praticante />} />
              <Route path="/estabelecimento/:id" element={<EstablishmentProfile />} />
              <Route path="/grupo-esportivo/:id" element={<GroupProfile />} />
              <Route path="/estabelecimento" element={<Estabelecimento />} />
              <Route path="/grupo-esportivo" element={<GrupoEsportivo />} />
              <Route path="/criar-grupo-esportivo" element={<CriarGrupoEsportivo />} />
              <Route path="/cadastro-estabelecimento" element={<CadastroEstabelecimento />} />
              <Route path="/landing-estabelecimento" element={<LandingEstabelecimento />} />
              <Route path="/landing-estabelecimento/:referralCode" element={<LandingEstabelecimento />} />
              <Route path="/landing-grupo" element={<LandingGrupo />} />
              <Route path="/landing-grupo/:referralCode" element={<LandingGrupo />} />
              <Route path="/cadastro-realizado" element={<CadastroRealizado />} />
              <Route path="/cadastro-finalizado-estabelecimento" element={<CadastroFinalizadoEstabelecimento />} />
              <Route path="/cadastro-finalizado-grupo" element={<CadastroFinalizadoGrupo />} />
              <Route path="/meus-referrals" element={<MeusReferrals />} />
              <Route path="/termos-privacidade" element={<TermosPrivacidade />} />
              <Route path="/termos-uso" element={<TermosUso />} />
              <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/assinaturas" element={<Assinaturas />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
