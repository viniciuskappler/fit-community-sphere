
import { EstablishmentWithDetails } from '@/hooks/useEstablishments';
import { SportsGroupWithDetails } from '@/hooks/useSportsGroups';
import { SearchFilters } from '@/types/searchTypes';

export const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371; // Raio da Terra em km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export const filterEstablishments = (
  establishments: EstablishmentWithDetails[],
  filters: SearchFilters,
  userLocation?: { lat: number; lng: number }
): EstablishmentWithDetails[] => {
  return establishments.filter(est => {
    // Filtro de texto
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const matchesName = est.establishment_name.toLowerCase().includes(searchLower);
      const matchesSports = est.sports.some(sport => 
        sport.toLowerCase().includes(searchLower)
      );
      const matchesCity = est.city.toLowerCase().includes(searchLower);
      
      if (!matchesName && !matchesSports && !matchesCity) return false;
    }

    // Filtro de distância
    if (userLocation && est.latitude && est.longitude) {
      const distance = calculateDistance(
        userLocation.lat, userLocation.lng,
        est.latitude, est.longitude
      );
      if (distance > filters.distance[0]) return false;
    }

    // Filtro de avaliação
    if (est.averageRating < filters.ratings[0]) return false;

    // Filtro de categorias (esportes)
    if (filters.categories.length > 0) {
      const hasCategory = filters.categories.some(category =>
        est.sports.some(sport => sport.toLowerCase().includes(category.toLowerCase()))
      );
      if (!hasCategory) return false;
    }

    return true;
  });
};

export const filterGroups = (
  groups: SportsGroupWithDetails[],
  filters: SearchFilters,
  userLocation?: { lat: number; lng: number }
): SportsGroupWithDetails[] => {
  return groups.filter(group => {
    // Filtro de texto
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const matchesName = group.group_name.toLowerCase().includes(searchLower);
      const matchesSports = group.sports.some(sport => 
        sport.toLowerCase().includes(searchLower)
      );
      const matchesCities = group.cities.some(city => 
        city.toLowerCase().includes(searchLower)
      );
      
      if (!matchesName && !matchesSports && !matchesCities) return false;
    }

    // Filtro de distância
    if (userLocation && group.latitude && group.longitude) {
      const distance = calculateDistance(
        userLocation.lat, userLocation.lng,
        group.latitude, group.longitude
      );
      if (distance > filters.distance[0]) return false;
    }

    // Filtro de avaliação
    if (group.averageRating < filters.ratings[0]) return false;

    // Filtro de categorias (esportes)
    if (filters.categories.length > 0) {
      const hasCategory = filters.categories.some(category =>
        group.sports.some(sport => sport.toLowerCase().includes(category.toLowerCase()))
      );
      if (!hasCategory) return false;
    }

    return true;
  });
};
