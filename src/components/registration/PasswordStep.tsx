
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
  const passwordMatch = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0;

  // Calcular progresso da senha (0-100%)
  const getPasswordProgress = () => {
    let progress = 0;
    if (hasMinLength) progress += 50;
    if (hasNumber) progress += 50;
    return progress;
  };

  const progressPercentage = getPasswordProgress();

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
          <Label htmlFor="password" className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent font-medium">
            Crie sua senha *
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => onInputChange('password', e.target.value)}
              placeholder="Crie sua senha"
              required
              className={errors.password ? 'border-red-500 pr-10' : 'pr-10 focus:border-orange-500 focus:ring-orange-500'}
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
          
          {/* Indicador circular de progresso da senha */}
          <div className="flex items-center space-x-4 mt-3">
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-200"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className={progressPercentage === 100 ? "text-green-500" : "text-orange-500"}
                  strokeDasharray={`${progressPercentage}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-xs font-medium ${progressPercentage === 100 ? 'text-green-600' : 'text-orange-600'}`}>
                  {progressPercentage}%
                </span>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  {hasMinLength ? (
                    <Check size={14} className="text-green-500" />
                  ) : (
                    <X size={14} className="text-gray-400" />
                  )}
                  <span className={`text-xs ${hasMinLength ? 'text-green-600' : 'text-gray-500'}`}>
                    Pelo menos 8 caracteres
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {hasNumber ? (
                    <Check size={14} className="text-green-500" />
                  ) : (
                    <X size={14} className="text-gray-400" />
                  )}
                  <span className={`text-xs ${hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                    Pelo menos 1 número
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="confirmPassword" className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent font-medium">
            Confirmar Senha *
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => onInputChange('confirmPassword', e.target.value)}
              placeholder="Confirme sua senha"
              required
              className={errors.confirmPassword ? 'border-red-500 pr-10' : 'pr-10 focus:border-orange-500 focus:ring-orange-500'}
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
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
          {formData.confirmPassword.length > 0 && (
            <div className="flex items-center space-x-2 mt-2">
              {passwordMatch ? (
                <Check size={14} className="text-green-500" />
              ) : (
                <X size={14} className="text-red-500" />
              )}
              <span className={`text-xs ${passwordMatch ? 'text-green-600' : 'text-red-600'}`}>
                {passwordMatch ? 'Senhas coincidem' : 'Senhas não coincidem'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordStep;
