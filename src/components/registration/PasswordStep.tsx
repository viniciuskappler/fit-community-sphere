
import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { ValidationErrors } from '../../utils/formValidation';

interface PasswordStepProps {
  formData: {
    password: string;
    confirmPassword: string;
  };
  onInputChange: (field: string, value: any) => void;
  errors?: ValidationErrors;
}

const PasswordStep = ({ formData, onInputChange, errors = {} }: PasswordStepProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">Crie sua senha</h4>
        <p className="text-sm text-gray-600">
          Escolha uma senha segura para proteger sua conta
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="password" className="text-orange-600">Senha *</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => onInputChange('password', e.target.value)}
              placeholder="Digite sua senha"
              required
              className={errors.password ? 'border-orange-500 pr-10' : 'pr-10'}
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
            <p className="text-orange-500 text-sm mt-1">{errors.password}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            A senha deve ter pelo menos 6 caracteres
          </p>
        </div>

        <div>
          <Label htmlFor="confirmPassword" className="text-orange-600">Confirmar Senha *</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => onInputChange('confirmPassword', e.target.value)}
              placeholder="Confirme sua senha"
              required
              className={errors.confirmPassword ? 'border-orange-500 pr-10' : 'pr-10'}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-orange-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordStep;
