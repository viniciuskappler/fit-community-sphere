import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Hub from "./pages/Hub";
import Praticante from "./pages/Praticante";
import CompletarPerfil from "./pages/CompletarPerfil";
import LandingPage from "./pages/LandingPage";
import LandingPage2 from "./pages/LandingPage2";
import LandingPage3 from "./pages/LandingPage3";
import LandingPage4 from "./pages/LandingPage4";
import LandingPage5 from "./pages/LandingPage5";
import LandingPage6 from "./pages/LandingPage6";
import LandingPage7 from "./pages/LandingPage7";
import LandingPage8 from "./pages/LandingPage8";
import LandingPage9 from "./pages/LandingPage9";
import LandingPage10 from "./pages/LandingPage10";
import LandingPage11 from "./pages/LandingPage11";
import LandingPage12 from "./pages/LandingPage12";
import LandingPage13 from "./pages/LandingPage13";
import LandingPage14 from "./pages/LandingPage14";
import LandingPage15 from "./pages/LandingPage15";
import LandingPage16 from "./pages/LandingPage16";
import LandingPage17 from "./pages/LandingPage17";
import LandingPage18 from "./pages/LandingPage18";
import LandingPage19 from "./pages/LandingPage19";
import LandingPage20 from "./pages/LandingPage20";
import LandingPage21 from "./pages/LandingPage21";
import LandingPage22 from "./pages/LandingPage22";
import LandingPage23 from "./pages/LandingPage23";
import LandingPage24 from "./pages/LandingPage24";
import LandingPage25 from "./pages/LandingPage25";
import LandingPage26 from "./pages/LandingPage26";
import LandingPage27 from "./pages/LandingPage27";
import LandingPage28 from "./pages/LandingPage28";
import LandingPage29 from "./pages/LandingPage29";
import LandingPage30 from "./pages/LandingPage30";
import LandingPage31 from "./pages/LandingPage31";
import LandingPage32 from "./pages/LandingPage32";
import LandingPage33 from "./pages/LandingPage33";
import LandingPage34 from "./pages/LandingPage34";
import LandingPage35 from "./pages/LandingPage35";
import LandingPage36 from "./pages/LandingPage36";
import LandingPage37 from "./pages/LandingPage37";
import LandingPage38 from "./pages/LandingPage38";
import LandingPage39 from "./pages/LandingPage39";
import LandingPage40 from "./pages/LandingPage40";
import LandingPage41 from "./pages/LandingPage41";
import LandingPage42 from "./pages/LandingPage42";
import LandingPage43 from "./pages/LandingPage43";
import LandingPage44 from "./pages/LandingPage44";
import LandingPage45 from "./pages/LandingPage45";
import LandingPage46 from "./pages/LandingPage46";
import LandingPage47 from "./pages/LandingPage47";
import LandingPage48 from "./pages/LandingPage48";
import LandingPage49 from "./pages/LandingPage49";
import LandingPage50 from "./pages/LandingPage50";
import LandingPage51 from "./pages/LandingPage51";
import LandingPage52 from "./pages/LandingPage52";
import LandingPage53 from "./pages/LandingPage53";
import LandingPage54 from "./pages/LandingPage54";
import LandingPage55 from "./pages/LandingPage55";
import LandingPage56 from "./pages/LandingPage56";
import LandingPage57 from "./pages/LandingPage57";
import LandingPage58 from "./pages/LandingPage58";
import LandingPage59 from "./pages/LandingPage59";
import LandingPage60 from "./pages/LandingPage60";
import LandingPage61 from "./pages/LandingPage61";
import LandingPage62 from "./pages/LandingPage62";
import LandingPage63 from "./pages/LandingPage63";
import LandingPage64 from "./pages/LandingPage64";
import LandingPage65 from "./pages/LandingPage65";
import LandingPage66 from "./pages/LandingPage66";
import LandingPage67 from "./pages/LandingPage67";
import LandingPage68 from "./pages/LandingPage68";
import LandingPage69 from "./pages/LandingPage69";
import LandingPage70 from "./pages/LandingPage70";
import LandingPage71 from "./pages/LandingPage71";
import LandingPage72 from "./pages/LandingPage72";
import LandingPage73 from "./pages/LandingPage73";
import LandingPage74 from "./pages/LandingPage74";
import LandingPage75 from "./pages/LandingPage75";
import LandingPage76 from "./pages/LandingPage76";
import LandingPage77 from "./pages/LandingPage77";
import LandingPage78 from "./pages/LandingPage78";
import LandingPage79 from "./pages/LandingPage79";
import LandingPage80 from "./pages/LandingPage80";
import LandingPage81 from "./pages/LandingPage81";
import LandingPage82 from "./pages/LandingPage82";
import LandingPage83 from "./pages/LandingPage83";
import LandingPage84 from "./pages/LandingPage84";
import LandingPage85 from "./pages/LandingPage85";
import LandingPage86 from "./pages/LandingPage86";
import LandingPage87 from "./pages/LandingPage87";
import LandingPage88 from "./pages/LandingPage88";
import LandingPage89 from "./pages/LandingPage89";
import LandingPage90 from "./pages/LandingPage90";
import LandingPage91 from "./pages/LandingPage91";
import LandingPage92 from "./pages/LandingPage92";
import LandingPage93 from "./pages/LandingPage93";
import LandingPage94 from "./pages/LandingPage94";
import LandingPage95 from "./pages/LandingPage95";
import LandingPage96 from "./pages/LandingPage96";
import LandingPage97 from "./pages/LandingPage97";
import LandingPage98 from "./pages/LandingPage98";
import LandingPage99 from "./pages/LandingPage99";
import LandingEstabelecimento from "./pages/LandingEstabelecimento";
import LandingPageSupporter from "./pages/LandingPageSupporter";
import RecuperarSenha from "./pages/RecuperarSenha";
import RedefinirSenha from "./pages/RedefinirSenha";
import CadastroRealizado from "./pages/CadastroRealizado";
import CadastroFinalizadoEstabelecimento from "./pages/CadastroFinalizadoEstabelecimento";
import CadastroFinalizadoGrupo from "./pages/CadastroFinalizadoGrupo";
import TermosDeUso from "./pages/TermosDeUso";
import PoliticaDePrivacidade from "./pages/PoliticaDePrivacidade";
import NotFound from "./pages/NotFound";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Analytics } from '@vercel/analytics/react';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <AuthProvider>
          <ProSidebarProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/hub" element={<Hub />} />
              <Route path="/praticante" element={<Praticante />} />
              <Route path="/completar-perfil" element={<CompletarPerfil />} />
              <Route path="/ladingpage" element={<LandingPage />} />
              <Route path="/ladingpage2" element={<LandingPage2 />} />
              <Route path="/ladingpage3" element={<LandingPage3 />} />
              <Route path="/ladingpage4" element={<LandingPage4 />} />
              <Route path="/ladingpage5" element={<LandingPage5 />} />
              <Route path="/ladingpage6" element={<LandingPage6 />} />
              <Route path="/ladingpage7" element={<LandingPage7 />} />
              <Route path="/ladingpage8" element={<LandingPage8 />} />
              <Route path="/ladingpage9" element={<LandingPage9 />} />
              <Route path="/ladingpage10" element={<LandingPage10 />} />
              <Route path="/ladingpage11" element={<LandingPage11 />} />
              <Route path="/ladingpage12" element={<LandingPage12 />} />
              <Route path="/ladingpage13" element={<LandingPage13 />} />
              <Route path="/ladingpage14" element={<LandingPage14 />} />
              <Route path="/ladingpage15" element={<LandingPage15 />} />
              <Route path="/ladingpage16" element={<LandingPage16 />} />
              <Route path="/ladingpage17" element={<LandingPage17 />} />
              <Route path="/ladingpage18" element={<LandingPage18 />} />
              <Route path="/ladingpage19" element={<LandingPage19 />} />
              <Route path="/ladingpage20" element={<LandingPage20 />} />
              <Route path="/ladingpage21" element={<LandingPage21 />} />
              <Route path="/ladingpage22" element={<LandingPage22 />} />
              <Route path="/ladingpage23" element={<LandingPage23 />} />
              <Route path="/ladingpage24" element={<LandingPage24 />} />
              <Route path="/ladingpage25" element={<LandingPage25 />} />
              <Route path="/ladingpage26" element={<LandingPage26 />} />
              <Route path="/ladingpage27" element={<LandingPage27 />} />
              <Route path="/ladingpage28" element={<LandingPage28 />} />
              <Route path="/ladingpage29" element={<LandingPage29 />} />
              <Route path="/ladingpage30" element={<LandingPage30 />} />
              <Route path="/ladingpage31" element={<LandingPage31 />} />
              <Route path="/ladingpage32" element={<LandingPage32 />} />
              <Route path="/ladingpage33" element={<LandingPage33 />} />
              <Route path="/ladingpage34" element={<LandingPage34 />} />
              <Route path="/ladingpage35" element={<LandingPage35 />} />
              <Route path="/ladingpage36" element={<LandingPage36 />} />
              <Route path="/ladingpage37" element={<LandingPage37 />} />
              <Route path="/ladingpage38" element={<LandingPage38 />} />
              <Route path="/ladingpage39" element={<LandingPage39 />} />
              <Route path="/ladingpage40" element={<LandingPage40 />} />
              <Route path="/ladingpage41" element={<LandingPage41 />} />
              <Route path="/ladingpage42" element={<LandingPage42 />} />
              <Route path="/ladingpage43" element={<LandingPage43 />} />
              <Route path="/ladingpage44" element={<LandingPage44 />} />
              <Route path="/ladingpage45" element={<LandingPage45 />} />
              <Route path="/ladingpage46" element={<LandingPage46 />} />
              <Route path="/ladingpage47" element={<LandingPage47 />} />
              <Route path="/ladingpage48" element={<LandingPage48 />} />
              <Route path="/ladingpage49" element={<LandingPage49 />} />
              <Route path="/ladingpage50" element={<LandingPage50 />} />
              <Route path="/ladingpage51" element={<LandingPage51 />} />
              <Route path="/ladingpage52" element={<LandingPage52 />} />
              <Route path="/ladingpage53" element={<LandingPage53 />} />
              <Route path="/ladingpage54" element={<LandingPage54 />} />
              <Route path="/ladingpage55" element={<LandingPage55 />} />
              <Route path="/ladingpage56" element={<LandingPage56 />} />
              <Route path="/ladingpage57" element={<LandingPage57 />} />
              <Route path="/ladingpage58" element={<LandingPage58 />} />
              <Route path="/ladingpage59" element={<LandingPage59 />} />
              <Route path="/ladingpage60" element={<LandingPage60 />} />
              <Route path="/ladingpage61" element={<LandingPage61 />} />
              <Route path="/ladingpage62" element={<LandingPage62 />} />
              <Route path="/ladingpage63" element={<LandingPage63 />} />
              <Route path="/ladingpage64" element={<LandingPage64 />} />
              <Route path="/ladingpage65" element={<LandingPage65 />} />
              <Route path="/ladingpage66" element={<LandingPage66 />} />
              <Route path="/ladingpage67" element={<LandingPage67 />} />
              <Route path="/ladingpage68" element={<LandingPage68 />} />
              <Route path="/ladingpage69" element={<LandingPage69 />} />
              <Route path="/ladingpage70" element={<LandingPage70 />} />
              <Route path="/ladingpage71" element={<LandingPage71 />} />
              <Route path="/ladingpage72" element={<LandingPage72 />} />
              <Route path="/ladingpage73" element={<LandingPage73 />} />
              <Route path="/ladingpage74" element={<LandingPage74 />} />
              <Route path="/ladingpage75" element={<LandingPage75 />} />
              <Route path="/ladingpage76" element={<LandingPage76 />} />
              <Route path="/ladingpage77" element={<LandingPage77 />} />
              <Route path="/ladingpage78" element={<LandingPage78 />} />
              <Route path="/ladingpage79" element={<LandingPage79 />} />
              <Route path="/ladingpage80" element={<LandingPage80 />} />
              <Route path="/ladingpage81" element={<LandingPage81 />} />
              <Route path="/ladingpage82" element={<LandingPage82 />} />
              <Route path="/ladingpage83" element={<LandingPage83 />} />
              <Route path="/ladingpage84" element={<LandingPage84 />} />
              <Route path="/ladingpage85" element={<LandingPage85 />} />
              <Route path="/ladingpage86" element={<LandingPage86 />} />
              <Route path="/ladingpage87" element={<LandingPage87 />} />
              <Route path="/ladingpage88" element={<LandingPage88 />} />
              <Route path="/ladingpage89" element={<LandingPage89 />} />
              <Route path="/ladingpage90" element={<LandingPage90 />} />
              <Route path="/ladingpage91" element={<LandingPage91 />} />
              <Route path="/ladingpage92" element={<LandingPage92 />} />
              <Route path="/ladingpage93" element={<LandingPage93 />} />
              <Route path="/ladingpage94" element={<LandingPage94 />} />
              <Route path="/ladingpage95" element={<LandingPage95 />} />
              <Route path="/ladingpage96" element={<LandingPage96 />} />
              <Route path="/ladingpage97" element={<LandingPage97 />} />
              <Route path="/ladingpage98" element={<LandingPage98 />} />
              <Route path="/ladingpage99" element={<LandingPage99 />} />
              <Route path="/landing-estabelecimento/:referralCode?" element={<LandingEstabelecimento />} />
              <Route path="/landing-supporter/:referralCode?" element={<LandingPageSupporter />} />
              <Route path="/recuperar-senha" element={<RecuperarSenha />} />
              <Route path="/redefinir-senha/:token" element={<RedefinirSenha />} />
              <Route path="/cadastro-realizado" element={<CadastroRealizado />} />
              <Route path="/cadastro-finalizado-estabelecimento" element={<CadastroFinalizadoEstabelecimento />} />
              <Route path="/cadastro-finalizado-grupo" element={<CadastroFinalizadoGrupo />} />
              <Route path="/termos-de-uso" element={<TermosDeUso />} />
              <Route path="/politica-de-privacidade" element={<PoliticaDePrivacidade />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ProSidebarProvider>
        </AuthProvider>
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
