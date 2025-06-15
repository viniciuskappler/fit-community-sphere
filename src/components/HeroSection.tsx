
import React from 'react';

const HeroSection = () => {
  const sportsBanners = [{
    name: 'Musculação',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop'
  }, {
    name: 'Tênis',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&h=800&fit=crop'
  }, {
    name: 'Canoagem',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop'
  }, {
    name: 'Trekking',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=800&fit=crop'
  }, {
    name: 'Ciclismo',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&h=800&fit=crop'
  }, {
    name: 'Corrida',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1200&h=800&fit=crop'
  }, {
    name: 'Ginástica',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&h=800&fit=crop'
  }, {
    name: 'Hipismo',
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1200&h=800&fit=crop'
  }];

  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      {/* Background Banners */}
      <div className="absolute inset-0">
        <div className="flex animate-slide-slow space-x-8 h-full">
          {[...sportsBanners, ...sportsBanners, ...sportsBanners].map((sport, index) => (
            <div key={index} className="flex-shrink-0 w-[900px] h-full relative">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${sport.image})`,
                }}
              />
            </div>
          ))}
        </div>
        
        {/* Gradient Overlays - stronger gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/20 to-white" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-white/80" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>
      
      <div className="relative max-w-4xl mx-auto px-8 py-32 z-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Conectando pessoas </span>
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              ao Esporte
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed text-lg md:text-xl font-medium">
            Faça parte do movimento que está transformando vidas através da união do Esporte.
          </p>

          {/* CTA Button */}
          <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105">
            Cadastrar agora →
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
