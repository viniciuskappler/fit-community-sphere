
import React from 'react';
import SportsGroupCard from '../SportsGroupCard';
import { SportsGroupWithDetails } from '@/hooks/useSportsGroups';

interface TabContentGroupsProps {
  groupsLoading: boolean;
  filteredGroups: SportsGroupWithDetails[];
  searchTerm: string;
  refetchGroups: () => void;
}

const TabContentGroups: React.FC<TabContentGroupsProps> = ({
  groupsLoading,
  filteredGroups,
  searchTerm,
  refetchGroups,
}) => {
  if (groupsLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mb-4"></div>
        <span className="ml-2">Carregando grupos...</span>
      </div>
    );
  }

  if (filteredGroups.length > 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGroups.map((group) => (
          <SportsGroupCard
            key={group.id}
            group={group}
            onFavoriteChange={() => refetchGroups()}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <p className="text-gray-500 text-lg">
        {searchTerm
          ? `Nenhum grupo encontrado para "${searchTerm}"`
          : 'Nenhum grupo cadastrado ainda'}
      </p>
    </div>
  );
};

export default TabContentGroups;
