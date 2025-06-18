
import React, { useState, useEffect } from 'react';
import { MapPin, Dumbbell, Users, Camera } from 'lucide-react';

interface MapLocation {
  id: string;
  name: string;
  type: 'establishment' | 'group';
  x: number;
  y: number;
  info: {
    city: string;
    sports: string[];
    photo: string;
    description: string;
  };
}

const locations: MapLocation[] = [{
  id: '1',
  name: 'FitMax Academia',
  type: 'establishment',
  x: 30,
  y: 35,
  info: {
    city: 'São Paulo - SP',
    sports: ['Musculação', 'Pilates', 'Crossfit'],
    photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
    description: 'Academia completa com equipamentos modernos'
  }
}, {
  id: '2',
  name: 'PowerGym Elite',
  type: 'establishment',
  x: 65,
  y: 40,
  info: {
    city: 'Rio de Janeiro - RJ',
    sports: ['Cross Training', 'HIIT', 'Funcional'],
    photo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop',
    description: 'Espaço dedicado ao treinamento funcional'
  }
}, {
  id: '3',
  name: 'Strong Performance',
  type: 'establishment',
  x: 45,
  y: 65,
  info: {
    city: 'Belo Horizonte - MG',
    sports: ['Performance Atlética', 'Condicionamento'],
    photo: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=300&h=200&fit=crop',
    description: 'Centro de treinamento especializado'
  }
}, {
  id: '4',
  name: 'Runners SP',
  type: 'group',
  x: 55,
  y: 50,
  info: {
    city: 'São Paulo - SP',
    sports: ['Corrida de Rua', 'Maratona'],
    photo: 'https://images.unsplash.com/photo-1544967882-f61367c5476b?w=300&h=200&fit=crop',
    description: 'Grupo de corrida urbana'
  }
}, {
  id: '5',
  name: 'Bikers das Montanhas',
  type: 'group',
  x: 25,
  y: 75,
  info: {
    city: 'Campos do Jordão - SP',
    sports: ['Mountain Bike', 'Ciclismo'],
    photo: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop',
    description: 'Grupo de ciclismo de montanha'
  }
}];

const locationColors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500'];

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
        progress = Math.max(0, Math.min(1, visibleHeight / (rect.height * 0.8)));
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
          Mapa de Estabelecimentos e Grupos
        </h2>
        <p className="text-gray-500 text-center mb-12 text-base max-w-xl mx-auto">
          Descubra academias, centros de treinamento e grupos esportivos próximos à você.
        </p>
        
        <div id="interactive-map" className="relative w-full h-[600px] rounded-xl overflow-hidden">
          {/* Imagem de fundo do mapa */}
          <div className="absolute inset-0 bg-cover bg-center" style={{
            backgroundImage: `url(/lovable-uploads/744f2913-0736-467a-b5de-f6757c8dc471.png)`,
            backgroundPosition: 'center center'
          }} />
          
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
                <div className={`relative ${locationColors[index % locationColors.length]} w-8 h-8 rounded-full shadow-lg transform hover:scale-125 transition-transform duration-300 flex items-center justify-center`}>
                  <MapPin size={16} className="text-white" />
                </div>
              </div>
            </div>
          ))}

          {/* Cards dos estabelecimentos sobrepostos */}
          {locations.map((location, index) => {
            const isVisible = visibleCards.has(location.id);
            return (
              <div 
                key={`card-${location.id}`}
                className={`absolute bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transition-all duration-700 ease-out z-20 w-64 ${
                  isVisible 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 translate-y-8'
                }`}
                style={{
                  left: `${Math.min(Math.max(location.x - 15, 5), 70)}%`,
                  top: `${Math.max(location.y - 25, 5)}%`,
                  transitionDelay: isVisible ? `${index * 200}ms` : '0ms'
                }}
              >
                <div className="relative">
                  <img src={location.info.photo} alt={location.name} className="w-full h-20 object-cover" />
                  
                  {/* Logo do estabelecimento/grupo */}
                  <div className="absolute top-2 left-2 w-6 h-6 bg-white rounded-lg shadow-md flex items-center justify-center">
                    <Camera size={12} className="text-gray-600" />
                  </div>
                  
                  <div className={`absolute top-2 right-2 p-1 rounded-full ${location.type === 'establishment' ? 'bg-orange-500' : 'bg-blue-500'} text-white`}>
                    {location.type === 'establishment' ? <Dumbbell size={10} /> : <Users size={10} />}
                  </div>
                </div>
                
                <div className="p-3">
                  <h3 className="font-bold text-gray-900 mb-1 text-xs">{location.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{location.info.city}</p>
                  <p className="text-xs text-gray-600 mb-2">{location.info.description}</p>
                  
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
