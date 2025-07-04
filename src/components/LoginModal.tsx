
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import GoogleAuthButton from './GoogleAuthButton';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    console.log('🔐 Starting login attempt for:', email);

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        console.error('❌ Login error:', error);
        
        // Improved error handling with more specific messages
        if (error.message.includes('Invalid login credentials')) {
          setError('E-mail ou senha incorretos. Verifique suas credenciais e tente novamente.');
        } else if (error.message.includes('Email not confirmed')) {
          setError('Por favor, confirme seu e-mail antes de fazer login. Verifique sua caixa de entrada.');
        } else if (error.message.includes('Too many requests')) {
          setError('Muitas tentativas de login. Aguarde alguns minutos antes de tentar novamente.');
        } else {
          setError('Erro no login: ' + error.message);
        }
      } else {
        console.log('✅ Login successful');
        onClose();
        setEmail('');
        setPassword('');
      }
    } catch (error: any) {
      console.error('💥 Login exception:', error);
      setError('Erro inesperado no login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsGoogleLoading(true);

    console.log('🔐 Starting Google login attempt');

    try {
      const { error } = await signInWithGoogle();
      
      if (error) {
        console.error('❌ Google login error:', error);
        
        // Improved Google auth error handling
        if (error.message.includes('popup_closed_by_user')) {
          setError('Login cancelado. Tente novamente se desejar continuar com o Google.');
        } else if (error.message.includes('access_denied')) {
          setError('Acesso negado pelo Google. Verifique suas permissões.');
        } else {
          setError('Erro no login com Google: ' + error.message);
        }
      } else {
        console.log('✅ Google login successful');
        onClose();
      }
    } catch (error: any) {
      console.error('💥 Google login exception:', error);
      setError('Erro inesperado no login com Google. Tente novamente.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setError('');
    setEmail('');
    setPassword('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Fazer Login
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="login-email">E-mail</Label>
            <Input
              id="login-email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="login-password">Senha</Label>
            <div className="relative">
              <Input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="text-right">
            <Link 
              to="/forgot-password" 
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
              onClick={handleClose}
            >
              Esqueci minha senha
            </Link>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">ou</span>
          </div>
        </div>

        <GoogleAuthButton 
          onClick={handleGoogleSignIn}
          loading={isGoogleLoading}
          text="Entrar with Google"
        />
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
