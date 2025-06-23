
import React, { useEffect } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { ValidationErrors } from '../../utils/formValidation';
import DateSelector from './DateSelector';
import LocationSelector from './LocationSelector';
import { formatCPF } from '../../utils/cpfValidation';
import { useCepLookup } from '../../hooks/useCepLookup';

interface PersonalDataStepProps {
  formData: {
    fullName: string;
    cpf: string;
    phone: string;
    email: string;
    city: string;
    state: string;
    birthDate: string;
    street: string;
    number: string;
    neighborhood: string;
    cep: string;
    cityIbgeCode?: string;
  };
  onInputChange: (field: string, value: any) => void;
  errors?: ValidationErrors;
}

const PersonalDataStep = ({ formData, onInputChange, errors = {} }: PersonalDataStepProps) => {
  const { lookupCep, loading: cepLoading, error: cepError } = useCepLookup();

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
      onInputChange('phone', formattedPhone);
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
          onInputChange('street', cepData.street);
          onInputChange('neighborhood', cepData.district);
          onInputChange('city', cepData.city);
          onInputChange('state', cepData.state);
        }
      }
    }
  };

  const handleCityChange = (cityName: string, ibgeCode?: string) => {
    onInputChange('city', cityName);
    if (ibgeCode) {
      onInputChange('cityIbgeCode', ibgeCode);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="fullName" className="text-orange-600 font-medium">Nome completo *</Label>
        <Input
          id="fullName"
          value={formData.fullName}
          onChange={(e) => onInputChange('fullName', e.target.value)}
          placeholder="Seu nome completo"
          required
          className={`mt-1 ${errors.fullName ? 'border-orange-500' : ''}`}
        />
        {errors.fullName && (
          <p className="text-orange-500 text-sm mt-1">{errors.fullName}</p>
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
          <Label htmlFor="phone" className="text-orange-600 font-medium">Telefone *</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="(00) 00000-0000"
            required
            className={`mt-1 ${errors.phone ? 'border-orange-500' : ''}`}
          />
          {errors.phone && (
            <p className="text-orange-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="email" className="text-orange-600 font-medium">E-mail *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onInputChange('email', e.target.value)}
          placeholder="seu@email.com"
          required
          className={`mt-1 ${errors.email ? 'border-orange-500' : ''}`}
        />
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
                value={formData.street}
                onChange={(e) => onInputChange('street', e.target.value)}
                className={errors.street ? 'border-orange-500' : ''}
              />
              {errors.street && (
                <p className="text-orange-500 text-sm mt-1">{errors.street}</p>
              )}
            </div>
            <div>
              <Input
                placeholder="Número"
                value={formData.number}
                onChange={(e) => onInputChange('number', e.target.value)}
                className={errors.number ? 'border-orange-500' : ''}
              />
              {errors.number && (
                <p className="text-orange-500 text-sm mt-1">{errors.number}</p>
              )}
            </div>
          </div>
          
          <div>
            <Input
              placeholder="Bairro"
              value={formData.neighborhood}
              onChange={(e) => onInputChange('neighborhood', e.target.value)}
              className={errors.neighborhood ? 'border-orange-500' : ''}
            />
            {errors.neighborhood && (
              <p className="text-orange-500 text-sm mt-1">{errors.neighborhood}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <Label className="text-orange-600 font-medium">Estado e Cidade *</Label>
        <div className="mt-1">
          <LocationSelector
            stateValue={formData.state}
            cityValue={formData.city}
            onStateChange={(value) => onInputChange('state', value)}
            onCityChange={handleCityChange}
            stateError={errors.state}
            cityError={errors.city}
          />
        </div>
      </div>

      <div>
        <Label className="text-orange-600 font-medium">Data de Nascimento *</Label>
        <div className="mt-1">
          <DateSelector
            value={formData.birthDate}
            onChange={(value) => onInputChange('birthDate', value)}
            error={errors.birthDate}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDataStep;
