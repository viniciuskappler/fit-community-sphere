
import React, { useState, useEffect } from 'react';
import { MapPin, Dumbbell, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface MapLocation {
  id: string;
  name: string;
  type: 'establishment' | 'group';
  x: number;
  y: number;
  info: {
    city: string;
    sports: string[];
    description: string;
    logo: string;
  };
}

const locations: MapLocation[] = [{
  id: '1',
  name: 'FitMax Academia',
  type: 'establishment',
  x: 25,
  y: 20,
  info: {
    city: 'São Paulo - SP',
    sports: ['Musculação', 'Pilates', 'Crossfit'],
    description: 'Academia completa com equipamentos modernos',
    logo: '🏋️'
  }
}, {
  id: '2',
  name: 'PowerGym Elite',
  type: 'establishment',
  x: 70,
  y: 25,
  info: {
    city: 'Rio de Janeiro - RJ',
    sports: ['Cross Training', 'HIIT', 'Funcional'],
    description: 'Espaço dedicado ao treinamento funcional',
    logo: '💪'
  }
}, {
  id: '3',
  name: 'Runners SP',
  type: 'group',
  x: 45,
  y: 50,
  info: {
    city: 'São Paulo - SP',
    sports: ['Corrida de Rua', 'Maratona'],
    description: 'Grupo de corrida urbana',
    logo: '🏃'
  }
}, {
  id: '4',
  name: 'Bikers das Montanhas',
  type: 'group',
  x: 20,
  y: 65,
  info: {
    city: 'Campos do Jordão - SP',
    sports: ['Mountain Bike', 'Ciclismo'],
    description: 'Grupo de ciclismo de montanha',
    logo: '🚴'
  }
}, {
  id: '5',
  name: 'Aqua Center',
  type: 'establishment',
  x: 75,
  y: 60,
  info: {
    city: 'Salvador - BA',
    sports: ['Natação', 'Hidro', 'Aqua Fitness'],
    description: 'Centro aquático completo',
    logo: '🏊'
  }
}, {
  id: '6',
  name: 'Yoga Namaste',
  type: 'group',
  x: 55,
  y: 30,
  info: {
    city: 'Florianópolis - SC',
    sports: ['Yoga', 'Meditação', 'Pilates'],
    description: 'Grupo de yoga e bem-estar',
    logo: '🧘'
  }
}];

const InteractiveMapSection = () => {
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const mapElement = document.querySelector('#interactive-map');
      if (!mapElement) return;

      const rect = mapElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Verificar se está na viewport
      const inView = rect.top < windowHeight && rect.bottom > 0;
      setIsInView(inView);
      
      if (inView) {
        // Calcular progresso baseado na posição da seção
        const elementCenter = rect.top + rect.height / 2;
        const windowCenter = windowHeight / 2;
        const distance = Math.abs(elementCenter - windowCenter);
        const maxDistance = windowHeight / 2 +  rect.height / 2;
        const progress = Math.max(0, 1 - distance / maxDistance);
        
        setScrollProgress(progress);
        
        // Revelar cards baseado no progresso com delay escalonado
        const totalCards = locations.length;
        const progressThreshold = 0.3; // Começar a mostrar cards quando 30% visível
        
        if (progress > progressThreshold) {
          const adjustedProgress = (progress - progressThreshold) / (1 - progressThreshold);
          const cardsToShow = Math.min(totalCards, Math.floor(adjustedProgress * totalCards * 1.5));
          
          const newVisibleCards = new Set<string>();
          
          // Mostrar cards em ordem específica para melhor distribuição visual
          const showOrder = [0, 3, 1, 4, 2, 5];
          for (let i = 0; i < cardsToShow; i++) {
            const locationIndex = showOrder[i];
            if (locationIndex < locations.length) {
              newVisibleCards.add(locations[locationIndex].id);
            }
          }
          
          setVisibleCards(newVisibleCards);
        } else {
          setVisibleCards(new Set());
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Executar uma vez na inicialização
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calcular posições dos cards para evitar sobreposição
  const getCardPosition = (location: MapLocation, index: number) => {
    const baseLeft = Math.min(Math.max(location.x - 12, 5), 70);
    const baseTop = Math.max(location.y - 25, 5);
    
    // Ajustar posições para evitar sobreposição
    const adjustments = [
      { left: 0, top: 0 },
      { left: 15, top: 5 },
      { left: -10, top: 10 },
      { left: 20, top: -5 },
      { left: -15, top: 15 },
      { left: 10, top: -10 }
    ];
    
    const adjustment = adjustments[index] || { left: 0, top: 0 };
    
    return {
      left: Math.min(Math.max(baseLeft + adjustment.left, 2), 75),
      top: Math.min(Math.max(baseTop + adjustment.top, 2), 75)
    };
  };

  return (
    <section className="w-full px-4 md:px-8 lg:px-4 flex flex-col items-center bg-white py-[31px]">
      <div className="w-full md:w-11/12 lg:w-3/4 mx-auto">
        <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 transform translate-y-0' : 'opacity-60 transform translate-y-10'}`}>
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2 md:text-5xl bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            Hub do Núcleo do Esporte
          </h2>
          <p className="text-gray-500 text-center mb-8 text-base max-w-xl mx-auto">
            Descubra, avalie e conecte-se com estabelecimentos e grupos esportivos próximos à você.
          </p>
        </div>
        
        {/* Botão para acessar o hub completo */}
        <div className="text-center mb-8">
          <Link to="/hub">
            <Button size="lg" className="bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white transform hover:scale-105 transition-all duration-300">
              <MapPin className="w-5 h-5 mr-2" />
              Acessar Hub Completo
            </Button>
          </Link>
        </div>
        
        <div id="interactive-map" className="relative w-full h-[400px] md:h-[600px] rounded-xl overflow-hidden shadow-2xl">
          {/* Imagem de fundo do mapa com lazy loading */}
          <div 
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
              isInView ? 'opacity-100 scale-100' : 'opacity-80 scale-105'
            }`}
            style={{
              backgroundImage: `url(/lovable-uploads/744f2913-0736-467a-b5de-f6757c8dc471.png)`,
              backgroundPosition: 'center center',
              backgroundSize: 'cover'
            }} 
          />
          
          {/* Gradientes overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/30" />
          
          {/* Pinos do mapa com animação */}
          {locations.map((location, index) => {
            const isVisible = visibleCards.has(location.id);
            return (
              <div 
                key={`pin-${location.id}`}
                className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer z-20"
                style={{
                  left: `${location.x}%`,
                  top: `${location.y}%`,
                  opacity: isVisible ? 1 : 0.3,
                  transform: `translate(-50%, -100%) scale(${isVisible ? 1.2 : 1})`,
                  transition: `all 0.8s ease-out ${index * 200}ms`
                }}
              >
                <div className="flex flex-col items-center">
                  <div className={`relative ${
                    location.type === 'establishment' ? 'bg-gradient-to-r from-orange-600 to-orange-400' : 'bg-gradient-to-r from-blue-600 to-blue-400'
                  } w-6 h-6 md:w-8 md:h-8 rounded-full shadow-lg flex items-center justify-center animate-bounce`}>
                    <MapPin size={12} className="text-white md:w-4 md:h-4" />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Cards dos estabelecimentos com animações aprimoradas */}
          {locations.map((location, index) => {
            const isVisible = visibleCards.has(location.id);
            const cardOpacity = isVisible ? 1 : 0;
            const cardPosition = getCardPosition(location, index);
            
            return (
              <div 
                key={`card-${location.id}`}
                className={`absolute bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-200 overflow-hidden transition-all duration-1000 ease-out z-30 w-48 md:w-56`}
                style={{
                  left: `${cardPosition.left}%`,
                  top: `${cardPosition.top}%`,
                  opacity: cardOpacity,
                  transform: `translateY(${isVisible ? 0 : 30}px) scale(${isVisible ? 1 : 0.8}) rotate(${isVisible ? 0 : -2}deg)`,
                  transitionDelay: `${index * 200 + 300}ms`
                }}
              >
                <div className="p-3">
                  {/* Header do card */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow-sm flex items-center justify-center mr-2 text-lg">
                        {location.info.logo}
                      </div>
                      <div className={`p-1 rounded-full ${
                        location.type === 'establishment' 
                          ? 'bg-gradient-to-r from-orange-600 to-orange-400' 
                          : 'bg-gradient-to-r from-blue-600 to-blue-400'
                      } text-white`}>
                        {location.type === 'establishment' ? <Dumbbell size={8} /> : <Users size={8} />}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 mb-1 text-xs md:text-sm">{location.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{location.info.city}</p>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">{location.info.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800 text-xs">Modalidades:</h4>
                    <div className="flex flex-wrap gap-1">
                      {location.info.sports.slice(0, 2).map((sport, sportIndex) => (
                        <span 
                          key={sportIndex} 
                          className={`px-2 py-0.5 text-xs rounded-full text-white ${
                            location.type === 'establishment' 
                              ? 'bg-gradient-to-r from-orange-500 to-orange-400' 
                              : 'bg-gradient-to-r from-blue-500 to-blue-400'
                          }`}
                        >
                          {sport}
                        </span>
                      ))}
                      {location.info.sports.length > 2 && (
                        <span className="text-xs text-gray-500 font-medium">+{location.info.sports.length - 2}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Botão de ação */}
                  <div className="mt-3">
                    <Button 
                      size="sm" 
                      className={`w-full text-xs ${
                        location.type === 'establishment'
                          ? 'bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500'
                          : 'bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500'
                      } text-white`}
                    >
                      {location.type === 'establishment' ? 'Ver Estabelecimento' : 'Ver Grupo'}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InteractiveMapSection;
