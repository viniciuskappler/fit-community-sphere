
import React from 'react';
import PersonalDataStep from './PersonalDataStep';
import SportsPreferencesStep from './SportsPreferencesStep';
import PasswordStep from './PasswordStep';
import FinalStep from './FinalStep';
import { FormData, ValidationErrors } from '../../utils/formValidation';
import { sportsList } from '../../utils/sportsData';

interface RegistrationStepRendererProps {
  currentStep: number;
  registrationType: 'supporter' | 'establishment' | 'group';
  formData: FormData;
  onInputChange: (field: string, value: any) => void;
  onSportToggle: (field: 'esportes_favoritos' | 'esportes_praticados' | 'esportes_interesse', sport: string) => void;
  errors: ValidationErrors;
  onSwitchToLogin?: () => void;
}

const RegistrationStepRenderer = ({
  currentStep,
  registrationType,
  formData,
  onInputChange,
  onSportToggle,
  errors,
  onSwitchToLogin
}: RegistrationStepRendererProps) => {
  switch (currentStep) {
    case 1:
      return (
        <PersonalDataStep 
          formData={{
            nome: formData.nome || '',
            cpf: formData.cpf || '',
            telefone: formData.telefone || '',
            email: formData.email || '',
            cidade: formData.cidade || '',
            estado: formData.estado || '',
            data_nascimento: `${formData.data_ano || ''}-${formData.data_mes?.padStart(2, '0') || ''}-${formData.data_dia?.padStart(2, '0') || ''}`,
            rua: formData.rua || '',
            numero: formData.numero || '',
            bairro: formData.bairro || '',
            cep: formData.cep || ''
          }}
          onInputChange={onInputChange}
          errors={errors}
          onSwitchToLogin={onSwitchToLogin}
        />
      );
    case 2:
      return (
        <SportsPreferencesStep 
          formData={{
            esportes_favoritos: formData.esportes_favoritos || [],
            esportes_praticados: formData.esportes_praticados || [],
            esportes_interesse: formData.esportes_interesse || []
          }}
          onSportToggle={onSportToggle}
          sportsList={sportsList}
          errors={errors}
        />
      );
    case 3:
      return (
        <PasswordStep 
          formData={{
            password: formData.senha || '',
            confirmPassword: formData.confirmar_senha || ''
          }}
          onInputChange={onInputChange}
          errors={errors}
        />
      );
    case 4:
      return (
        <FinalStep 
          registrationType={registrationType}
          formData={formData}
          onInputChange={onInputChange}
          errors={errors}
        />
      );
    default:
      return null;
  }
};

export default RegistrationStepRenderer;
