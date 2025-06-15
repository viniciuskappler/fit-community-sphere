
import React, { useState, useEffect } from 'react';
import { Search, Calendar, Home } from 'lucide-react';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlHeader = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          // Scrolling down
          setIsVisible(false);
        } else {
          // Scrolling up
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlHeader);
      return () => {
        window.removeEventListener('scroll', controlHeader);
      };
    }
  }, [lastScrollY]);

  return (
    <header className={`pt-4 px-4 sm:px-6 lg:px-8 fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="bg-black/80 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-xl">
                <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                  <div className="w-3 h-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-full"></div>
                </div>
              </div>
              <span className="text-xl font-bold text-white">Núcleo do Esporte</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-300 hover:text-orange-500 transition-colors flex items-center space-x-2">
                <Home size={18} />
                <span>Início</span>
              </a>
              <a href="#busca" className="text-gray-300 hover:text-orange-500 transition-colors flex items-center space-x-2">
                <Search size={18} />
                <span>Buscar</span>
              </a>
              <a href="#eventos" className="text-gray-300 hover:text-orange-500 transition-colors flex items-center space-x-2">
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
    </header>
  );
};

export default Header;
