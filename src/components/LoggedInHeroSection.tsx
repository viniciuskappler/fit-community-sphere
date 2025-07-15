import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import SportDetailsModal from './SportDetailsModal';

const LoggedInHeroSection = () => {
  const [currentSportIndex, setCurrentSportIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState(null);

  const sportsData = [
    {
      id: 1,
      name: 'Futebol',
      phrase: 'O esporte que une paixões e constrói sonhos',
      backgroundImage: '/lovable-uploads/e5644ad9-b874-4157-873e-40502cf056b0.png',
      description: 'O futebol é o esporte mais popular do mundo, praticado por mais de 4 bilhões de pessoas. É um esporte que desenvolve coordenação, trabalho em equipe e resistência física.',
      images: [
        '/lovable-uploads/e5644ad9-b874-4157-873e-40502cf056b0.png',
        '/lovable-uploads/72437099-6d2b-44fc-a4be-2de3feb06dbc.png'
      ]
    },
    {
      id: 2,
      name: 'CrossFit',
      phrase: 'Força e determinação em cada movimento',
      backgroundImage: '/lovable-uploads/72437099-6d2b-44fc-a4be-2de3feb06dbc.png',
      description: 'CrossFit é uma metodologia de treinamento que combina elementos de ginástica olímpica, levantamento de peso e exercícios cardiovasculares de alta intensidade.',
      images: [
        '/lovable-uploads/72437099-6d2b-44fc-a4be-2de3feb06dbc.png',
        '/lovable-uploads/f837a4ce-7c6e-461f-ba63-edcf4bf741fc.png'
      ]
    },
    {
      id: 3,
      name: 'Tiro com Arco',
      phrase: 'Precisão e foco em cada disparo',
      backgroundImage: '/lovable-uploads/f837a4ce-7c6e-461f-ba63-edcf4bf741fc.png',
      description: 'O tiro com arco é um esporte olímpico que desenvolve concentração, disciplina e precisão. Praticado há milhares de anos, é uma das modalidades mais antigas.',
      images: [
        '/lovable-uploads/f837a4ce-7c6e-461f-ba63-edcf4bf741fc.png',
        '/lovable-uploads/e86c5380-4c2d-4b0b-99e8-8b93aeca8636.png'
      ]
    },
    {
      id: 4,
      name: 'Escalada',
      phrase: 'Desafie suas alturas e conquiste novos patamares',
      backgroundImage: '/lovable-uploads/e86c5380-4c2d-4b0b-99e8-8b93aeca8636.png',
      description: 'A escalada esportiva desenvolve força, resistência e estratégia. É um esporte completo que trabalha corpo e mente, agora também modalidade olímpica.',
      images: [
        '/lovable-uploads/e86c5380-4c2d-4b0b-99e8-8b93aeca8636.png',
        '/lovable-uploads/67b4cf92-c94a-4f4b-a770-ff1f58239a6d.png'
      ]
    },
    {
      id: 5,
      name: 'Trekking',
      phrase: 'Explore novos horizontes e conecte-se com a natureza',
      backgroundImage: '/lovable-uploads/67b4cf92-c94a-4f4b-a770-ff1f58239a6d.png',
      description: 'O trekking é uma caminhada em trilhas naturais que combina exercício físico com contemplação da natureza. Desenvolve resistência e bem-estar mental.',
      images: [
        '/lovable-uploads/67b4cf92-c94a-4f4b-a770-ff1f58239a6d.png',
        '/lovable-uploads/44959214-1bcf-4335-9376-cdaa51c8183c.png'
      ]
    },
    {
      id: 6,
      name: 'Montanhismo',
      phrase: 'Conquiste picos e supere seus próprios limites',
      backgroundImage: '/lovable-uploads/44959214-1bcf-4335-9376-cdaa51c8183c.png',
      description: 'O montanhismo é a arte de escalar montanhas, combinando técnica, resistência física e mental. Um esporte que desafia limites e proporciona experiências únicas.',
      images: [
        '/lovable-uploads/44959214-1bcf-4335-9376-cdaa51c8183c.png',
        '/lovable-uploads/5736d95e-4f42-43f5-8ef3-6377ff323c0b.png'
      ]
    },
    {
      id: 7,
      name: 'Corrida',
      phrase: 'Cada passo é uma conquista pessoal',
      backgroundImage: '/lovable-uploads/5736d95e-4f42-43f5-8ef3-6377ff323c0b.png',
      description: 'A corrida é um dos esportes mais acessíveis e benéficos. Melhora a saúde cardiovascular, fortalece músculos e libera endorfinas naturais.',
      images: [
        '/lovable-uploads/5736d95e-4f42-43f5-8ef3-6377ff323c0b.png',
        '/lovable-uploads/ce01b34d-566a-420b-9fb3-29ed4b24590b.png'
      ]
    },
    {
      id: 8,
      name: 'Atletismo',
      phrase: 'Velocidade, força e determinação',
      backgroundImage: '/lovable-uploads/ce01b34d-566a-420b-9fb3-29ed4b24590b.png',
      description: 'O atletismo é conhecido como "esporte-base" pois desenvolve as habilidades motoras fundamentais. Inclui corridas, saltos, arremessos e lançamentos.',
      images: [
        '/lovable-uploads/ce01b34d-566a-420b-9fb3-29ed4b24590b.png',
        '/lovable-uploads/e5644ad9-b874-4157-873e-40502cf056b0.png'
      ]
    }
  ];

  // Auto-change sport every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSportIndex((prev) => (prev + 1) % sportsData.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const currentSport = sportsData[currentSportIndex];

  const handleKnowSport = () => {
    setSelectedSport(currentSport);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="relative h-[80vh] md:h-[90vh] overflow-hidden bg-black">
        {/* Dynamic Background */}
        <div className="absolute inset-0" style={{ top: '-120px' }}>
          <div className="absolute inset-0 h-[calc(100%+120px)]">
            <div 
              className="absolute inset-0 bg-cover bg-center transform scale-105 transition-all duration-1000"
              style={{ backgroundImage: `url(${currentSport.backgroundImage})` }}
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          
          {/* Enhanced Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-white z-10" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/90 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent z-10" />
        </div>

        {/* Sport Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {sportsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSportIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSportIndex 
                  ? 'bg-orange-500 scale-110' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
        
        <div className="relative w-full px-6 md:w-11/12 lg:w-3/4 mx-auto md:px-8 lg:px-8 py-16 md:py-32 z-20 flex items-center justify-center h-full">
          <div className="text-center">
            {/* Sport Name */}
            <div className="mb-8">
              <h3 className="text-3xl md:text-5xl text-orange-400 font-bold mb-4 animate-fade-in">
                {currentSport.name}
              </h3>
            </div>

            {/* Animated Sport Phrase */}
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight text-white animate-fade-in">
              {currentSport.phrase}
            </h1>

            {/* CTA Button */}
            <div className="flex justify-center items-center">
              <button 
                onClick={handleKnowSport}
                className="bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center space-x-2 group"
              >
                <span>Conhecer {currentSport.name}</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {selectedSport && (
        <SportDetailsModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          sport={selectedSport}
        />
      )}
    </>
  );
};

export default LoggedInHeroSection;