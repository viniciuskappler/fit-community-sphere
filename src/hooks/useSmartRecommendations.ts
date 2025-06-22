
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { EstablishmentWithDetails } from '@/hooks/useEstablishments';
import { SportsGroupWithDetails } from '@/hooks/useSportsGroups';

export interface RecommendationItem {
  id: string;
  name: string;
  type: 'establishment' | 'group';
  rating: number;
  reviewCount: number;
  distance?: number;
  sports: string[];
  photos?: Array<{ photo_url: string; is_main: boolean }>;
  reason: string;
  category: 'nearby' | 'popular' | 'recommended' | 'similar';
}

interface UseSmartRecommendationsProps {
  establishments?: EstablishmentWithDetails[];
  groups?: SportsGroupWithDetails[];
  userId?: string;
  currentItemId?: string;
  currentItemType?: 'establishment' | 'group';
  userPreferences?: string[];
  userLocation?: { lat: number; lng: number };
}

export const useSmartRecommendations = ({
  establishments,
  groups,
  userId,
  currentItemId,
  currentItemType,
  userPreferences = [],
  userLocation
}: UseSmartRecommendationsProps) => {
  const [userSports, setUserSports] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Fetch user data
  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const fetchUserData = async () => {
    if (!userId) return;

    try {
      // Fetch user sports
      const { data: sportsData } = await supabase
        .from('user_sports')
        .select('sport_name')
        .eq('user_id', userId);

      if (sportsData) {
        setUserSports(sportsData.map(s => s.sport_name));
      }

      // Fetch user favorites
      const { data: favoritesData } = await supabase
        .from('user_favorites')
        .select('establishment_id, group_id')
        .eq('user_id', userId);

      if (favoritesData) {
        const favIds = favoritesData.map(f => f.establishment_id || f.group_id).filter(Boolean);
        setFavorites(favIds);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const recommendations = useMemo(() => {
    if (!establishments || !groups) return [];

    const allItems: RecommendationItem[] = [];
    const currentUserSports = [...userSports, ...userPreferences];

    // Process establishments
    establishments.forEach(est => {
      if (est.id === currentItemId && currentItemType === 'establishment') return;

      const distance = userLocation && est.latitude && est.longitude
        ? calculateDistance(userLocation.lat, userLocation.lng, est.latitude, est.longitude)
        : undefined;

      let category: RecommendationItem['category'] = 'popular';
      let reason = 'Estabelecimento popular na região';

      const hasUserSports = est.sports.some(sport => currentUserSports.includes(sport));
      
      if (hasUserSports) {
        category = 'recommended';
        reason = `Pratica ${est.sports.find(sport => currentUserSports.includes(sport))}`;
      } else if (distance && distance <= 2) {
        category = 'nearby';
        reason = `Próximo a você (${distance.toFixed(1)}km)`;
      } else if (est.averageRating >= 4.5) {
        category = 'popular';
        reason = `Muito bem avaliado (${est.averageRating}/5)`;
      }

      allItems.push({
        id: est.id,
        name: est.establishment_name,
        type: 'establishment',
        rating: est.averageRating,
        reviewCount: est.reviewCount,
        distance,
        sports: est.sports,
        photos: est.photos,
        reason,
        category
      });
    });

    // Process groups
    groups.forEach(group => {
      if (group.id === currentItemId && currentItemType === 'group') return;

      const distance = userLocation && group.latitude && group.longitude
        ? calculateDistance(userLocation.lat, userLocation.lng, group.latitude, group.longitude)
        : undefined;

      let category: RecommendationItem['category'] = 'popular';
      let reason = 'Grupo ativo na região';

      const hasUserSports = group.sports.some(sport => currentUserSports.includes(sport));
      
      if (hasUserSports) {
        category = 'recommended';
        reason = `Grupo de ${group.sports.find(sport => currentUserSports.includes(sport))}`;
      } else if (distance && distance <= 5) {
        category = 'nearby';
        reason = `Próximo a você (${distance.toFixed(1)}km)`;
      } else if (group.averageRating >= 4.5) {
        category = 'popular';
        reason = `Muito bem avaliado (${group.averageRating}/5)`;
      }

      allItems.push({
        id: group.id,
        name: group.group_name,
        type: 'group',
        rating: group.averageRating,
        reviewCount: group.reviewCount,
        distance,
        sports: group.sports,
        photos: group.photos,
        reason,
        category
      });
    });

    // Sort by relevance and limit
    return allItems
      .sort((a, b) => {
        const categoryOrder = { recommended: 0, nearby: 1, popular: 2, similar: 3 };
        const categoryDiff = categoryOrder[a.category] - categoryOrder[b.category];
        if (categoryDiff !== 0) return categoryDiff;
        return b.rating - a.rating;
      })
      .slice(0, 8);
  }, [establishments, groups, userSports, userLocation, currentItemId, currentItemType, userPreferences]);

  return {
    recommendations,
    userSports,
    favorites
  };
};

const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};
