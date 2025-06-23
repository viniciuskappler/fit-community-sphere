
import React from 'react';

const SportsBannerSection = () => {
  const sportsBanners = [
    { 
      name: 'Treinamento Funcional', 
      image: '/lovable-uploads/e5644ad9-b874-4157-873e-40502cf056b0.png',
      alt: 'Pessoa praticando treinamento funcional com elásticos'
    },
    { 
      name: 'CrossFit', 
      image: '/lovable-uploads/72437099-6d2b-44fc-a4be-2de3feb06dbc.png',
      alt: 'Atleta praticando CrossFit com cordas'
    },
    { 
      name: 'Tiro com Arco', 
      image: '/lovable-uploads/f837a4ce-7c6e-461f-ba63-edcf4bf741fc.png',
      alt: 'Pessoa praticando tiro com arco'
    },
    { 
      name: 'Escalada', 
      image: '/lovable-uploads/e86c5380-4c2d-4b0b-99e8-8b93aeca8636.png',
      alt: 'Pessoas praticando escalada esportiva'
    },
    { 
      name: 'Trekking', 
      image: '/lovable-uploads/67b4cf92-c94a-4f4b-a770-ff1f58239a6d.png',
      alt: 'Pessoas fazendo trekking em trilha'
    },
    { 
      name: 'Montanhismo', 
      image: '/lovable-uploads/44959214-1bcf-4335-9376-cdaa51c8183c.png',
      alt: 'Montanhistas explorando paisagem'
    },
    { 
      name: 'Corrida', 
      image: '/lovable-uploads/5736d95e-4f42-43f5-8ef3-6377ff323c0b.png',
      alt: 'Casal correndo no parque'
    },
    { 
      name: 'Atletismo', 
      image: '/lovable-uploads/ce01b34d-566a-420b-9fb3-29ed4b24590b.png',
      alt: 'Atletas praticando corrida em pista'
    },
  ];

  return (
    <section className="relative py-8 bg-white overflow-hidden">
      {/* Banner Carousel */}
      <div className="relative overflow-hidden">
        <div className="flex animate-slide-slow space-x-6">
          {[...sportsBanners, ...sportsBanners].map((sport, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 h-48 relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundImage: `url(${sport.image})` }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
              
              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-center">
                <h3 className="text-white font-bold text-2xl text-center drop-shadow-lg">
                  {sport.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SportsBannerSection;
