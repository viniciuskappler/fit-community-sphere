
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import PersonalDataStep from './registration/PersonalDataStep';
import SportsPreferencesStep from './registration/SportsPreferencesStep';
import FinalStep from './registration/FinalStep';
import { sportsList } from '../utils/sportsData';
import { FormData, isStep1Valid, isStep2Valid, isStep3Valid, getStepTitle } from '../utils/formValidation';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'supporter' | 'establishment' | 'group';
}

const RegistrationModal = ({ isOpen, onClose, initialType = 'supporter' }: RegistrationModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationType, setRegistrationType] = useState(initialType);
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
  };

  const handleSportToggle = (field: 'favoriteStateSports' | 'practicedSports' | 'interestedSports', sport: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(sport) 
        ? prev[field].filter(s => s !== sport)
        : [...prev[field], sport]
    }));
  };

  const nextStep = () => {
    if (currentStep === 1 && !isStep1Valid(formData)) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    if (currentStep === 2 && !isStep2Valid(formData)) {
      alert('Por favor, selecione exatamente 5 modalidades que você mais gosta.');
      return;
    }
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    if (!isStep3Valid(formData, registrationType)) {
      alert('Por favor, preencha todos os campos obrigatórios e aceite os termos.');
      return;
    }
    console.log('Cadastro finalizado:', formData);
    onClose();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDataStep 
            formData={formData}
            onInputChange={handleInputChange}
          />
        );
      case 2:
        return (
          <SportsPreferencesStep 
            formData={formData}
            onSportToggle={handleSportToggle}
            sportsList={sportsList}
          />
        );
      case 3:
        return (
          <FinalStep 
            registrationType={registrationType}
            formData={formData}
            onInputChange={handleInputChange}
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
            Cadastro de {registrationType === 'supporter' ? 'Esportista Apoiador' : 
                        registrationType === 'establishment' ? 'Estabelecimento Parceiro' : 
                        'Grupo de Esporte Parceiro'}
          </DialogTitle>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div 
              className="bg-gradient-to-r from-red-600 to-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </DialogHeader>

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
                disabled={!isStep3Valid(formData, registrationType)}
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
