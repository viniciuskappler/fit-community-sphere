
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRegistration } from '@/hooks/useRegistration';
import WaitlistModal from './WaitlistModal';
import RegistrationHeader from './registration/RegistrationHeader';
import SquadBanner from './registration/SquadBanner';
import GoogleSignupSection from './registration/GoogleSignupSection';
import RegistrationForm from './registration/RegistrationForm';
import { 
  FormData, 
  validateStep1, 
  validateStep2, 
  validateStep3,
  validateStep4,
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
  const [googleLoading, setGoogleLoading] = useState(false);
  const { registerUser, loading } = useRegistration();
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Scroll to top function
  const scrollToTop = () => {
    const dialogContent = document.querySelector('[role="dialog"]') as HTMLElement;
    if (dialogContent) {
      dialogContent.scrollTop = 0;
    }
  };

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
      scrollToTop();
      return;
    }
    
    setErrors({});
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      scrollToTop();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
      scrollToTop();
    }
  };

  const handleSubmit = async () => {
    console.log('🎯 Starting form submission...');
    const stepErrors = validateStep4(formData, registrationType);
    
    if (formData.promoCode && !promoValidation?.success) {
      stepErrors.promo = 'Código promocional inválido ou esgotado';
    }
    
    if (Object.keys(stepErrors).length > 0) {
      console.log('❌ Validation errors found:', stepErrors);
      setErrors(stepErrors);
      return;
    }
    
    setErrors({});
    
    console.log('📝 Submitting registration data:', {
      email: formData.email,
      fullName: formData.fullName,
      registrationType,
      sportsCount: {
        favorite: formData.favoriteStateSports.length,
        practiced: formData.practicedSports.length,
        interested: formData.interestedSports.length
      }
    });
    
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
      console.log('✅ Registration successful, closing modal and navigating');
      onClose();
      
      if (registrationType === 'supporter') {
        navigate('/cadastro-realizado');
      } else if (registrationType === 'establishment') {
        navigate('/cadastro-finalizado-estabelecimento');
      } else if (registrationType === 'group') {
        navigate('/cadastro-finalizado-grupo');
      }
    } else {
      console.error('❌ Registration failed:', result.error);
      setErrors({ general: result.error || 'Ocorreu um erro durante o cadastro. Tente novamente.' });
    }
  };

  const handleGoogleSignup = async () => {
    console.log('🔍 Starting Google signup...');
    setGoogleLoading(true);
    setErrors({});
    
    try {
      const { error } = await signInWithGoogle();
      
      if (error) {
        console.error('❌ Google signup error:', error);
        setErrors({ general: 'Erro ao cadastrar com Google. Tente novamente.' });
      } else {
        console.log('✅ Google signup successful, closing modal');
        onClose();
        // No redirect to /hub since it's disabled - stay on current page
      }
    } catch (error: any) {
      console.error('💥 Google signup exception:', error);
      setErrors({ general: 'Erro inesperado ao cadastrar com Google' });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl w-[95%] sm:w-full max-h-[90vh] overflow-y-auto bg-white rounded-xl mx-auto border-0 shadow-2xl fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <RegistrationHeader 
            registrationType={registrationType}
            currentStep={currentStep}
            totalSteps={4}
          />

          <SquadBanner currentStep={currentStep} showOnStep={1} />

          <GoogleSignupSection
            currentStep={currentStep}
            onGoogleSignup={handleGoogleSignup}
            googleLoading={googleLoading}
            errors={errors}
          />

          <RegistrationForm
            currentStep={currentStep}
            registrationType={registrationType}
            formData={formData}
            errors={errors}
            loading={loading || googleLoading}
            onInputChange={handleInputChange}
            onSportToggle={handleSportToggle}
            onPromoValidation={handlePromoValidation}
            onPrevStep={prevStep}
            onNextStep={nextStep}
            onSubmit={handleSubmit}
            promoCode={promoCode}
            promoValidation={promoValidation}
          />
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
