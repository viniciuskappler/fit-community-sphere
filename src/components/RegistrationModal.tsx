
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User, Building, Users, ArrowLeft, ArrowRight, Check, Search } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'supporter' | 'establishment' | 'group';
}

const RegistrationModal = ({ isOpen, onClose, initialType = 'supporter' }: RegistrationModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationType, setRegistrationType] = useState(initialType);
  const [searchTerm, setSearchTerm] = useState('');
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
    'Atletismo',
    'Badminton',
    'Basquete',
    'Beach Tennis',
    'Boxe',
    'Calistenia',
    'Canoagem',
    'Capoeira',
    'Ciclismo',
    'Corrida de Rua',
    'Crossfit',
    'Dança (Zumba, FitDance, etc.)',
    'Escalada',
    'Esgrima',
    'Futebol',
    'Futebol Americano',
    'Futevôlei',
    'Futsal',
    'Ginástica Artística',
    'Ginástica Rítmica',
    'Golf',
    'Handebol',
    'Jiu-Jitsu',
    'Judô',
    'Karatê',
    'MMA',
    'Mountain Bike',
    'Muay Thai',
    'Musculação',
    'Nado Sincronizado',
    'Natação',
    'Padel',
    'Peteca',
    'Pilates',
    'Polo Aquático',
    'Remo',
    'Rugby',
    'Skate',
    'Slackline',
    'Stand Up Paddle (SUP)',
    'Surfe',
    'Taekwondo',
    'Tênis',
    'Tênis de Mesa',
    'Tiro com Arco',
    'Ultimate Frisbee',
    'Vôlei',
    'Vôlei de Praia',
    'Xadrez',
    'Yoga'
  ].sort();

  const filteredSports = sportsList.filter(sport =>
    sport.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  // Validação dos campos obrigatórios
  const isStep1Valid = () => {
    return formData.fullName.trim() !== '' &&
           formData.cpf.trim() !== '' &&
           formData.phone.trim() !== '' &&
           formData.email.trim() !== '' &&
           formData.city.trim() !== '' &&
           formData.birthDate.trim() !== '';
  };

  const isStep2Valid = () => {
    return formData.favoriteStateSports.length === 5;
  };

  const isStep3Valid = () => {
    if (registrationType === 'supporter') {
      return formData.acceptTerms;
    } else {
      return formData.businessName.trim() !== '' &&
             formData.description.trim() !== '' &&
             formData.address.trim() !== '' &&
             formData.state.trim() !== '' &&
             formData.cep.trim() !== '' &&
             formData.acceptTerms;
    }
  };

  const nextStep = () => {
    if (currentStep === 1 && !isStep1Valid()) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    if (currentStep === 2 && !isStep2Valid()) {
      alert('Por favor, selecione exatamente 5 modalidades que você mais gosta.');
      return;
    }
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    if (!isStep3Valid()) {
      alert('Por favor, preencha todos os campos obrigatórios e aceite os termos.');
      return;
    }
    console.log('Cadastro finalizado:', formData);
    onClose();
  };

  const formatDateForDisplay = (dateValue: string) => {
    if (!dateValue) return '';
    const [year, month, day] = dateValue.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (value: string) => {
    // Converter de DD/MM/YYYY para YYYY-MM-DD para o input type="date"
    handleInputChange('birthDate', value);
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
          <h3 className="text-xl font-semibold mb-6 text-orange-500">{getStepTitle()}</h3>

          {/* Etapa 1: Dados Pessoais */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName" className="text-orange-600">Nome completo *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Seu nome completo"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cpf" className="text-orange-600">CPF *</Label>
                  <Input
                    id="cpf"
                    value={formData.cpf}
                    onChange={(e) => handleInputChange('cpf', e.target.value)}
                    placeholder="000.000.000-00"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-orange-600">Telefone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-orange-600">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="city" className="text-orange-600">Cidade *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Sua cidade"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="birthDate" className="text-orange-600">Data de Nascimento *</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {/* Etapa 2: Preferências Esportivas */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <Label className="text-base font-semibold text-orange-600">
                  Esportes que mais gosta (selecione exatamente 5) *
                </Label>
                <p className="text-sm text-gray-600 mb-3">
                  Selecionados: {formData.favoriteStateSports.length}/5
                </p>
                
                {/* Barra de pesquisa */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar modalidade esportiva..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-40 overflow-y-auto border rounded-lg p-3">
                  {filteredSports.map((sport) => (
                    <div key={sport} className="flex items-center space-x-2">
                      <Checkbox
                        id={`favorite-${sport}`}
                        checked={formData.favoriteStateSports.includes(sport)}
                        onCheckedChange={() => handleSportToggle('favoriteStateSports', sport)}
                        disabled={formData.favoriteStateSports.length >= 5 && !formData.favoriteStateSports.includes(sport)}
                      />
                      <Label 
                        htmlFor={`favorite-${sport}`} 
                        className={`text-sm cursor-pointer ${
                          formData.favoriteStateSports.includes(sport) ? 'text-orange-500 font-medium' : ''
                        }`}
                      >
                        {sport}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold">Esportes que já praticou</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 max-h-40 overflow-y-auto border rounded-lg p-3">
                  {filteredSports.map((sport) => (
                    <div key={sport} className="flex items-center space-x-2">
                      <Checkbox
                        id={`practiced-${sport}`}
                        checked={formData.practicedSports.includes(sport)}
                        onCheckedChange={() => handleSportToggle('practicedSports', sport)}
                      />
                      <Label 
                        htmlFor={`practiced-${sport}`} 
                        className={`text-sm cursor-pointer ${
                          formData.practicedSports.includes(sport) ? 'text-orange-500 font-medium' : ''
                        }`}
                      >
                        {sport}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold">Esportes que tem interesse</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 max-h-40 overflow-y-auto border rounded-lg p-3">
                  {filteredSports.map((sport) => (
                    <div key={sport} className="flex items-center space-x-2">
                      <Checkbox
                        id={`interested-${sport}`}
                        checked={formData.interestedSports.includes(sport)}
                        onCheckedChange={() => handleSportToggle('interestedSports', sport)}
                      />
                      <Label 
                        htmlFor={`interested-${sport}`} 
                        className={`text-sm cursor-pointer ${
                          formData.interestedSports.includes(sport) ? 'text-orange-500 font-medium' : ''
                        }`}
                      >
                        {sport}
                      </Label>
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
                    <div>
                      <span className="font-medium">Data de Nascimento:</span> {formatDateForDisplay(formData.birthDate)}
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

                    {formData.practicedSports.length > 0 && (
                      <div>
                        <span className="font-medium">Esportes praticados:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {formData.practicedSports.map(sport => (
                            <span key={sport} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {sport}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.interestedSports.length > 0 && (
                      <div>
                        <span className="font-medium">Esportes de interesse:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {formData.interestedSports.map(sport => (
                            <span key={sport} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
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
                    <Label htmlFor="businessName" className="text-orange-600">
                      {registrationType === 'establishment' ? 'Nome do Estabelecimento' : 'Nome do Grupo'} *
                    </Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      placeholder={registrationType === 'establishment' ? 'Nome da sua academia, clube, etc.' : 'Nome do seu grupo esportivo'}
                      required
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
                    <Label htmlFor="description" className="text-orange-600">Descrição *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder={`Descreva ${registrationType === 'establishment' ? 'seu estabelecimento' : 'seu grupo'} e as atividades oferecidas`}
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-orange-600">Endereço Completo *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Rua, número, complemento"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="state" className="text-orange-600">Estado *</Label>
                      <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)} required>
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
                      <Label htmlFor="cep" className="text-orange-600">CEP *</Label>
                      <Input
                        id="cep"
                        value={formData.cep}
                        onChange={(e) => handleInputChange('cep', e.target.value)}
                        placeholder="00000-000"
                        required
                      />
                    </div>
                  </div>

                  {/* Mostrar as modalidades selecionadas também para estabelecimentos/grupos */}
                  <div className="bg-gray-50 rounded-lg p-4 mt-4">
                    <h5 className="font-semibold text-gray-900 mb-3">Modalidades Selecionadas</h5>
                    
                    {formData.favoriteStateSports.length > 0 && (
                      <div className="mb-3">
                        <span className="font-medium text-sm">Modalidades favoritas:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {formData.favoriteStateSports.map(sport => (
                            <span key={sport} className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                              {sport}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.practicedSports.length > 0 && (
                      <div className="mb-3">
                        <span className="font-medium text-sm">Modalidades praticadas:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {formData.practicedSports.map(sport => (
                            <span key={sport} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {sport}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.interestedSports.length > 0 && (
                      <div>
                        <span className="font-medium text-sm">Modalidades de interesse:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {formData.interestedSports.map(sport => (
                            <span key={sport} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                              {sport}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
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
                    required
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
                disabled={!isStep3Valid()}
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
