
import React, { useState, useEffect } from 'react';
import { Trophy, ArrowLeft, Building, Users } from 'lucide-react';
import ConfettiAnimation from '../components/ConfettiAnimation';

const CadastroFinalizadoGrupo = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [registrationNumber, setRegistrationNumber] = useState<string>('');

  useEffect(() => {
    // Gerar número de cadastro único para grupo
    const uniqueNumber = `#G${Math.floor(100000 + Math.random() * 900000)}`;
    setRegistrationNumber(uniqueNumber);
  }, []);

  const handleBackToHub = () => {
    window.location.href = '/hub';
  };

  const handleAddEstablishment = () => {
    window.location.href = '/cadastro-realizado';
  };

  const buttons = [
    {
      id: 'hub',
      icon: <ArrowLeft size={32} />,
      title: 'Voltar ao Hub',
      info: 'Retorne ao hub principal para gerenciar seu grupo e explorar outras funcionalidades.',
      onClick: handleBackToHub
    },
    {
      id: 'establishment',
      icon: <Building size={32} />,
      title: 'Cadastrar Estabelecimento',
      info: 'Você também possui um estabelecimento esportivo? Cadastre-o agora!',
      onClick: handleAddEstablishment
    }
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-blue-100/30 to-purple-100/30">
          <div className="w-full h-full bg-gradient-to-r from-blue-200/20 to-purple-200/20 animate-pulse"></div>
        </div>
      </div>
      
      <ConfettiAnimation />
      
      <main className="relative z-10 px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="py-16">
            {/* Número de cadastro */}
            <div className="mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-lg font-bold">
                Grupo {registrationNumber}
              </span>
            </div>

            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-scale-in shadow-2xl">
                <Users size={48} className="text-white" />
              </div>
            </div>
            
            <h1 className="text-6xl font-bold text-gray-800 mb-4 animate-fade-in">
              Parabéns! 🎉
            </h1>
            <h2 className="text-4xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Grupo {registrationNumber} Cadastrado!
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Fantástico!</span> Você está liderando uma transformação no esporte! 
              Seu grupo esportivo agora está registrado como <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Grupo {registrationNumber}</span> e conectará pessoas apaixonadas pelos mesmos esportes que vocês praticam. Você está contribuindo para o crescimento deste movimento incrível!
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-12 max-w-3xl mx-auto border-l-4 border-blue-500">
              <div className="flex items-center justify-center mb-4">
                <Trophy className="text-blue-600 mr-3" size={32} />
                <h3 className="text-2xl font-bold text-gray-800">Você é um líder no esporte!</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Como organizador ou líder de grupo esportivo, você está criando oportunidades incríveis para que pessoas 
                se conectem, pratiquem esportes e desenvolvam amizades duradouras. 
                <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Sua liderança inspira e transforma vidas!</span>
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
                    className="w-full h-36 bg-white border-2 border-blue-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-xl transition-all duration-300 hover:scale-105 group flex flex-col items-center justify-center"
                  >
                    <div className="text-blue-600 mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300">
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

            <div className="mt-16 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl max-w-2xl mx-auto border border-blue-200">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                🚀 Próximos passos
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Seu <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Grupo {registrationNumber}</span> será revisado em breve e estará disponível na nossa plataforma. 
                Continue liderando e inspirando outros a praticarem esportes e a fortalecerem nossa comunidade!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CadastroFinalizadoGrupo;
