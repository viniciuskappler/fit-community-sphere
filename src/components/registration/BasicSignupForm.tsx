
import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { ValidationErrors } from '../../utils/formValidation';

interface BasicSignupFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  loading: boolean;
  errors: ValidationErrors;
}

const BasicSignupForm = ({ onSubmit, loading, errors }: BasicSignupFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return;
    }
    
    await onSubmit(email, password);
  };

  const passwordMatch = password === confirmPassword && confirmPassword.length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="signup-email" className="text-orange-600 font-medium">
          E-mail *
        </Label>
        <Input
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
          className={`mt-1 ${errors.email ? 'border-red-500' : 'focus:border-orange-500 focus:ring-orange-500'}`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <Label htmlFor="signup-password" className="text-orange-600 font-medium">
          Senha *
        </Label>
        <div className="relative">
          <Input
            id="signup-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Crie sua senha"
            required
            className={`mt-1 pr-10 ${errors.password ? 'border-red-500' : 'focus:border-orange-500 focus:ring-orange-500'}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      <div>
        <Label htmlFor="signup-confirm-password" className="text-orange-600 font-medium">
          Repetir Senha *
        </Label>
        <div className="relative">
          <Input
            id="signup-confirm-password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme sua senha"
            required
            className={`mt-1 pr-10 ${!passwordMatch && confirmPassword.length > 0 ? 'border-red-500' : 'focus:border-orange-500 focus:ring-orange-500'}`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {!passwordMatch && confirmPassword.length > 0 && (
          <p className="text-red-500 text-sm mt-1">As senhas não coincidem</p>
        )}
      </div>

      <div className="mt-6">
        <Button
          type="submit"
          disabled={loading || !email || !password || !confirmPassword || !passwordMatch}
          className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? 'Criando conta...' : 'Criar Conta'}
        </Button>
      </div>

      {errors.general && (
        <div className="text-red-500 text-sm text-center mt-4">
          {errors.general}
        </div>
      )}
    </form>
  );
};

export default BasicSignupForm;
