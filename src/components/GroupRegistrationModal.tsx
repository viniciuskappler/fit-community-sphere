
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { ArrowLeft, Check, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface GroupRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GroupRegistrationModal = ({ isOpen, onClose }: GroupRegistrationModalProps) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    modalidade: '',
    cidade: '',
    estado: '',
    bairro: '',
    rua: '',
    numero: '',
    cep: '',
    dias_semana: [] as string[],
    horario: '',
    publico_alvo: '',
    tem_local_fisico: false,
    latitude: null as number | null,
    longitude: null as number | null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const modalidades = [
    'Futebol', 'Futsal', 'Basquete', 'Vôlei', 'Tênis', 'Natação', 
    'Corrida', 'Ciclismo', 'Crossfit', 'Musculação', 'Artes Marciais'
  ];

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const diasSemana = [
    'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleDiasSemanaChange = (dia: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      dias_semana: checked 
        ? [...prev.dias_semana, dia]
        : prev.dias_semana.filter(d => d !== dia)
    }));
  };

  const handleSubmit = async () => {
    if (!user) {
      setError('Você precisa estar logado para cadastrar um grupo esportivo');
      return;
    }

    // Validação básica
    if (!formData.nome || !formData.modalidade || !formData.cidade || !formData.estado) {
      setError('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);
    
    try {
      const { data, error: insertError } = await supabase
        .from('grupos_esportivos')
        .insert({
          nome: formData.nome,
          descricao: formData.descricao,
          modalidade: formData.modalidade,
          cidade: formData.cidade,
          estado: formData.estado,
          bairro: formData.bairro,
          rua: formData.rua,
          numero: formData.numero,
          cep: formData.cep,
          dias_semana: formData.dias_semana,
          horario: formData.horario,
          publico_alvo: formData.publico_alvo,
          tem_local_fisico: formData.tem_local_fisico,
          latitude: formData.latitude,
          longitude: formData.longitude,
          user_id: user.id
        })
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      toast({
        title: 'Sucesso!',
        description: 'Grupo cadastrado com sucesso!',
      });

      // Reset form
      setFormData({
        nome: '',
        descricao: '',
        modalidade: '',
        cidade: '',
        estado: '',
        bairro: '',
        rua: '',
        numero: '',
        cep: '',
        dias_semana: [],
        horario: '',
        publico_alvo: '',
        tem_local_fisico: false,
        latitude: null,
        longitude: null
      });

      onClose();
      
    } catch (err: any) {
      console.error('Error creating group:', err);
      setError('Erro ao cadastrar grupo esportivo. Tente novamente.');
      toast({
        title: 'Erro',
        description: 'Erro ao cadastrar grupo esportivo. Tente novamente.',
        variant: 'destructive',
      });
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
              <Label htmlFor="nome" className="text-sm font-medium text-gray-700">Nome do Grupo *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                className="mt-1 text-sm"
                placeholder="Ex: Grupo de Corrida Matinal"
              />
            </div>
            <div>
              <Label htmlFor="modalidade" className="text-sm font-medium text-gray-700">Modalidade *</Label>
              <Select value={formData.modalidade} onValueChange={(value) => handleInputChange('modalidade', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecione a modalidade" />
                </SelectTrigger>
                <SelectContent>
                  {modalidades.map(modalidade => (
                    <SelectItem key={modalidade} value={modalidade}>
                      {modalidade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="descricao" className="text-sm font-medium text-gray-700">Descrição do Grupo</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => handleInputChange('descricao', e.target.value)}
              className="mt-1 h-20 text-sm"
              placeholder="Descreva o grupo, atividades e objetivos..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="cidade" className="text-sm font-medium text-gray-700">Cidade *</Label>
              <Input
                id="cidade"
                value={formData.cidade}
                onChange={(e) => handleInputChange('cidade', e.target.value)}
                className="mt-1 text-sm"
                placeholder="Ex: São Paulo"
              />
            </div>
            <div>
              <Label htmlFor="estado" className="text-sm font-medium text-gray-700">Estado *</Label>
              <Select value={formData.estado} onValueChange={(value) => handleInputChange('estado', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="UF" />
                </SelectTrigger>
                <SelectContent>
                  {estados.map(estado => (
                    <SelectItem key={estado} value={estado}>
                      {estado}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="bairro" className="text-sm font-medium text-gray-700">Bairro</Label>
              <Input
                id="bairro"
                value={formData.bairro}
                onChange={(e) => handleInputChange('bairro', e.target.value)}
                className="mt-1 text-sm"
                placeholder="Ex: Vila Madalena"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="rua" className="text-sm font-medium text-gray-700">Rua</Label>
              <Input
                id="rua"
                value={formData.rua}
                onChange={(e) => handleInputChange('rua', e.target.value)}
                className="mt-1 text-sm"
                placeholder="Ex: Rua das Flores"
              />
            </div>
            <div>
              <Label htmlFor="numero" className="text-sm font-medium text-gray-700">Número</Label>
              <Input
                id="numero"
                value={formData.numero}
                onChange={(e) => handleInputChange('numero', e.target.value)}
                className="mt-1 text-sm"
                placeholder="123"
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

          <div>
            <Label className="text-sm font-medium text-gray-700">Dias da Semana</Label>
            <div className="mt-1 grid grid-cols-2 md:grid-cols-4 gap-2">
              {diasSemana.map(dia => (
                <div key={dia} className="flex items-center space-x-2">
                  <Checkbox
                    id={dia}
                    checked={formData.dias_semana.includes(dia)}
                    onCheckedChange={(checked) => handleDiasSemanaChange(dia, checked as boolean)}
                  />
                  <Label htmlFor={dia} className="text-sm">{dia}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="horario" className="text-sm font-medium text-gray-700">Horário</Label>
              <Input
                id="horario"
                value={formData.horario}
                onChange={(e) => handleInputChange('horario', e.target.value)}
                className="mt-1 text-sm"
                placeholder="Ex: 19:00 - 21:00"
              />
            </div>
            <div>
              <Label htmlFor="publico_alvo" className="text-sm font-medium text-gray-700">Público-alvo</Label>
              <Input
                id="publico_alvo"
                value={formData.publico_alvo}
                onChange={(e) => handleInputChange('publico_alvo', e.target.value)}
                className="mt-1 text-sm"
                placeholder="Ex: Iniciantes, Intermediários"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="tem_local_fisico"
              checked={formData.tem_local_fisico}
              onCheckedChange={(checked) => handleInputChange('tem_local_fisico', checked)}
            />
            <Label htmlFor="tem_local_fisico" className="text-sm">Tem local físico?</Label>
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
