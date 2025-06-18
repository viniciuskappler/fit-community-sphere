
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
}

const RegistrationModal = ({ isOpen, onClose, initialType = 'supporter' }: RegistrationModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationType, setRegistrationType] = useState(initialType);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);
  const [showEstablishmentWarning, setShowEstablishmentWarning] = useState(false);
  const [showGroupWarning, setShowGroupWarning] = useState(false);
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
    
    // Senha
    password: '',
    confirmPassword: '',
    
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
      
      const newFormData = {
        ...prev,
        [field]: isSelected 
          ? currentSports.filter(s => s !== sport)
          : [...currentSports, sport]
      };

      // Se selecionando um esporte favorito, incluir automaticamente nos praticados
      if (field === 'favoriteStateSports' && !isSelected) {
        if (!newFormData.practicedSports.includes(sport)) {
          newFormData.practicedSports = [...newFormData.practicedSports, sport];
        }
      }
      
      return newFormData;
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
    console.log('🚀 Starting registration submission...');
    
    const stepErrors = validateStep4(formData, registrationType);
    
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    
    setLoading(true);
    setErrors({});
    
    try {
      // 1. Criar conta do usuário com a senha fornecida
      console.log('👤 Creating user account...');
      const { error: signUpError } = await signUp(formData.email, formData.password, {
        fullName: formData.fullName
      });
      
      if (signUpError) {
        console.error('❌ Signup failed:', signUpError);
        setErrors({ general: signUpError.message || 'Erro ao criar conta. Tente novamente.' });
        setLoading(false);
        return;
      }

      console.log('✅ User account created successfully');

      // 2. Aguardar um pouco para garantir que o usuário foi criado
      setTimeout(async () => {
        try {
          console.log('💾 Saving user profile...');
          
          // 3. Salvar dados do perfil
          const { error: profileError } = await saveUserProfile({
            full_name: formData.fullName,
            cpf: formData.cpf,
            phone: formData.phone,
            city: formData.city,
            birth_date: formData.birthDate
          });

          if (profileError) {
            console.error('❌ Error saving profile:', profileError);
          } else {
            console.log('✅ Profile saved successfully');
          }

          // 4. Salvar esportes
          const allSports = [
            ...formData.favoriteStateSports.map(sport => ({ sport_name: sport, sport_type: 'favorite' as const })),
            ...formData.practicedSports.map(sport => ({ sport_name: sport, sport_type: 'practiced' as const })),
            ...formData.interestedSports.map(sport => ({ sport_name: sport, sport_type: 'interested' as const }))
          ];

          if (allSports.length > 0) {
            console.log('🏃 Saving user sports...');
            const { error: sportsError } = await saveUserSports(allSports);
            if (sportsError) {
              console.error('❌ Error saving sports:', sportsError);
            } else {
              console.log('✅ Sports saved successfully');
            }
          }

          console.log('🎉 Registration completed successfully!');
          onClose();
          navigate('/cadastro-realizado');
        } catch (error) {
          console.error('💥 Error saving additional data:', error);
          setErrors({ general: 'Conta criada, mas houve erro ao salvar dados adicionais.' });
        } finally {
          setLoading(false);
        }
      }, 1000);
      
    } catch (error) {
      console.error('💥 Unexpected registration error:', error);
      setErrors({ general: 'Erro inesperado. Tente novamente.' });
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
          <DialogTitle className="text-2xl font-bold text-center mb-8">
            Cadastro de {registrationType === 'supporter' ? 'Praticante' : 
                        registrationType === 'establishment' ? 'Estabelecimento' : 
                        'Grupo Esportivo'}
          </DialogTitle>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-6">
            <div 
              className="bg-gradient-to-r from-red-600 to-orange-500 h-2 rounded-full transition-all duration-700 ease-out transform-gpu"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </DialogHeader>

        {/* Mensagem de aviso para Estabelecimento e Grupo Esportivo */}
        {(registrationType === 'establishment' || registrationType === 'group') && (
          <Alert className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-300 mt-4">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800 font-medium text-sm">
              Primeiro você precisa fazer o seu cadastro como Participante, depois você poderá cadastrar seu {registrationType === 'establishment' ? 'Estabelecimento' : 'Grupo Esportivo'} :)
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

            {currentStep < 4 ? (
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
                className="bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 flex items-center space-x-2"
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
