
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
    slug: '',
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
    if (field === 'groupName') {
      // Auto-generate slug from group name
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
      setError('Você precisa estar logado para cadastrar um grupo esportivo');
      return;
    }

    // Validação básica
    if (!formData.groupName || !formData.corporateName || !formData.email || !formData.phone || !formData.slug) {
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
        <DialogHeader className="bg-white sticky top-0 z-10 pb-4">
          <DialogTitle className="text-lg md:text-2xl font-bold text-center mb-4 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            Cadastro de Grupo Esportivo
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
              <Label htmlFor="groupName" className="text-sm font-medium text-gray-700">Nome do Grupo *</Label>
              <Input
                id="groupName"
                value={formData.groupName}
                onChange={(e) => handleInputChange('groupName', e.target.value)}
                className="mt-1 text-sm"
                placeholder="Ex: Grupo de Corrida Matinal"
              />
            </div>
            <div>
              <Label htmlFor="slug" className="text-sm font-medium text-gray-700">URL do Grupo *</Label>
              <div className="mt-1 flex">
                <span className="inline-flex items-center px-3 text-xs text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                  /grupo-esportivo/
                </span>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  className="rounded-l-none text-sm"
                  placeholder="grupo-corrida-matinal"
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="corporateName" className="text-sm font-medium text-gray-700">Nome da Organização *</Label>
            <Input
              id="corporateName"
              value={formData.corporateName}
              onChange={(e) => handleInputChange('corporateName', e.target.value)}
              className="mt-1 text-sm"
              placeholder="Ex: Associação Esportiva"
            />
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
                placeholder="contato@grupo.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">Descrição do Grupo</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="mt-1 h-20 text-sm"
              placeholder="Descreva o grupo, atividades e objetivos..."
            />
          </div>

          <div>
            <Label htmlFor="cities" className="text-sm font-medium text-gray-700">Cidades de Atuação</Label>
            <Input
              id="cities"
              value={formData.cities}
              onChange={(e) => handleInputChange('cities', e.target.value)}
              className="mt-1 text-sm"
              placeholder="Ex: São Paulo, Guarulhos, Osasco"
            />
          </div>

          <div>
            <Label htmlFor="meetingPoint" className="text-sm font-medium text-gray-700">Ponto de Encontro</Label>
            <Input
              id="meetingPoint"
              value={formData.meetingPoint}
              onChange={(e) => handleInputChange('meetingPoint', e.target.value)}
              className="mt-1 text-sm"
              placeholder="Local onde o grupo se reúne"
            />
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

export default GroupRegistrationModal;
