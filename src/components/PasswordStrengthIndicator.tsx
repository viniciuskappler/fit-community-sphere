
import React from 'react';
import { Check, X } from 'lucide-react';
import { PasswordValidation, getPasswordStrengthColor, getPasswordStrengthText } from '@/utils/passwordValidation';

interface PasswordStrengthIndicatorProps {
  validation: PasswordValidation;
  showRequirements?: boolean;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ 
  validation, 
  showRequirements = true 
}) => {
  const { score, requirements, messages } = validation;
  const strengthColor = getPasswordStrengthColor(score);
  const strengthText = getPasswordStrengthText(score);

  return (
    <div className="mt-2 space-y-2">
      {/* Progress Bar */}
      <div className="flex items-center space-x-3">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              score < 50 ? 'bg-red-500' :
              score < 75 ? 'bg-orange-500' :
              score < 100 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${score}%` }}
          />
        </div>
        <span className={`text-sm font-medium ${strengthColor}`}>
          {strengthText}
        </span>
      </div>

      {/* Requirements List */}
      {showRequirements && (
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            {requirements.minLength ? (
              <Check size={14} className="text-green-500" />
            ) : (
              <X size={14} className="text-gray-400" />
            )}
            <span className={`text-xs ${requirements.minLength ? 'text-green-600' : 'text-gray-500'}`}>
              Pelo menos 8 caracteres
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {requirements.hasNumber ? (
              <Check size={14} className="text-green-500" />
            ) : (
              <X size={14} className="text-gray-400" />
            )}
            <span className={`text-xs ${requirements.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
              Pelo menos 1 número
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {requirements.hasUppercase ? (
              <Check size={14} className="text-green-500" />
            ) : (
              <X size={14} className="text-gray-400" />
            )}
            <span className={`text-xs ${requirements.hasUppercase ? 'text-green-600' : 'text-gray-500'}`}>
              Pelo menos 1 letra maiúscula
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {requirements.hasSpecialChar ? (
              <Check size={14} className="text-green-500" />
            ) : (
              <X size={14} className="text-gray-400" />
            )}
            <span className={`text-xs ${requirements.hasSpecialChar ? 'text-green-600' : 'text-gray-500'}`}>
              Pelo menos 1 caractere especial
            </span>
          </div>
        </div>
      )}

      {/* Error Messages */}
      {messages.length > 0 && (
        <div className="text-xs text-red-500">
          {messages.map((message, index) => (
            <div key={index}>• {message}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;
