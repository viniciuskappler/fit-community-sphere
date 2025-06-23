
import React from 'react';

const SquadBanner = () => {
  return (
    <div className="mb-6">
      <div className="bg-gradient-to-r from-orange-600 to-red-500 text-white p-6 rounded-xl shadow-2xl border border-orange-400/30">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">🏆 SQUAD 300 - Desconto Vitalício!</h3>
          <p className="text-lg mb-3">
            Garanta 50% de desconto para sempre nas primeiras 300 vagas.
          </p>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <span className="text-lg font-bold">Cadastre-se agora e faça parte da revolução!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SquadBanner;
