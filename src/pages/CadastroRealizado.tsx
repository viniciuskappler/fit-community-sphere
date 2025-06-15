
import React, { useState } from 'react';
import { Search, Building, Users } from 'lucide-react';
import ConfettiAnimation from '../components/ConfettiAnimation';
import RegistrationModal from '../components/RegistrationModal';

const CadastroRealizado = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'establishment' | 'group'>('establishment');

  const handleEstablishmentClick = () => {
    setModalType('establishment');
    setIsModalOpen(true);
  };

  const handleGroupClick = () => {
    setModalType('group');
    setIsModalOpen(true);
  };

  const handleSearchClick = () => {
    window.location.href = '/hub';
  };

  const buttons = [
    {
      id: 'search',
      icon: <Search size={32} />,
      title: 'Buscar Esportes',
      info: 'Busque atividades físicas na sua região e pratique seus esportes preferidos!',
      onClick: handleSearchClick
    },
    {
      id: 'establishment',
      icon: <Building size={32} />,
      title: 'Cadastrar Estabelecimento',
      info: 'Você tem um espaço que oferece alguma modalidade esportiva? Cadastre seu Estabelecimento para que os praticantes encontrem você!',
      onClick: handleEstablishmentClick
    },
    {
      id: 'group',
      icon: <Users size={32} />,
      title: 'Cadastrar Grupo Esportivo',
      info: 'Você tem um grupo que organiza alguma modalidade esportiva? Cadastre seu grupo para que os praticantes conheçam você!',
      onClick: handleGroupClick
    }
  ];

  return (
    <div className="min-h-screen bg-white relative">
      <ConfettiAnimation />
      
      <main className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="py-16">
            <h1 className="text-5xl font-bold text-gray-800 mb-6 animate-fade-in">
              Parabéns! 🎉
            </h1>
            <h2 className="text-3xl font-semibold text-orange-500 mb-4">
              Bem-vindo ao movimento!
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Obrigado por se juntar ao <span className="font-semibold text-orange-500">Núcleo do Esporte</span>! 
              Agora você faz parte da nossa comunidade que une pessoas através do esporte.
            </p>

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
                    className="w-full h-32 bg-white border-2 border-orange-200 rounded-xl p-6 hover:border-orange-400 hover:shadow-xl transition-all duration-300 hover:scale-105 group flex flex-col items-center justify-center"
                  >
                    <div className="text-orange-500 mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300">
                      {button.icon}
                    </div>
                    <h3 className="text-base font-semibold text-gray-800 text-center leading-tight">
                      {button.title}
                    </h3>
                  </button>

                  {/* Tooltip com informações */}
                  {hoveredButton === button.id && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-80 bg-gray-900 text-white text-sm rounded-lg p-4 shadow-lg z-10 animate-fade-in">
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                      {button.info}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-16 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Próximos passos
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Explore as opções acima para começar sua jornada no mundo dos esportes. 
                Conecte-se, pratique e faça parte desta comunidade incrível!
              </p>
            </div>
          </div>
        </div>
      </main>

      <RegistrationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialType={modalType}
      />
    </div>
  );
};

export default CadastroRealizado;
