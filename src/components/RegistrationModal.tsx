import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight, Check, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import PersonalDataStep from './registration/PersonalDataStep';
import SportsPreferencesStep from './registration/SportsPreferencesStep';
import FinalStep from './registration/FinalStep';
import { sportsList } from '../utils/sportsData';
import { 
  FormData, 
  validateStep1, 
  validateStep2, 
  validateStep3, 
  getStepTitle,
  ValidationErrors 
} from '../utils/formValidation';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'supporter' | 'establishment' | 'group';
}

const RegistrationModal = ({ isOpen, onClose, initialType = 'supporter' }: RegistrationModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationType, setRegistrationType] = useState(initialType);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [formData, setFormData] = useState<FormData>({
    // Dados Pessoais
    fullName: '',
    cpf: '',
    phone: '',
    email: '',
    city: '',
    birthDate: '',
    
    // Preferências Esportivas
    favoriteStateSports: [],
    practicedSports: [],
    interestedSports: [],
    
    // Dados do Estabelecimento/Grupo
    businessName: '',
    cnpj: '',
    description: '',
    address: '',
    state: '',
    cep: '',
    
    // Termos
    acceptTerms: false,
    acceptNewsletter: false
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSportToggle = (field: 'favoriteStateSports' | 'practicedSports' | 'interestedSports', sport: string) => {
    setFormData(prev => {
      const currentSports = prev[field];
      const isSelected = currentSports.includes(sport);
      
      // Verificar limites
      if (!isSelected && currentSports.length >= 20) {
        return prev; // Não adiciona se já tem 20
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
    }
    
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    
    setErrors({});
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleSubmit = () => {
    const stepErrors = validateStep3(formData, registrationType);
    
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    
    console.log('Cadastro finalizado:', formData);
    onClose();
    
    // Redirecionar para página de agradecimento
    window.location.href = '/cadastro-realizado';
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Cadastro de {registrationType === 'supporter' ? 'Praticante' : 
                        registrationType === 'establishment' ? 'Estabelecimento' : 
                        'Grupo Esportivo'}
          </DialogTitle>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-6">
            <div 
              className="bg-gradient-to-r from-red-600 to-orange-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </DialogHeader>

        {/* Aviso para Estabelecimento e Grupo Esportivo */}
        {(registrationType === 'establishment' || registrationType === 'group') && (
          <Alert className="bg-orange-50 border-orange-200 mt-4">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              Primeiro você criará seu cadastro de usuário no Núcleo do Esporte. Após finalizar, você poderá cadastrar seu {registrationType === 'establishment' ? 'estabelecimento' : 'grupo esportivo'}.
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-6 text-orange-500">
            {getStepTitle(currentStep, registrationType)}
          </h3>

          {renderStepContent()}

          {/* Botões de navegação */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2"
            >
              <ArrowLeft size={16} />
              <span>Voltar</span>
            </Button>

            {currentStep < 3 ? (
              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 flex items-center space-x-2"
              >
                <span>Próximo</span>
                <ArrowRight size={16} />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 flex items-center space-x-2"
              >
                <Check size={16} />
                <span>Finalizar Cadastro</span>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationModal;
