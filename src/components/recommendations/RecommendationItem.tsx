
import React from 'react';
import { Badge } from '@/components/ui/badge';
import RatingStars from '@/components/RatingStars';
import { RecommendationItem as RecommendationItemType } from '@/hooks/useSmartRecommendations';
import { getCategoryIcon, getCategoryLabel } from '@/utils/recommendationCategories';

interface RecommendationItemProps {
  item: RecommendationItemType;
  onClick: (item: RecommendationItemType) => void;
}

const RecommendationItem: React.FC<RecommendationItemProps> = ({ item, onClick }) => {
  const CategoryIcon = getCategoryIcon(item.category);

  return (
    <div
      className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(item)}
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
              <CategoryIcon className="w-4 h-4" />
              {getCategoryLabel(item.category)}
            </Badge>
          </div>
          
          <div className="flex items-center gap-1 mb-2">
            <RatingStars rating={item.rating} size="sm" />
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
  );
};

export default RecommendationItem;
