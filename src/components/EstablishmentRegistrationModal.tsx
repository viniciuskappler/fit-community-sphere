
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { ArrowLeft, ArrowRight, Check, AlertTriangle } from 'lucide-react';
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
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleSubmit = async () => {
    if (!user) {
      setError('Você precisa estar logado para cadastrar um estabelecimento');
      return;
    }

    // Validação básica
    if (!formData.establishmentName || !formData.corporateName || !formData.email || !formData.phone) {
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
        <DialogHeader className="bg-white">
          <DialogTitle className="text-lg md:text-2xl font-bold text-center mb-4 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            Cadastro de Estabelecimento
          </DialogTitle>
        </DialogHeader>

        {error && (
          <Alert className="bg-red-50 border border-red-200">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 font-medium text-sm">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4 bg-white p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="establishmentName" className="text-sm font-medium">Nome do Estabelecimento *</Label>
              <Input
                id="establishmentName"
                value={formData.establishmentName}
                onChange={(e) => handleInputChange('establishmentName', e.target.value)}
                className="mt-1"
                placeholder="Ex: Academia Fitness Pro"
              />
            </div>
            <div>
              <Label htmlFor="corporateName" className="text-sm font-medium">Razão Social *</Label>
              <Input
                id="corporateName"
                value={formData.corporateName}
                onChange={(e) => handleInputChange('corporateName', e.target.value)}
                className="mt-1"
                placeholder="Ex: Fitness Pro Ltda"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cnpj" className="text-sm font-medium">CNPJ</Label>
              <Input
                id="cnpj"
                value={formData.cnpj}
                onChange={(e) => handleInputChange('cnpj', e.target.value)}
                className="mt-1"
                placeholder="00.000.000/0000-00"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm font-medium">Telefone *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="mt-1"
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium">E-mail *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="mt-1"
              placeholder="contato@estabelecimento.com"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="mt-1 h-20"
              placeholder="Descreva seu estabelecimento e os serviços oferecidos..."
            />
          </div>

          <div>
            <Label htmlFor="address" className="text-sm font-medium">Endereço Completo</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="mt-1"
              placeholder="Rua, número, bairro"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city" className="text-sm font-medium">Cidade</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="mt-1"
                placeholder="São Paulo"
              />
            </div>
            <div>
              <Label htmlFor="state" className="text-sm font-medium">Estado</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="mt-1"
                placeholder="SP"
              />
            </div>
            <div>
              <Label htmlFor="cep" className="text-sm font-medium">CEP</Label>
              <Input
                id="cep"
                value={formData.cep}
                onChange={(e) => handleInputChange('cep', e.target.value)}
                className="mt-1"
                placeholder="00000-000"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-4 mt-6 bg-white px-4 pb-4">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="flex items-center space-x-2"
          >
            <ArrowLeft size={16} />
            <span className="text-xs md:text-sm">Cancelar</span>
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 flex items-center space-x-2"
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
