
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import SecondaryHeader from '@/components/SecondaryHeader';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import LoggedInHeroSection from '@/components/LoggedInHeroSection';
import SportsSection from '@/components/SportsSection';
import EstablishmentsSection from '@/components/EstablishmentsSection';
import InteractiveMapSection from '@/components/InteractiveMapSection';
import SmartRecommendations from '@/components/SmartRecommendations';
import { useDevelopmentModal } from '@/hooks/useDevelopmentModal';
import DevelopmentModal from '@/components/DevelopmentModal';
import RegistrationSection from '@/components/RegistrationSection';
import CookieConsent from '@/components/CookieConsent';

const Index = () => {
  const { user } = useAuth();
  const {
    isOpen,
    showDevelopmentModal,
    closeDevelopmentModal
  } = useDevelopmentModal();

  return (
    <div className="min-h-screen bg-background">
      <SecondaryHeader isVisible={true} />
      <Header />
      
      <main className="pt-[120px]">
        {user ? <LoggedInHeroSection /> : <HeroSection />}
        
        <SportsSection />
        <EstablishmentsSection />
        <InteractiveMapSection />
        <SmartRecommendations />
        
        {!user && <RegistrationSection />}
      </main>

      <Footer />
      
      <DevelopmentModal
        isOpen={isOpen}
        onClose={closeDevelopmentModal}
      />
      
      <CookieConsent />
    </div>
  );
};

export default Index;
