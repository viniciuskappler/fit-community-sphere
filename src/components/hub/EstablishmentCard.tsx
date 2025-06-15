
import React from 'react';
import { MapPin } from 'lucide-react';

export type Establishment = {
  id: string;
  name: string;
  type: 'establishment';
  sports: string[];
  region: string;
  address: string;
  image: string;
};

type EstablishmentCardProps = {
  establishment: Establishment;
};

const EstablishmentCard = ({ establishment }: EstablishmentCardProps) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
    <div className="overflow-hidden h-32">
        <img src={establishment.image} alt={establishment.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
    </div>
    <div className="p-4">
      <h4 className="font-bold text-md text-gray-800 truncate">{establishment.name}</h4>
      <p className="text-sm text-gray-500 flex items-center mt-1 truncate">
        <MapPin size={14} className="mr-1.5 flex-shrink-0" /> {establishment.address}
      </p>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {establishment.sports.slice(0, 3).map(sport => (
          <span key={sport} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">{sport}</span>
        ))}
        {establishment.sports.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">+{establishment.sports.length - 3}</span>
        )}
      </div>
    </div>
  </div>
);

export default EstablishmentCard;
