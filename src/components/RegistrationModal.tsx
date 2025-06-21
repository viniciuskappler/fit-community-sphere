
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight, Check, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { useNavigate } from 'react-router-dom';
import { useRegistration } from '@/hooks/useRegistration';
import PersonalDataStep from './registration/PersonalDataStep';
import SportsPreferencesStep from './registration/SportsPreferencesStep';
import PasswordStep from './registration/PasswordStep';
import FinalStep from './registration/FinalStep';
import { sportsList } from '../utils/sportsData';
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
  const [showEstablishmentWarning, setShowEstablishmentWarning] = useState(false);
  const [showGroupWarning, setShowGroupWarning] = useState(false);
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

  const handleRegistrationTypeChange = (type: 'supporter' | 'establishment' | 'group') => {
    if (type === 'establishment') {
      setShowEstablishmentWarning(true);
      setShowGroupWarning(false);
    } else if (type === 'group') {
      setShowGroupWarning(true);
      setShowEstablishmentWarning(false);
    } else {
      setShowEstablishmentWarning(false);
      setShowGroupWarning(false);
    }
    setRegistrationType(type);
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDataStep 
            formData={formData}
            onInputChange={handleInputChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <SportsPreferencesStep 
            formData={formData}
            onSportToggle={handleSportToggle}
            sportsList={sportsList}
            errors={errors}
          />
        );
      case 3:
        return (
          <PasswordStep 
            formData={formData}
            onInputChange={handleInputChange}
            errors={errors}
          />
        );
      case 4:
        return (
          <FinalStep 
            registrationType={registrationType}
            formData={formData}
            onInputChange={handleInputChange}
            errors={errors}
          />
        );
      default:
        return null;
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
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4 md:mt-6">
            <div 
              className="bg-gradient-to-r from-red-600 to-orange-500 h-2 rounded-full transition-all duration-700 ease-out transform-gpu"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </DialogHeader>

        {/* Warning message for Establishment and Sports Group */}
        {(registrationType === 'establishment' || registrationType === 'group') && (
          <Alert className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-300 mt-4">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800 font-medium text-sm">
              Primeiro você precisa fazer o seu cadastro como Participante, depois você poderá cadastrar seu {registrationType === 'establishment' ? 'Estabelecimento' : 'Grupo Esportivo'} :)
            </AlertDescription>
          </Alert>
        )}

        {errors.general && (
          <Alert className="bg-blue-50 border border-blue-200 mt-4">
            <AlertTriangle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800 font-medium">
              {errors.general}
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-4 md:mt-6">
          <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
            {getStepTitle(currentStep, registrationType)}
          </h3>

          {renderStepContent()}

          {/* Navigation buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 md:mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1 || loading}
              className="flex items-center justify-center space-x-2 order-2 sm:order-1 border-gray-300 hover:border-orange-400 hover:text-orange-600"
            >
              <ArrowLeft size={16} />
              <span>Voltar</span>
            </Button>

            {currentStep < 4 ? (
              <Button
                onClick={nextStep}
                disabled={loading}
                className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 flex items-center justify-center space-x-2 order-1 sm:order-2"
              >
                <span>Próximo</span>
                <ArrowRight size={16} />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 flex items-center justify-center space-x-2 order-1 sm:order-2"
              >
                <Check size={16} />
                <span>{loading ? 'Finalizando...' : 'Finalizar Cadastro'}</span>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationModal;
