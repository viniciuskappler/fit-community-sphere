
import React, { useState } from 'react';
import { MapPin, Dumbbell, Users } from 'lucide-react';

interface MapLocation {
  id: string;
  name: string;
  type: 'establishment' | 'group';
  x: number;
  y: number;
  info: {
    description: string;
    specialty: string;
    contact?: string;
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
      description: 'Academia completa com equipamentos modernos',
      specialty: 'Musculação e Fitness',
      contact: '(11) 99999-1234'
    }
  },
  {
    id: '2',
    name: 'Megarace Fitness',
    type: 'establishment',
    x: 70,
    y: 25,
    info: {
      description: 'Espaço dedicado ao treinamento funcional',
      specialty: 'Cross Training e HIIT',
      contact: '(11) 99999-5678'
    }
  },
  {
    id: '3',
    name: 'AX CT',
    type: 'establishment',
    x: 45,
    y: 60,
    info: {
      description: 'Centro de treinamento especializado',
      specialty: 'Performance Atlética',
      contact: '(11) 99999-9012'
    }
  },
  {
    id: '4',
    name: 'Manos da Pesca',
    type: 'group',
    x: 80,
    y: 70,
    info: {
      description: 'Grupo de pescadores esportivos',
      specialty: 'Pesca Esportiva',
    }
  },
  {
    id: '5',
    name: 'Circuito dos Vales',
    type: 'group',
    x: 20,
    y: 75,
    info: {
      description: 'Grupo de ciclismo de montanha',
      specialty: 'Mountain Bike',
    }
  },
  {
    id: '6',
    name: 'Vamo Pro Corre',
    type: 'group',
    x: 60,
    y: 40,
    info: {
      description: 'Grupo de corrida urbana',
      specialty: 'Corrida de Rua',
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
        
        <div className="relative bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-gray-200 overflow-hidden">
          {/* Map Background - Simulated city layout */}
          <div className="relative w-full h-[600px] bg-gradient-to-br from-green-100 to-blue-100 rounded-xl overflow-hidden">
            {/* Streets simulation */}
            <div className="absolute top-1/3 left-0 right-0 h-2 bg-gray-300 opacity-40"></div>
            <div className="absolute top-2/3 left-0 right-0 h-2 bg-gray-300 opacity-40"></div>
            <div className="absolute left-1/4 top-0 bottom-0 w-2 bg-gray-300 opacity-40"></div>
            <div className="absolute left-3/4 top-0 bottom-0 w-2 bg-gray-300 opacity-40"></div>
            
            {/* Map pins */}
            {locations.map((location) => (
              <div
                key={location.id}
                className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-all duration-200 hover:scale-110"
                style={{
                  left: `${location.x}%`,
                  top: `${location.y}%`
                }}
                onMouseEnter={(e) => handlePinHover(location, e)}
                onMouseLeave={handlePinLeave}
              >
                <div className={`flex flex-col items-center ${location.type === 'establishment' ? 'text-orange-500' : 'text-blue-500'}`}>
                  <div className={`p-2 rounded-full shadow-lg ${location.type === 'establishment' ? 'bg-orange-500' : 'bg-blue-500'} text-white`}>
                    {location.type === 'establishment' ? (
                      <Dumbbell size={20} />
                    ) : (
                      <Users size={20} />
                    )}
                  </div>
                  <div className={`mt-1 px-2 py-1 rounded text-xs font-medium text-white shadow-md ${location.type === 'establishment' ? 'bg-orange-500' : 'bg-blue-500'}`}>
                    {location.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex justify-center mt-6 space-x-8">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-6 h-6 bg-orange-500 rounded-full">
                <Dumbbell size={12} className="text-white" />
              </div>
              <span className="text-sm text-gray-600">Estabelecimentos</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full">
                <Users size={12} className="text-white" />
              </div>
              <span className="text-sm text-gray-600">Grupos Esportivos</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tooltip */}
      {hoveredLocation && (
        <div
          className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-xs pointer-events-none transform -translate-x-1/2 -translate-y-full"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y
          }}
        >
          <h3 className="font-bold text-gray-900 mb-1">{hoveredLocation.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{hoveredLocation.info.description}</p>
          <div className="text-xs text-gray-500">
            <p className="font-medium">{hoveredLocation.info.specialty}</p>
            {hoveredLocation.info.contact && (
              <p className="mt-1">{hoveredLocation.info.contact}</p>
            )}
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
