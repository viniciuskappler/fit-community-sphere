
import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

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
}

const PersonalDataStep = ({ formData, onInputChange }: PersonalDataStepProps) => {
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
        />
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
          />
        </div>
        <div>
          <Label htmlFor="phone" className="text-orange-600">Telefone *</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => onInputChange('phone', e.target.value)}
            placeholder="(00) 00000-0000"
            required
          />
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
          />
        </div>
        <div>
          <Label htmlFor="city" className="text-orange-600">Cidade *</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => onInputChange('city', e.target.value)}
            placeholder="Sua cidade"
            required
          />
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
        />
      </div>
    </div>
  );
};

export default PersonalDataStep;
