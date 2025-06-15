
import React from 'react';
import { Search, Calendar, Home } from 'lucide-react';

const Header = ({ isSecondaryVisible }: { isSecondaryVisible: boolean }) => {
  return (
    <header className={`pt-4 px-8 fixed left-0 right-0 z-40 transition-all duration-300 ${isSecondaryVisible ? 'top-12' : 'top-0'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg">
          <div className="px-6">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-xl">
                  <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                    <div className="w-3 h-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-full"></div>
                  </div>
                </div>
                <span className="text-xl font-bold text-gray-800">Núcleo do Esporte</span>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#home" className="text-gray-600 hover:text-orange-500 transition-colors flex items-center space-x-2">
                  <Home size={18} />
                  <span>Início</span>
                </a>
                <a href="#busca" className="text-gray-600 hover:text-orange-500 transition-colors flex items-center space-x-2">
                  <Search size={18} />
                  <span>Buscar</span>
                </a>
                <a href="#eventos" className="text-gray-600 hover:text-orange-500 transition-colors flex items-center space-x-2">
                  <Calendar size={18} />
                  <span>Eventos</span>
                </a>
              </nav>

              {/* CTA Button */}
              <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                Cadastrar agora →
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
