
import React from 'react';
import { MapPin, Users } from 'lucide-react';

export type Group = {
  id: string;
  name: string;
  type: 'group';
  sports: string[];
  region: string;
  members: number;
  meeting_point: string;
  image: string;
};

type GroupCardProps = {
  group: Group;
};

const GroupCard = ({ group }: GroupCardProps) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
    <div className="overflow-hidden h-32">
      <img 
        src={group.image} 
        alt={group.name} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
      />
    </div>
    <div className="p-4">
      <h4 className="font-bold text-md text-gray-800 truncate">{group.name}</h4>
      <div className="flex justify-between items-center mt-1 text-sm text-gray-500">
        <p className="flex items-center">
          <Users size={14} className="mr-1.5" /> {group.members} membros
        </p>
      </div>
      <p className="text-sm text-gray-500 flex items-center mt-1 truncate">
        <MapPin size={14} className="mr-1.5 flex-shrink-0" /> {group.meeting_point}
      </p>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {group.sports.slice(0, 3).map(sport => (
          <span key={sport} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            {sport}
          </span>
        ))}
        {group.sports.length > 3 && (
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
            +{group.sports.length - 3}
          </span>
        )}
      </div>
    </div>
  </div>
);

export default GroupCard;
