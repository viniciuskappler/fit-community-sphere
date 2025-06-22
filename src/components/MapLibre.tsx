import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Button } from '@/components/ui/button';
import { MapPin, AlertCircle, Settings } from 'lucide-react';

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
  const [error, setError] = useState<string>('');

  // Função para obter o token do MapBox
  const getMapboxToken = () => {
    const envToken = import.meta.env.VITE_MAPBOX_TOKEN;
    const storedToken = localStorage.getItem('mapbox_token');
    
    console.log('🗺️ MapBox Token Debug:', {
      envToken: envToken ? 'Presente' : 'Ausente',
      storedToken: storedToken ? 'Presente' : 'Ausente',
      userToken: mapboxToken ? 'Presente' : 'Ausente'
    });
    
    return envToken || storedToken || mapboxToken;
  };

  const saveTokenToStorage = (token: string) => {
    if (token && token.startsWith('pk.')) {
      localStorage.setItem('mapbox_token', token);
    }
  };

  const initializeMap = () => {
    if (!mapRef.current) {
      console.error('🗺️ MapRef não está disponível');
      return;
    }

    const token = getMapboxToken();
    if (!token) {
      console.log('🗺️ Token do MapBox não encontrado, solicitando configuração');
      setShowTokenInput(true);
      setError('');
      return;
    }

    // Verificar se o token é válido (deve começar com pk.)
    if (!token.startsWith('pk.')) {
      console.error('🗺️ Token inválido - deve ser um token público (pk.)');
      setShowTokenInput(true);
      setError('Token inválido. Use um token público que comece com "pk."');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      console.log('🗺️ Inicializando mapa com token válido');
      
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
        console.log('🗺️ Mapa carregado com sucesso!');
        setIsLoading(false);
        setMap(mapInstance);
        setShowTokenInput(false);
        setError('');
        saveTokenToStorage(token);

        // Add markers for establishments
        establishments.forEach((establishment) => {
          if (establishment.latitude && establishment.longitude) {
            console.log('🏋️ Adicionando marcador para estabelecimento:', establishment.establishment_name);
            
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
            console.log('👥 Adicionando marcador para grupo:', group.group_name);
            
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
        console.error('🗺️ Erro no mapa:', e);
        setIsLoading(false);
        setError('Erro ao carregar o mapa. Verifique se o token do MapBox está correto.');
        setShowTokenInput(true);
      });

    } catch (error) {
      console.error('🗺️ Erro ao inicializar mapa:', error);
      setIsLoading(false);
      setError('Erro ao inicializar o mapa. Verifique a configuração.');
      setShowTokenInput(true);
    }
  };

  const loadMapWithToken = () => {
    if (!mapboxToken.trim()) {
      setError('Por favor, insira um token válido');
      return;
    }
    
    if (!mapboxToken.startsWith('pk.')) {
      setError('Token inválido. Use um token público que comece com "pk."');
      return;
    }
    
    setIsLoading(true);
    setError('');
    saveTokenToStorage(mapboxToken);
    setTimeout(() => {
      initializeMap();
    }, 100);
  };

  const clearStoredToken = () => {
    localStorage.removeItem('mapbox_token');
    setMapboxToken('');
    setShowTokenInput(true);
    setError('');
    if (map) {
      map.remove();
      setMap(null);
    }
  };

  // Carregar token salvo na inicialização
  useEffect(() => {
    const storedToken = localStorage.getItem('mapbox_token');
    if (storedToken) {
      setMapboxToken(storedToken);
    }
  }, []);

  useEffect(() => {
    console.log('🗺️ MapLibre useEffect executado');
    initializeMap();

    return () => {
      if (map) {
        console.log('🗺️ Removendo mapa');
        map.remove();
        setMap(null);
      }
    };
  }, []);

  useEffect(() => {
    if (map) {
      console.log('🗺️ Recarregando mapa com novos dados');
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

  if (showTokenInput || error) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6" style={{ height }}>
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="flex items-center space-x-2">
            <Settings size={48} className="text-blue-500" />
            <MapPin size={48} className="text-gray-400" />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800">
            Configuração do Mapa
          </h3>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 w-full max-w-md">
              <p className="text-red-700 text-sm text-center">{error}</p>
            </div>
          )}
          
          <p className="text-gray-600 text-center mb-4">
            Para visualizar o mapa, configure seu token público do Mapbox:
          </p>
          
          <div className="w-full max-w-md space-y-3">
            <input
              type="text"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              placeholder="pk.eyJ1IjoibXl1c2VybmFtZSIsImEiOiJja..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <div className="flex gap-2">
              <Button onClick={loadMapWithToken} className="flex-1 bg-orange-500 hover:bg-orange-600">
                Carregar Mapa
              </Button>
              {localStorage.getItem('mapbox_token') && (
                <Button onClick={clearStoredToken} variant="outline" className="px-4">
                  Limpar
                </Button>
              )}
            </div>
          </div>
          
          <div className="text-xs text-gray-500 text-center space-y-2 max-w-md">
            <p>
              Obtenha seu token público gratuito em{' '}
              <a 
                href="https://account.mapbox.com/access-tokens/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline font-semibold"
              >
                mapbox.com
              </a>
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
              <p className="text-yellow-800 font-semibold text-xs">
                ⚠️ Use apenas tokens públicos (pk.*) - nunca tokens secretos
              </p>
            </div>
          </div>
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
