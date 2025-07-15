
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { RecommendationItem as RecommendationItemType } from '@/hooks/useSmartRecommendations';

interface RecommendationItemProps {
  item: RecommendationItemType;
  onClick: (item: RecommendationItemType) => void;
}

const RecommendationItem: React.FC<RecommendationItemProps> = ({ item, onClick }) => {
  return (
    <div
      className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(item)}
    >
      <div className="flex items-start gap-3">
        <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
          {item.type === 'establishment' ? '🏋️' : item.type === 'group' ? '👥' : '📅'}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h4 className="font-medium text-sm truncate">{item.name}</h4>
            <Badge
              variant="secondary"
              className="ml-2 text-xs"
            >
              {item.type === 'establishment' ? 'Estabelecimento' : 
               item.type === 'group' ? 'Grupo' : 'Evento'}
            </Badge>
          </div>
          
          <p className="text-xs text-gray-500 mb-2">{item.reason}</p>
          
          <div className="text-xs text-gray-600">
            Score: {item.score.toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationItem;
