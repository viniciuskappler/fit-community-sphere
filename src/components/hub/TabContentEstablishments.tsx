
import React from 'react';
import EstablishmentCard from '../EstablishmentCard';
import { EstablishmentWithDetails } from '@/hooks/useEstablishments';

interface TabContentEstablishmentsProps {
  establishmentsLoading: boolean;
  filteredEstablishments: EstablishmentWithDetails[];
  searchTerm: string;
  refetchEstablishments: () => void;
}

const TabContentEstablishments: React.FC<TabContentEstablishmentsProps> = ({
  establishmentsLoading,
  filteredEstablishments,
  searchTerm,
  refetchEstablishments,
}) => {
  if (establishmentsLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mb-4"></div>
        <span className="ml-2">Carregando estabelecimentos...</span>
      </div>
    );
  }

  if (filteredEstablishments.length > 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredEstablishments.map((establishment) => (
          <EstablishmentCard
            key={establishment.id}
            establishment={establishment}
            onFavoriteChange={() => refetchEstablishments()}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <p className="text-gray-500 text-lg">
        {searchTerm
          ? `Nenhum estabelecimento encontrado para "${searchTerm}"`
          : 'Nenhum estabelecimento cadastrado ainda'}
      </p>
    </div>
  );
};

export default TabContentEstablishments;
