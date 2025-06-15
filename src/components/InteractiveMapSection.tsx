
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

const locations: MapLocation[] = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  }
];

const InteractiveMapSection = () => {
  const [hoveredLocation, setHoveredLocation] = useState<MapLocation | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

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
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">
          Mapa de Estabelecimentos e Grupos
        </h2>
        <p className="text-gray-500 text-center mb-12 text-base max-w-xl mx-auto">
          Descubra academias, centros de treinamento e grupos esportivos próximos a você.
        </p>
        
        <div className="relative bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-2xl p-8 shadow-xl border border-gray-200 overflow-hidden">
          {/* City Map Background */}
          <div className="relative w-full h-[600px] bg-gradient-to-br from-green-100 via-blue-100 to-indigo-100 rounded-xl overflow-hidden shadow-inner">
            {/* Main Streets - Horizontal */}
            <div className="absolute top-[20%] left-0 right-0 h-3 bg-gray-400 opacity-60 rounded-full"></div>
            <div className="absolute top-[35%] left-0 right-0 h-2 bg-gray-300 opacity-50"></div>
            <div className="absolute top-[65%] left-0 right-0 h-3 bg-gray-400 opacity-60 rounded-full"></div>
            <div className="absolute top-[80%] left-0 right-0 h-2 bg-gray-300 opacity-50"></div>
            
            {/* Main Streets - Vertical */}
            <div className="absolute left-[15%] top-0 bottom-0 w-3 bg-gray-400 opacity-60 rounded-full"></div>
            <div className="absolute left-[30%] top-0 bottom-0 w-2 bg-gray-300 opacity-50"></div>
            <div className="absolute left-[55%] top-0 bottom-0 w-2 bg-gray-300 opacity-50"></div>
            <div className="absolute left-[75%] top-0 bottom-0 w-3 bg-gray-400 opacity-60 rounded-full"></div>
            
            {/* Curved Streets */}
            <div className="absolute top-[10%] left-[10%] w-40 h-40 border-2 border-gray-300 opacity-40 rounded-full"></div>
            <div className="absolute bottom-[15%] right-[15%] w-32 h-32 border-2 border-gray-300 opacity-40 rounded-full"></div>
            
            {/* City Blocks - Parks/Buildings simulation */}
            <div className="absolute top-[25%] left-[20%] w-16 h-12 bg-green-200 opacity-60 rounded-lg"></div>
            <div className="absolute top-[45%] left-[40%] w-20 h-16 bg-blue-200 opacity-60 rounded-lg"></div>
            <div className="absolute top-[25%] right-[20%] w-18 h-14 bg-green-200 opacity-60 rounded-lg"></div>
            <div className="absolute bottom-[30%] left-[35%] w-24 h-18 bg-yellow-200 opacity-50 rounded-lg"></div>
            <div className="absolute bottom-[25%] right-[25%] w-16 h-20 bg-purple-200 opacity-50 rounded-lg"></div>
            
            {/* Water features */}
            <div className="absolute top-[50%] left-[5%] w-24 h-6 bg-blue-300 opacity-70 rounded-full transform rotate-12"></div>
            <div className="absolute bottom-[20%] right-[5%] w-32 h-8 bg-blue-300 opacity-70 rounded-full transform -rotate-6"></div>
            
            {/* Map pins with improved visual style */}
            {locations.map((location) => (
              <div
                key={location.id}
                className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-2 z-10"
                style={{
                  left: `${location.x}%`,
                  top: `${location.y}%`,
                }}
                onMouseEnter={(e) => handlePinHover(location, e)}
                onMouseLeave={handlePinLeave}
              >
                <div className="flex flex-col items-center">
                  {/* Enhanced pin with subtle improvements */}
                  <div 
                    className={`relative p-3 rounded-full shadow-lg transition-all duration-300 transform hover:rotate-6 ${
                      location.type === 'establishment' 
                        ? 'bg-gradient-to-br from-orange-400 to-red-500 hover:from-orange-300 hover:to-red-400' 
                        : 'bg-gradient-to-br from-blue-400 to-indigo-600 hover:from-blue-300 hover:to-indigo-500'
                    }`}
                  >
                    {/* Subtle glow effect */}
                    <div 
                      className={`absolute inset-0 rounded-full blur-sm opacity-20 ${
                        location.type === 'establishment' 
                          ? 'bg-orange-400' 
                          : 'bg-blue-400'
                      }`}
                    ></div>
                    
                    {/* Icon */}
                    <div className="relative z-10 text-white">
                      {location.type === 'establishment' ? (
                        <Dumbbell size={20} />
                      ) : (
                        <Users size={20} />
                      )}
                    </div>
                  </div>
                  
                  {/* Name label with improved styling */}
                  <div 
                    className={`mt-2 px-3 py-1 rounded-lg text-xs font-medium text-white shadow-md transition-all duration-300 hover:scale-105 max-w-[120px] text-center ${
                      location.type === 'establishment' 
                        ? 'bg-orange-500/90' 
                        : 'bg-blue-500/90'
                    }`}
                  >
                    {location.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex justify-center mt-6 space-x-8">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full shadow-lg">
                <Dumbbell size={14} className="text-white" />
              </div>
              <span className="text-sm text-gray-600 font-medium">Estabelecimentos</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full shadow-lg">
                <Users size={14} className="text-white" />
              </div>
              <span className="text-sm text-gray-600 font-medium">Grupos Esportivos</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tooltip */}
      {hoveredLocation && (
        <div
          className="fixed z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-w-sm pointer-events-none transform -translate-x-1/2 -translate-y-full"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y
          }}
        >
          <div className="relative">
            <img 
              src={hoveredLocation.info.photo} 
              alt={hoveredLocation.name}
              className="w-full h-36 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <div className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm ${hoveredLocation.type === 'establishment' ? 'bg-orange-500/80' : 'bg-blue-500/80'} text-white shadow-lg`}>
              {hoveredLocation.type === 'establishment' ? (
                <Dumbbell size={18} />
              ) : (
                <Users size={18} />
              )}
            </div>
          </div>
          
          <div className="p-5">
            <h3 className="font-bold text-gray-900 mb-2 text-lg">{hoveredLocation.name}</h3>
            <p className="text-sm text-gray-500 mb-3 flex items-center">
              <MapPin size={14} className="mr-1" />
              {hoveredLocation.info.city}
            </p>
            <p className="text-sm text-gray-600 mb-4">{hoveredLocation.info.description}</p>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800 text-sm">Modalidades:</h4>
              <div className="flex flex-wrap gap-2">
                {hoveredLocation.info.sports.map((sport, index) => (
                  <span 
                    key={index}
                    className={`px-3 py-1.5 text-xs rounded-full text-white font-medium shadow-md ${
                      hoveredLocation.type === 'establishment' 
                        ? 'bg-gradient-to-r from-orange-400 to-red-500' 
                        : 'bg-gradient-to-r from-blue-400 to-indigo-500'
                    }`}
                  >
                    {sport}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
            <div className="w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-white drop-shadow-sm"></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default InteractiveMapSection;
