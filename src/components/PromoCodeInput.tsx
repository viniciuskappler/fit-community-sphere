
import React, { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { usePromoCode } from '@/hooks/usePromoCode';
import { Gift } from 'lucide-react';

interface PromoCodeInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidation: (isValid: boolean, data?: any) => void;
  error?: string;
  defaultCode?: string;
}

const PromoCodeInput = ({ 
  value, 
  onChange, 
  onValidation, 
  error,
  defaultCode 
}: PromoCodeInputProps) => {
  const { validatePromoCode, loading } = usePromoCode();
  const [validationStatus, setValidationStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (defaultCode && !value) {
      onChange(defaultCode);
    }
  }, [defaultCode, value, onChange]);

  useEffect(() => {
    const validateCode = async () => {
      if (!value || value.length < 3) {
        setValidationStatus('idle');
        onValidation(false);
        return;
      }

      const result = await validatePromoCode(value);
      
      if (result.success) {
        setValidationStatus('success');
        onValidation(true, result);
      } else {
        setValidationStatus('error');
        onValidation(false, result);
      }
    };

    const debounceTimer = setTimeout(validateCode, 500);
    return () => clearTimeout(debounceTimer);
  }, [value, validatePromoCode, onValidation]);

  return (
    <div className="space-y-3">
      {/* Highlighted Header */}
      <div className="text-center p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl border-2 border-orange-300">
        <div className="flex items-center justify-center mb-2">
          <Gift className="text-orange-600 mr-2" size={24} />
          <h3 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Código Promocional
          </h3>
        </div>
        <p className="text-orange-700 text-sm font-medium">
          Insira seu código para garantir descontos especiais
        </p>
      </div>

      <div className="relative">
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          placeholder="Digite seu código promocional"
          className={`
            text-lg py-4 px-6 text-center font-semibold text-orange-800 placeholder-orange-400
            border-2 border-orange-300 rounded-xl bg-orange-50
            focus:border-orange-500 focus:ring-4 focus:ring-orange-200
            ${error ? 'border-red-500 bg-red-50' : ''}
            ${validationStatus === 'success' ? 'border-green-500 bg-green-50' : ''}
            ${loading ? 'opacity-70' : ''}
          `}
          disabled={loading}
        />
        
        {loading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin h-5 w-5 border-2 border-orange-300 border-t-orange-600 rounded-full"></div>
          </div>
        )}
        
        {validationStatus === 'success' && !loading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-600 text-xl">
            ✓
          </div>
        )}
        
        {validationStatus === 'error' && !loading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500 text-xl">
            ✗
          </div>
        )}
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-sm font-medium text-center">{error}</p>
        </div>
      )}
      
      {validationStatus === 'success' && !error && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-green-700 text-sm font-medium text-center">
            ✓ Código válido! Desconto de 50% aplicado
          </p>
        </div>
      )}
    </div>
  );
};

export default PromoCodeInput;
