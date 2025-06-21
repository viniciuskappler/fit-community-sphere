
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
  onSportToggle: (field: 'favoriteStateSports' | 'practicedSports' | 'interestedSports', sport: string) => void;
  errors: ValidationErrors;
}

const RegistrationStepRenderer = ({
  currentStep,
  registrationType,
  formData,
  onInputChange,
  onSportToggle,
  errors
}: RegistrationStepRendererProps) => {
  switch (currentStep) {
    case 1:
      return (
        <PersonalDataStep 
          formData={formData}
          onInputChange={onInputChange}
          errors={errors}
        />
      );
    case 2:
      return (
        <SportsPreferencesStep 
          formData={formData}
          onSportToggle={onSportToggle}
          sportsList={sportsList}
          errors={errors}
        />
      );
    case 3:
      return (
        <PasswordStep 
          formData={formData}
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
