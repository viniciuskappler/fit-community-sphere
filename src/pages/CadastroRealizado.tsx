
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
      icon: <Search size={36} />,
      title: 'Buscar Esportes',
      info: 'Busque atividades físicas na sua região e pratique seus esportes preferidos!',
      onClick: handleSearchClick
    },
    {
      id: 'establishment',
      icon: <Building size={36} />,
      title: 'Cadastrar Estabelecimento',
      info: 'Você tem um espaço que oferece alguma modalidade esportiva? Cadastre seu Estabelecimento para que os praticantes encontrem você!',
      onClick: handleEstablishmentClick
    },
    {
      id: 'group',
      icon: <Users size={36} />,
      title: 'Cadastrar Grupo Esportivo',
      info: 'Você tem um grupo que organiza alguma modalidade esportiva? Cadastre seu grupo para que os praticantes conheçam você!',
      onClick: handleGroupClick
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 relative">
      <ConfettiAnimation />
      
      <main className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="py-16">
            <h1 className="text-7xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-orange-500 bg-clip-text text-transparent mb-8 animate-fade-in drop-shadow-lg">
              Parabéns! 🎉
            </h1>
            <h2 className="text-4xl font-bold text-orange-600 mb-6 animate-fade-in drop-shadow-md">
              Bem-vindo ao movimento!
            </h2>
            <p className="text-2xl text-gray-700 mb-12 max-w-3xl mx-auto font-medium leading-relaxed animate-fade-in">
              Obrigado por se juntar ao <span className="font-bold text-orange-600 text-3xl">Núcleo do Esporte</span>! 
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
                    className="w-full h-40 bg-white border-3 border-orange-300 rounded-2xl p-8 hover:border-orange-500 hover:shadow-2xl transition-all duration-300 hover:scale-110 group flex flex-col items-center justify-center transform hover:-translate-y-2"
                  >
                    <div className="text-orange-600 mb-4 flex justify-center group-hover:scale-125 transition-transform duration-300">
                      {button.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 text-center leading-tight group-hover:text-orange-600 transition-colors duration-300">
                      {button.title}
                    </h3>
                  </button>

                  {/* Tooltip com informações */}
                  {hoveredButton === button.id && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-6 w-80 bg-gray-900 text-white text-sm rounded-xl p-5 shadow-2xl z-10 animate-fade-in border border-orange-300">
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                      <p className="font-medium">{button.info}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-20 p-8 bg-gradient-to-r from-orange-100 via-yellow-50 to-red-100 rounded-2xl max-w-3xl mx-auto border-2 border-orange-200 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-orange-700">
                🚀 Próximos passos
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed font-medium">
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
