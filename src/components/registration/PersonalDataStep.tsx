
import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { ValidationErrors } from '../../utils/formValidation';
import DateSelector from './DateSelector';
import LocationSelector from './LocationSelector';
import { formatCPF } from '../../utils/cpfValidation';

interface PersonalDataStepProps {
  formData: {
    fullName: string;
    cpf: string;
    phone: string;
    email: string;
    city: string;
    state: string;
    birthDate: string;
  };
  onInputChange: (field: string, value: any) => void;
  errors?: ValidationErrors;
}

const PersonalDataStep = ({ formData, onInputChange, errors = {} }: PersonalDataStepProps) => {
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
        <Label className="text-orange-600 font-medium">Estado e Cidade *</Label>
        <div className="mt-1">
          <LocationSelector
            stateValue={formData.state}
            cityValue={formData.city}
            onStateChange={(value) => onInputChange('state', value)}
            onCityChange={(value) => onInputChange('city', value)}
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
