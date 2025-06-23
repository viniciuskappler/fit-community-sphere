
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
  promoValidation?: any;
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
  promoCode,
  promoValidation
}: RegistrationFormProps) => {
  return (
    <>
      <RegistrationAlerts registrationType={registrationType} errors={errors} />

      <div className="mt-4 md:mt-6">
        <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
          {getStepTitle(currentStep, registrationType)}
        </h3>

        {/* Mostrar código promocional apenas na primeira etapa, ANTES do Google signup */}
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

        {/* Mostrar confirmação do código promocional na última etapa */}
        {currentStep === 4 && formData.promoCode && promoValidation?.success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Código promocional {formData.promoCode} aplicado com sucesso!
                </p>
                <p className="text-sm text-green-700">
                  Você garantiu 50% de desconto vitalício.
                </p>
              </div>
            </div>
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
