
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
  x: 25,
  y: 40,
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
  x: 70,
  y: 35,
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
  y: 70,
  info: {
    city: 'Belo Horizonte - MG',
    sports: ['Performance Atlética', 'Condicionamento'],
    photo: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=300&h=200&fit=crop',
    description: 'Centro de treinamento especializado'
  }
}, {
  id: '4',
  name: 'Pescadores Unidos',
  type: 'group',
  x: 80,
  y: 80,
  info: {
    city: 'Florianópolis - SC',
    sports: ['Pesca Esportiva', 'Pesca Oceânica'],
    photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop',
    description: 'Grupo de pescadores esportivos'
  }
}, {
  id: '5',
  name: 'Bikers das Montanhas',
  type: 'group',
  x: 20,
  y: 85,
  info: {
    city: 'Campos do Jordão - SP',
    sports: ['Mountain Bike', 'Ciclismo'],
    photo: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop',
    description: 'Grupo de ciclismo de montanha'
  }
}, {
  id: '6',
  name: 'Runners SP',
  type: 'group',
  x: 60,
  y: 50,
  info: {
    city: 'São Paulo - SP',
    sports: ['Corrida de Rua', 'Maratona'],
    photo: 'https://images.unsplash.com/photo-1544967882-f61367c5476b?w=300&h=200&fit=crop',
    description: 'Grupo de corrida urbana'
  }
}];

const locationColors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-pink-500'];

const InteractiveMapSection = () => {
  const [visibleLocations, setVisibleLocations] = useState<Set<string>>(new Set());
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
      
      // Determinar quantos locais mostrar baseado no progresso
      const locationsToShow = Math.floor(progress * locations.length);
      const newVisibleLocations = new Set<string>();
      
      for (let i = 0; i < locationsToShow; i++) {
        newVisibleLocations.add(locations[i].id);
      }
      
      setVisibleLocations(newVisibleLocations);
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
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mapa */}
          <div id="interactive-map" className="relative w-full lg:w-2/3 h-[600px] rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center" style={{
              backgroundImage: `url(/lovable-uploads/744f2913-0736-467a-b5de-f6757c8dc471.png)`,
              backgroundPosition: 'center center'
            }} />
            
            <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/30" />
            
            {/* Map pins */}
            {locations.map((location, index) => {
              const isVisible = visibleLocations.has(location.id);
              return (
                <div 
                  key={location.id} 
                  className={`absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-all duration-700 ease-out z-10 ${
                    isVisible 
                      ? 'opacity-100 scale-100 translate-y-0' 
                      : 'opacity-0 scale-75 translate-y-8'
                  }`}
                  style={{
                    left: `${location.x}%`,
                    top: `${location.y}%`,
                    transitionDelay: isVisible ? `${index * 200}ms` : '0ms'
                  }}
                >
                  <div className="flex flex-col items-center">
                    <div className={`relative ${locationColors[index % locationColors.length]} w-8 h-8 rounded-full shadow-lg transform hover:scale-125 transition-transform duration-300 flex items-center justify-center`}>
                      <MapPin size={16} className="text-white" />
                      <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent ${locationColors[index % locationColors.length].replace('bg-', 'border-t-')}`}></div>
                    </div>
                    
                    <div className={`mt-3 px-2 py-1 rounded-lg text-xs font-medium text-white shadow-md ${locationColors[index % locationColors.length]} max-w-[100px] text-center opacity-90`}>
                      {location.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Painel de informações */}
          <div className="w-full lg:w-1/3 space-y-4 max-h-[600px] overflow-y-auto">
            {locations.map((location, index) => {
              const isVisible = visibleLocations.has(location.id);
              return (
                <div 
                  key={location.id}
                  className={`bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-all duration-700 ease-out ${
                    isVisible 
                      ? 'opacity-100 scale-100 translate-x-0' 
                      : 'opacity-0 scale-95 translate-x-8'
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${index * 200}ms` : '0ms'
                  }}
                >
                  <div className="relative">
                    <img src={location.info.photo} alt={location.name} className="w-full h-24 object-cover" />
                    
                    {/* Logo do estabelecimento/grupo */}
                    <div className="absolute top-2 left-2 w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center">
                      <Camera size={14} className="text-gray-600" />
                    </div>
                    
                    <div className={`absolute top-2 right-2 p-1 rounded-full ${location.type === 'establishment' ? 'bg-orange-500' : 'bg-blue-500'} text-white`}>
                      {location.type === 'establishment' ? <Dumbbell size={12} /> : <Users size={12} />}
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <h3 className="font-bold text-gray-900 mb-1 text-sm">{location.name}</h3>
                    <p className="text-xs text-gray-500 mb-2">{location.info.city}</p>
                    <p className="text-xs text-gray-600 mb-3">{location.info.description}</p>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800 text-xs">Modalidades:</h4>
                      <div className="flex flex-wrap gap-1">
                        {location.info.sports.map((sport, sportIndex) => (
                          <span key={sportIndex} className={`px-2 py-1 text-xs rounded-full text-white ${location.type === 'establishment' ? 'bg-orange-400' : 'bg-blue-400'}`}>
                            {sport}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMapSection;
