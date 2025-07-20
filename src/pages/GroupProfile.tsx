
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, MapPin, Users, User } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

interface GroupProfile {
  id: string;
  nome: string;
  descricao: string;
  modalidade: string;
  publico_alvo: string;
  dias_semana: string[];
  horario: string;
  tem_local_fisico: boolean;
  cidade: string;
  estado: string;
  bairro: string;
  rua: string;
  numero: string;
  cep: string;
  user_id: string;
  criado_em: string;
}

const GroupProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [group, setGroup] = useState<GroupProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    if (id) {
      fetchGroupProfile();
    }
  }, [id]);

  const fetchGroupProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('grupos_esportivos')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setGroup(data);
    } catch (error) {
      console.error('Erro ao buscar perfil do grupo:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar o perfil do grupo.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGroup = async () => {
    if (!user) {
      toast({
        title: 'Faça login',
        description: 'Você precisa estar logado para entrar em um grupo.',
        variant: 'destructive',
      });
      return;
    }

    setJoining(true);
    
    try {
      // This would typically involve creating a group membership record
      // For now, we'll just show a success message
      toast({
        title: 'Sucesso!',
        description: 'Você se juntou ao grupo! O organizador será notificado.',
      });
    } catch (error) {
      console.error('Erro ao entrar no grupo:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível entrar no grupo. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Grupo não encontrado</h1>
            <Button onClick={() => navigate('/grupos')}>
              Voltar para Grupos
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </div>

          {/* Group Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{group.nome}</CardTitle>
              <CardDescription>{group.descricao || 'Grupo esportivo'}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="text-sm text-gray-500">Público-alvo: {group.publico_alvo || 'Não especificado'}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm text-gray-500">
                  {group.dias_semana && group.dias_semana.length > 0
                    ? `Dias: ${group.dias_semana.join(', ')}`
                    : 'Dias não especificados'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm text-gray-500">Horário: {group.horario || 'Não especificado'}</span>
              </div>

              {group.tem_local_fisico && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm text-gray-500">
                    Local: {group.rua}, {group.numero}, {group.bairro}, {group.cidade}, {group.estado}
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-2">
                <Button
                  onClick={handleJoinGroup}
                  disabled={joining}
                >
                  {joining ? 'Entrando...' : 'Entrar no Grupo'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GroupProfile;
