import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Users, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const sportsOptions = [
  'Futebol', 'Basquete', 'Vôlei', 'Tênis', 'Natação', 'Corrida', 'Ciclismo',
  'Futsal', 'Handebol', 'Atletismo', 'Ginástica', 'Judô', 'Karatê', 'Taekwondo',
  'Capoeira', 'Boxe', 'Muay Thai', 'Jiu-Jitsu', 'CrossFit', 'Musculação'
];

const daysOfWeek = [
  { value: 'segunda', label: 'Segunda-feira' },
  { value: 'terca', label: 'Terça-feira' },
  { value: 'quarta', label: 'Quarta-feira' },
  { value: 'quinta', label: 'Quinta-feira' },
  { value: 'sexta', label: 'Sexta-feira' },
  { value: 'sabado', label: 'Sábado' },
  { value: 'domingo', label: 'Domingo' }
];

const CriarGrupoEsportivo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { requireAuth, user } = useAuthGuard();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    modalidade: '',
    publico_alvo: '',
    dias_semana: [] as string[],
    horario: '',
    tem_local_fisico: false,
    cidade: '',
    estado: '',
    bairro: '',
    rua: '',
    numero: '',
    cep: '',
    latitude: null as number | null,
    longitude: null as number | null
  });

  // Check authentication on page load
  React.useEffect(() => {
    if (!user) {
      toast({
        title: 'Acesso negado',
        description: 'Você precisa estar logado para criar um grupo esportivo.',
        variant: 'destructive',
      });
      navigate('/');
    }
  }, [user, navigate, toast]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDayToggle = (day: string) => {
    setFormData(prev => ({
      ...prev,
      dias_semana: prev.dias_semana.includes(day)
        ? prev.dias_semana.filter(d => d !== day)
        : [...prev.dias_semana, day]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!requireAuth('criar um grupo esportivo')) return;

    // Validation
    if (!formData.nome.trim()) {
      toast({
        title: 'Erro',
        description: 'Nome do grupo é obrigatório.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.modalidade) {
      toast({
        title: 'Erro',
        description: 'Modalidade esportiva é obrigatória.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const groupData = {
        nome: formData.nome.trim(),
        descricao: formData.descricao.trim() || null,
        modalidade: formData.modalidade,
        publico_alvo: formData.publico_alvo.trim() || null,
        dias_semana: formData.dias_semana.length > 0 ? formData.dias_semana : null,
        horario: formData.horario.trim() || null,
        tem_local_fisico: formData.tem_local_fisico,
        user_id: user!.id,
      };

      // Add location data if physical location is provided
      if (formData.tem_local_fisico) {
        Object.assign(groupData, {
          cidade: formData.cidade.trim() || null,
          estado: formData.estado.trim() || null,
          bairro: formData.bairro.trim() || null,
          rua: formData.rua.trim() || null,
          numero: formData.numero.trim() || null,
          cep: formData.cep.trim() || null,
          latitude: formData.latitude,
          longitude: formData.longitude,
        });
      }

      const { data, error } = await supabase
        .from('grupos_esportivos')
        .insert(groupData)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Sucesso!',
        description: 'Grupo criado com sucesso!',
      });

      // Redirect to success page or groups list
      navigate('/cadastro-finalizado-grupo');
    } catch (error: any) {
      console.error('Erro ao criar grupo:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível criar o grupo. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Criar Grupo Esportivo</h1>
              <p className="text-muted-foreground">Crie seu grupo e conecte-se com outros praticantes</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informações Básicas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Informações Básicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="nome">Nome do Grupo *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    placeholder="Ex: Futebol aos Domingos"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="modalidade">Modalidade Esportiva *</Label>
                  <Select value={formData.modalidade} onValueChange={(value) => handleInputChange('modalidade', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma modalidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {sportsOptions.map((sport) => (
                        <SelectItem key={sport} value={sport}>{sport}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => handleInputChange('descricao', e.target.value)}
                    placeholder="Descreva o grupo, objetivos, nível dos participantes..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="publico_alvo">Público-alvo</Label>
                  <Input
                    id="publico_alvo"
                    value={formData.publico_alvo}
                    onChange={(e) => handleInputChange('publico_alvo', e.target.value)}
                    placeholder="Ex: Iniciantes, Adultos, Avançado"
                  />
                </div>

                <div>
                  <Label>Dias da Semana</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {daysOfWeek.map((day) => (
                      <div key={day.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={day.value}
                          checked={formData.dias_semana.includes(day.value)}
                          onCheckedChange={() => handleDayToggle(day.value)}
                        />
                        <Label htmlFor={day.value} className="text-sm">{day.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="horario">Horário</Label>
                  <Input
                    id="horario"
                    value={formData.horario}
                    onChange={(e) => handleInputChange('horario', e.target.value)}
                    placeholder="Ex: 19:30"
                    type="time"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Local Físico */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Local Físico (Opcional)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tem_local_fisico"
                    checked={formData.tem_local_fisico}
                    onCheckedChange={(checked) => handleInputChange('tem_local_fisico', checked)}
                  />
                  <Label htmlFor="tem_local_fisico">Este grupo possui um local físico?</Label>
                </div>

                {formData.tem_local_fisico && (
                  <div className="space-y-4 border-l-2 border-primary pl-4 ml-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cidade">Cidade</Label>
                        <Input
                          id="cidade"
                          value={formData.cidade}
                          onChange={(e) => handleInputChange('cidade', e.target.value)}
                          placeholder="São Paulo"
                        />
                      </div>
                      <div>
                        <Label htmlFor="estado">Estado</Label>
                        <Input
                          id="estado"
                          value={formData.estado}
                          onChange={(e) => handleInputChange('estado', e.target.value)}
                          placeholder="SP"
                          maxLength={2}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bairro">Bairro</Label>
                      <Input
                        id="bairro"
                        value={formData.bairro}
                        onChange={(e) => handleInputChange('bairro', e.target.value)}
                        placeholder="Vila Madalena"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="rua">Rua/Avenida</Label>
                        <Input
                          id="rua"
                          value={formData.rua}
                          onChange={(e) => handleInputChange('rua', e.target.value)}
                          placeholder="Rua Augusta"
                        />
                      </div>
                      <div>
                        <Label htmlFor="numero">Número</Label>
                        <Input
                          id="numero"
                          value={formData.numero}
                          onChange={(e) => handleInputChange('numero', e.target.value)}
                          placeholder="123"
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
                        maxLength={9}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Buttons */}
            <div className="flex gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-primary hover:bg-primary/90"
              >
                {loading ? 'Criando...' : 'Criar Grupo'}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CriarGrupoEsportivo;