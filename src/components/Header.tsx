
import React from 'react';
import { Search, Calendar, Home } from 'lucide-react';

const Header = ({ isSecondaryVisible }: { isSecondaryVisible: boolean }) => {
  return (
    <header className={`pt-3 px-6 fixed left-0 right-0 z-40 transition-all duration-300 ${isSecondaryVisible ? 'top-12' : 'top-0'}`}>
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:w-3/4 lg:px-0">
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
          <div className="px-4">
            <div className="flex justify-between items-center h-14">
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 p-1.5 rounded-lg">
                  <div className="w-5 h-5 bg-white rounded-md flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-gradient-to-br from-orange-500 to-red-600 rounded-full"></div>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-800">Núcleo do Esporte</span>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-6">
                <a href="#home" className="text-gray-600 hover:text-orange-500 transition-colors flex items-center space-x-1.5">
                  <Home size={16} />
                  <span className="text-sm">Início</span>
                </a>
                <a href="#busca" className="text-gray-600 hover:text-orange-500 transition-colors flex items-center space-x-1.5">
                  <Search size={16} />
                  <span className="text-sm">Buscar</span>
                </a>
                <a href="#eventos" className="text-gray-600 hover:text-orange-500 transition-colors flex items-center space-x-1.5">
                  <Calendar size={16} />
                  <span className="text-sm">Eventos</span>
                </a>
              </nav>

              {/* CTA Button */}
              <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-1.5 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm font-medium">
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
