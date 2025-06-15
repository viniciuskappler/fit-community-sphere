
import React, { useState } from 'react';
import { Trophy, ArrowLeft, Building, Users } from 'lucide-react';
import ConfettiAnimation from '../components/ConfettiAnimation';

const CadastroFinalizadoEstabelecimento = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const handleBackToHub = () => {
    window.location.href = '/hub';
  };

  const handleAddGroup = () => {
    window.location.href = '/cadastro-realizado';
  };

  const buttons = [
    {
      id: 'hub',
      icon: <ArrowLeft size={32} />,
      title: 'Voltar ao Hub',
      info: 'Retorne ao hub principal para gerenciar seu estabelecimento e explorar outras funcionalidades.',
      onClick: handleBackToHub
    },
    {
      id: 'group',
      icon: <Users size={32} />,
      title: 'Cadastrar Grupo Esportivo',
      info: 'Você também organiza algum grupo esportivo? Cadastre-o agora!',
      onClick: handleAddGroup
    }
  ];

  return (
    <div className="min-h-screen bg-white relative">
      <ConfettiAnimation />
      
      <main className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="py-16">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center animate-scale-in">
                <Building size={48} className="text-white" />
              </div>
            </div>
            
            <h1 className="text-6xl font-bold text-gray-800 mb-4 animate-fade-in">
              Parabéns! 🎉
            </h1>
            <h2 className="text-4xl font-semibold text-green-600 mb-6">
              Estabelecimento Cadastrado!
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              <span className="font-bold text-green-600">Excelente!</span> Você acaba de dar um passo gigantesco para o esporte brasileiro! 
              Seu estabelecimento agora faz parte da nossa rede e estará disponível para milhares de praticantes em busca de um local para treinar.
            </p>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 mb-12 max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Trophy className="text-green-600 mr-3" size={32} />
                <h3 className="text-2xl font-bold text-gray-800">Você está transformando o esporte!</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Como empresário ou profissional do esporte, você está contribuindo diretamente para a formação de atletas, 
                a promoção da saúde e o desenvolvimento da nossa comunidade esportiva. 
                <span className="font-semibold text-green-600"> Sua dedicação faz toda a diferença!</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-2xl mx-auto">
              {buttons.map((button) => (
                <div
                  key={button.id}
                  className="relative"
                  onMouseEnter={() => setHoveredButton(button.id)}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <button
                    onClick={button.onClick}
                    className="w-full h-36 bg-white border-2 border-green-200 rounded-xl p-6 hover:border-green-400 hover:shadow-xl transition-all duration-300 hover:scale-105 group flex flex-col items-center justify-center"
                  >
                    <div className="text-green-600 mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300">
                      {button.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 text-center leading-tight">
                      {button.title}
                    </h3>
                  </button>

                  {hoveredButton === button.id && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-80 bg-gray-900 text-white text-sm rounded-lg p-4 shadow-lg z-10 animate-fade-in">
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                      {button.info}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-16 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                🚀 Próximos passos
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Seu estabelecimento será revisado em breve e estará disponível na nossa plataforma. 
                Continue explorando as funcionalidades e ajude a fortalecer ainda mais nossa comunidade esportiva!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CadastroFinalizadoEstabelecimento;
