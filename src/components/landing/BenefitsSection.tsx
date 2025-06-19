
import React from 'react';
import { Users, TrendingUp, Star, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BenefitsSectionProps {
  onCadastrarClick: () => void;
  sectionsRef: React.MutableRefObject<(HTMLElement | null)[]>;
}

const BenefitsSection = ({ onCadastrarClick, sectionsRef }: BenefitsSectionProps) => {
  const benefits = [
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "Mais Clientes",
      description: "Conecte-se com centenas de atletas em busca de novos locais para treinar"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
      title: "Maior Visibilidade",
      description: "Apareça nos resultados de busca e no mapa interativo da região"
    },
    {
      icon: <Star className="w-8 h-8 text-orange-500" />,
      title: "Avaliações Reais",
      description: "Receba feedbacks genuínos e construa sua reputação online"
    },
    {
      icon: <Award className="w-8 h-8 text-orange-500" />,
      title: "Ferramentas de Gestão",
      description: "Gerencie agendamentos, eventos e relacionamento com clientes"
    }
  ];

  return (
    <section 
      ref={(el) => sectionsRef.current[1] = el}
      className="py-20 bg-gray-50 opacity-0 transform translate-y-10"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Por que escolher o <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">Núcleo do Esporte?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mais de 1000 estabelecimentos já confiam em nossa plataforma para expandir seus negócios
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center">
              <div className="mb-4 flex justify-center">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            onClick={onCadastrarClick}
            className="bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white px-8 py-3 text-lg font-semibold rounded-xl"
          >
            Quero Esses Benefícios
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
