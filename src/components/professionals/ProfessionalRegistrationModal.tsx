
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { X, Upload } from 'lucide-react';

interface ProfessionalRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfessionalRegistrationModal = ({ isOpen, onClose }: ProfessionalRegistrationModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    bio: '',
    especialidade: '',
    modalidades: [] as string[],
    cidade: '',
    estado: '',
    bairro: '',
    rua: '',
    numero: '',
    cep: '',
    telefone: '',
    email: '',
    instagram: '',
    site: '',
    imagem_url: '',
    atende_em_estabelecimento: false,
    estabelecimentos_ids: [] as string[],
  });

  const modalidadesDisponiveis = [
    'Futebol', 'Basquete', 'Vôlei', 'Tênis', 'Natação', 'Corrida',
    'Musculação', 'Crossfit', 'Pilates', 'Yoga', 'Artes Marciais',
    'Ciclismo', 'Atletismo', 'Ginástica', 'Dança', 'Surf'
  ];

  const especialidadesDisponiveis = [
    'Personal Trainer', 'Fisioterapeuta', 'Nutricionista Esportivo',
    'Preparador Físico', 'Psicólogo Esportivo', 'Massagista',
    'Professor de Educação Física', 'Treinador', 'Coaching Esportivo'
  ];

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleModalidadeToggle = (modalidade: string) => {
    setFormData(prev => ({
      ...prev,
      modalidades: prev.modalidades.includes(modalidade)
        ? prev.modalidades.filter(m => m !== modalidade)
        : [...prev.modalidades, modalidade]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profissionais_esportivos')
        .insert({
          ...formData,
          user_id: user.id,
        });

      if (error) throw error;

      toast({
        title: 'Sucesso!',
        description: 'Profissional cadastrado com sucesso!',
      });

      onClose();
      // Reset form
      setFormData({
        nome: '',
        bio: '',
        especialidade: '',
        modalidades: [],
        cidade: '',
        estado: '',
        bairro: '',
        rua: '',
        numero: '',
        cep: '',
        telefone: '',
        email: '',
        instagram: '',
        site: '',
        imagem_url: '',
        atende_em_estabelecimento: false,
        estabelecimentos_ids: [],
      });
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: 'Erro ao cadastrar profissional: ' + error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cadastrar Profissional</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nome">Nome *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="especialidade">Especialidade *</Label>
              <select
                id="especialidade"
                value={formData.especialidade}
                onChange={(e) => handleInputChange('especialidade', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Selecione uma especialidade</option>
                {especialidadesDisponiveis.map(esp => (
                  <option key={esp} value={esp}>{esp}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Bio/Descrição</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              rows={3}
            />
          </div>

          {/* Modalidades */}
          <div>
            <Label>Modalidades Atendidas</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {modalidadesDisponiveis.map(modalidade => (
                <div key={modalidade} className="flex items-center space-x-2">
                  <Checkbox
                    id={`modalidade-${modalidade}`}
                    checked={formData.modalidades.includes(modalidade)}
                    onCheckedChange={() => handleModalidadeToggle(modalidade)}
                  />
                  <Label
                    htmlFor={`modalidade-${modalidade}`}
                    className="text-sm font-normal"
                  >
                    {modalidade}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Endereço */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Localização</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="cidade">Cidade</Label>
                <Input
                  id="cidade"
                  value={formData.cidade}
                  onChange={(e) => handleInputChange('cidade', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="estado">Estado</Label>
                <select
                  id="estado"
                  value={formData.estado}
                  onChange={(e) => handleInputChange('estado', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Selecione</option>
                  {estados.map(estado => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="bairro">Bairro</Label>
                <Input
                  id="bairro"
                  value={formData.bairro}
                  onChange={(e) => handleInputChange('bairro', e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="rua">Rua</Label>
                <Input
                  id="rua"
                  value={formData.rua}
                  onChange={(e) => handleInputChange('rua', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="numero">Número</Label>
                <Input
                  id="numero"
                  value={formData.numero}
                  onChange={(e) => handleInputChange('numero', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cep">CEP</Label>
                <Input
                  id="cep"
                  value={formData.cep}
                  onChange={(e) => handleInputChange('cep', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Contatos */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contatos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => handleInputChange('telefone', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={formData.instagram}
                  onChange={(e) => handleInputChange('instagram', e.target.value)}
                  placeholder="@seuusuario"
                />
              </div>
              <div>
                <Label htmlFor="site">Site</Label>
                <Input
                  id="site"
                  value={formData.site}
                  onChange={(e) => handleInputChange('site', e.target.value)}
                  placeholder="https://seusite.com"
                />
              </div>
            </div>
          </div>

          {/* Configurações */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="atende_estabelecimento"
              checked={formData.atende_em_estabelecimento}
              onCheckedChange={(checked) => handleInputChange('atende_em_estabelecimento', checked)}
            />
            <Label htmlFor="atende_estabelecimento">
              Atende em estabelecimento
            </Label>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading || !formData.nome}
              className="bg-gradient-to-r from-orange-600 to-orange-400"
            >
              {loading ? 'Cadastrando...' : 'Cadastrar Profissional'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfessionalRegistrationModal;
