
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SecondaryHeader from '../components/SecondaryHeader';
import HeroSection from '../components/HeroSection';
import SportsSection from '../components/SportsSection';
import EventsSection from '../components/EventsSection';
import EstablishmentsSection from '../components/EstablishmentsSection';
import Footer from '../components/Footer';
import RegistrationSection from '../components/RegistrationSection';
import InteractiveMapSection from '../components/InteractiveMapSection';
import CookieConsent from '../components/CookieConsent';
import { preloadHomepageImages } from '../utils/performance';

const Index = () => {
  const [showTopBar, setShowTopBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // Preload critical images on component mount
    preloadHomepageImages();
    
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 50) {
          setShowTopBar(false);
        } else {
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

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in', 'animate-scale-in');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SecondaryHeader isVisible={showTopBar} />
      <Header isSecondaryVisible={showTopBar} />
      <main className="pt-[120px]">
        <HeroSection />
        <RegistrationSection />
        <InteractiveMapSection />
        <SportsSection />
        <EventsSection />
        <EstablishmentsSection />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Index;
