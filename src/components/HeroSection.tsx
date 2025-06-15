import React from 'react';

const HeroSection = () => {
  const sportsBanners = [
    { 
      name: 'Musculação', 
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=675&fit=crop',
    },
    { 
      name: 'Tênis', 
      image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&h=675&fit=crop',
    },
    { 
      name: 'Canoagem', 
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=675&fit=crop',
    },
    { 
      name: 'Trekking', 
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=675&fit=crop',
    },
    { 
      name: 'Ciclismo', 
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&h=675&fit=crop',
    },
    { 
      name: 'Corrida', 
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1200&h=675&fit=crop',
    },
    { 
      name: 'Ginástica', 
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&h=675&fit=crop',
    },
    { 
      name: 'Hipismo', 
      image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1200&h=675&fit=crop',
    },
  ];

  return (
    <section className="relative h-[80vh] overflow-hidden">
      {/* Background Banners */}
      <div className="absolute inset-0">
        <div className="flex animate-slide-slow space-x-8 h-full">
          {[...sportsBanners, ...sportsBanners, ...sportsBanners].map((sport, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[500px] h-full relative"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(${sport.image})`,
                  aspectRatio: '16/9'
                }}
              />
            </div>
          ))}
        </div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10 flex items-center justify-center h-full">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 animate-pulse"></div>
            <span className="text-gray-300 text-sm">Conectando atletas e estabelecimentos</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Conectando pessoas{' '}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              ao Esporte
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            Conecte-se com academias, grupos esportivos e eventos próximos a você. 
            Encontre seu esporte ideal e faça parte de uma comunidade ativa.
          </p>

          {/* CTA Button */}
          <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 mb-8">
            Começar agora →
          </button>

          {/* App Icon */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-sm p-6 rounded-3xl border border-orange-500/30">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-full"></div>
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
