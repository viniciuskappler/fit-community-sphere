
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

interface GroupRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GroupRegistrationModal = ({ isOpen, onClose }: GroupRegistrationModalProps) => {
  const [formData, setFormData] = useState({
    groupName: '',
    corporateName: '',
    description: '',
    cities: '',
    meetingPoint: '',
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
      setError('Você precisa estar logado para cadastrar um grupo esportivo');
      return;
    }

    // Validação básica
    if (!formData.groupName || !formData.corporateName || !formData.email || !formData.phone) {
      setError('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);
    
    try {
      // Aqui você implementaria a lógica de salvamento no Supabase
      console.log('Salvando grupo esportivo:', formData);
      
      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onClose();
      navigate('/cadastro-finalizado-grupo');
    } catch (err) {
      setError('Erro ao cadastrar grupo esportivo. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95%] sm:w-full max-h-[90vh] overflow-y-auto bg-white rounded-xl mx-auto border-0 shadow-2xl">
        <DialogHeader className="bg-white">
          <DialogTitle className="text-lg md:text-2xl font-bold text-center mb-4 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            Cadastro de Grupo Esportivo
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
              <Label htmlFor="groupName" className="text-sm font-medium">Nome do Grupo *</Label>
              <Input
                id="groupName"
                value={formData.groupName}
                onChange={(e) => handleInputChange('groupName', e.target.value)}
                className="mt-1"
                placeholder="Ex: Grupo de Corrida Matinal"
              />
            </div>
            <div>
              <Label htmlFor="corporateName" className="text-sm font-medium">Nome da Organização *</Label>
              <Input
                id="corporateName"
                value={formData.corporateName}
                onChange={(e) => handleInputChange('corporateName', e.target.value)}
                className="mt-1"
                placeholder="Ex: Associação Esportiva"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div>
              <Label htmlFor="email" className="text-sm font-medium">E-mail *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="mt-1"
                placeholder="contato@grupo.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium">Descrição do Grupo</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="mt-1 h-20"
              placeholder="Descreva o grupo, atividades e objetivos..."
            />
          </div>

          <div>
            <Label htmlFor="cities" className="text-sm font-medium">Cidades de Atuação</Label>
            <Input
              id="cities"
              value={formData.cities}
              onChange={(e) => handleInputChange('cities', e.target.value)}
              className="mt-1"
              placeholder="Ex: São Paulo, Guarulhos, Osasco"
            />
          </div>

          <div>
            <Label htmlFor="meetingPoint" className="text-sm font-medium">Ponto de Encontro</Label>
            <Input
              id="meetingPoint"
              value={formData.meetingPoint}
              onChange={(e) => handleInputChange('meetingPoint', e.target.value)}
              className="mt-1"
              placeholder="Local onde o grupo se reúne"
            />
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

export default GroupRegistrationModal;
