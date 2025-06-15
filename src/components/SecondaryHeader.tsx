
import React, { useState, useEffect } from 'react';
import { Instagram, Linkedin, Youtube } from 'lucide-react';

const SecondaryHeader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlHeader = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 50) {
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
    <div className={`fixed top-20 left-0 right-0 z-40 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-6xl mx-auto px-8">
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              {/* Social Media Icons */}
              <div className="flex items-center space-x-4">
                <Instagram size={20} className="text-gray-600 hover:text-orange-500 transition-colors cursor-pointer" />
                <Linkedin size={20} className="text-gray-600 hover:text-orange-500 transition-colors cursor-pointer" />
                <Youtube size={20} className="text-gray-600 hover:text-orange-500 transition-colors cursor-pointer" />
              </div>

              {/* Logo */}
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-xl">
                  <div className="w-5 h-5 bg-white rounded-md flex items-center justify-center">
                    <div className="w-2 h-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-full"></div>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-800">Núcleo do Esporte</span>
              </div>

              {/* Navigation */}
              <nav className="flex items-center space-x-6">
                <a href="#kyc" className="text-gray-600 hover:text-orange-500 transition-colors text-sm font-medium">KYC</a>
                <a href="#betsafe" className="text-gray-600 hover:text-orange-500 transition-colors text-sm font-medium">BetSafe</a>
                <a href="#blog" className="text-gray-600 hover:text-orange-500 transition-colors text-sm font-medium">Blog</a>
                <a href="#clientes" className="text-gray-600 hover:text-orange-500 transition-colors text-sm font-medium">Clientes</a>
                <a href="#contato" className="text-gray-600 hover:text-orange-500 transition-colors text-sm font-medium">Contato</a>
              </nav>

              {/* Language Selector */}
              <div className="flex items-center space-x-2">
                <img src="https://flagcdn.com/w20/br.png" alt="Brazil" className="w-5 h-4" />
                <span className="text-sm font-medium text-gray-600">Português</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryHeader;
