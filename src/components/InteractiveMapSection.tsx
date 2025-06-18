
import React, { useState, useEffect } from 'react';
import { MapPin, Dumbbell, Users, Camera } from 'lucide-react';
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
  x: 30,
  y: 25,
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
  x: 65,
  y: 30,
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
  y: 45,
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
  x: 25,
  y: 55,
  info: {
    city: 'Campos do Jordão - SP',
    sports: ['Mountain Bike', 'Ciclismo'],
    description: 'Grupo de ciclismo de montanha',
    logo: '🚴'
  }
}];

const locationColors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500'];

const InteractiveMapSection = () => {
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const mapElement = document.querySelector('#interactive-map');
      if (!mapElement) return;

      const rect = mapElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calcular o progresso do scroll baseado na posição da seção do mapa
      let progress = 0;
      if (rect.top < windowHeight && rect.bottom > 0) {
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        progress = Math.max(0, Math.min(1, (visibleHeight / rect.height) * 1.5));
      }
      
      setScrollProgress(progress);
      
      // Determinar quantos cards mostrar baseado no progresso
      const cardsToShow = Math.floor(progress * locations.length);
      const newVisibleCards = new Set<string>();
      
      for (let i = 0; i < cardsToShow; i++) {
        newVisibleCards.add(locations[i].id);
      }
      
      setVisibleCards(newVisibleCards);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Executar uma vez na inicialização
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="w-full px-4 md:px-8 lg:px-4 flex flex-col items-center bg-white py-[31px]">
      <div className="w-full md:w-11/12 lg:w-3/4 mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2 md:text-5xl">
          Hub do Núcleo do Esporte
        </h2>
        <p className="text-gray-500 text-center mb-8 text-base max-w-xl mx-auto">
          Descubra, avalie e conecte-se com estabelecimentos e grupos esportivos próximos à você.
        </p>
        
        {/* Botão para acessar o hub completo */}
        <div className="text-center mb-8">
          <Link to="/hub">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
              <MapPin className="w-5 h-5 mr-2" />
              Acessar Hub Completo
            </Button>
          </Link>
        </div>
        
        <div id="interactive-map" className="relative w-full h-[400px] md:h-[600px] rounded-xl overflow-hidden">
          {/* Imagem de fundo do mapa */}
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{
              backgroundImage: `url(/lovable-uploads/744f2913-0736-467a-b5de-f6757c8dc471.png)`,
              backgroundPosition: 'center center',
              backgroundSize: 'cover'
            }} 
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/30" />
          
          {/* Pinos do mapa */}
          {locations.map((location, index) => (
            <div 
              key={location.id} 
              className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer z-10"
              style={{
                left: `${location.x}%`,
                top: `${location.y}%`
              }}
            >
              <div className="flex flex-col items-center">
                <div className={`relative ${locationColors[index % locationColors.length]} w-6 h-6 md:w-8 md:h-8 rounded-full shadow-lg transform hover:scale-125 transition-transform duration-300 flex items-center justify-center`}>
                  <MapPin size={12} className="text-white md:w-4 md:h-4" />
                </div>
              </div>
            </div>
          ))}

          {/* Cards dos estabelecimentos sobrepostos */}
          {locations.map((location, index) => {
            const isVisible = visibleCards.has(location.id);
            const cardOpacity = isVisible ? Math.min(scrollProgress * 2, 1) : 0;
            
            return (
              <div 
                key={`card-${location.id}`}
                className={`absolute bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transition-all duration-1000 ease-in-out z-20 w-44 md:w-52`}
                style={{
                  left: `${Math.min(Math.max(location.x - 10, 5), 75)}%`,
                  top: `${Math.max(location.y - 20, 5)}%`,
                  opacity: cardOpacity,
                  transform: `translateY(${isVisible ? 0 : 20}px) scale(${isVisible ? 1 : 0.9})`,
                  transitionDelay: `${index * 150}ms`
                }}
              >
                <div className="p-3">
                  {/* Logo do estabelecimento/grupo */}
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg shadow-sm flex items-center justify-center mr-2 text-lg">
                      {location.info.logo}
                    </div>
                    <div className={`p-1 rounded-full ${location.type === 'establishment' ? 'bg-orange-500' : 'bg-blue-500'} text-white`}>
                      {location.type === 'establishment' ? <Dumbbell size={8} /> : <Users size={8} />}
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 mb-1 text-xs md:text-sm">{location.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{location.info.city}</p>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">{location.info.description}</p>
                  
                  <div className="space-y-1">
                    <h4 className="font-semibold text-gray-800 text-xs">Modalidades:</h4>
                    <div className="flex flex-wrap gap-1">
                      {location.info.sports.slice(0, 2).map((sport, sportIndex) => (
                        <span key={sportIndex} className={`px-1 py-0.5 text-xs rounded-full text-white ${location.type === 'establishment' ? 'bg-orange-400' : 'bg-blue-400'}`}>
                          {sport}
                        </span>
                      ))}
                      {location.info.sports.length > 2 && (
                        <span className="text-xs text-gray-500">+{location.info.sports.length - 2}</span>
                      )}
                    </div>
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
