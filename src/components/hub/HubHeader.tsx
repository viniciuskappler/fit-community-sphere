
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
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
          Hub do Núcleo do Esporte
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full mb-4"></div>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          Encontre, avalie e conecte-se com estabelecimentos e grupos esportivos próximos a você.
        </p>
      </div>
      
      {user && (
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 max-w-md mx-auto border border-orange-200">
          <p className="text-sm md:text-base text-orange-700 font-medium">
            Bem-vindo de volta, {user.user_metadata?.full_name || 'atleta'}! 👋
          </p>
        </div>
      )}
      
      {locationError && (
        <div className="bg-red-50 rounded-xl p-4 max-w-md mx-auto border border-red-200 mt-4">
          <p className="text-sm text-red-600">
            ⚠️ Erro ao obter localização
          </p>
        </div>
      )}
    </div>
  );
};

export default HubHeader;
