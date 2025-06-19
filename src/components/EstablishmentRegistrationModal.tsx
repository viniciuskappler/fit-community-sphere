
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { ArrowLeft, Check, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface EstablishmentRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EstablishmentRegistrationModal = ({ isOpen, onClose }: EstablishmentRegistrationModalProps) => {
  const [formData, setFormData] = useState({
    establishmentName: '',
    slug: '',
    corporateName: '',
    cnpj: '',
    description: '',
    address: '',
    city: '',
    state: '',
    cep: '',
    phone: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    if (field === 'establishmentName') {
      // Auto-generate slug from establishment name
      const slug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, [field]: value, slug }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    if (error) setError('');
  };

  const handleSubmit = async () => {
    if (!user) {
      setError('Você precisa estar logado para cadastrar um estabelecimento');
      return;
    }

    // Validação básica
    if (!formData.establishmentName || !formData.corporateName || !formData.email || !formData.phone || !formData.slug) {
      setError('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);
    
    try {
      // Aqui você implementaria a lógica de salvamento no Supabase
      console.log('Salvando estabelecimento:', formData);
      
      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onClose();
      navigate('/cadastro-finalizado-estabelecimento');
    } catch (err) {
      setError('Erro ao cadastrar estabelecimento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95%] sm:w-full max-h-[90vh] overflow-y-auto bg-white rounded-xl mx-auto border-0 shadow-2xl">
        <DialogHeader className="bg-white sticky top-0 z-10 pb-4">
          <DialogTitle className="text-lg md:text-2xl font-bold text-center mb-4 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            Cadastro de Estabelecimento
          </DialogTitle>
        </DialogHeader>

        {error && (
          <Alert className="bg-red-50 border border-red-200 mx-4">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 font-medium text-sm">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4 bg-white p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="establishmentName" className="text-sm font-medium text-gray-700">Nome do Estabelecimento *</Label>
              <Input
                id="establishmentName"
                value={formData.establishmentName}
                onChange={(e) => handleInputChange('establishmentName', e.target.value)}
                className="mt-1 text-sm"
                placeholder="Ex: Academia Fitness Pro"
              />
            </div>
            <div>
              <Label htmlFor="slug" className="text-sm font-medium text-gray-700">URL do Estabelecimento *</Label>
              <div className="mt-1 flex">
                <span className="inline-flex items-center px-3 text-xs text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                  /estabelecimento/
                </span>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  className="rounded-l-none text-sm"
                  placeholder="academia-fitness-pro"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="corporateName" className="text-sm font-medium text-gray-700">Razão Social *</Label>
              <Input
                id="corporateName"
                value={formData.corporateName}
                onChange={(e) => handleInputChange('corporateName', e.target.value)}
                className="mt-1 text-sm"
                placeholder="Ex: Fitness Pro Ltda"
              />
            </div>
            <div>
              <Label htmlFor="cnpj" className="text-sm font-medium text-gray-700">CNPJ</Label>
              <Input
                id="cnpj"
                value={formData.cnpj}
                onChange={(e) => handleInputChange('cnpj', e.target.value)}
                className="mt-1 text-sm"
                placeholder="00.000.000/0000-00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Telefone *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="mt-1 text-sm"
                placeholder="(11) 99999-9999"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">E-mail *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="mt-1 text-sm"
                placeholder="contato@estabelecimento.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="mt-1 h-20 text-sm"
              placeholder="Descreva seu estabelecimento e os serviços oferecidos..."
            />
          </div>

          <div>
            <Label htmlFor="address" className="text-sm font-medium text-gray-700">Endereço Completo</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="mt-1 text-sm"
              placeholder="Rua, número, bairro"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city" className="text-sm font-medium text-gray-700">Cidade</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="mt-1 text-sm"
                placeholder="São Paulo"
              />
            </div>
            <div>
              <Label htmlFor="state" className="text-sm font-medium text-gray-700">Estado</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="mt-1 text-sm"
                placeholder="SP"
              />
            </div>
            <div>
              <Label htmlFor="cep" className="text-sm font-medium text-gray-700">CEP</Label>
              <Input
                id="cep"
                value={formData.cep}
                onChange={(e) => handleInputChange('cep', e.target.value)}
                className="mt-1 text-sm"
                placeholder="00000-000"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-4 mt-6 bg-white px-4 pb-4 sticky bottom-0">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="flex items-center space-x-2 border-gray-300 hover:bg-gray-50"
          >
            <ArrowLeft size={16} />
            <span className="text-xs md:text-sm">Cancelar</span>
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white flex items-center space-x-2"
          >
            <Check size={16} />
            <span className="text-xs md:text-sm">{loading ? 'Cadastrando...' : 'Finalizar Cadastro'}</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EstablishmentRegistrationModal;
