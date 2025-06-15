
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User, Building, Users, ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'supporter' | 'establishment' | 'group';
}

const RegistrationModal = ({ isOpen, onClose, initialType = 'supporter' }: RegistrationModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationType, setRegistrationType] = useState(initialType);
  const [formData, setFormData] = useState({
    // Dados Pessoais
    fullName: '',
    cpf: '',
    phone: '',
    email: '',
    city: '',
    birthDate: '',
    
    // Preferências Esportivas
    favoriteStateSports: [] as string[],
    practicedSports: [] as string[],
    interestedSports: [] as string[],
    
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

  const sportsList = [
    'Acrobacia', 'Acrobacias aéreas', 'Artes circenses', 'Breakdance', 'Cheerleading',
    'Futebol', 'Basquete', 'Vôlei', 'Tênis', 'Natação', 'Corrida', 'Ciclismo',
    'Musculação', 'Ginástica', 'Yoga', 'Pilates', 'Boxe', 'MMA', 'Jiu-Jitsu'
  ];

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
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log('Cadastro finalizado:', formData);
    onClose();
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Dados Pessoais';
      case 2: return 'Preferências Esportivas';
      case 3: return registrationType === 'supporter' ? 'Confirmação' : 
               registrationType === 'establishment' ? 'Dados do Estabelecimento' : 'Dados do Grupo';
      default: return '';
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
          <h3 className="text-xl font-semibold mb-6">{getStepTitle()}</h3>

          {/* Etapa 1: Dados Pessoais */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Nome completo *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Seu nome completo"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input
                    id="cpf"
                    value={formData.cpf}
                    onChange={(e) => handleInputChange('cpf', e.target.value)}
                    placeholder="000.000.000-00"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="city">Cidade *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Sua cidade"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="birthDate">Data de Nascimento</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Etapa 2: Preferências Esportivas */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <Label className="text-base font-semibold">Esportes que mais gosta (selecione até 5)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 max-h-40 overflow-y-auto border rounded-lg p-3">
                  {sportsList.map((sport) => (
                    <div key={sport} className="flex items-center space-x-2">
                      <Checkbox
                        id={`favorite-${sport}`}
                        checked={formData.favoriteStateSports.includes(sport)}
                        onCheckedChange={() => handleSportToggle('favoriteStateSports', sport)}
                        disabled={formData.favoriteStateSports.length >= 5 && !formData.favoriteStateSports.includes(sport)}
                      />
                      <Label htmlFor={`favorite-${sport}`} className="text-sm">{sport}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold">Esportes que já praticou</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 max-h-40 overflow-y-auto border rounded-lg p-3">
                  {sportsList.map((sport) => (
                    <div key={sport} className="flex items-center space-x-2">
                      <Checkbox
                        id={`practiced-${sport}`}
                        checked={formData.practicedSports.includes(sport)}
                        onCheckedChange={() => handleSportToggle('practicedSports', sport)}
                      />
                      <Label htmlFor={`practiced-${sport}`} className="text-sm">{sport}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold">Esportes que tem interesse</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 max-h-40 overflow-y-auto border rounded-lg p-3">
                  {sportsList.map((sport) => (
                    <div key={sport} className="flex items-center space-x-2">
                      <Checkbox
                        id={`interested-${sport}`}
                        checked={formData.interestedSports.includes(sport)}
                        onCheckedChange={() => handleSportToggle('interestedSports', sport)}
                      />
                      <Label htmlFor={`interested-${sport}`} className="text-sm">{sport}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Etapa 3: Dados específicos ou Confirmação */}
          {currentStep === 3 && (
            <div className="space-y-4">
              {registrationType === 'supporter' ? (
                // Confirmação para Esportista Apoiador
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Resumo do Cadastro</h4>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium">Nome:</span> {formData.fullName}
                    </div>
                    <div>
                      <span className="font-medium">CPF:</span> {formData.cpf}
                    </div>
                    <div>
                      <span className="font-medium">E-mail:</span> {formData.email}
                    </div>
                    <div>
                      <span className="font-medium">Cidade:</span> {formData.city}
                    </div>
                    
                    {formData.favoriteStateSports.length > 0 && (
                      <div>
                        <span className="font-medium">Esportes favoritos:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {formData.favoriteStateSports.map(sport => (
                            <span key={sport} className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                              {sport}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Dados do Estabelecimento/Grupo
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="businessName">
                      {registrationType === 'establishment' ? 'Nome do Estabelecimento' : 'Nome do Grupo'} *
                    </Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      placeholder={registrationType === 'establishment' ? 'Nome da sua academia, clube, etc.' : 'Nome do seu grupo esportivo'}
                    />
                  </div>

                  {registrationType === 'establishment' && (
                    <div>
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input
                        id="cnpj"
                        value={formData.cnpj}
                        onChange={(e) => handleInputChange('cnpj', e.target.value)}
                        placeholder="00.000.000/0000-00"
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder={`Descreva ${registrationType === 'establishment' ? 'seu estabelecimento' : 'seu grupo'} e as atividades oferecidas`}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Endereço Completo</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Rua, número, complemento"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="state">Estado</Label>
                      <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sp">São Paulo</SelectItem>
                          <SelectItem value="rj">Rio de Janeiro</SelectItem>
                          <SelectItem value="mg">Minas Gerais</SelectItem>
                          <SelectItem value="rs">Rio Grande do Sul</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="cep">CEP</Label>
                      <Input
                        id="cep"
                        value={formData.cep}
                        onChange={(e) => handleInputChange('cep', e.target.value)}
                        placeholder="00000-000"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Termos */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => handleInputChange('acceptTerms', checked)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    Concordo com os <span className="text-orange-500 underline cursor-pointer">termos de uso e política de privacidade</span> *
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={formData.acceptNewsletter}
                    onCheckedChange={(checked) => handleInputChange('acceptNewsletter', checked)}
                  />
                  <Label htmlFor="newsletter" className="text-sm">
                    Desejo receber newsletters e promoções
                  </Label>
                </div>
              </div>
            </div>
          )}

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
                disabled={!formData.acceptTerms}
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
