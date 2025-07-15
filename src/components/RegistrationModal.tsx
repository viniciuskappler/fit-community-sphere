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
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    cidade: '',
    estado: '',
    data_dia: '',
    data_mes: '',
    data_ano: '',
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    
    // Sports Preferences
    esportes_favoritos: [],
    esportes_praticados: [],
    esportes_interesse: [],
    
    // Password
    senha: '',
    confirmar_senha: '',
    
    // Business/Group Data (mantido para compatibilidade)
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
    console.log(`🔄 Field ${field} changed to:`, value, 'Type:', typeof value);
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSportToggle = (field: 'esportes_favoritos' | 'esportes_praticados' | 'esportes_interesse', sport: string) => {
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
      console.log('❌ Step validation errors:', stepErrors);
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
    console.log('🎯 =========================');
    console.log('🎯 STARTING FORM SUBMISSION');
    console.log('🎯 =========================');
    console.log('💾 Current form data:', JSON.stringify(formData, null, 2));
    console.log('📝 Registration type:', registrationType);
    console.log('🔍 acceptTerms value:', formData.acceptTerms, 'Type:', typeof formData.acceptTerms);
    console.log('🔍 acceptNewsletter value:', formData.acceptNewsletter, 'Type:', typeof formData.acceptNewsletter);
    
    // Debug: Verificar especificamente os termos
    console.log('🔍 TERMS DEBUG:');
    console.log('  - acceptTerms:', formData.acceptTerms);
    console.log('  - acceptTerms === true:', formData.acceptTerms === true);
    console.log('  - acceptTerms !== true:', formData.acceptTerms !== true);
    
    const stepErrors = validateStep4(formData, registrationType);
    console.log('🔍 Step4 validation errors:', stepErrors);
    
    if (formData.promoCode && !promoValidation?.success) {
      stepErrors.promo = 'Código promocional inválido ou esgotado';
    }
    
    if (Object.keys(stepErrors).length > 0) {
      console.log('❌ Final validation errors found:', stepErrors);
      setErrors(stepErrors);
      scrollToTop();
      return;
    }
    
    console.log('✅ All validations passed, proceeding with registration');
    setErrors({});
    
    // Montar data de nascimento combinando dia, mês e ano
    const data_nascimento = `${formData.data_ano}-${formData.data_mes.padStart(2, '0')}-${formData.data_dia.padStart(2, '0')}`;
    
    console.log('📝 Submitting registration data:', {
      email: formData.email,
      nome: formData.nome,
      registrationType,
      data_nascimento,
      sportsCount: {
        favorite: formData.esportes_favoritos.length,
        practiced: formData.esportes_praticados.length,
        interested: formData.esportes_interesse.length
      },
      acceptTerms: formData.acceptTerms,
      acceptNewsletter: formData.acceptNewsletter
    });
    
    console.log('🚀 Calling registerUser function...');
    const result = await registerUser(
      {
        nome: formData.nome,
        cpf: formData.cpf,
        telefone: formData.telefone,
        email: formData.email,
        cidade: formData.cidade,
        estado: formData.estado,
        cep: formData.cep,
        rua: formData.rua,
        numero: formData.numero,
        bairro: formData.bairro,
        data_nascimento,
        esportes_favoritos: formData.esportes_favoritos,
        esportes_praticados: formData.esportes_praticados,
        esportes_interesse: formData.esportes_interesse,
        senha: formData.senha,
        promoCode: formData.promoCode
      },
      registrationType,
      referralCode
    );

    console.log('📊 Registration result:', result);

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
      
      // Check if it's a Google auth required error
      if (result.requiresGoogleAuth) {
        setErrors({ 
          general: result.error || 'Cadastro por email temporariamente indisponível. Use o Google.',
          googleRequired: 'Para continuar, use a opção "Cadastrar com Google" no início do formulário.'
        });
      } else {
        setErrors({ general: result.error || 'Ocorreu um erro durante o cadastro. Tente novamente.' });
      }
      scrollToTop();
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

  // Debug: Log sempre que o formData.acceptTerms mudar
  useEffect(() => {
    console.log('📋 acceptTerms changed:', formData.acceptTerms, 'Type:', typeof formData.acceptTerms);
  }, [formData.acceptTerms]);

  // Debug: Log loading e error states
  useEffect(() => {
    console.log('⏳ Loading state:', loading || googleLoading);
    console.log('❌ Current errors:', errors);
  }, [loading, googleLoading, errors]);

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
