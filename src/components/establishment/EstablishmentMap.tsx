
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import MapLibre from '@/components/MapLibre';

interface EstablishmentMapProps {
  establishment: {
    id: string;
    establishment_name: string;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    establishment_sports: Array<{ sport_name: string }>;
    establishment_photos: Array<{ photo_url: string; is_main: boolean; caption: string }>;
  };
}

const EstablishmentMap: React.FC<EstablishmentMapProps> = ({ establishment }) => {
  if (!establishment.latitude || !establishment.longitude) {
    return null;
  }

  return (
    <Card>
      <CardContent className="p-0">
        <MapLibre
          establishments={[{
            id: establishment.id,
            establishment_name: establishment.establishment_name,
            latitude: establishment.latitude,
            longitude: establishment.longitude,
            city: establishment.city,
            state: establishment.state,
            sports: establishment.establishment_sports.map(s => s.sport_name),
            photos: establishment.establishment_photos,
          }]}
          center={{
            lat: establishment.latitude,
            lng: establishment.longitude,
          }}
          zoom={15}
          height="300px"
        />
      </CardContent>
    </Card>
  );
};

export default EstablishmentMap;
