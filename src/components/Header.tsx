
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Dumbbell, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleUserClick = () => {
    navigate('/dashboard');
  };

  return (
    <header className="bg-white py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-orange-600 hover:text-orange-700 transition-colors">
          <Dumbbell className="w-8 h-8" />
          <span>Núcleo do Esporte</span>
        </Link>

        <nav className="hidden md:flex space-x-8">
          <Link 
            to="/praticante" 
            className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 font-medium transition-colors"
          >
            <User className="w-5 h-5" />
            <span>Praticante</span>
          </Link>
          <Link 
            to="/hub" 
            className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 font-medium transition-colors"
          >
            <MapPin className="w-5 h-5" />
            <span>Hub do Esporte</span>
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={handleUserClick}
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors cursor-pointer"
              >
                Olá, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuário'}
              </button>
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="flex items-center space-x-1"
              >
                <LogOut className="w-4 h-4" />
                <span>Sair</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/praticante">
                <Button variant="outline" size="sm">
                  Entrar
                </Button>
              </Link>
              <Link to="/praticante#cadastro">
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                  Registrar-se
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
