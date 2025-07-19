
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from 'react-router-dom';
import AuthGuard from './AuthGuard';

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-white py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-orange-600">
          Núcleo do Esporte
        </Link>

        <nav className="hidden md:flex space-x-8">
          <Link 
            to="/praticante" 
            className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
          >
            Praticante
          </Link>
          <Link 
            to="/locais" 
            className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
          >
            Buscar Locais
          </Link>
          <Link 
            to="/grupos" 
            className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
          >
            Grupos
          </Link>
          <Link 
            to="/profissionais" 
            className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
          >
            Profissionais
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.full_name} />
                    <AvatarFallback>{user?.user_metadata?.full_name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>Olá, {user?.user_metadata?.full_name || 'Usuário'}</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>Dashboard</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/meus-referrals')}>Meus Referrals</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/praticante">
                <Button variant="outline">
                  Login
                </Button>
              </Link>
              <Link to="/cadastro-estabelecimento">
                <Button>
                  Cadastrar local
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
