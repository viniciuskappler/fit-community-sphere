
import React from 'react';
import { Trophy, Users } from 'lucide-react';
import SquadCounter from './SquadCounter';

const PromoCodeBanner = () => {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-8 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Trophy className="h-8 w-8" />
          <h2 className="text-3xl font-bold">SQUAD300</h2>
          <Trophy className="h-8 w-8" />
        </div>
        
        <p className="text-lg mb-2 opacity-90">
          Junte-se aos primeiros 300 usuários e ganhe <span className="font-bold">50% de desconto vitalício!</span>
        </p>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mt-4">
          <SquadCounter />
        </div>
        
        <div className="mt-4 flex items-center justify-center gap-2 text-sm opacity-80">
          <Users className="h-4 w-4" />
          <span>Cadastre-se agora e garante sua vaga no squad exclusivo!</span>
        </div>
      </div>
    </div>
  );
};

export default PromoCodeBanner;
