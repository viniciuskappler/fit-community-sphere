
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLoginSecurity } from '@/hooks/useLoginSecurity';
import GoogleAuthButton from './GoogleAuthButton';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { checkLoginAttempts, logLoginAttempt, handleAccountLocked, isCheckingAttempts } = useLoginSecurity();

  // Enhanced email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setErrors({});
    
    try {
      const { error } = await signInWithGoogle();
      
      if (error) {
        setErrors({ general: 'Erro ao fazer login com Google. Tente novamente.' });
      } else {
        onClose();
        navigate('/hub');
      }
    } catch (error: any) {
      console.error('Google login exception:', error);
      setErrors({ general: 'Erro inesperado ao fazer login com Google' });
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Você esqueceu de preencher esse campo.';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Formato de email inválido.';
    }
    
    if (!password) {
      newErrors.password = 'Você esqueceu de preencher esse campo.';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    setErrors({});
    
    try {
      // Check for account lockout before attempting login
      const attemptResult = await checkLoginAttempts(email);
      
      if (attemptResult.isLocked) {
        handleAccountLocked(attemptResult.attemptCount, attemptResult.ipAttemptCount);
        setLoading(false);
        return;
      }

      const { error } = await signIn(email, password);
      
      // Log the login attempt
      await logLoginAttempt(email, !error);
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setErrors({ general: 'Email ou senha incorretos.' });
          
          // Check if this failed attempt causes account lockout
          const newAttemptResult = await checkLoginAttempts(email);
          const remainingAttempts = 5 - newAttemptResult.attemptCount;
          if (remainingAttempts > 0 && remainingAttempts <= 2) {
            setErrors({ 
              general: `Email ou senha incorretos. ${remainingAttempts} tentativa(s) restante(s).` 
            });
          }
        } else {
          setErrors({ general: 'Erro ao fazer login. Tente novamente.' });
        }
      } else {
        onClose();
        navigate('/hub');
      }
    } catch (error: any) {
      console.error('Login exception:', error);
      setErrors({ general: 'Erro inesperado ao fazer login' });
      // Log failed attempt even for exceptions
      await logLoginAttempt(email, false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-[90%] sm:w-full bg-white rounded-xl mx-auto border-0 shadow-2xl fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-gray-800">
            Fazer Login
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-600">{errors.general}</p>
            </div>
          )}

          {/* Google Login Button */}
          <GoogleAuthButton
            onClick={handleGoogleLogin}
            loading={googleLoading}
            text="Entrar com Google"
          />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Ou continue com</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                }}
                className="mt-1"
                placeholder="seu@email.com"
                disabled={loading || isCheckingAttempts || googleLoading}
              />
              {errors.email && (
                <p className="text-xs text-orange-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                  }}
                  className="mt-1 pr-10"
                  placeholder="Sua senha"
                  disabled={loading || isCheckingAttempts || googleLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={loading || isCheckingAttempts || googleLoading}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-orange-500 mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex justify-between items-center text-sm">
              <a href="#" className="text-orange-500 hover:text-orange-600">
                Esqueceu sua senha?
              </a>
            </div>

            <Button
              type="submit"
              disabled={loading || isCheckingAttempts || googleLoading}
              className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
            >
              {loading || isCheckingAttempts ? 'Verificando...' : 'Entrar'}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Não tem uma conta?{' '}
              <button
                type="button"
                onClick={onClose}
                className="text-orange-500 hover:text-orange-600"
                disabled={loading || isCheckingAttempts || googleLoading}
              >
                Cadastre-se aqui
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
