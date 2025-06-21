
import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface MapLibreProps {
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

const MapLibre: React.FC<MapLibreProps> = ({
  establishments = [],
  groups = [],
  center = { lat: -23.5505, lng: -46.6333 }, // São Paulo default
  zoom = 11,
  height = '400px',
  onMarkerClick
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<maplibregl.Map | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [mapboxToken, setMapboxToken] = useState('');

  // Token do MapBox - usando o token fornecido como fallback
  const getMapboxToken = () => {
    return import.meta.env.VITE_MAPBOX_TOKEN || 'pk.eyJ1IjoibnVjbGVvZG9lc3BvcnRlIiwiYSI6ImNtYzZuaXpseTAwdXoya3BhdTN0YXdhdGoifQ.M2vZc8nLWI8-rDHZ2m42eQ' || mapboxToken;
  };

  const initializeMap = () => {
    if (!mapRef.current) return;

    const token = getMapboxToken();
    if (!token) {
      setShowTokenInput(true);
      return;
    }

    try {
      setIsLoading(true);
      
      const mapInstance = new maplibregl.Map({
        container: mapRef.current,
        style: `https://api.mapbox.com/styles/v1/mapbox/outdoors-v12?access_token=${token}`,
        center: [center.lng, center.lat],
        zoom,
        attributionControl: false
      });

      mapInstance.addControl(new maplibregl.AttributionControl({
        compact: true
      }));

      mapInstance.addControl(new maplibregl.NavigationControl(), 'top-right');

      mapInstance.on('load', () => {
        setIsLoading(false);
        setMap(mapInstance);
        setShowTokenInput(false);

        // Add markers for establishments
        establishments.forEach((establishment) => {
          if (establishment.latitude && establishment.longitude) {
            // Create custom marker element
            const markerEl = document.createElement('div');
            markerEl.className = 'custom-marker establishment-marker';
            markerEl.innerHTML = '🏋️';
            markerEl.style.cssText = `
              background: #ea580c;
              color: white;
              border: 2px solid white;
              border-radius: 50%;
              width: 32px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
              cursor: pointer;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
              transition: transform 0.2s;
            `;

            markerEl.addEventListener('mouseenter', () => {
              markerEl.style.transform = 'scale(1.1)';
            });

            markerEl.addEventListener('mouseleave', () => {
              markerEl.style.transform = 'scale(1)';
            });

            const marker = new maplibregl.Marker(markerEl)
              .setLngLat([establishment.longitude, establishment.latitude])
              .addTo(mapInstance);

            // Create popup
            const popup = new maplibregl.Popup({ 
              offset: 25,
              closeButton: true,
              closeOnClick: false
            }).setHTML(`
              <div class="p-3 max-w-xs">
                <h3 class="font-bold text-lg mb-2">${establishment.establishment_name}</h3>
                <p class="text-sm text-gray-600 mb-2">${establishment.city}, ${establishment.state}</p>
                <div class="flex flex-wrap gap-1 mb-2">
                  ${establishment.sports.slice(0, 3).map(sport => 
                    `<span class="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">${sport}</span>`
                  ).join('')}
                </div>
                <button class="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors w-full" 
                        onclick="window.open('/estabelecimento/${establishment.id}', '_blank')">
                  Ver Detalhes
                </button>
              </div>
            `);

            markerEl.addEventListener('click', () => {
              popup.addTo(mapInstance);
              marker.setPopup(popup);
              onMarkerClick?.(establishment);
            });
          }
        });

        // Add markers for groups
        groups.forEach((group) => {
          if (group.latitude && group.longitude) {
            const markerEl = document.createElement('div');
            markerEl.className = 'custom-marker group-marker';
            markerEl.innerHTML = '👥';
            markerEl.style.cssText = `
              background: #2563eb;
              color: white;
              border: 2px solid white;
              border-radius: 50%;
              width: 32px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
              cursor: pointer;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
              transition: transform 0.2s;
            `;

            markerEl.addEventListener('mouseenter', () => {
              markerEl.style.transform = 'scale(1.1)';
            });

            markerEl.addEventListener('mouseleave', () => {
              markerEl.style.transform = 'scale(1)';
            });

            const marker = new maplibregl.Marker(markerEl)
              .setLngLat([group.longitude, group.latitude])
              .addTo(mapInstance);

            const popup = new maplibregl.Popup({ 
              offset: 25,
              closeButton: true,
              closeOnClick: false
            }).setHTML(`
              <div class="p-3 max-w-xs">
                <h3 class="font-bold text-lg mb-2">${group.group_name}</h3>
                <p class="text-sm text-gray-600 mb-2">${group.cities.join(', ')}</p>
                <div class="flex flex-wrap gap-1 mb-2">
                  ${group.sports.slice(0, 3).map(sport => 
                    `<span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${sport}</span>`
                  ).join('')}
                </div>
                <button class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors w-full" 
                        onclick="window.open('/grupo-esportivo/${group.id}', '_blank')">
                  Ver Detalhes
                </button>
              </div>
            `);

            markerEl.addEventListener('click', () => {
              popup.addTo(mapInstance);
              marker.setPopup(popup);
              onMarkerClick?.(group);
            });
          }
        });
      });

      mapInstance.on('error', (e) => {
        console.error('Erro no mapa:', e);
        setIsLoading(false);
        setShowTokenInput(true);
      });

    } catch (error) {
      console.error('Erro ao inicializar mapa:', error);
      setIsLoading(false);
      setShowTokenInput(true);
    }
  };

  const loadMapWithToken = () => {
    if (!mapboxToken.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      initializeMap();
    }, 100);
  };

  useEffect(() => {
    initializeMap();

    return () => {
      if (map) {
        map.remove();
        setMap(null);
      }
    };
  }, []);

  useEffect(() => {
    if (map) {
      // Limpar marcadores existentes removendo e recriando o mapa
      map.remove();
      setMap(null);
      setTimeout(() => {
        initializeMap();
      }, 100);
    }
  }, [establishments, groups]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex items-center justify-center" style={{ height }}>
        <div className="flex flex-col items-center justify-center space-y-4">
          <MapPin size={48} className="text-orange-500 animate-pulse" />
          <h3 className="text-xl font-semibold text-gray-800">Carregando mapa...</h3>
          <p className="text-gray-600 text-center">
            Aguarde enquanto carregamos o mapa interativo.
          </p>
        </div>
      </div>
    );
  }

  if (showTokenInput && !getMapboxToken()) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6" style={{ height }}>
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <MapPin size={48} className="text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-800">Token do Mapbox necessário</h3>
          <p className="text-gray-600 text-center mb-4">
            Para usar o mapa, insira seu token público do Mapbox:
          </p>
          <div className="w-full max-w-md space-y-2">
            <input
              type="text"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              placeholder="pk.eyJ1IjoibXl1c2VybmFtZSIsImEiOiJja..."
              className="w-full p-2 border border-gray-300 rounded"
            />
            <Button onClick={loadMapWithToken} className="w-full">
              Carregar Mapa
            </Button>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Obtenha seu token em{' '}
            <a 
              href="https://account.mapbox.com/access-tokens/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              mapbox.com
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

export default MapLibre;
