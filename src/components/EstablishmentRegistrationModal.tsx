
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, ArrowRight, Check, AlertTriangle } from 'lucide-react';
import { sportsList } from '../utils/sportsData';

interface EstablishmentRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EstablishmentFormData {
  establishmentName: string;
  corporateName: string;
  cnpj: string;
  address: string;
  city: string;
  state: string;
  cep: string;
  phone: string;
  email: string;
  mainSports: string[];
  otherSports: string[];
}

const EstablishmentRegistrationModal = ({ isOpen, onClose }: EstablishmentRegistrationModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<EstablishmentFormData>({
    establishmentName: '',
    corporateName: '',
    cnpj: '',
    address: '',
    city: '',
    state: '',
    cep: '',
    phone: '',
    email: '',
    mainSports: [],
    otherSports: []
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateCNPJ = (cnpj: string) => {
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    if (cleanCNPJ.length !== 14) return false;
    
    // Validação básica de CNPJ
    if (/^(\d)\1+$/.test(cleanCNPJ)) return false;
    
    let sum = 0;
    let weight = 5;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cleanCNPJ[i]) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }
    let digit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (parseInt(cleanCNPJ[12]) !== digit) return false;
    
    sum = 0;
    weight = 6;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cleanCNPJ[i]) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }
    digit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return parseInt(cleanCNPJ[13]) === digit;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSportToggle = (field: 'mainSports' | 'otherSports', sport: string) => {
    setFormData(prev => {
      const currentSports = prev[field];
      const isSelected = currentSports.includes(sport);
      const maxLimit = field === 'mainSports' ? 5 : 20;
      
      if (!isSelected && currentSports.length >= maxLimit) {
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

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.establishmentName.trim()) newErrors.establishmentName = 'Campo obrigatório';
    if (!formData.corporateName.trim()) newErrors.corporateName = 'Campo obrigatório';
    if (!formData.cnpj.trim()) {
      newErrors.cnpj = 'Campo obrigatório';
    } else if (!validateCNPJ(formData.cnpj)) {
      newErrors.cnpj = 'CNPJ inválido';
    }
    if (!formData.address.trim()) newErrors.address = 'Campo obrigatório';
    if (!formData.city.trim()) newErrors.city = 'Campo obrigatório';
    if (!formData.state.trim()) newErrors.state = 'Campo obrigatório';
    if (!formData.cep.trim()) newErrors.cep = 'Campo obrigatório';
    if (!formData.phone.trim()) newErrors.phone = 'Campo obrigatório';
    if (!formData.email.trim()) {
      newErrors.email = 'Campo obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.mainSports.length === 0) {
      newErrors.mainSports = 'Selecione pelo menos 1 esporte principal';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      // Finalizar cadastro
      console.log('Cadastro de estabelecimento finalizado:', formData);
      window.location.href = '/cadastro-finalizado-estabelecimento';
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const formatCNPJ = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    return cleanValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  };

  const formatCEP = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    return cleanValue.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Cadastro de Estabelecimento
          </DialogTitle>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-8">
            <div 
              className="bg-gradient-to-r from-red-600 to-orange-500 h-2 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${(currentStep / 2) * 100}%` }}
            />
          </div>
        </DialogHeader>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-6 text-orange-500">
            {currentStep === 1 ? 'Dados do Estabelecimento' : 'Modalidades Esportivas'}
          </h3>

          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="establishmentName">Nome do Estabelecimento *</Label>
                  <Input
                    id="establishmentName"
                    value={formData.establishmentName}
                    onChange={(e) => handleInputChange('establishmentName', e.target.value)}
                    className={errors.establishmentName ? 'border-red-500' : ''}
                  />
                  {errors.establishmentName && <p className="text-red-500 text-sm mt-1">{errors.establishmentName}</p>}
                </div>

                <div>
                  <Label htmlFor="corporateName">Razão Social *</Label>
                  <Input
                    id="corporateName"
                    value={formData.corporateName}
                    onChange={(e) => handleInputChange('corporateName', e.target.value)}
                    className={errors.corporateName ? 'border-red-500' : ''}
                  />
                  {errors.corporateName && <p className="text-red-500 text-sm mt-1">{errors.corporateName}</p>}
                </div>

                <div>
                  <Label htmlFor="cnpj">CNPJ *</Label>
                  <Input
                    id="cnpj"
                    value={formatCNPJ(formData.cnpj)}
                    onChange={(e) => handleInputChange('cnpj', e.target.value)}
                    placeholder="00.000.000/0000-00"
                    maxLength={18}
                    className={errors.cnpj ? 'border-red-500' : ''}
                  />
                  {errors.cnpj && <p className="text-red-500 text-sm mt-1">{errors.cnpj}</p>}
                </div>

                <div>
                  <Label htmlFor="phone">Telefone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(00) 00000-0000"
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="address">Endereço *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={errors.address ? 'border-red-500' : ''}
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>

                <div>
                  <Label htmlFor="city">Cidade *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Digite sua cidade"
                    className={errors.city ? 'border-red-500' : ''}
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>

                <div>
                  <Label htmlFor="state">UF *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="Ex: SP"
                    maxLength={2}
                    className={errors.state ? 'border-red-500' : ''}
                  />
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                </div>

                <div>
                  <Label htmlFor="cep">CEP *</Label>
                  <Input
                    id="cep"
                    value={formatCEP(formData.cep)}
                    onChange={(e) => handleInputChange('cep', e.target.value)}
                    placeholder="00000-000"
                    maxLength={9}
                    className={errors.cep ? 'border-red-500' : ''}
                  />
                  {errors.cep && <p className="text-red-500 text-sm mt-1">{errors.cep}</p>}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-4">Principais esportes que o seu estabelecimento oferece *</h4>
                <p className="text-sm text-gray-600 mb-4">Selecione até 5 modalidades principais</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
                  {sportsList.map((sport) => (
                    <button
                      key={sport}
                      type="button"
                      onClick={() => handleSportToggle('mainSports', sport)}
                      className={`p-3 text-sm rounded-lg border transition-all ${
                        formData.mainSports.includes(sport)
                          ? 'bg-orange-500 text-white border-orange-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-orange-300'
                      }`}
                    >
                      {sport}
                    </button>
                  ))}
                </div>
                {errors.mainSports && <p className="text-red-500 text-sm">{errors.mainSports}</p>}
                <p className="text-sm text-gray-500 mt-2">
                  Selecionados: {formData.mainSports.length}/5
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Demais esportes que o seu estabelecimento oferece</h4>
                <p className="text-sm text-gray-600 mb-4">Selecione até 20 modalidades adicionais</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {sportsList.map((sport) => (
                    <button
                      key={sport}
                      type="button"
                      onClick={() => handleSportToggle('otherSports', sport)}
                      className={`p-3 text-sm rounded-lg border transition-all ${
                        formData.otherSports.includes(sport)
                          ? 'bg-orange-500 text-white border-orange-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-orange-300'
                      }`}
                    >
                      {sport}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Selecionados: {formData.otherSports.length}/20
                </p>
              </div>
            </div>
          )}

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

            <Button
              onClick={nextStep}
              className={currentStep === 2 
                ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 flex items-center space-x-2"
                : "bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 flex items-center space-x-2"
              }
            >
              {currentStep === 2 ? <Check size={16} /> : <ArrowRight size={16} />}
              <span>{currentStep === 2 ? 'Finalizar Cadastro' : 'Próximo'}</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EstablishmentRegistrationModal;
