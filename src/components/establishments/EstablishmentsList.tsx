
import React from 'react';
import EstablishmentListCard from './EstablishmentListCard';
import MockEstablishmentCard from './MockEstablishmentCard';
import { EstablishmentWithDetails } from '@/hooks/useEstablishments';

interface EstablishmentsListProps {
  establishments: EstablishmentWithDetails[];
  showMockWarning?: boolean;
}

const EstablishmentsList: React.FC<EstablishmentsListProps> = ({ 
  establishments, 
  showMockWarning = false 
}) => {
  if (establishments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhum estabelecimento encontrado com os filtros aplicados.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {establishments.map((establishment) => (
        showMockWarning ? (
          <MockEstablishmentCard key={establishment.id} establishment={establishment} />
        ) : (
          <EstablishmentListCard key={establishment.id} establishment={establishment} />
        )
      ))}
    </div>
  );
};

export default EstablishmentsList;
