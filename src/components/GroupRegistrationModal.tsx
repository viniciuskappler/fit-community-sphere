
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { sportsList } from '../utils/sportsData';

interface GroupRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GroupFormData {
  groupName: string;
  corporateName: string;
  cities: string[];
  phone: string;
  email: string;
  mainSports: string[];
  otherSports: string[];
}

const GroupRegistrationModal = ({ isOpen, onClose }: GroupRegistrationModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<GroupFormData>({
    groupName: '',
    corporateName: '',
    cities: [],
    phone: '',
    email: '',
    mainSports: [],
    otherSports: []
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cityInput, setCityInput] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCityAdd = () => {
    if (cityInput.trim() && formData.cities.length < 5 && !formData.cities.includes(cityInput.trim())) {
      setFormData(prev => ({
        ...prev,
        cities: [...prev.cities, cityInput.trim()]
      }));
      setCityInput('');
    }
  };

  const handleCityRemove = (city: string) => {
    setFormData(prev => ({
      ...prev,
      cities: prev.cities.filter(c => c !== city)
    }));
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
    
    if (!formData.groupName.trim()) newErrors.groupName = 'Campo obrigatório';
    if (!formData.corporateName.trim()) newErrors.corporateName = 'Campo obrigatório';
    if (formData.cities.length === 0) newErrors.cities = 'Adicione pelo menos 1 cidade';
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
      console.log('Cadastro de grupo esportivo finalizado:', formData);
      window.location.href = '/cadastro-finalizado-grupo';
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Cadastro de Grupo Esportivo
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
            {currentStep === 1 ? 'Dados do Grupo Esportivo' : 'Modalidades Esportivas'}
          </h3>

          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="groupName">Nome do Grupo Esportivo *</Label>
                  <Input
                    id="groupName"
                    value={formData.groupName}
                    onChange={(e) => handleInputChange('groupName', e.target.value)}
                    className={errors.groupName ? 'border-red-500' : ''}
                  />
                  {errors.groupName && <p className="text-red-500 text-sm mt-1">{errors.groupName}</p>}
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
              </div>

              <div>
                <Label htmlFor="cities">Cidades de atuação * (máximo 5)</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="cities"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    placeholder="Digite uma cidade e pressione Enter"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleCityAdd();
                      }
                    }}
                    className={errors.cities ? 'border-red-500' : ''}
                  />
                  <Button 
                    type="button" 
                    onClick={handleCityAdd}
                    disabled={formData.cities.length >= 5 || !cityInput.trim()}
                  >
                    Adicionar
                  </Button>
                </div>
                {errors.cities && <p className="text-red-500 text-sm mt-1">{errors.cities}</p>}
                
                {formData.cities.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.cities.map((city, index) => (
                      <span
                        key={index}
                        className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {city}
                        <button
                          type="button"
                          onClick={() => handleCityRemove(city)}
                          className="text-orange-600 hover:text-orange-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  Cidades selecionadas: {formData.cities.length}/5
                </p>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-4">Principais esportes que o seu grupo pratica *</h4>
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
                <h4 className="text-lg font-semibold mb-4">Demais esportes que o seu grupo pratica</h4>
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

export default GroupRegistrationModal;
