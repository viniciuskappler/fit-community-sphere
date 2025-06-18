
import React, { useState } from 'react';
import { Home, User, Building, Users, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import RegistrationModal from './RegistrationModal';
import LoginModal from './LoginModal';

const Header = ({ isSecondaryVisible }: { isSecondaryVisible: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    console.log('🚪 User logging out...');
    await signOut();
    navigate('/');
  };

  const handleLogoClick = () => {
    console.log('🏠 Logo clicked, navigating to home...');
    navigate('/');
  };

  const handleHubNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('🎯 Hub navigation clicked...');
    navigate('/hub');
  };

  return (
    <>
      <header className={`pt-3 px-3 md:px-6 fixed left-0 right-0 z-40 transition-all duration-300 ${isSecondaryVisible ? 'top-12' : 'top-0'}`}>
        <div className="w-full md:w-[85%] max-w-none mx-auto px-2 md:px-4 sm:px-6">
          <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
            <div className="px-3 md:px-4">
              <div className="flex justify-between items-center h-12 md:h-14">
                {/* Logo */}
                <div className="flex items-center space-x-2 cursor-pointer" onClick={handleLogoClick}>
                  <div className="bg-gradient-to-br from-orange-500 to-red-600 p-1.5 rounded-lg">
                    <div className="w-4 md:w-5 h-4 md:h-5 bg-white rounded-md flex items-center justify-center">
                      <div className="w-2 md:w-2.5 h-2 md:h-2.5 bg-gradient-to-br from-orange-500 to-red-600 rounded-full"></div>
                    </div>
                  </div>
                  <span className="text-sm md:text-base font-bold text-gray-800">Núcleo do Esporte</span>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                  <Link to="/" className="text-gray-600 hover:text-orange-500 transition-all duration-300 hover:scale-110 flex items-center space-x-1.5">
                    <Home size={14} />
                    <span className="text-xs">Início</span>
                  </Link>
                  <button onClick={handleHubNavigation} className="text-gray-600 hover:text-orange-500 transition-all duration-300 hover:scale-110 flex items-center space-x-1.5">
                    <User size={14} />
                    <span className="text-xs">Praticante</span>
                  </button>
                  <button onClick={handleHubNavigation} className="text-gray-600 hover:text-orange-500 transition-all duration-300 hover:scale-110 flex items-center space-x-1.5">
                    <Building size={14} />
                    <span className="text-xs">Buscar Locais</span>
                  </button>
                  <button onClick={handleHubNavigation} className="text-gray-600 hover:text-orange-500 transition-all duration-300 hover:scale-110 flex items-center space-x-1.5">
                    <Users size={14} />
                    <span className="text-xs">Buscar Grupos</span>
                  </button>
                </nav>

                {/* CTA Buttons */}
                <div className="flex items-center space-x-2 md:space-x-3">
                  {user ? (
                    // Usuário logado - mostrar nome e logout
                    <div className="flex items-center space-x-2 md:space-x-3">
                      <span className="text-xs md:text-sm text-gray-600 hidden sm:block">
                        Olá, {user.user_metadata?.full_name || user.email}
                      </span>
                      <button 
                        onClick={handleLogout}
                        className="bg-gradient-to-r from-gray-100 to-white text-gray-800 border border-gray-200 px-2 md:px-4 py-1 md:py-1.5 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-xs font-medium flex items-center space-x-1"
                      >
                        <LogOut size={10} className="md:hidden" />
                        <LogOut size={12} className="hidden md:block" />
                        <span className="hidden sm:inline">Sair</span>
                      </button>
                    </div>
                  ) : (
                    // Usuário não logado - mostrar botões de cadastro e login
                    <>
                      <button 
                        onClick={handleCadastrarClick}
                        className="bg-gradient-to-r from-orange-600 to-orange-400 text-white px-2 md:px-4 py-1 md:py-1.5 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-xs font-medium"
                      >
                        <span>Cadastrar agora</span>
                      </button>
                      <button 
                        onClick={handleLoginClick}
                        className="bg-gradient-to-r from-gray-100 to-white text-gray-800 border border-gray-200 px-2 md:px-4 py-1 md:py-1.5 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-xs font-medium"
                      >
                        <span>Fazer Login</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Only show modals when user is not authenticated */}
      {!user && (
        <>
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
      )}
    </>
  );
};

export default Header;
