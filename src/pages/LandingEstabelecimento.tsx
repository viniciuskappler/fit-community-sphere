
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import RegistrationModal from '@/components/RegistrationModal';
import HeroSection from '@/components/landing/HeroSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CTASection from '@/components/landing/CTASection';

const LandingEstabelecimento = () => {
  const { referralCode } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // Track landing page visit
    if (referralCode) {
      console.log('Tracking visit for referral code:', referralCode);
      // Aqui seria implementado o tracking real
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in', 'animate-scale-in');
            const index = sectionsRef.current.indexOf(entry.target as HTMLElement);
            if (index !== -1) setActiveSection(index);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [referralCode]);

  const handleCadastrarClick = () => {
    if (referralCode) {
      console.log('Tracking registration click for referral code:', referralCode);
      // Aqui seria implementado o tracking do clique
    }
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <HeroSection onCadastrarClick={handleCadastrarClick} sectionsRef={sectionsRef} />
      <BenefitsSection onCadastrarClick={handleCadastrarClick} sectionsRef={sectionsRef} />
      <FeaturesSection onCadastrarClick={handleCadastrarClick} sectionsRef={sectionsRef} />
      <TestimonialsSection onCadastrarClick={handleCadastrarClick} sectionsRef={sectionsRef} />
      <CTASection onCadastrarClick={handleCadastrarClick} sectionsRef={sectionsRef} />

      <RegistrationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialType="establishment"
        referralCode={referralCode}
      />
    </div>
  );
};

export default LandingEstabelecimento;
