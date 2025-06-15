
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight, Check, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { useUserData } from '@/hooks/useUserData';
import { useNavigate } from 'react-router-dom';
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
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const { saveUserProfile, saveUserSports } = useUserData();
  const navigate = useNavigate();

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

  const handleSubmit = async () => {
    const stepErrors = validateStep3(formData, registrationType);
    
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    
    setLoading(true);
    
    try {
      // 1. Criar conta do usuário
      const { error: signUpError } = await signUp(formData.email, 'temporaryPassword123!', {
        fullName: formData.fullName
      });
      
      if (signUpError) {
        setErrors({ general: 'Erro ao criar conta. Tente novamente.' });
        setLoading(false);
        return;
      }

      // 2. Salvar dados do perfil
      const { error: profileError } = await saveUserProfile({
        full_name: formData.fullName,
        cpf: formData.cpf,
        phone: formData.phone,
        city: formData.city,
        birth_date: formData.birthDate
      });

      if (profileError) {
        console.error('Erro ao salvar perfil:', profileError);
      }

      // 3. Salvar esportes
      const allSports = [
        ...formData.favoriteStateSports.map(sport => ({ sport_name: sport, sport_type: 'favorite' as const })),
        ...formData.practicedSports.map(sport => ({ sport_name: sport, sport_type: 'practiced' as const })),
        ...formData.interestedSports.map(sport => ({ sport_name: sport, sport_type: 'interested' as const }))
      ];

      if (allSports.length > 0) {
        const { error: sportsError } = await saveUserSports(allSports);
        if (sportsError) {
          console.error('Erro ao salvar esportes:', sportsError);
        }
      }

      console.log('Cadastro finalizado com sucesso!');
      onClose();
      navigate('/cadastro-realizado');
      
    } catch (error) {
      console.error('Erro no cadastro:', error);
      setErrors({ general: 'Erro inesperado. Tente novamente.' });
    } finally {
      setLoading(false);
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
          <DialogTitle className="text-2xl font-bold text-center mb-8">
            Cadastro de {registrationType === 'supporter' ? 'Praticante' : 
                        registrationType === 'establishment' ? 'Estabelecimento' : 
                        'Grupo Esportivo'}
          </DialogTitle>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-6">
            <div 
              className="bg-gradient-to-r from-red-600 to-orange-500 h-2 rounded-full transition-all duration-700 ease-out transform-gpu"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </DialogHeader>

        {/* Aviso para Estabelecimento e Grupo Esportivo */}
        {(registrationType === 'establishment' || registrationType === 'group') && (
          <Alert className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-300 mt-4">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800 font-medium">
              Primeiro você criará seu cadastro de usuário no Núcleo do Esporte. Após finalizar, você poderá cadastrar seu {registrationType === 'establishment' ? 'estabelecimento' : 'grupo esportivo'}.
            </AlertDescription>
          </Alert>
        )}

        {errors.general && (
          <Alert className="bg-red-50 border border-red-200 mt-4">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 font-medium">
              {errors.general}
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
              disabled={currentStep === 1 || loading}
              className="flex items-center space-x-2"
            >
              <ArrowLeft size={16} />
              <span>Voltar</span>
            </Button>

            {currentStep < 3 ? (
              <Button
                onClick={nextStep}
                disabled={loading}
                className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 flex items-center space-x-2"
              >
                <span>Próximo</span>
                <ArrowRight size={16} />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 flex items-center space-x-2"
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
