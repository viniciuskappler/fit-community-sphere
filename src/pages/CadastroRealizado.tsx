
import React, { useState } from 'react';
import { Search, Building, Users, Trophy, Star } from 'lucide-react';
import ConfettiAnimation from '../components/ConfettiAnimation';
import EstablishmentRegistrationModal from '../components/EstablishmentRegistrationModal';
import GroupRegistrationModal from '../components/GroupRegistrationModal';

const CadastroRealizado = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [isEstablishmentModalOpen, setIsEstablishmentModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

  const handleEstablishmentClick = () => {
    setIsEstablishmentModalOpen(true);
  };

  const handleGroupClick = () => {
    setIsGroupModalOpen(true);
  };

  const handleSearchClick = () => {
    window.location.href = '/hub';
  };

  const buttons = [
    {
      id: 'search',
      icon: <Search size={32} />,
      title: 'Acessar o Hub',
      info: 'Explore o hub principal e descubra atividades físicas na sua região!',
      color: 'from-orange-500 to-red-500',
      hoverColor: 'hover:border-orange-400',
      onClick: handleSearchClick
    },
    {
      id: 'establishment',
      icon: <Building size={32} />,
      title: 'Cadastrar Estabelecimento',
      info: 'Você tem um espaço que oferece modalidades esportivas? Cadastre seu estabelecimento!',
      color: 'from-green-500 to-emerald-500',
      hoverColor: 'hover:border-green-400',
      onClick: handleEstablishmentClick
    },
    {
      id: 'group',
      icon: <Users size={32} />,
      title: 'Cadastrar Grupo Esportivo',
      info: 'Organiza um grupo esportivo? Cadastre-o para conectar mais praticantes!',
      color: 'from-blue-500 to-purple-500',
      hoverColor: 'hover:border-blue-400',
      onClick: handleGroupClick
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 relative">
      <ConfettiAnimation />
      
      <main className="px-6 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <div className="py-16">
            {/* Ícone de celebração */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center animate-pulse">
                  <Trophy size={64} className="text-white" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Star size={24} className="text-yellow-400 animate-bounce" />
                </div>
              </div>
            </div>

            <h1 className="text-7xl font-bold text-gray-800 mb-6 animate-fade-in">
              Parabéns! 🎉
            </h1>
            <h2 className="text-5xl font-semibold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-8">
              Você deu o primeiro passo!
            </h2>
            
            <p className="text-2xl text-gray-700 mb-6 max-w-4xl mx-auto leading-relaxed">
              Bem-vindo ao <span className="font-bold text-orange-500">Núcleo do Esporte</span>! 
              Agora você faz parte de uma comunidade que une pessoas através do esporte.
            </p>

            {/* Frase motivacional */}
            <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-8 mb-12 max-w-3xl mx-auto">
              <blockquote className="text-xl italic text-gray-700 mb-4">
                "O esporte tem o poder de transformar e inspirar. Tem o poder de unir as pessoas."
              </blockquote>
              <cite className="text-lg font-semibold text-orange-600">- Nelson Mandela</cite>
            </div>

            {/* Próximos passos */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Seus próximos passos:
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore as opções abaixo para começar sua jornada no mundo dos esportes. 
                Conecte-se, pratique e faça parte desta comunidade incrível!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {buttons.map((button) => (
                <div
                  key={button.id}
                  className="relative"
                  onMouseEnter={() => setHoveredButton(button.id)}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <button
                    onClick={button.onClick}
                    className={`w-full h-40 bg-white border-2 border-gray-200 rounded-2xl p-6 ${button.hoverColor} hover:shadow-2xl transition-all duration-300 hover:scale-105 group flex flex-col items-center justify-center relative overflow-hidden`}
                  >
                    {/* Gradiente de fundo no hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${button.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    <div className={`text-gray-600 group-hover:bg-gradient-to-r ${button.color} group-hover:bg-clip-text group-hover:text-transparent mb-4 flex justify-center group-hover:scale-110 transition-all duration-300 relative z-10`}>
                      {button.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 text-center leading-tight relative z-10">
                      {button.title}
                    </h3>
                  </button>

                  {/* Tooltip com informações */}
                  {hoveredButton === button.id && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-80 bg-gray-900 text-white text-sm rounded-lg p-4 shadow-2xl z-20 animate-fade-in">
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                      {button.info}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Seção de boas-vindas */}
            <div className="mt-20 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 max-w-4xl mx-auto border border-orange-200">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Trophy className="text-white" size={32} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Você agora é parte do movimento! 🚀
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Sua jornada no esporte começa agora. Explore, conecte-se com outros praticantes, 
                descubra novos lugares para treinar e compartilhe suas experiências. 
                <span className="font-semibold text-orange-600"> Juntos, somos mais fortes!</span>
              </p>
            </div>
          </div>
        </div>
      </main>

      <EstablishmentRegistrationModal 
        isOpen={isEstablishmentModalOpen}
        onClose={() => setIsEstablishmentModalOpen(false)}
      />

      <GroupRegistrationModal 
        isOpen={isGroupModalOpen}
        onClose={() => setIsGroupModalOpen(false)}
      />
    </div>
  );
};

export default CadastroRealizado;
