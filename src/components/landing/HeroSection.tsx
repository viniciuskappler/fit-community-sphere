
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onCadastrarClick: () => void;
  sectionsRef: React.MutableRefObject<(HTMLElement | null)[]>;
}

const HeroSection = ({ onCadastrarClick, sectionsRef }: HeroSectionProps) => {
  return (
    <section 
      ref={(el) => sectionsRef.current[0] = el}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white opacity-0 transform translate-y-10"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Transforme seu <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Estabelecimento</span>
          <br />em Referência no Esporte
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200">
          Conecte-se com milhares de atletas e faça seu negócio crescer no Núcleo do Esporte
        </p>
        <Button
          onClick={onCadastrarClick}
          className="bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
        >
          Cadastrar Meu Estabelecimento
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
