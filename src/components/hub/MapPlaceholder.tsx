
import React from 'react';
import MapLibre from '@/components/MapLibre';
import { EstablishmentWithDetails } from '@/hooks/useEstablishments';

interface MapPlaceholderProps {
  selectedRegion: string;
  resultCount: number;
  establishments?: EstablishmentWithDetails[];
  groups?: Array<{
    id: string;
    group_name: string;
    cities: string[];
    sports: string[];
    latitude: number;
    longitude: number;
  }>;
}

const MapPlaceholder: React.FC<MapPlaceholderProps> = ({
  selectedRegion,
  resultCount,
  establishments = [],
  groups = []
}) => {
  // Convert establishments to map format
  const mapEstablishments = establishments
    .filter(e => e.latitude && e.longitude)
    .map(e => ({
      id: e.id,
      establishment_name: e.establishment_name,
      latitude: e.latitude!,
      longitude: e.longitude!,
      city: e.city,
      state: e.state,
      sports: e.sports,
      photos: e.photos,
    }));

  // Convert groups to map format
  const mapGroups = groups
    .filter(g => g.latitude && g.longitude)
    .map(g => ({
      id: g.id,
      group_name: g.group_name,
      latitude: g.latitude,
      longitude: g.longitude,
      cities: g.cities,
      sports: g.sports,
    }));

  // Calculate center based on available data
  let center = { lat: -23.5505, lng: -46.6333 }; // São Paulo default
  
  if (mapEstablishments.length > 0 || mapGroups.length > 0) {
    const allLatitudes = [
      ...mapEstablishments.map(e => e.latitude),
      ...mapGroups.map(g => g.latitude)
    ];
    const allLongitudes = [
      ...mapEstablishments.map(e => e.longitude),
      ...mapGroups.map(g => g.longitude)
    ];

    if (allLatitudes.length > 0) {
      center = {
        lat: allLatitudes.reduce((sum, lat) => sum + lat, 0) / allLatitudes.length,
        lng: allLongitudes.reduce((sum, lng) => sum + lng, 0) / allLongitudes.length,
      };
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">
          Mapa Interativo
        </h3>
        {selectedRegion && (
          <p className="text-sm text-gray-600">
            Mostrando {resultCount} resultados para {selectedRegion}
          </p>
        )}
      </div>
      
      <MapLibre
        establishments={mapEstablishments}
        groups={mapGroups}
        center={center}
        zoom={mapEstablishments.length > 0 || mapGroups.length > 0 ? 12 : 11}
        height="600px"
        onMarkerClick={(item) => {
          if ('establishment_name' in item) {
            window.open(`/estabelecimento/${item.id}`, '_blank');
          } else {
            window.open(`/grupo-esportivo/${item.id}`, '_blank');
          }
        }}
      />
    </div>
  );
};

export default MapPlaceholder;
