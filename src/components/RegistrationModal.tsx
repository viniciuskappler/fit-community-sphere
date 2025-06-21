
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useNavigate } from 'react-router-dom';
import { useRegistration } from '@/hooks/useRegistration';
import RegistrationProgress from './registration/RegistrationProgress';
import RegistrationAlerts from './registration/RegistrationAlerts';
import RegistrationStepRenderer from './registration/RegistrationStepRenderer';
import NavigationButtons from './registration/NavigationButtons';
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
}

const RegistrationModal = ({ isOpen, onClose, initialType = 'supporter', referralCode }: RegistrationModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationType, setRegistrationType] = useState(initialType);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const { registerUser, loading } = useRegistration();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    // Personal Data
    fullName: '',
    cpf: '',
    phone: '',
    email: '',
    city: '',
    birthDate: '',
    
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
    state: '',
    cep: '',
    
    // Terms
    acceptTerms: true,
    acceptNewsletter: true
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (errors[field as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSportToggle = (field: 'favoriteStateSports' | 'practicedSports' | 'interestedSports', sport: string) => {
    setFormData(prev => {
      const currentSports = prev[field];
      const isSelected = currentSports.includes(sport);
      
      // Check limits
      if (!isSelected && currentSports.length >= 20) {
        return prev; // Don't add if already has 20
      }
      
      return {
        ...prev,
        [field]: isSelected 
          ? currentSports.filter(s => s !== sport)
          : [...currentSports, sport]
      };
    });
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
        password: formData.password
      },
      registrationType,
      referralCode
    );

    if (result.success) {
      onClose();
      
      // Redirect based on registration type
      if (registrationType === 'supporter') {
        navigate('/cadastro-realizado');
      } else if (registrationType === 'establishment') {
        navigate('/cadastro-finalizado-estabelecimento');
      } else if (registrationType === 'group') {
        navigate('/cadastro-finalizado-grupo');
      }
    } else {
      // Não mostrar erros em vermelho aqui - apenas log
      console.error('Erro no cadastro:', result.error);
      setErrors({ general: 'Ocorreu um erro durante o cadastro. Tente novamente.' });
    }
  };

  return (
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

        <RegistrationAlerts registrationType={registrationType} errors={errors} />

        <div className="mt-4 md:mt-6">
          <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
            {getStepTitle(currentStep, registrationType)}
          </h3>

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
  );
};

export default RegistrationModal;
