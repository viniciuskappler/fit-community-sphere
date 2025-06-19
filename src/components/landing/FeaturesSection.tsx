
import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FeaturesSectionProps {
  onCadastrarClick: () => void;
  sectionsRef: React.MutableRefObject<(HTMLElement | null)[]>;
}

const FeaturesSection = ({ onCadastrarClick, sectionsRef }: FeaturesSectionProps) => {
  const features = [
    "Perfil completo com fotos e informações",
    "Sistema de agendamento integrado",
    "Gestão de eventos e aulas",
    "Dashboard com métricas e insights",
    "Comunicação direta com clientes",
    "Marketing digital automatizado"
  ];

  return (
    <section 
      ref={(el) => sectionsRef.current[2] = el}
      className="py-20 bg-white opacity-0 transform translate-y-10"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Tudo que você precisa em <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">uma plataforma</span>
            </h2>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-lg text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            <Button
              onClick={onCadastrarClick}
              className="mt-8 bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white px-8 py-3 text-lg font-semibold rounded-xl"
            >
              Começar Agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Plataforma"
              className="rounded-2xl shadow-2xl"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
