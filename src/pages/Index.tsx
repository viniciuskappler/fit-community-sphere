
import React from 'react';
import Header from '../components/Header';
import SecondaryHeader from '../components/SecondaryHeader';
import HeroSection from '../components/HeroSection';
import SportsSection from '../components/SportsSection';
import EventsSection from '../components/EventsSection';
import EstablishmentsSection from '../components/EstablishmentsSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <SecondaryHeader />
      <main>
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
