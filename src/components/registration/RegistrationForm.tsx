
import React from 'react';
import { getStepTitle, ValidationErrors, FormData } from '../../utils/formValidation';
import RegistrationAlerts from './RegistrationAlerts';
import RegistrationStepRenderer from './RegistrationStepRenderer';
import NavigationButtons from './NavigationButtons';
import PromoCodeInput from '../PromoCodeInput';

interface RegistrationFormProps {
  currentStep: number;
  registrationType: 'supporter' | 'establishment' | 'group';
  formData: FormData;
  errors: ValidationErrors;
  loading: boolean;
  onInputChange: (field: string, value: any) => void;
  onSportToggle: (field: 'favoriteStateSports' | 'practicedSports' | 'interestedSports', sport: string) => void;
  onPromoValidation: (isValid: boolean, data?: any) => void;
  onPrevStep: () => void;
  onNextStep: () => void;
  onSubmit: () => Promise<void>;
  promoCode?: string;
}

const RegistrationForm = ({
  currentStep,
  registrationType,
  formData,
  errors,
  loading,
  onInputChange,
  onSportToggle,
  onPromoValidation,
  onPrevStep,
  onNextStep,
  onSubmit,
  promoCode
}: RegistrationFormProps) => {
  return (
    <>
      <RegistrationAlerts registrationType={registrationType} errors={errors} />

      <div className="mt-4 md:mt-6">
        <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
          {getStepTitle(currentStep, registrationType)}
        </h3>

        {currentStep === 1 && (
          <div className="mb-8">
            <PromoCodeInput
              value={formData.promoCode}
              onChange={(value) => onInputChange('promoCode', value)}
              onValidation={onPromoValidation}
              error={errors.promo}
              defaultCode={promoCode}
            />
          </div>
        )}

        <RegistrationStepRenderer
          currentStep={currentStep}
          registrationType={registrationType}
          formData={formData}
          onInputChange={onInputChange}
          onSportToggle={onSportToggle}
          errors={errors}
        />

        <NavigationButtons
          currentStep={currentStep}
          totalSteps={4}
          loading={loading}
          onPrevious={onPrevStep}
          onNext={onNextStep}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
};

export default RegistrationForm;
