
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';
import { useEstablishments } from '@/hooks/useEstablishments';
import { useSportsGroups } from '@/hooks/useSportsGroups';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useSmartRecommendations, RecommendationItem as RecommendationItemType } from '@/hooks/useSmartRecommendations';
import RecommendationItem from '@/components/recommendations/RecommendationItem';

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
  
  const { recommendations } = useSmartRecommendations({
    establishments,
    groups,
    userId,
    currentItemId,
    currentItemType,
    userPreferences,
    userLocation: location || undefined
  });

  const handleItemClick = (item: RecommendationItemType) => {
    const path = item.type === 'establishment' ? '/estabelecimento' : '/grupo-esportivo';
    window.open(`${path}/${item.id}`, '_blank');
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
            <RecommendationItem
              key={`${item.type}-${item.id}`}
              item={item}
              onClick={handleItemClick}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartRecommendations;
