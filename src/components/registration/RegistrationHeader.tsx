
import React from 'react';
import { DialogHeader, DialogTitle } from '../ui/dialog';
import RegistrationProgress from './RegistrationProgress';

interface RegistrationHeaderProps {
  registrationType: 'supporter' | 'establishment' | 'group';
  currentStep: number;
  totalSteps: number;
}

const RegistrationHeader = ({ registrationType, currentStep, totalSteps }: RegistrationHeaderProps) => {
  const getRegistrationTitle = () => {
    switch (registrationType) {
      case 'supporter':
        return 'Praticante';
      case 'establishment':
        return 'Estabelecimento';
      case 'group':
        return 'Grupo Esportivo';
      default:
        return 'Praticante';
    }
  };

  return (
    <DialogHeader>
      <DialogTitle className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-8">
        Cadastro de {getRegistrationTitle()}
      </DialogTitle>
      <RegistrationProgress currentStep={currentStep} totalSteps={totalSteps} />
    </DialogHeader>
  );
};

export default RegistrationHeader;
