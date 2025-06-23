import React from 'react';
import { Link } from 'react-router-dom';
import { sportsList } from '../utils/sportsData';
import DevelopmentModal from './DevelopmentModal';
import { useDevelopmentModal } from '@/hooks/useDevelopmentModal';

const SportsSection = () => {
  const { isOpen, showDevelopmentModal, closeDevelopmentModal } = useDevelopmentModal();
  
  // Mapear todos os esportes da lista para o formato usado no componente
  const sports = sportsList.map((sport, index) => {
    // Definir ícones para esportes específicos ou usar ícones genéricos
    const getIcon = (sportName: string) => {
      const lowerSport = sportName.toLowerCase();
      if (lowerSport.includes('futebol')) return '⚽';
      if (lowerSport.includes('basquete')) return '🏀';
      if (lowerSport.includes('vôlei') || lowerSport.includes('volei')) return '🏐';
      if (lowerSport.includes('tênis') || lowerSport.includes('tenis')) return '🎾';
      if (lowerSport.includes('natação')) return '🏊‍♀️';
      if (lowerSport.includes('corrida') || lowerSport.includes('atletismo')) return '🏃‍♂️';
      if (lowerSport.includes('ciclismo')) return '🚴‍♂️';
      if (lowerSport.includes('boxe')) return '🥊';
      if (lowerSport.includes('yoga')) return '🧘‍♀️';
      if (lowerSport.includes('escalada')) return '🧗‍♂️';
      if (lowerSport.includes('musculação') || lowerSport.includes('crossfit')) return '🏋️‍♀️';
      if (lowerSport.includes('hipismo')) return '🏇';
      if (lowerSport.includes('canoagem')) return '🛶';
      if (lowerSport.includes('trekking') || lowerSport.includes('montanhismo')) return '🥾';
      if (lowerSport.includes('rugby')) return '🏈';
      return '🏆'; // Ícone genérico para esportes sem ícone específico
    };

    return {
      name: sport,
      icon: getIcon(sport),
      color: `from-orange-${400 + (index % 3) * 100} to-orange-${500 + (index % 3) * 100}`
    };
  });

  return (
    <>
      <section className="bg-gray-50 py-[101px] reveal-on-scroll">
        <div className="w-full px-6 md:w-11/12 lg:w-3/4 mx-auto md:px-8 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-3">
              Explore Modalidades <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">Esportivas</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Descubra a modalidade perfeita para você e 
              <br className="md:hidden" />
              {' '}conecte-se com estabelecimentos especializados
            </p>
          </div>

          {/* Sports Carousel - Velocidade reduzida em 30% */}
          <div className="relative overflow-hidden">
            <div className="flex animate-slide-slower space-x-4">
              {[...sports, ...sports, ...sports].map((sport, index) => (
                <div key={index} className="flex-shrink-0" onClick={showDevelopmentModal}>
                  <div className="w-32 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-125 hover:z-30 hover:animate-shake cursor-pointer group relative transform-gpu">
                    <div className={`h-full bg-gradient-to-br ${sport.color} rounded-xl p-3 flex flex-col items-center justify-center relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-10 h-10 bg-white/10 rounded-full -translate-y-5 translate-x-5"></div>
                      <div className="text-xl mb-1 group-hover:scale-110 transition-transform">{sport.icon}</div>
                      <h3 className="text-white font-semibold text-xs text-center leading-tight">{sport.name}</h3>
                      <div className="absolute bottom-0 left-0 w-8 h-8 bg-white/10 rounded-full translate-y-4 -translate-x-4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DevelopmentModal 
        isOpen={isOpen} 
        onClose={closeDevelopmentModal} 
      />
    </>
  );
};

export default SportsSection;
