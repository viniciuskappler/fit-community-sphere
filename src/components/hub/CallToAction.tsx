
import React from 'react';
import { Button } from '@/components/ui/button';

const CallToAction: React.FC = () => {
  return (
    <div className="mt-12 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Não encontrou o que procura?
        </h2>
        <p className="text-gray-600 mb-6">
          Cadastre seu estabelecimento ou grupo esportivo e faça parte da nossa rede!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline"
            className="border-orange-300 text-orange-600 hover:bg-orange-50"
            onClick={() => window.location.href = '/estabelecimento'}
          >
            Cadastrar Estabelecimento
          </Button>
          <Button 
            variant="outline"
            className="border-orange-300 text-orange-600 hover:bg-orange-50"
            onClick={() => window.location.href = '/grupo-esportivo'}
          >
            Cadastrar Grupo Esportivo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
