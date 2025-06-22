
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Zap, TrendingUp, Heart } from 'lucide-react';
import { useEstablishments } from '@/hooks/useEstablishments';
import { useSportsGroups } from '@/hooks/useSportsGroups';
import { useGeolocation } from '@/hooks/useGeolocation';
import { supabase } from '@/integrations/supabase/client';
import RatingStars from './RatingStars';

interface RecommendationItem {
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

interface SmartRecommendationsProps {
  userId?: string;
  currentItemId?: string;
  currentItemType?: 'establishment' | 'group';
  userPreferences?: string[];
}

const SmartRecommendations: React.FC<SmartRecommendationsProps> = ({
  userId,
  currentItemId,
  currentItemType,
  userPreferences = []
}) => {
  const { location } = useGeolocation();
  const { data: establishments } = useEstablishments(location?.lat, location?.lng);
  const { data: groups } = useSportsGroups(location?.lat, location?.lng);
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [userSports, setUserSports] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Buscar esportes e favoritos do usuário
  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const fetchUserData = async () => {
    if (!userId) return;

    try {
      // Buscar esportes do usuário
      const { data: sportsData } = await supabase
        .from('user_sports')
        .select('sport_name')
        .eq('user_id', userId);

      if (sportsData) {
        setUserSports(sportsData.map(s => s.sport_name));
      }

      // Buscar favoritos do usuário
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

  // Gerar recomendações inteligentes
  useEffect(() => {
    if (establishments && groups) {
      generateRecommendations();
    }
  }, [establishments, groups, userSports, location]);

  const generateRecommendations = () => {
    const allItems: RecommendationItem[] = [];
    const currentUserSports = [...userSports, ...userPreferences];

    // Processar estabelecimentos
    establishments?.forEach(est => {
      if (est.id === currentItemId && currentItemType === 'establishment') return;

      const distance = location && est.latitude && est.longitude
        ? calculateDistance(location.lat, location.lng, est.latitude, est.longitude)
        : undefined;

      let category: RecommendationItem['category'] = 'popular';
      let reason = 'Estabelecimento popular na região';

      // Lógica de recomendação
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

    // Processar grupos esportivos
    groups?.forEach(group => {
      if (group.id === currentItemId && currentItemType === 'group') return;

      const distance = location && group.latitude && group.longitude
        ? calculateDistance(location.lat, location.lng, group.latitude, group.longitude)
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

    // Ordenar por relevância e limitar
    const sortedItems = allItems
      .sort((a, b) => {
        // Priorizar por categoria
        const categoryOrder = { recommended: 0, nearby: 1, popular: 2, similar: 3 };
        const categoryDiff = categoryOrder[a.category] - categoryOrder[b.category];
        if (categoryDiff !== 0) return categoryDiff;

        // Depois por rating
        return b.rating - a.rating;
      })
      .slice(0, 8);

    setRecommendations(sortedItems);
  };

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'recommended': return <Zap className="w-4 h-4" />;
      case 'nearby': return <MapPin className="w-4 h-4" />;
      case 'popular': return <TrendingUp className="w-4 h-4" />;
      default: return <Heart className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'recommended': return 'Para Você';
      case 'nearby': return 'Próximo';
      case 'popular': return 'Popular';
      default: return 'Similar';
    }
  };

  if (recommendations.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-orange-500" />
          Recomendações para Você
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((item) => (
            <div
              key={`${item.type}-${item.id}`}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => {
                const path = item.type === 'establishment' ? '/estabelecimento' : '/grupo-esportivo';
                window.open(`${path}/${item.id}`, '_blank');
              }}
            >
              <div className="flex items-start gap-3">
                {item.photos && item.photos.length > 0 ? (
                  <img
                    src={item.photos.find(p => p.is_main)?.photo_url || item.photos[0]?.photo_url}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                    {item.type === 'establishment' ? '🏋️' : '👥'}
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-medium text-sm truncate">{item.name}</h4>
                    <Badge
                      variant="secondary"
                      className="ml-2 text-xs flex items-center gap-1"
                    >
                      {getCategoryIcon(item.category)}
                      {getCategoryLabel(item.category)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <RatingStars rating={item.rating} size="xs" />
                    <span className="text-xs text-gray-600">
                      ({item.reviewCount})
                    </span>
                    {item.distance && (
                      <>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-600">
                          {item.distance.toFixed(1)}km
                        </span>
                      </>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-500 mb-2">{item.reason}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {item.sports.slice(0, 2).map((sport, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {sport}
                      </Badge>
                    ))}
                    {item.sports.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{item.sports.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartRecommendations;
