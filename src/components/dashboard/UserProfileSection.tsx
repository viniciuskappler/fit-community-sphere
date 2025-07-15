import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, MapPin } from 'lucide-react';
import { useUserData } from '@/hooks/useUserData';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UserGroup {
  id: string;
  nome: string;
  modalidade: string;
}

const UserProfileSection = () => {
  const { profile, sports, loading } = useUserData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userGroup, setUserGroup] = useState<UserGroup | null>(null);
  const [loadingGroup, setLoadingGroup] = useState(false);

  // Calcular idade
  const calculateAge = (birthDate: string): number | null => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // Buscar grupo do usuário
  useEffect(() => {
    const fetchUserGroup = async () => {
      if (!user) return;
      
      setLoadingGroup(true);
      try {
        const { data, error } = await supabase
          .from('grupos_esportivos')
          .select('id, nome, modalidade')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Erro ao buscar grupo:', error);
        } else if (data) {
          setUserGroup(data);
        }
      } catch (error) {
        console.error('Erro ao buscar grupo:', error);
      } finally {
        setLoadingGroup(false);
      }
    };

    fetchUserGroup();
  }, [user]);

  // Esportes praticados ordenados por frequência (simulado)
  const practicedSports = sports.filter(sport => sport.sport_type === 'practiced');
  
  // Primeira modalidade esportiva para o banner
  const primarySport = practicedSports[0]?.sport_name || 'Futebol';

  // Mapeamento de esportes para imagens de fundo
  const sportImages: { [key: string]: string } = {
    'Futebol': '/lovable-uploads/44959214-1bcf-4335-9376-cdaa51c8183c.png',
    'Basquete': '/lovable-uploads/42c43684-60db-4ba2-9e0e-a851954d5be9.png',
    'Vôlei': '/lovable-uploads/5736d95e-4f42-43f5-8ef3-6377ff323c0b.png',
    'Tênis': '/lovable-uploads/67b4cf92-c94a-4f4b-a770-ff1f58239a6d.png',
    'Natação': '/lovable-uploads/72437099-6d2b-44fc-a4be-2de3feb06dbc.png'
  };

  const primarySportImage = sportImages[primarySport] || sportImages['Futebol'];

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const age = profile?.birth_date ? calculateAge(profile.birth_date) : null;

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        {/* Header com nome e idade */}
        <div className="p-6 pb-4">
          <h2 className="text-xl font-bold text-foreground">
            {profile?.full_name || 'Usuário'}
          </h2>
          {age && (
            <div className="flex items-center text-muted-foreground mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{age} anos</span>
            </div>
          )}
        </div>

        {/* Banner do esporte principal */}
        {practicedSports.length > 0 && (
          <div 
            className="relative h-32 mx-4 rounded-lg bg-cover bg-center mb-4"
            style={{ 
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${primarySportImage})` 
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-lg">{primarySport}</span>
            </div>
          </div>
        )}

        {/* Lista de esportes praticados */}
        <div className="px-6 pb-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Esportes Praticados
          </h3>
          <div className="flex flex-wrap gap-2">
            {practicedSports.length > 0 ? (
              practicedSports.map((sport, index) => (
                <Badge 
                  key={`${sport.sport_name}-${index}`} 
                  variant={index === 0 ? "default" : "secondary"}
                  className="text-xs"
                >
                  {sport.sport_name}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">
                Nenhum esporte cadastrado
              </span>
            )}
          </div>
        </div>

        {/* Informações do grupo */}
        <div className="px-6 pb-6">
          {loadingGroup ? (
            <div className="animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-muted rounded"></div>
            </div>
          ) : userGroup ? (
            <>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Meu Grupo
              </h3>
              <div className="flex items-center text-foreground mb-3">
                <Users className="h-4 w-4 mr-2" />
                <span className="font-medium">{userGroup.nome}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => navigate('/busca')}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Estabelecimentos
              </Button>
            </>
          ) : (
            <>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Você ainda não faz parte de um grupo
              </h3>
              <Button 
                variant="default" 
                size="sm" 
                className="w-full"
                onClick={() => navigate('/busca')}
              >
                <Users className="h-4 w-4 mr-2" />
                Buscar Grupos
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileSection;