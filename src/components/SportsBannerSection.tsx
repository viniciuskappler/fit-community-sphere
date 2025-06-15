
import React from 'react';

const SportsBannerSection = () => {
  const sportsBanners = [
    { 
      name: 'Musculação', 
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
      alt: 'Pessoa praticando musculação com halteres'
    },
    { 
      name: 'Tênis', 
      image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=400&fit=crop',
      alt: 'Jogador de tênis em ação na quadra'
    },
    { 
      name: 'Canoagem', 
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop',
      alt: 'Pessoa praticando canoagem em lago'
    },
    { 
      name: 'Trekking', 
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=400&fit=crop',
      alt: 'Pessoa fazendo trekking em trilha de montanha'
    },
    { 
      name: 'Ciclismo', 
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=400&fit=crop',
      alt: 'Ciclista pedalando em estrada'
    },
    { 
      name: 'Corrida', 
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=400&fit=crop',
      alt: 'Corredor em movimento durante exercício'
    },
    { 
      name: 'Ginástica', 
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=400&fit=crop',
      alt: 'Ginasta praticando exercícios'
    },
    { 
      name: 'Hipismo', 
      image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&h=400&fit=crop',
      alt: 'Cavaleiro praticando hipismo'
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
