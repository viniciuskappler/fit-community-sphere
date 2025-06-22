
import { EstablishmentWithDetails } from '@/hooks/useEstablishments';
import { SportsGroupWithDetails } from '@/hooks/useSportsGroups';
import { SearchFilters } from '@/types/searchTypes';
import { calculateDistance } from './searchFilters';

export const sortResults = <T extends EstablishmentWithDetails | SportsGroupWithDetails>(
  items: T[],
  filters: SearchFilters,
  type: 'establishment' | 'group',
  userLocation?: { lat: number; lng: number }
): T[] => {
  return [...items].sort((a, b) => {
    switch (filters.sortBy) {
      case 'rating':
        return b.averageRating - a.averageRating;
      
      case 'distance':
        if (!userLocation) return 0;
        const aLat = a.latitude;
        const aLng = a.longitude;
        const bLat = b.latitude;
        const bLng = b.longitude;
        
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
