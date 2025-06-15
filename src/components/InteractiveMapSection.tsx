
import React, { useState } from 'react';
import { MapPin, Dumbbell, Users } from 'lucide-react';

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
  name: 'Olympia Academia',
  type: 'establishment',
  x: 25,
  y: 30,
  info: {
    city: 'São Paulo - SP',
    sports: ['Musculação', 'Pilates', 'Crossfit'],
    photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
    description: 'Academia completa com equipamentos modernos'
  }
}, {
  id: '2',
  name: 'Megarace Fitness',
  type: 'establishment',
  x: 70,
  y: 25,
  info: {
    city: 'Rio de Janeiro - RJ',
    sports: ['Cross Training', 'HIIT', 'Funcional'],
    photo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop',
    description: 'Espaço dedicado ao treinamento funcional'
  }
}, {
  id: '3',
  name: 'AX CT',
  type: 'establishment',
  x: 45,
  y: 60,
  info: {
    city: 'Belo Horizonte - MG',
    sports: ['Performance Atlética', 'Condicionamento'],
    photo: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=300&h=200&fit=crop',
    description: 'Centro de treinamento especializado'
  }
}, {
  id: '4',
  name: 'Manos da Pesca',
  type: 'group',
  x: 80,
  y: 70,
  info: {
    city: 'Florianópolis - SC',
    sports: ['Pesca Esportiva', 'Pesca Oceânica'],
    photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop',
    description: 'Grupo de pescadores esportivos'
  }
}, {
  id: '5',
  name: 'Circuito dos Vales',
  type: 'group',
  x: 20,
  y: 75,
  info: {
    city: 'Campos do Jordão - SP',
    sports: ['Mountain Bike', 'Ciclismo'],
    photo: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop',
    description: 'Grupo de ciclismo de montanha'
  }
}, {
  id: '6',
  name: 'Vamo Pro Corre',
  type: 'group',
  x: 60,
  y: 40,
  info: {
    city: 'São Paulo - SP',
    sports: ['Corrida de Rua', 'Maratona'],
    photo: 'https://images.unsplash.com/photo-1544967882-f61367c5476b?w=300&h=200&fit=crop',
    description: 'Grupo de corrida urbana'
  }
}];

// Cores diferentes para cada localização
const locationColors = [
  'bg-red-500',
  'bg-blue-500', 
  'bg-green-500',
  'bg-purple-500',
  'bg-yellow-500',
  'bg-pink-500'
];

const InteractiveMapSection = () => {
  const [hoveredLocation, setHoveredLocation] = useState<MapLocation | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({
    x: 0,
    y: 0
  });

  const handlePinHover = (location: MapLocation, event: React.MouseEvent) => {
    setHoveredLocation(location);
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  const handlePinLeave = () => {
    setHoveredLocation(null);
  };

  return (
    <section className="w-full px-4 flex flex-col items-center py-[100px] bg-white">
      <div className="w-3/4 mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2 md:text-5xl">
          Mapa de Estabelecimentos e Grupos
        </h2>
        <p className="text-gray-500 text-center mb-12 text-base max-w-xl mx-auto">
          Descubra academias, centros de treinamento e grupos esportivos próximos à você.
        </p>
        
        {/* Imagem sem caixa, apenas com degradê */}
        <div className="relative w-full h-[600px] rounded-xl overflow-hidden">
          {/* Background image */}
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{
              backgroundImage: `url(/lovable-uploads/42c43684-60db-4ba2-9e0e-a851954d5be9.png)`,
              backgroundPosition: 'center 20%'
            }} 
          />
          
          {/* Gradient overlay to blend with white background - mais intenso */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-white/60" />
          <div className="absolute inset-0 bg-gradient-to-l from-white/50 via-transparent to-white/50" />
          
          {/* Map pins - estilo Google Maps */}
          {locations.map((location, index) => (
            <div
              key={location.id}
              className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-all duration-200 hover:scale-110 z-10"
              style={{
                left: `${location.x}%`,
                top: `${location.y}%`
              }}
              onMouseEnter={(e) => handlePinHover(location, e)}
              onMouseLeave={handlePinLeave}
            >
              <div className="flex flex-col items-center">
                {/* Pin estilo Google Maps */}
                <div className={`relative ${locationColors[index % locationColors.length]} w-8 h-8 rounded-full shadow-lg transform hover:scale-110 transition-transform flex items-center justify-center`}>
                  <MapPin size={16} className="text-white" />
                  {/* Sombra do pin */}
                  <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent ${locationColors[index % locationColors.length].replace('bg-', 'border-t-')}`}></div>
                </div>
                
                {/* Nome do local */}
                <div className={`mt-3 px-3 py-1 rounded-lg text-xs font-medium text-white shadow-md ${locationColors[index % locationColors.length]} max-w-[120px] text-center`}>
                  {location.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Tooltip mantido igual */}
      {hoveredLocation && (
        <div
          className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden w-72 pointer-events-none transform -translate-x-1/2 -translate-y-full"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y
          }}
        >
          <div className="relative">
            <img 
              src={hoveredLocation.info.photo} 
              alt={hoveredLocation.name} 
              className="w-full h-24 object-cover" 
            />
            <div className={`absolute top-2 right-2 p-1 rounded-full ${hoveredLocation.type === 'establishment' ? 'bg-orange-500' : 'bg-blue-500'} text-white`}>
              {hoveredLocation.type === 'establishment' ? <Dumbbell size={12} /> : <Users size={12} />}
            </div>
          </div>
          
          <div className="p-3">
            <h3 className="font-bold text-gray-900 mb-1 text-sm">{hoveredLocation.name}</h3>
            <p className="text-xs text-gray-500 mb-2">{hoveredLocation.info.city}</p>
            
            <div className="space-y-1">
              <h4 className="font-semibold text-gray-800 text-xs">Modalidades:</h4>
              <div className="flex flex-wrap gap-1">
                {hoveredLocation.info.sports.slice(0, 3).map((sport, index) => (
                  <span 
                    key={index} 
                    className={`px-2 py-0.5 text-xs rounded-full text-white ${hoveredLocation.type === 'establishment' ? 'bg-orange-400' : 'bg-blue-400'}`}
                  >
                    {sport}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default InteractiveMapSection;
