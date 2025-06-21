
import React, { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { usePromoCode } from '@/hooks/usePromoCode';

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
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Código Promocional
      </label>
      <div className="relative">
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          placeholder="Digite seu código"
          className={`
            ${error ? 'border-red-500' : ''}
            ${validationStatus === 'success' ? 'border-green-500' : ''}
            ${loading ? 'opacity-50' : ''}
          `}
          disabled={loading}
        />
        
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-orange-500 rounded-full"></div>
          </div>
        )}
        
        {validationStatus === 'success' && !loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
            ✓
          </div>
        )}
        
        {validationStatus === 'error' && !loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
            ✗
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      
      {validationStatus === 'success' && !error && (
        <p className="text-green-600 text-sm">
          ✓ Código válido! Desconto de 50% aplicado
        </p>
      )}
    </div>
  );
};

export default PromoCodeInput;
