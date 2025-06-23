
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
  const [visiblePins, setVisiblePins] = useState<Set<string>>(new Set());
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const mapElement = document.querySelector('#interactive-map');
      if (!mapElement) return;

      const rect = mapElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const inView = rect.top < windowHeight && rect.bottom > 0;
      setIsInView(inView);
      
      if (inView) {
        const elementCenter = rect.top + rect.height / 2;
        const windowCenter = windowHeight / 2;
        const distance = Math.abs(elementCenter - windowCenter);
        const maxDistance = windowHeight / 2 + rect.height / 2;
        const progress = Math.max(0, 1 - distance / maxDistance);
        
        setScrollProgress(progress);
        
        const progressThreshold = 0.2;
        
        if (progress > progressThreshold) {
          const adjustedProgress = (progress - progressThreshold) / (1 - progressThreshold);
          const pinsToShow = Math.min(locations.length, Math.floor(adjustedProgress * locations.length * 1.2));
          
          const newVisiblePins = new Set<string>();
          const showOrder = [0, 3, 1, 4, 2, 5];
          for (let i = 0; i < pinsToShow; i++) {
            const locationIndex = showOrder[i];
            if (locationIndex < locations.length) {
              newVisiblePins.add(locations[locationIndex].id);
            }
          }
          
          setVisiblePins(newVisiblePins);
        } else {
          setVisiblePins(new Set());
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        
        <div className="text-center mb-8">
          <Link to="/hub">
            <Button size="lg" className="bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white transform hover:scale-105 transition-all duration-300">
              <MapPin className="w-5 h-5 mr-2" />
              Acessar Hub Completo
            </Button>
          </Link>
        </div>
        
        <div id="interactive-map" className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
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
          
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/30" />
          
          {locations.map((location, index) => {
            const isVisible = visiblePins.has(location.id);
            const isHovered = hoveredLocation === location.id;
            return (
              <div key={`pin-${location.id}`}>
                {/* Pin Marker */}
                <div 
                  className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer z-20"
                  style={{
                    left: `${location.x}%`,
                    top: `${location.y}%`,
                    opacity: isVisible ? 1 : 0.3,
                    transform: `translate(-50%, -100%) scale(${isVisible ? 1.2 : 1})`,
                    transition: `all 0.8s ease-out ${index * 200}ms`
                  }}
                  onMouseEnter={() => setHoveredLocation(location.id)}
                  onMouseLeave={() => setHoveredLocation(null)}
                >
                  <div className="flex flex-col items-center">
                    <div className={`relative ${
                      location.type === 'establishment' ? 'bg-gradient-to-r from-orange-600 to-orange-400' : 'bg-gradient-to-r from-blue-600 to-blue-400'
                    } w-6 h-6 md:w-8 md:h-8 rounded-full shadow-lg flex items-center justify-center ${isVisible ? 'animate-bounce' : ''}`}>
                      <MapPin size={12} className="text-white md:w-4 md:h-4" />
                    </div>
                  </div>
                </div>

                {/* Location Name on Hover */}
                {isHovered && isVisible && (
                  <div 
                    className="absolute bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-200 px-3 py-2 z-30 pointer-events-none"
                    style={{
                      left: `${Math.min(Math.max(location.x - 8, 5), 80)}%`,
                      top: `${Math.max(location.y - 15, 5)}%`,
                      transform: 'translateY(-100%)'
                    }}
                  >
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow-sm flex items-center justify-center mr-2 text-sm">
                        {location.info.logo}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm">{location.name}</h3>
                        <p className="text-xs text-gray-500">{location.info.city}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InteractiveMapSection;
