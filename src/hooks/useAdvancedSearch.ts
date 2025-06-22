
import { useState, useMemo } from 'react';
import { EstablishmentWithDetails } from './useEstablishments';
import { SportsGroupWithDetails } from './useSportsGroups';

export interface SearchFilters {
  searchTerm: string;
  distance: number[];
  priceRange: number[];
  categories: string[];
  amenities: string[];
  ratings: number[];
  openNow: boolean;
  hasParking: boolean;
  acceptsCards: boolean;
  sortBy: 'relevance' | 'rating' | 'distance' | 'price';
}

export const useAdvancedSearch = (
  establishments: EstablishmentWithDetails[] = [],
  groups: SportsGroupWithDetails[] = [],
  userLocation?: { lat: number; lng: number }
) => {
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    distance: [50],
    priceRange: [0, 500],
    categories: [],
    amenities: [],
    ratings: [0],
    openNow: false,
    hasParking: false,
    acceptsCards: false,
    sortBy: 'relevance'
  });

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const isCurrentlyOpen = (hours?: any[]): boolean => {
    if (!hours || hours.length === 0) return true; // Assume aberto se não há info
    
    const now = new Date();
    const currentDay = now.getDay();
    const currentTime = now.getHours() * 100 + now.getMinutes();
    
    const todayHours = hours.find(h => h.day_of_week === currentDay);
    if (!todayHours || todayHours.is_closed) return false;
    
    const openTime = parseInt(todayHours.open_time.replace(':', ''));
    const closeTime = parseInt(todayHours.close_time.replace(':', ''));
    
    return currentTime >= openTime && currentTime <= closeTime;
  };

  const filteredEstablishments = useMemo(() => {
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

      // Filtro de aberto agora
      // if (filters.openNow && !isCurrentlyOpen(est.hours)) return false;

      return true;
    });
  }, [establishments, filters, userLocation]);

  const filteredGroups = useMemo(() => {
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
  }, [groups, filters, userLocation]);

  const sortResults = (items: any[], type: 'establishment' | 'group') => {
    return [...items].sort((a, b) => {
      switch (filters.sortBy) {
        case 'rating':
          return b.averageRating - a.averageRating;
        
        case 'distance':
          if (!userLocation) return 0;
          const aLat = type === 'establishment' ? a.latitude : a.latitude;
          const aLng = type === 'establishment' ? a.longitude : a.longitude;
          const bLat = type === 'establishment' ? b.latitude : b.latitude;
          const bLng = type === 'establishment' ? b.longitude : b.longitude;
          
          if (!aLat || !aLng || !bLat || !bLng) return 0;
          
          const distA = calculateDistance(userLocation.lat, userLocation.lng, aLat, aLng);
          const distB = calculateDistance(userLocation.lat, userLocation.lng, bLat, bLng);
          return distA - distB;
        
        case 'relevance':
        default:
          // Combinar rating e popularidade
          const scoreA = a.averageRating * 0.7 + (a.reviewCount / 100) * 0.3;
          const scoreB = b.averageRating * 0.7 + (b.reviewCount / 100) * 0.3;
          return scoreB - scoreA;
      }
    });
  };

  const sortedEstablishments = sortResults(filteredEstablishments, 'establishment');
  const sortedGroups = sortResults(filteredGroups, 'group');

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      distance: [50],
      priceRange: [0, 500],
      categories: [],
      amenities: [],
      ratings: [0],
      openNow: false,
      hasParking: false,
      acceptsCards: false,
      sortBy: 'relevance'
    });
  };

  return {
    filters,
    updateFilters,
    clearFilters,
    filteredEstablishments: sortedEstablishments,
    filteredGroups: sortedGroups,
    totalResults: sortedEstablishments.length + sortedGroups.length
  };
};
