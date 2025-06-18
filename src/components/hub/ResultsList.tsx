
import React from 'react';
import { Search, Filter } from 'lucide-react';
import EstablishmentCard from '../EstablishmentCard';
import SportsGroupCard from '../SportsGroupCard';
import { EstablishmentWithDetails } from '@/hooks/useEstablishments';
import { SportsGroupWithDetails } from '@/hooks/useSportsGroups';

interface ResultsListProps {
  selectedRegion: string;
  regionFilteredResults: Array<EstablishmentWithDetails | SportsGroupWithDetails>;
  refetchEstablishments: () => void;
  refetchGroups: () => void;
}

const ResultsList: React.FC<ResultsListProps> = ({
  selectedRegion,
  regionFilteredResults,
  refetchEstablishments,
  refetchGroups,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 max-h-[600px] overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Resultados 
        {regionFilteredResults.length > 0 && (
          <span className="text-sm font-normal text-gray-500 ml-2">
            ({regionFilteredResults.length})
          </span>
        )}
      </h3>
      
      {selectedRegion ? (
        regionFilteredResults.length > 0 ? (
          <div className="space-y-4">
            {regionFilteredResults.map(item => {
              if ('establishment_name' in item) {
                return (
                  <EstablishmentCard
                    key={item.id}
                    establishment={item}
                    onFavoriteChange={() => refetchEstablishments()}
                  />
                );
              } else {
                return (
                  <SportsGroupCard
                    key={item.id}
                    group={item}
                    onFavoriteChange={() => refetchGroups()}
                  />
                );
              }
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Search size={32} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              Nenhum resultado encontrado para esta região.
            </p>
          </div>
        )
      ) : (
        <div className="text-center py-8">
          <Filter size={32} className="text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">
            Selecione uma região para ver os resultados.
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultsList;
