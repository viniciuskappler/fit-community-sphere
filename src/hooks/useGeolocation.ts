
import { useState, useEffect } from 'react';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  loading: boolean;
  error: string | null;
  accuracy: number | null;
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    loading: true,
    error: null,
    accuracy: null,
  });

  const getCurrentPosition = () => {
    setLocation(prev => ({ ...prev, loading: true, error: null }));

    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        loading: false,
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

        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          loading: false,
          error: null,
          accuracy: position.coords.accuracy,
        });
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

        setLocation(prev => ({
          ...prev,
          loading: false,
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
        
        if (isRecent && parsed.latitude && parsed.longitude) {
          setLocation({
            latitude: parsed.latitude,
            longitude: parsed.longitude,
            loading: false,
            error: null,
            accuracy: parsed.accuracy || null,
          });
          return;
        }
      } catch (error) {
        console.error('Error parsing cached location:', error);
      }
    }

    getCurrentPosition();
  }, []);

  useEffect(() => {
    // Cache location data when it's successfully obtained
    if (location.latitude && location.longitude && !location.loading) {
      const locationData = {
        latitude: location.latitude,
        longitude: location.longitude,
        accuracy: location.accuracy,
        timestamp: Date.now(),
      };
      localStorage.setItem('userLocation', JSON.stringify(locationData));
    }
  }, [location.latitude, location.longitude, location.loading, location.accuracy]);

  const refetchLocation = () => {
    localStorage.removeItem('userLocation');
    getCurrentPosition();
  };

  return {
    ...location,
    refetchLocation,
  };
};
