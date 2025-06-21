import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useNavigate } from 'react-router-dom';
import { useRegistration } from '@/hooks/useRegistration';
import { usePromoCode } from '@/hooks/usePromoCode';
import RegistrationProgress from './registration/RegistrationProgress';
import RegistrationAlerts from './registration/RegistrationAlerts';
import RegistrationStepRenderer from './registration/RegistrationStepRenderer';
import NavigationButtons from './registration/NavigationButtons';
import PromoCodeBanner from './PromoCodeBanner';
import PromoCodeInput from './PromoCodeInput';
import WaitlistModal from './WaitlistModal';
import { 
  FormData, 
  validateStep1, 
  validateStep2, 
  validateStep3,
  validateStep4, 
  getStepTitle,
  ValidationErrors 
} from '../utils/formValidation';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'supporter' | 'establishment' | 'group';
  referralCode?: string;
  promoCode?: string;
}

const RegistrationModal = ({ isOpen, onClose, initialType = 'supporter', referralCode, promoCode }: RegistrationModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationType, setRegistrationType] = useState(initialType);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [promoValidation, setPromoValidation] = useState<any>(null);
  const { registerUser, loading } = useRegistration();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    // Personal Data
    fullName: '',
    cpf: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    birthDate: '',
    street: '',
    number: '',
    neighborhood: '',
    cep: '',
    cityIbgeCode: '',
    
    // Sports Preferences
    favoriteStateSports: [],
    practicedSports: [],
    interestedSports: [],
    
    // Password
    password: '',
    confirmPassword: '',
    
    // Business/Group Data
    businessName: '',
    cnpj: '',
    description: '',
    address: '',
    
    // Terms
    acceptTerms: true,
    acceptNewsletter: true,
    promoCode: promoCode || ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSportToggle = (field: 'favoriteStateSports' | 'practicedSports' | 'interestedSports', sport: string) => {
    setFormData(prev => {
      const currentSports = prev[field];
      const isSelected = currentSports.includes(sport);
      
      if (!isSelected && currentSports.length >= 20) {
        return prev;
      }
      
      return {
        ...prev,
        [field]: isSelected 
          ? currentSports.filter(s => s !== sport)
          : [...currentSports, sport]
      };
    });
  };

  const handlePromoValidation = (isValid: boolean, data?: any) => {
    setPromoValidation(data);
    
    if (data && data.error_type === 'limit_exceeded') {
      setShowWaitlist(true);
      setErrors({ promo: data.error });
    } else if (data && !data.success) {
      setErrors({ promo: data.error });
    } else {
      setErrors(prev => ({ ...prev, promo: undefined }));
    }
  };

  const nextStep = () => {
    let stepErrors: ValidationErrors = {};
    
    if (currentStep === 1) {
      stepErrors = validateStep1(formData);
    } else if (currentStep === 2) {
      stepErrors = validateStep2(formData);
    } else if (currentStep === 3) {
      stepErrors = validateStep3(formData);
    }
    
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    
    setErrors({});
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleSubmit = async () => {
    const stepErrors = validateStep4(formData, registrationType);
    
    if (formData.promoCode && !promoValidation?.success) {
      stepErrors.promo = 'Código promocional inválido ou esgotado';
    }
    
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    
    setErrors({});
    
    const result = await registerUser(
      {
        fullName: formData.fullName,
        cpf: formData.cpf,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        birthDate: formData.birthDate,
        favoriteStateSports: formData.favoriteStateSports,
        practicedSports: formData.practicedSports,
        interestedSports: formData.interestedSports,
        password: formData.password,
        promoCode: formData.promoCode
      },
      registrationType,
      referralCode
    );

    if (result.success) {
      onClose();
      
      if (registrationType === 'supporter') {
        navigate('/cadastro-realizado');
      } else if (registrationType === 'establishment') {
        navigate('/cadastro-finalizado-estabelecimento');
      } else if (registrationType === 'group') {
        navigate('/cadastro-finalizado-grupo');
      }
    } else {
      console.error('Erro no cadastro:', result.error);
      setErrors({ general: 'Ocorreu um erro durante o cadastro. Tente novamente.' });
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl w-[95%] sm:w-full max-h-[90vh] overflow-y-auto bg-white rounded-xl mx-auto border-0 shadow-2xl fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-8">
              Cadastro de {registrationType === 'supporter' ? 'Praticante' : 
                          registrationType === 'establishment' ? 'Estabelecimento' : 
                          'Grupo Esportivo'}
            </DialogTitle>
            <RegistrationProgress currentStep={currentStep} totalSteps={4} />
          </DialogHeader>

          {/* Banner SQUAD 300 sempre visível */}
          <div className="mb-6">
            <div className="bg-gradient-to-r from-orange-600 to-red-500 text-white p-6 rounded-xl shadow-2xl border border-orange-400/30">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">🏆 SQUAD 300 - Desconto Vitalício!</h3>
                <p className="text-lg mb-3">
                  Garanta 50% de desconto para sempre nas primeiras 300 vagas.
                </p>
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <span className="text-lg font-bold">Cadastre-se agora e faça parte da revolução!</span>
                </div>
              </div>
            </div>
          </div>

          <RegistrationAlerts registrationType={registrationType} errors={errors} />

          <div className="mt-4 md:mt-6">
            <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              {getStepTitle(currentStep, registrationType)}
            </h3>

            {currentStep === 1 && (
              <div className="mb-8">
                <PromoCodeInput
                  value={formData.promoCode}
                  onChange={(value) => handleInputChange('promoCode', value)}
                  onValidation={handlePromoValidation}
                  error={errors.promo}
                  defaultCode={promoCode}
                />
              </div>
            )}

            <RegistrationStepRenderer
              currentStep={currentStep}
              registrationType={registrationType}
              formData={formData}
              onInputChange={handleInputChange}
              onSportToggle={handleSportToggle}
              errors={errors}
            />

            <NavigationButtons
              currentStep={currentStep}
              totalSteps={4}
              loading={loading}
              onPrevious={prevStep}
              onNext={nextStep}
              onSubmit={handleSubmit}
            />
          </div>
        </DialogContent>
      </Dialog>

      <WaitlistModal 
        isOpen={showWaitlist}
        onClose={() => setShowWaitlist(false)}
      />
    </>
  );
};

export default RegistrationModal;
