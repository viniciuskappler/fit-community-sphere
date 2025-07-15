import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Building, Upload } from 'lucide-react';
import SecondaryHeader from '@/components/SecondaryHeader';
import AuthGuard from '@/components/AuthGuard';

interface EstablishmentData {
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  descricao: string;
  estrutura: string[];
  modalidades: string[];
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  horario_funcionamento: string;
  imagem_url: string;
}

const estruturaOptions = [
  'Quadra coberta',
  'Quadra descoberta',
  'Vestiário',
  'Lanchonete',
  'Estacionamento',
  'Arquibancada',
  'Iluminação',
  'Ar condicionado',
  'WiFi',
  'Segurança'
];

const modalidadesOptions = [
  'Futebol',
  'Basquete',
  'Vôlei',
  'Tênis',
  'Futsal',
  'Handebol',
  'Ping Pong',
  'Badminton',
  'Natação',
  'Academia',
  'Artes Marciais',
  'Dança'
];

const CadastroEstabelecimento: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [existingEstablishment, setExistingEstablishment] = useState<any>(null);
  const [formData, setFormData] = useState<EstablishmentData>({
    nome: '',
    cnpj: '',
    email: '',
    telefone: '',
    descricao: '',
    estrutura: [],
    modalidades: [],
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    horario_funcionamento: '',
    imagem_url: ''
  });

  useEffect(() => {
    if (user) {
      checkExistingEstablishment();
    }
  }, [user]);

  const checkExistingEstablishment = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('estabelecimentos_esportivos')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data && !error) {
        setExistingEstablishment(data);
        setFormData({
          nome: data.nome || '',
          cnpj: data.cnpj || '',
          email: data.email || '',
          telefone: data.telefone || '',
          descricao: data.descricao || '',
          estrutura: data.estrutura || [],
          modalidades: data.modalidades || [],
          cep: data.cep || '',
          rua: data.rua || '',
          numero: data.numero || '',
          bairro: data.bairro || '',
          cidade: data.cidade || '',
          estado: data.estado || '',
          horario_funcionamento: data.horario_funcionamento || '',
          imagem_url: data.imagem_url || ''
        });
      }
    } catch (error) {
      console.error('Erro ao verificar estabelecimento existente:', error);
    }
  };

  const handleInputChange = (field: keyof EstablishmentData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStructureChange = (option: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      estrutura: checked 
        ? [...prev.estrutura, option]
        : prev.estrutura.filter(item => item !== option)
    }));
  };

  const handleModalityChange = (option: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      modalidades: checked 
        ? [...prev.modalidades, option]
        : prev.modalidades.filter(item => item !== option)
    }));
  };

  const validateForm = () => {
    const requiredFields = ['nome', 'cnpj', 'email', 'telefone', 'cidade', 'estado'];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof EstablishmentData]) {
        toast({
          title: "Erro de validação",
          description: `O campo ${field} é obrigatório.`,
          variant: "destructive",
        });
        return false;
      }
    }

    if (formData.modalidades.length === 0) {
      toast({
        title: "Erro de validação",
        description: "Selecione pelo menos um esporte oferecido.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!user || !validateForm()) return;

    setLoading(true);
    try {
      const dataToSave = {
        ...formData,
        user_id: user.id
      };

      let result;
      if (existingEstablishment) {
        result = await supabase
          .from('estabelecimentos_esportivos')
          .update(dataToSave)
          .eq('id', existingEstablishment.id);
      } else {
        result = await supabase
          .from('estabelecimentos_esportivos')
          .insert(dataToSave);
      }

      if (result.error) throw result.error;

      toast({
        title: "Sucesso!",
        description: existingEstablishment 
          ? "Estabelecimento atualizado com sucesso!"
          : "Estabelecimento cadastrado com sucesso!",
      });

      if (!existingEstablishment) {
        // Recarregar dados após cadastro
        await checkExistingEstablishment();
      }

    } catch (error) {
      console.error('Erro ao salvar estabelecimento:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar estabelecimento. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <SecondaryHeader isVisible={false} />
        
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-6 w-6" />
                {existingEstablishment ? 'Editar Estabelecimento' : 'Cadastro de Estabelecimento'}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {existingEstablishment && (
                <Alert>
                  <AlertDescription>
                    Você já possui um estabelecimento cadastrado. Use este formulário para atualizar as informações.
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome do Estabelecimento *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    placeholder="Digite o nome do estabelecimento"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ *</Label>
                  <Input
                    id="cnpj"
                    value={formData.cnpj}
                    onChange={(e) => handleInputChange('cnpj', e.target.value)}
                    placeholder="00.000.000/0000-00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="contato@estabelecimento.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone *</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => handleInputChange('telefone', e.target.value)}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => handleInputChange('descricao', e.target.value)}
                  placeholder="Descreva seu estabelecimento esportivo"
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <Label>Estrutura Disponível</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {estruturaOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={`estrutura-${option}`}
                        checked={formData.estrutura.includes(option)}
                        onCheckedChange={(checked) => handleStructureChange(option, checked as boolean)}
                      />
                      <Label htmlFor={`estrutura-${option}`} className="text-sm">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label>Esportes Oferecidos *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {modalidadesOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={`modalidade-${option}`}
                        checked={formData.modalidades.includes(option)}
                        onCheckedChange={(checked) => handleModalityChange(option, checked as boolean)}
                      />
                      <Label htmlFor={`modalidade-${option}`} className="text-sm">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    value={formData.cep}
                    onChange={(e) => handleInputChange('cep', e.target.value)}
                    placeholder="00000-000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rua">Rua</Label>
                  <Input
                    id="rua"
                    value={formData.rua}
                    onChange={(e) => handleInputChange('rua', e.target.value)}
                    placeholder="Nome da rua"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numero">Número</Label>
                  <Input
                    id="numero"
                    value={formData.numero}
                    onChange={(e) => handleInputChange('numero', e.target.value)}
                    placeholder="123"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bairro">Bairro</Label>
                  <Input
                    id="bairro"
                    value={formData.bairro}
                    onChange={(e) => handleInputChange('bairro', e.target.value)}
                    placeholder="Nome do bairro"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade *</Label>
                  <Input
                    id="cidade"
                    value={formData.cidade}
                    onChange={(e) => handleInputChange('cidade', e.target.value)}
                    placeholder="Nome da cidade"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estado">Estado *</Label>
                  <Input
                    id="estado"
                    value={formData.estado}
                    onChange={(e) => handleInputChange('estado', e.target.value)}
                    placeholder="SP"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="horario">Horário de Funcionamento</Label>
                <Input
                  id="horario"
                  value={formData.horario_funcionamento}
                  onChange={(e) => handleInputChange('horario_funcionamento', e.target.value)}
                  placeholder="Segunda a Sexta: 6h às 22h"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imagem">URL da Imagem</Label>
                <Input
                  id="imagem"
                  value={formData.imagem_url}
                  onChange={(e) => handleInputChange('imagem_url', e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>

              <Button 
                onClick={handleSubmit}
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {existingEstablishment ? 'Atualizar Informações' : 'Cadastrar Estabelecimento'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGuard>
  );
};

export default CadastroEstabelecimento;