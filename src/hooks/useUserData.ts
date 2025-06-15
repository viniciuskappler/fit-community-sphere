
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UserProfile {
  id: string;
  full_name: string;
  cpf?: string;
  phone?: string;
  city?: string;
  birth_date?: string;
}

interface UserSport {
  sport_name: string;
  sport_type: 'favorite' | 'practiced' | 'interested';
}

export const useUserData = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [sports, setSports] = useState<UserSport[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      // Buscar perfil do usuário
      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      }

      // Buscar esportes do usuário
      const { data: sportsData } = await supabase
        .from('user_sports')
        .select('sport_name, sport_type')
        .eq('user_id', user.id);

      if (sportsData) {
        // Garantir que os tipos estão corretos
        const typedSports: UserSport[] = sportsData.map(sport => ({
          sport_name: sport.sport_name,
          sport_type: sport.sport_type as 'favorite' | 'practiced' | 'interested'
        }));
        setSports(typedSports);
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveUserProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) return { error: 'Usuário não autenticado' };

    // Garantir que full_name sempre tenha um valor
    const dataToSave = {
      id: user.id,
      full_name: profileData.full_name || '',
      ...profileData
    };

    const { error } = await supabase
      .from('user_profiles')
      .upsert(dataToSave);

    if (!error) {
      await fetchUserData();
    }

    return { error };
  };

  const saveUserSports = async (userSports: UserSport[]) => {
    if (!user) return { error: 'Usuário não autenticado' };

    // Primeiro, remover todos os esportes existentes
    await supabase
      .from('user_sports')
      .delete()
      .eq('user_id', user.id);

    // Depois, inserir os novos esportes
    if (userSports.length > 0) {
      const sportsToInsert = userSports.map(sport => ({
        user_id: user.id,
        sport_name: sport.sport_name,
        sport_type: sport.sport_type
      }));

      const { error } = await supabase
        .from('user_sports')
        .insert(sportsToInsert);

      if (!error) {
        await fetchUserData();
      }

      return { error };
    }

    return { error: null };
  };

  return {
    profile,
    sports,
    loading,
    saveUserProfile,
    saveUserSports,
    refetch: fetchUserData
  };
};
