
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Eye, EyeOff } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Você esqueceu de preencher esse campo.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Esse campo foi preenchido incorretamente.';
    }
    
    if (!password) {
      newErrors.password = 'Você esqueceu de preencher esse campo.';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // TODO: Implementar lógica de login
    console.log('Login:', { email, password });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-gray-800">
            Fazer Login
          </DialogTitle>
        </DialogHeader>

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
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
            className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
          >
            Entrar
          </Button>

          <div className="text-center text-sm text-gray-600">
            Não tem uma conta?{' '}
            <button
              type="button"
              onClick={onClose}
              className="text-orange-500 hover:text-orange-600"
            >
              Cadastre-se aqui
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
