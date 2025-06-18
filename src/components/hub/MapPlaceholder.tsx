
import React from 'react';
import { MapPin } from 'lucide-react';

interface MapPlaceholderProps {
  selectedRegion: string;
  resultCount: number;
}

const MapPlaceholder: React.FC<MapPlaceholderProps> = ({
  selectedRegion,
  resultCount,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Mapa Interativo
      </h3>
      <div className="bg-gray-100 rounded-xl h-[600px] flex items-center justify-center border-2 border-dashed border-gray-300">
        <div className="text-center">
          <MapPin size={48} className="text-gray-400 mx-auto mb-4" />
          <h4 className="text-xl font-semibold text-gray-600 mb-2">
            Mapa em Desenvolvimento
          </h4>
          <p className="text-gray-500 max-w-sm">
            {selectedRegion 
              ? `Mapa mostrará ${resultCount} resultados para ${selectedRegion}`
              : "Selecione uma região para visualizar os locais no mapa"
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapPlaceholder;
