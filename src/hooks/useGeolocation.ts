
import { useState, useEffect } from 'react';

interface GeolocationLocation {
  lat: number;
  lng: number;
}

interface GeolocationState {
  location: GeolocationLocation | null;
  error: string | null;
  isLocating: boolean;
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    error: null,
    isLocating: true,
  });

  const requestPermission = () => {
    setState(prev => ({ ...prev, isLocating: true, error: null }));

    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        isLocating: false,
        error: 'Geolocalização não é suportada por este navegador',
      }));
      return;
    }

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000, // 5 minutes
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Geolocation obtained:', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });

        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        setState({
          location,
          isLocating: false,
          error: null,
        });

        // Cache location data
        const locationData = {
          ...location,
          accuracy: position.coords.accuracy,
          timestamp: Date.now(),
        };
        localStorage.setItem('userLocation', JSON.stringify(locationData));
      },
      (error) => {
        console.error('Geolocation error:', error);
        let errorMessage = 'Não foi possível obter sua localização';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Permissão de localização negada. Ative nas configurações do navegador.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Informações de localização não disponíveis.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Tempo limite para obter localização excedido.';
            break;
        }

        setState(prev => ({
          ...prev,
          isLocating: false,
          error: errorMessage,
        }));
      },
      options
    );
  };

  useEffect(() => {
    // Check if we have cached location data
    const cachedLocation = localStorage.getItem('userLocation');
    if (cachedLocation) {
      try {
        const parsed = JSON.parse(cachedLocation);
        const isRecent = Date.now() - parsed.timestamp < 300000; // 5 minutes
        
        if (isRecent && parsed.lat && parsed.lng) {
          setState({
            location: { lat: parsed.lat, lng: parsed.lng },
            isLocating: false,
            error: null,
          });
          return;
        }
      } catch (error) {
        console.error('Error parsing cached location:', error);
      }
    }

    requestPermission();
  }, []);

  return {
    ...state,
    requestPermission,
  };
};
