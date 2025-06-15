
import React, { useState } from 'react';
import { Home, User, Building, Users } from 'lucide-react';
import RegistrationModal from './RegistrationModal';
import LoginModal from './LoginModal';

const Header = ({ isSecondaryVisible }: { isSecondaryVisible: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const scrollToRegistration = () => {
    const registrationSection = document.getElementById('registration-section');
    if (registrationSection) {
      registrationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCadastrarClick = () => {
    setIsModalOpen(true);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  return (
    <>
      <header className={`pt-3 px-6 fixed left-0 right-0 z-40 transition-all duration-300 ${isSecondaryVisible ? 'top-12' : 'top-0'}`}>
        <div className="w-[85%] max-w-none mx-auto px-4 sm:px-6">
          <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
            <div className="px-4">
              <div className="flex justify-between items-center h-14">
                {/* Logo */}
                <div className="flex items-center space-x-2 cursor-pointer" onClick={handleLogoClick}>
                  <div className="bg-gradient-to-br from-orange-500 to-red-600 p-1.5 rounded-lg">
                    <div className="w-5 h-5 bg-white rounded-md flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-gradient-to-br from-orange-500 to-red-600 rounded-full"></div>
                    </div>
                  </div>
                  <span className="text-base font-bold text-gray-800">Núcleo do Esporte</span>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                  <a href="/" className="text-gray-600 hover:text-orange-500 transition-all duration-300 hover:scale-110 flex items-center space-x-1.5">
                    <Home size={14} />
                    <span className="text-xs">Início</span>
                  </a>
                  <a href="/praticante" className="text-gray-600 hover:text-orange-500 transition-all duration-300 hover:scale-110 flex items-center space-x-1.5">
                    <User size={14} />
                    <span className="text-xs">Praticante</span>
                  </a>
                  <a href="/estabelecimento" className="text-gray-600 hover:text-orange-500 transition-all duration-300 hover:scale-110 flex items-center space-x-1.5">
                    <Building size={14} />
                    <span className="text-xs">Estabelecimento</span>
                  </a>
                  <a href="/grupo-esportivo" className="text-gray-600 hover:text-orange-500 transition-all duration-300 hover:scale-110 flex items-center space-x-1.5">
                    <Users size={14} />
                    <span className="text-xs">Grupo Esportivo</span>
                  </a>
                </nav>

                {/* CTA Buttons - Reordered */}
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={handleCadastrarClick}
                    className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-1.5 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-xs font-medium"
                  >
                    Cadastrar agora
                  </button>
                  <button 
                    onClick={handleLoginClick}
                    className="bg-gradient-to-r from-gray-100 to-white text-gray-800 border border-gray-200 px-4 py-1.5 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-xs font-medium"
                  >
                    Fazer Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <RegistrationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialType="supporter"
      />
      
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default Header;
