import React from 'react';
import { Search, Calendar, Home, Settings } from 'lucide-react';
const Header = () => {
  return <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-xl">
              <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                <div className="w-3 h-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-full"></div>
              </div>
            </div>
            <span className="text-xl font-bold text-gray-900">Núcleo do Esporte</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-orange-500 transition-colors flex items-center space-x-2">
              <Home size={18} />
              <span>Início</span>
            </a>
            <a href="#busca" className="text-gray-700 hover:text-orange-500 transition-colors flex items-center space-x-2">
              <Search size={18} />
              <span>Buscar</span>
            </a>
            <a href="#eventos" className="text-gray-700 hover:text-orange-500 transition-colors flex items-center space-x-2">
              <Calendar size={18} />
              <span>Eventos</span>
            </a>
          </nav>

          {/* CTA Button */}
          <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">Cadastrar agora →</button>
        </div>
      </div>
    </header>;
};
export default Header;