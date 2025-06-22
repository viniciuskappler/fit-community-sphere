
import { Zap, MapPin, TrendingUp, Heart } from 'lucide-react';

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'recommended': return Zap;
    case 'nearby': return MapPin;
    case 'popular': return TrendingUp;
    default: return Heart;
  }
};

export const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'recommended': return 'Para Você';
    case 'nearby': return 'Próximo';
    case 'popular': return 'Popular';
    default: return 'Similar';
  }
};
