
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SecondaryHeader from '../components/SecondaryHeader';
import HeroSection from '../components/HeroSection';
import SportsSection from '../components/SportsSection';
import EventsSection from '../components/EventsSection';
import EstablishmentsSection from '../components/EstablishmentsSection';
import Footer from '../components/Footer';

const Index = () => {
  const [showTopBar, setShowTopBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 50) { // scroll down
          setShowTopBar(false);
        } else { // scroll up
          setShowTopBar(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-white">
      <SecondaryHeader isVisible={showTopBar} />
      <Header isSecondaryVisible={showTopBar} />
      <main className="pt-[140px]">
        <HeroSection />
        <SportsSection />
        <EventsSection />
        <EstablishmentsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
