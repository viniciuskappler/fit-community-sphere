
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
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    const mapInstance = new google.maps.Map(mapRef.current, {
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
        const marker = new google.maps.Marker({
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
            scaledSize: new google.maps.Size(32, 32)
          }
        });

        const infoWindow = new google.maps.InfoWindow({
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
        const marker = new google.maps.Marker({
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
            scaledSize: new google.maps.Size(32, 32)
          }
        });

        const infoWindow = new google.maps.InfoWindow({
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

  const loadGoogleMapsScript = (key: string) => {
    setIsLoading(true);
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setIsLoading(false);
      setShowApiInput(false);
      initializeMap();
    };
    script.onerror = () => {
      setIsLoading(false);
      alert('Erro ao carregar Google Maps. Verifique sua chave de API.');
    };
    document.head.appendChild(script);
  };

  const handleApiKeySubmit = () => {
    if (apiKey.length > 20) {
      loadGoogleMapsScript(apiKey);
      localStorage.setItem('googleMapsApiKey', apiKey);
    } else {
      alert('Por favor, insira uma chave de API válida');
    }
  };

  useEffect(() => {
    const savedApiKey = localStorage.getItem('googleMapsApiKey');
    if (savedApiKey && !window.google) {
      setApiKey(savedApiKey);
      loadGoogleMapsScript(savedApiKey);
    } else if (window.google) {
      setShowApiInput(false);
      initializeMap();
    }
  }, []);

  useEffect(() => {
    if (map) {
      initializeMap();
    }
  }, [establishments, groups, map]);

  if (showApiInput) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6" style={{ height }}>
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <MapPin size={48} className="text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-800">Configure o Google Maps</h3>
          <p className="text-gray-600 text-center max-w-md">
            Para usar o mapa interativo, você precisa configurar sua chave de API do Google Maps.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
            <Input
              type="text"
              placeholder="Cole sua chave de API do Google Maps"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleApiKeySubmit} 
              disabled={isLoading || apiKey.length < 20}
              className="bg-orange-500 hover:bg-orange-600"
            >
              {isLoading ? 'Carregando...' : 'Configurar'}
            </Button>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Obtenha sua chave gratuita em: 
            <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline ml-1">
              Google Cloud Console
            </a>
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
