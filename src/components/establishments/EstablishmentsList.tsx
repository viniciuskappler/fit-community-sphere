
import React from 'react';
import EstablishmentListCard from './EstablishmentListCard';
import { EstablishmentWithDetails } from '@/hooks/useEstablishments';

interface EstablishmentsListProps {
  establishments: EstablishmentWithDetails[];
}

const EstablishmentsList: React.FC<EstablishmentsListProps> = ({ establishments }) => {
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
        <EstablishmentListCard key={establishment.id} establishment={establishment} />
      ))}
    </div>
  );
};

export default EstablishmentsList;
