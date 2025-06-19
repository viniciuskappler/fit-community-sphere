
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CTASectionProps {
  onCadastrarClick: () => void;
  sectionsRef: React.MutableRefObject<(HTMLElement | null)[]>;
}

const CTASection = ({ onCadastrarClick, sectionsRef }: CTASectionProps) => {
  return (
    <section 
      ref={(el) => sectionsRef.current[4] = el}
      className="py-20 bg-gradient-to-r from-orange-600 to-orange-400 text-white opacity-0 transform translate-y-10"
    >
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Pronto para começar?
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-orange-100">
          Cadastre-se agora e comece a atrair novos clientes hoje mesmo
        </p>
        <Button
          onClick={onCadastrarClick}
          className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          Cadastrar Estabelecimento Grátis
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
