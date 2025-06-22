
import React, { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { usePromoCode } from '@/hooks/usePromoCode';
import { Gift, Check, X } from 'lucide-react';

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
  const [hasValidated, setHasValidated] = useState(false);

  useEffect(() => {
    if (defaultCode && !value) {
      onChange(defaultCode);
    }
  }, [defaultCode, value, onChange]);

  const handleApplyCode = async () => {
    if (!value || value.length < 3) {
      setValidationStatus('error');
      onValidation(false, { error: 'Código deve ter pelo menos 3 caracteres' });
      return;
    }

    setHasValidated(true);
    const result = await validatePromoCode(value);
    
    if (result.success) {
      setValidationStatus('success');
      onValidation(true, result);
    } else {
      setValidationStatus('error');
      onValidation(false, result);
    }
  };

  // Auto-validar quando o código padrão é carregado
  useEffect(() => {
    if (defaultCode && value === defaultCode && !hasValidated) {
      handleApplyCode();
    }
  }, [defaultCode, value, hasValidated]);

  return (
    <div className="space-y-3">
      {/* Header mais compacto */}
      <div className="text-center p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg border-2 border-orange-300">
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

      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value.toUpperCase())}
            placeholder="Digite seu código promocional"
            className={`
              text-sm py-2 px-3 font-semibold text-orange-800 placeholder-orange-400
              border-2 border-orange-300 rounded-md bg-orange-50
              focus:border-orange-500 focus:ring-2 focus:ring-orange-200
              ${error ? 'border-red-500 bg-red-50' : ''}
              ${validationStatus === 'success' ? 'border-green-500 bg-green-50' : ''}
              ${loading ? 'opacity-70' : ''}
            `}
            disabled={loading}
          />
          
          {validationStatus === 'success' && !loading && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-600">
              <Check size={16} />
            </div>
          )}
          
          {validationStatus === 'error' && !loading && hasValidated && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500">
              <X size={16} />
            </div>
          )}
        </div>
        
        <Button
          onClick={handleApplyCode}
          disabled={loading || !value || value.length < 3}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-4 py-2 rounded-md border-0 shadow-md transition-all duration-200"
          size="sm"
        >
          {loading ? (
            <div className="animate-spin h-3 w-3 border border-white border-t-transparent rounded-full"></div>
          ) : (
            'Aplicar'
          )}
        </Button>
      </div>
      
      {error && hasValidated && (
        <div className="bg-red-50 border border-red-200 rounded-md p-2">
          <p className="text-red-600 text-xs font-medium text-center">{error}</p>
        </div>
      )}
      
      {validationStatus === 'success' && !error && hasValidated && (
        <div className="bg-green-50 border border-green-200 rounded-md p-3">
          <p className="text-green-700 text-xs font-medium text-center">
            ✓ Código SQUAD300 válido! Desconto de 50% aplicado para sempre
          </p>
        </div>
      )}
    </div>
  );
};

export default PromoCodeInput;
