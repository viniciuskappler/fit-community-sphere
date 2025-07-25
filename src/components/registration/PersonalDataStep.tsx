import React, { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { ValidationErrors } from '../../utils/formValidation';
import DateSelector from './DateSelector';
import LocationSelector from './LocationSelector';
import { formatCPF } from '../../utils/cpfValidation';
import { useCepLookup } from '../../hooks/useCepLookup';
import { useEmailCheck } from '../../hooks/useEmailCheck';
import { Button } from '../ui/button';

interface PersonalDataStepProps {
  formData: {
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
    cidade: string;
    estado: string;
    data_nascimento: string;
    rua: string;
    numero: string;
    bairro: string;
    cep: string;
  };
  onInputChange: (field: string, value: any) => void;
  errors?: ValidationErrors;
  onSwitchToLogin?: () => void;
}

const PersonalDataStep = ({ formData, onInputChange, errors = {}, onSwitchToLogin }: PersonalDataStepProps) => {
  const { lookupCep, loading: cepLoading, error: cepError } = useCepLookup();
  const { checkEmailExists, checking } = useEmailCheck();
  const [emailExists, setEmailExists] = useState(false);

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 11) {
      onInputChange('cpf', formatCPF(value));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      let formattedPhone = value;
      if (value.length >= 10) {
        formattedPhone = value.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
      } else if (value.length >= 6) {
        formattedPhone = value.replace(/(\d{2})(\d{4})/, '($1) $2');
      } else if (value.length >= 2) {
        formattedPhone = value.replace(/(\d{2})/, '($1) ');
      }
      onInputChange('telefone', formattedPhone);
    }
  };

  const handleCEPChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 8) {
      const formattedCEP = value.replace(/(\d{5})(\d{3})/, '$1-$2');
      onInputChange('cep', formattedCEP);
      
      // Auto-lookup when CEP is complete
      if (value.length === 8) {
        const cepData = await lookupCep(value);
        if (cepData) {
          onInputChange('rua', cepData.street);
          onInputChange('bairro', cepData.district);
          onInputChange('cidade', cepData.city);
          onInputChange('estado', cepData.state);
        }
      }
    }
  };

  const handleCityChange = (cityName: string) => {
    onInputChange('cidade', cityName);
  };

  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    onInputChange('email', email);
    
    // Reset email exists state when email changes
    setEmailExists(false);
    
    // Check if email exists when user stops typing (debounce effect)
    if (email && email.includes('@')) {
      setTimeout(async () => {
        if (formData.email === email) { // Only check if email hasn't changed
          const exists = await checkEmailExists(email);
          setEmailExists(exists);
        }
      }, 1000);
    }
  };

  const handleLoginRedirect = () => {
    if (onSwitchToLogin) {
      onSwitchToLogin();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="nome" className="text-orange-600 font-medium">Nome completo *</Label>
        <Input
          id="nome"
          value={formData.nome || ''}
          onChange={(e) => onInputChange('nome', e.target.value)}
          placeholder="Seu nome completo"
          required
          className={`mt-1 ${errors.nome ? 'border-orange-500' : ''}`}
        />
        {errors.nome && (
          <p className="text-orange-500 text-sm mt-1">{errors.nome}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cpf" className="text-orange-600 font-medium">CPF *</Label>
          <Input
            id="cpf"
            value={formData.cpf}
            onChange={handleCPFChange}
            placeholder="000.000.000-00"
            required
            maxLength={14}
            className={`mt-1 ${errors.cpf ? 'border-orange-500' : ''}`}
          />
          {errors.cpf && (
            <p className="text-orange-500 text-sm mt-1">{errors.cpf}</p>
          )}
        </div>
        <div>
          <Label htmlFor="telefone" className="text-orange-600 font-medium">Telefone *</Label>
          <Input
            id="telefone"
            value={formData.telefone}
            onChange={handlePhoneChange}
            placeholder="(00) 00000-0000"
            required
            className={`mt-1 ${errors.telefone ? 'border-orange-500' : ''}`}
          />
          {errors.telefone && (
            <p className="text-orange-500 text-sm mt-1">{errors.telefone}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="email" className="text-orange-600 font-medium">E-mail *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleEmailChange}
          placeholder="seu@email.com"
          required
          className={`mt-1 ${errors.email ? 'border-orange-500' : ''} ${emailExists ? 'border-blue-500' : ''}`}
        />
        {checking && (
          <p className="text-blue-600 text-sm mt-1">Verificando e-mail...</p>
        )}
        {emailExists && (
          <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-blue-800 text-sm mb-2">
              Você já tem uma conta com este e-mail. Deseja fazer login?
            </p>
            <Button 
              type="button"
              onClick={handleLoginRedirect}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Ir para Login
            </Button>
          </div>
        )}
        {errors.email && (
          <p className="text-orange-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <Label className="text-orange-600 font-medium">Endereço Completo *</Label>
        <div className="mt-1 space-y-4">
          {/* CEP primeiro */}
          <div>
            <Input
              placeholder="CEP"
              value={formData.cep}
              onChange={handleCEPChange}
              maxLength={9}
              className={`${errors.cep ? 'border-orange-500' : ''} ${cepLoading ? 'bg-gray-100' : ''}`}
              disabled={cepLoading}
            />
            {cepLoading && (
              <p className="text-blue-600 text-xs mt-1">Buscando endereço...</p>
            )}
            {cepError && (
              <p className="text-red-500 text-xs mt-1">{cepError}</p>
            )}
            {errors.cep && (
              <p className="text-orange-500 text-sm mt-1">{errors.cep}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Rua/Avenida"
                value={formData.rua}
                onChange={(e) => onInputChange('rua', e.target.value)}
                className={errors.rua ? 'border-orange-500' : ''}
              />
              {errors.rua && (
                <p className="text-orange-500 text-sm mt-1">{errors.rua}</p>
              )}
            </div>
            <div>
              <Input
                placeholder="Número"
                value={formData.numero}
                onChange={(e) => onInputChange('numero', e.target.value)}
                className={errors.numero ? 'border-orange-500' : ''}
              />
              {errors.numero && (
                <p className="text-orange-500 text-sm mt-1">{errors.numero}</p>
              )}
            </div>
          </div>
          
          <div>
            <Input
              placeholder="Bairro"
              value={formData.bairro}
              onChange={(e) => onInputChange('bairro', e.target.value)}
              className={errors.bairro ? 'border-orange-500' : ''}
            />
            {errors.bairro && (
              <p className="text-orange-500 text-sm mt-1">{errors.bairro}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <Label className="text-orange-600 font-medium">Estado e Cidade *</Label>
        <div className="mt-1">
          <LocationSelector
            stateValue={formData.estado}
            cityValue={formData.cidade}
            onStateChange={(value) => onInputChange('estado', value)}
            onCityChange={handleCityChange}
            stateError={errors.estado}
            cityError={errors.cidade}
          />
        </div>
      </div>

      <div>
        <Label className="text-orange-600 font-medium">Data de Nascimento *</Label>
        <div className="mt-1">
          <DateSelector
            value={formData.data_nascimento}
            onChange={(value) => onInputChange('data_nascimento', value)}
            error={errors.data_nascimento}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDataStep;