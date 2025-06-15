
import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,87,34,0.1),transparent_50%)]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
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

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-xl animate-pulse delay-1000"></div>
    </section>
  );
};

export default HeroSection;
