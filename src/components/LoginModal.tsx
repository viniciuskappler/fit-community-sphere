
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import GoogleAuthButton from './GoogleAuthButton';
import { supabase } from '@/integrations/supabase/client';

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
  const { signIn, signUp, signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  const checkUserProfile = async (userId: string) => {
    try {
      // Verificar se o usuário já existe na tabela usuarios
      const { data: existingUser, error: userError } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', userId)
        .single();

      if (userError && userError.code !== 'PGRST116') {
        console.error('Erro ao verificar usuário:', userError);
        return false;
      }

      // Se não existe na tabela usuarios, redirecionar para completar perfil
      if (!existingUser) {
        console.log('Usuário não encontrado na tabela usuarios, redirecionando para completar perfil');
        return false;
      }

      // Verificar se o perfil está completo
      const isProfileComplete = existingUser && 
        existingUser.nome && 
        existingUser.cidade && 
        existingUser.nome.trim() !== '' &&
        existingUser.cidade.trim() !== '';

      return isProfileComplete;
    } catch (error) {
      console.error('Erro na verificação do perfil:', error);
      return false;
    }
  };

  const handleSuccessfulAuth = async (userId: string) => {
    try {
      const isProfileComplete = await checkUserProfile(userId);
      
      onClose();
      setEmail('');
      setPassword('');
      
      if (isProfileComplete) {
        navigate('/hub');
      } else {
        navigate('/praticante'); // Tela de completar perfil
      }
    } catch (error) {
      console.error('Erro ao processar autenticação:', error);
      navigate('/hub'); // Fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    console.log('🔐 Tentando login/cadastro para:', email);

    try {
      // Primeiro tenta fazer login
      const { error: signInError } = await signIn(email, password);
      
      if (signInError) {
        // Se o login falhou, tenta criar conta automaticamente
        if (signInError.message.includes('Invalid login credentials') || 
            signInError.message.includes('Email not confirmed')) {
          
          console.log('🆕 Login falhou, tentando criar nova conta...');
          
          const { data: signUpData, error: signUpError } = await signUp(email, password);
          
          if (signUpError) {
            console.error('❌ Erro no cadastro:', signUpError);
            setError('Erro ao criar conta: ' + signUpError.message);
          } else if (signUpData.user) {
            console.log('✅ Conta criada com sucesso');
            // Após criar conta, fazer login automaticamente
            const { error: autoSignInError } = await signIn(email, password);
            if (!autoSignInError && signUpData.user) {
              await handleSuccessfulAuth(signUpData.user.id);
            }
          }
        } else {
          console.error('❌ Erro no login:', signInError);
          setError('Erro no login: ' + signInError.message);
        }
      } else {
        // Login bem-sucedido
        console.log('✅ Login realizado com sucesso');
        if (user?.id) {
          await handleSuccessfulAuth(user.id);
        }
      }
    } catch (error: any) {
      console.error('💥 Erro inesperado:', error);
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsGoogleLoading(true);

    console.log('🔐 Iniciando login com Google');

    try {
      const { error } = await signInWithGoogle();
      
      if (error) {
        console.error('❌ Erro no login com Google:', error);
        setError('Erro no login com Google: ' + error.message);
      } else {
        console.log('✅ Login com Google iniciado');
        // O redirecionamento será tratado pelo AuthContext
        onClose();
      }
    } catch (error: any) {
      console.error('💥 Erro inesperado no login com Google:', error);
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
      <DialogContent className="sm:max-w-md bg-white border border-gray-200 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-800">
            Entrar ou Criar Conta
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Botão do Google */}
          <GoogleAuthButton 
            onClick={handleGoogleSignIn}
            loading={isGoogleLoading}
            text="Continuar com Google"
          />

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">ou</span>
            </div>
          </div>

          {/* Formulário de Email/Senha */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email" className="text-gray-700 font-medium">E-mail</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password" className="text-gray-700 font-medium">Senha</Label>
              <div className="relative">
                <Input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" 
              disabled={isLoading}
            >
              {isLoading ? 'Processando...' : 'Entrar / Criar Conta'}
            </Button>
          </form>

          <p className="text-xs text-gray-600 text-center">
            Se você não tem conta, ela será criada automaticamente ao inserir seus dados.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
