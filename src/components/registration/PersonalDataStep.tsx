
import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { ValidationErrors } from '../../utils/formValidation';

interface PersonalDataStepProps {
  formData: {
    fullName: string;
    cpf: string;
    phone: string;
    email: string;
    city: string;
    birthDate: string;
  };
  onInputChange: (field: string, value: any) => void;
  errors?: ValidationErrors;
}

const PersonalDataStep = ({ formData, onInputChange, errors = {} }: PersonalDataStepProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fullName" className="text-orange-600">Nome completo *</Label>
        <Input
          id="fullName"
          value={formData.fullName}
          onChange={(e) => onInputChange('fullName', e.target.value)}
          placeholder="Seu nome completo"
          required
          className={errors.fullName ? 'border-orange-500' : ''}
        />
        {errors.fullName && (
          <p className="text-orange-500 text-sm mt-1">{errors.fullName}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cpf" className="text-orange-600">CPF *</Label>
          <Input
            id="cpf"
            value={formData.cpf}
            onChange={(e) => onInputChange('cpf', e.target.value)}
            placeholder="000.000.000-00"
            required
            className={errors.cpf ? 'border-orange-500' : ''}
          />
          {errors.cpf && (
            <p className="text-orange-500 text-sm mt-1">{errors.cpf}</p>
          )}
        </div>
        <div>
          <Label htmlFor="phone" className="text-orange-600">Telefone *</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => onInputChange('phone', e.target.value)}
            placeholder="(00) 00000-0000"
            required
            className={errors.phone ? 'border-orange-500' : ''}
          />
          {errors.phone && (
            <p className="text-orange-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email" className="text-orange-600">E-mail *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            placeholder="seu@email.com"
            required
            className={errors.email ? 'border-orange-500' : ''}
          />
          {errors.email && (
            <p className="text-orange-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <Label htmlFor="city" className="text-orange-600">Cidade *</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => onInputChange('city', e.target.value)}
            placeholder="Sua cidade"
            required
            className={errors.city ? 'border-orange-500' : ''}
          />
          {errors.city && (
            <p className="text-orange-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="birthDate" className="text-orange-600">Data de Nascimento *</Label>
        <Input
          id="birthDate"
          type="date"
          value={formData.birthDate}
          onChange={(e) => onInputChange('birthDate', e.target.value)}
          required
          className={errors.birthDate ? 'border-orange-500' : ''}
        />
        {errors.birthDate && (
          <p className="text-orange-500 text-sm mt-1">{errors.birthDate}</p>
        )}
      </div>
    </div>
  );
};

export default PersonalDataStep;
