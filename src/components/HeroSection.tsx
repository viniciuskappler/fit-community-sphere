
import React from 'react';

const HeroSection = () => {
  const sportsBanners = [
    { 
      name: 'Musculação', 
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
    },
    { 
      name: 'Tênis', 
      image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=400&fit=crop',
    },
    { 
      name: 'Canoagem', 
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop',
    },
    { 
      name: 'Trekking', 
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=400&fit=crop',
    },
    { 
      name: 'Ciclismo', 
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=400&fit=crop',
    },
    { 
      name: 'Corrida', 
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=400&fit=crop',
    },
    { 
      name: 'Ginástica', 
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=400&fit=crop',
    },
    { 
      name: 'Hipismo', 
      image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&h=400&fit=crop',
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Banners */}
      <div className="absolute inset-0">
        <div className="flex animate-slide-slow space-x-6 h-full">
          {[...sportsBanners, ...sportsBanners, ...sportsBanners].map((sport, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 h-full relative"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${sport.image})` }}
              />
            </div>
          ))}
        </div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 z-10">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 animate-pulse"></div>
            <span className="text-gray-300 text-sm">Conectando atletas e estabelecimentos</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Tecnologia{' '}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Esportiva
            </span>
            <br />
            para um{' '}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Futuro Ativo
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Conecte-se com academias, grupos esportivos e eventos próximos a você. 
            Encontre seu esporte ideal e faça parte de uma comunidade ativa.
          </p>

          {/* CTA Button */}
          <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 mb-16">
            Começar agora →
          </button>

          {/* App Icon */}
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-sm p-8 rounded-3xl border border-orange-500/30">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
