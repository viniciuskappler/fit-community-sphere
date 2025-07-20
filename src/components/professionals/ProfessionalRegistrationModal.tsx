
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
import { X, Upload, CalendarDays } from 'lucide-react';

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
    data_nascimento: '',
    telefone: '',
    email: '',
    bio: '',
    descricao_servicos: '',
    especialidade: '',
    modalidades: [] as string[],
    esportes_atendidos: [] as string[],
    cidade: '',
    estado: '',
    bairro: '',
    rua: '',
    numero: '',
    cep: '',
    instagram: '',
    linkedin: '',
    facebook: '',
    imagem_url: '',
    atende_em_estabelecimento: false,
  });

  const modalidadesDisponiveis = [
    'Musculação', 'Crossfit', 'Pilates', 'Yoga', 'Funcional', 'Dança',
    'Natação', 'Hidroginástica', 'Reabilitação', 'RPG', 'Massoterapia',
    'Nutrição', 'Suplementação', 'Coaching', 'Preparação Mental'
  ];

  const esportesDisponiveis = [
    'Futebol', 'Basquete', 'Vôlei', 'Tênis', 'Natação', 'Corrida',
    'Ciclismo', 'Atletismo', 'Ginástica', 'Artes Marciais', 'Surf',
    'Crossfit', 'Bodybuilding', 'Powerlifting', 'Calistenia'
  ];

  const especialidadesDisponiveis = [
    'Personal Trainer', 'Fisioterapeuta', 'Nutricionista Esportivo',
    'Preparador Físico', 'Psicólogo Esportivo', 'Massagista',
    'Professor de Educação Física', 'Treinador', 'Coaching Esportivo',
    'Terapeuta Ocupacional', 'Quiropraxista'
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

  const handleEsporteToggle = (esporte: string) => {
    setFormData(prev => ({
      ...prev,
      esportes_atendidos: prev.esportes_atendidos.includes(esporte)
        ? prev.esportes_atendidos.filter(e => e !== esporte)
        : [...prev.esportes_atendidos, esporte]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // Validation
    if (!formData.nome || !formData.telefone || !formData.email || !formData.especialidade) {
      toast({
        title: 'Erro',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profissionais_esportivos')
        .insert({
          user_id: user.id,
          nome: formData.nome,
          bio: formData.bio,
          especialidade: formData.especialidade,
          modalidades: formData.modalidades,
          cidade: formData.cidade,
          estado: formData.estado,
          bairro: formData.bairro,
          rua: formData.rua,
          numero: formData.numero,
          cep: formData.cep,
          telefone: formData.telefone,
          email: formData.email,
          instagram: formData.instagram,
          site: formData.linkedin, // Using site field for LinkedIn
          imagem_url: formData.imagem_url,
          atende_em_estabelecimento: formData.atende_em_estabelecimento,
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
        data_nascimento: '',
        telefone: '',
        email: '',
        bio: '',
        descricao_servicos: '',
        especialidade: '',
        modalidades: [],
        esportes_atendidos: [],
        cidade: '',
        estado: '',
        bairro: '',
        rua: '',
        numero: '',
        cep: '',
        instagram: '',
        linkedin: '',
        facebook: '',
        imagem_url: '',
        atende_em_estabelecimento: false,
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
          <DialogTitle>Cadastrar como Profissional</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Pessoais */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Informações Pessoais</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="data_nascimento">Data de Nascimento</Label>
                <Input
                  id="data_nascimento"
                  type="date"
                  value={formData.data_nascimento}
                  onChange={(e) => handleInputChange('data_nascimento', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="telefone">Telefone (com DDD) *</Label>
                <Input
                  id="telefone"
                  placeholder="(11) 99999-9999"
                  value={formData.telefone}
                  onChange={(e) => handleInputChange('telefone', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
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

          {/* Descrições */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Descrições</h3>
            
            <div>
              <Label htmlFor="bio">Descrição do Profissional</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={3}
                placeholder="Conte um pouco sobre você, sua experiência e formação..."
              />
            </div>

            <div>
              <Label htmlFor="descricao_servicos">Descrição dos Serviços</Label>
              <Textarea
                id="descricao_servicos"
                value={formData.descricao_servicos}
                onChange={(e) => handleInputChange('descricao_servicos', e.target.value)}
                rows={3}
                placeholder="Descreva os serviços que você oferece, metodologia, diferenciais..."
              />
            </div>
          </div>

          {/* Modalidades */}
          <div>
            <Label>Modalidades que Atende</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 max-h-40 overflow-y-auto">
              {modalidadesDisponiveis.map(modalidade => (
                <div key={modalidade} className="flex items-center space-x-2">
                  <Checkbox
                    id={`modalidade-${modalidade}`}
                    checked={formData.modalidades.includes(modalidade)}
                    onCheckedChange={() => handleModalidadeToggle(modalidade)}
                  />
                  <Label htmlFor={`modalidade-${modalidade}`} className="text-sm">
                    {modalidade}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Esportes */}
          <div>
            <Label>Esportes Mais Atendidos</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 max-h-40 overflow-y-auto">
              {esportesDisponiveis.map(esporte => (
                <div key={esporte} className="flex items-center space-x-2">
                  <Checkbox
                    id={`esporte-${esporte}`}
                    checked={formData.esportes_atendidos.includes(esporte)}
                    onCheckedChange={() => handleEsporteToggle(esporte)}
                  />
                  <Label htmlFor={`esporte-${esporte}`} className="text-sm">
                    {esporte}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Endereço */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Localização (Opcional)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label htmlFor="bairro">Bairro</Label>
                <Input
                  id="bairro"
                  value={formData.bairro}
                  onChange={(e) => handleInputChange('bairro', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="cep">CEP</Label>
              <Input
                id="cep"
                value={formData.cep}
                onChange={(e) => handleInputChange('cep', e.target.value)}
                placeholder="00000-000"
              />
            </div>
          </div>

          {/* Redes Sociais */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Redes Sociais</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/seuusuario"
                />
              </div>
              <div>
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  value={formData.facebook}
                  onChange={(e) => handleInputChange('facebook', e.target.value)}
                  placeholder="facebook.com/seuusuario"
                />
              </div>
            </div>
          </div>

          {/* Foto de Perfil */}
          <div>
            <Label htmlFor="imagem_url">URL da Foto de Perfil</Label>
            <Input
              id="imagem_url"
              value={formData.imagem_url}
              onChange={(e) => handleInputChange('imagem_url', e.target.value)}
              placeholder="https://exemplo.com/sua-foto.jpg"
            />
            <p className="text-xs text-gray-500 mt-1">
              Cole aqui o link de uma foto sua hospedada online
            </p>
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
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading || !formData.nome || !formData.telefone || !formData.email || !formData.especialidade}
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
