
import React, { useState } from 'react';
import { Search, Home, User, Building, Users } from 'lucide-react';
import RegistrationModal from './RegistrationModal';

const Header = ({ isSecondaryVisible }: { isSecondaryVisible: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    // TODO: Implementar funcionalidade de login
    console.log('Login clicked');
  };

  return (
    <>
      <header className={`pt-3 px-6 fixed left-0 right-0 z-40 transition-all duration-300 ${isSecondaryVisible ? 'top-12' : 'top-0'}`}>
        <div className="w-4/5 max-w-none mx-auto px-4 sm:px-6">
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
                  <a href="#praticante" className="text-gray-600 hover:text-orange-500 transition-colors flex items-center space-x-1.5">
                    <User size={16} />
                    <span className="text-sm">Praticante</span>
                  </a>
                  <a href="#estabelecimento" className="text-gray-600 hover:text-orange-500 transition-colors flex items-center space-x-1.5">
                    <Building size={16} />
                    <span className="text-sm">Estabelecimento</span>
                  </a>
                  <a href="#grupo-esportivo" className="text-gray-600 hover:text-orange-500 transition-colors flex items-center space-x-1.5">
                    <Users size={16} />
                    <span className="text-sm">Grupo Esportivo</span>
                  </a>
                  <a href="#busca" className="text-gray-600 hover:text-orange-500 transition-colors flex items-center space-x-1.5">
                    <Search size={16} />
                    <span className="text-sm">Buscar</span>
                  </a>
                </nav>

                {/* CTA Buttons */}
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={handleLoginClick}
                    className="bg-white text-gray-800 border border-gray-200 px-4 py-1.5 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm font-medium"
                    style={{
                      background: 'white',
                      backgroundImage: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(249, 115, 22, 0.05) 100%)',
                      borderImage: 'linear-gradient(135deg, #ef4444, #f97316) 1'
                    }}
                  >
                    Fazer Login ↽
                  </button>
                  <button 
                    onClick={handleCadastrarClick}
                    className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-1.5 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm font-medium"
                  >
                    Cadastrar agora ↽
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
    </>
  );
};

export default Header;
