
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import RegistrationModal from './RegistrationModal';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
  className?: string;
  onClick?: () => void;
}

const AuthGuard = ({ children, redirectTo = '/hub', className, onClick }: AuthGuardProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const handleClick = () => {
    if (user) {
      if (onClick) {
        onClick();
      } else {
        navigate(redirectTo);
      }
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    if (onClick) {
      onClick();
    } else {
      navigate(redirectTo);
    }
  };

  const handleShowRegistration = () => {
    setShowLoginModal(false);
    setShowRegistrationModal(true);
  };

  return (
    <>
      <div onClick={handleClick} className={className}>
        {children}
      </div>
      
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-center mb-4">
              Faça login para continuar
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Você precisa estar logado para acessar esta funcionalidade.
            </p>
            
            <div className="space-y-3">
              <LoginModal 
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
              />
              
              <button
                onClick={handleShowRegistration}
                className="w-full text-center text-orange-500 hover:text-orange-600 text-sm"
              >
                Não tem uma conta? Cadastre-se aqui
              </button>
            </div>
          </div>
        </div>
      )}
      
      <RegistrationModal 
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        initialType="supporter"
      />
    </>
  );
};

export default AuthGuard;
