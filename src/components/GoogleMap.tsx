
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';

interface GoogleMapProps {
  establishments?: Array<{
    id: string;
    establishment_name: string;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    sports: string[];
    photos?: Array<{ photo_url: string; is_main: boolean }>;
  }>;
  groups?: Array<{
    id: string;
    group_name: string;
    latitude: number;
    longitude: number;
    cities: string[];
    sports: string[];
  }>;
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
  onMarkerClick?: (item: any) => void;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  establishments = [],
  groups = [],
  center = { lat: -23.5505, lng: -46.6333 }, // São Paulo default
  zoom = 11,
  height = '400px',
  onMarkerClick
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<globalThis.google.maps.Map | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showApiInput, setShowApiInput] = useState(false);

  // Use the provided API key
  const API_KEY = 'AIzaSyAptrPGUytCq3D9a1p6WoltJlbKdqbYzyc';

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    setMap(mapInstance);

    // Add establishment markers
    establishments.forEach((establishment) => {
      if (establishment.latitude && establishment.longitude) {
        const marker = new window.google.maps.Marker({
          position: { lat: establishment.latitude, lng: establishment.longitude },
          map: mapInstance,
          title: establishment.establishment_name,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="12" fill="#ea580c" stroke="white" stroke-width="2"/>
                <text x="16" y="20" text-anchor="middle" fill="white" font-size="16" font-weight="bold">🏋️</text>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(32, 32)
          }
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-3 max-w-xs">
              <h3 class="font-bold text-lg mb-2">${establishment.establishment_name}</h3>
              <p class="text-sm text-gray-600 mb-2">${establishment.city}, ${establishment.state}</p>
              <div class="flex flex-wrap gap-1 mb-2">
                ${establishment.sports.slice(0, 3).map(sport => 
                  `<span class="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">${sport}</span>`
                ).join('')}
              </div>
              <button class="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600" 
                      onclick="window.location.href='/estabelecimento/${establishment.id}'">
                Ver Detalhes
              </button>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(mapInstance, marker);
          onMarkerClick?.(establishment);
        });
      }
    });

    // Add group markers
    groups.forEach((group) => {
      if (group.latitude && group.longitude) {
        const marker = new window.google.maps.Marker({
          position: { lat: group.latitude, lng: group.longitude },
          map: mapInstance,
          title: group.group_name,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="12" fill="#2563eb" stroke="white" stroke-width="2"/>
                <text x="16" y="20" text-anchor="middle" fill="white" font-size="16" font-weight="bold">👥</text>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(32, 32)
          }
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-3 max-w-xs">
              <h3 class="font-bold text-lg mb-2">${group.group_name}</h3>
              <p class="text-sm text-gray-600 mb-2">${group.cities.join(', ')}</p>
              <div class="flex flex-wrap gap-1 mb-2">
                ${group.sports.slice(0, 3).map(sport => 
                  `<span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${sport}</span>`
                ).join('')}
              </div>
              <button class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600" 
                      onclick="window.location.href='/grupo-esportivo/${group.id}'">
                Ver Detalhes
              </button>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(mapInstance, marker);
          onMarkerClick?.(group);
        });
      }
    });
  };

  const loadGoogleMapsScript = () => {
    setIsLoading(true);
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setIsLoading(false);
      setShowApiInput(false);
      initializeMap();
    };
    script.onerror = () => {
      setIsLoading(false);
      console.error('Erro ao carregar Google Maps. Verifique a chave de API.');
    };
    document.head.appendChild(script);
  };

  useEffect(() => {
    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      setShowApiInput(false);
      initializeMap();
    }
  }, []);

  useEffect(() => {
    if (map) {
      initializeMap();
    }
  }, [establishments, groups, map]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6" style={{ height }}>
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <MapPin size={48} className="text-gray-400 animate-pulse" />
          <h3 className="text-xl font-semibold text-gray-800">Carregando mapa...</h3>
          <p className="text-gray-600 text-center">
            Aguarde enquanto carregamos o Google Maps.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div ref={mapRef} style={{ height }} className="w-full" />
    </div>
  );
};

export default GoogleMap;
