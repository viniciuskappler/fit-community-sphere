
import React from 'react';
import { User } from '@supabase/supabase-js';

interface HubHeaderProps {
  user: User | null;
  locationError: string | null;
}

const HubHeader: React.FC<HubHeaderProps> = ({
  user,
  locationError,
}) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Hub do Núcleo do Esporte
      </h1>
      <p className="text-lg text-gray-600">
        Encontre, avalie e conecte-se com estabelecimentos e grupos esportivos.
      </p>
      {user && (
        <p className="text-sm text-orange-600 mt-2">
          Bem-vindo, {user.user_metadata?.full_name || 'usuário'}!
        </p>
      )}
      {locationError && (
        <p className="text-sm text-red-500 mt-2">
          Erro ao obter localização
        </p>
      )}
    </div>
  );
};

export default HubHeader;
