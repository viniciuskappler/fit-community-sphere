
import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Eye, EyeOff, Check, X } from 'lucide-react';
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

  // Validações de senha em tempo real
  const hasMinLength = formData.password.length >= 8;
  const hasNumber = /\d/.test(formData.password);
  const isValidPassword = hasMinLength && hasNumber;

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
          <Label htmlFor="password" className="text-orange-600">Crie sua senha *</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => onInputChange('password', e.target.value)}
              placeholder="Crie sua senha"
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
          
          {/* Indicadores de validação */}
          <div className="mt-2 space-y-1">
            <div className="flex items-center space-x-2">
              {hasMinLength ? (
                <Check size={14} className="text-green-500" />
              ) : (
                <X size={14} className="text-red-500" />
              )}
              <span className={`text-xs ${hasMinLength ? 'text-green-600' : 'text-red-600'}`}>
                Pelo menos 8 caracteres
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {hasNumber ? (
                <Check size={14} className="text-green-500" />
              ) : (
                <X size={14} className="text-red-500" />
              )}
              <span className={`text-xs ${hasNumber ? 'text-green-600' : 'text-red-600'}`}>
                Pelo menos 1 número
              </span>
            </div>
          </div>
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
