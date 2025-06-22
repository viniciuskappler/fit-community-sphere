
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Heart, Share2 } from 'lucide-react';

interface EstablishmentHeaderProps {
  establishment: {
    establishment_name: string;
    address: string;
    city: string;
    state: string;
    description?: string;
    establishment_sports: Array<{ sport_name: string }>;
  };
  isFavorited: boolean;
  onToggleFavorite: () => void;
  onShare: () => void;
}

const EstablishmentHeader: React.FC<EstablishmentHeaderProps> = ({
  establishment,
  isFavorited,
  onToggleFavorite,
  onShare
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {establishment.establishment_name}
            </h1>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleFavorite}
              className={isFavorited ? 'text-red-500' : ''}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="outline" size="sm" onClick={onShare}>
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{establishment.address}, {establishment.city} - {establishment.state}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {establishment.establishment_sports.map((sport, index) => (
            <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-800">
              {sport.sport_name}
            </Badge>
          ))}
        </div>

        {establishment.description && (
          <p className="text-gray-700 leading-relaxed">
            {establishment.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default EstablishmentHeader;
