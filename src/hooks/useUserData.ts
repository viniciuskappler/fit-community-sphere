
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
    } else {
      setProfile(null);
      setSports([]);
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      console.log('Fetching user data for:', user.id);
      
      // Buscar perfil do usuário
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
      } else {
        console.log('Profile fetched:', profileData);
        setProfile(profileData);
      }

      // Buscar esportes do usuário
      const { data: sportsData, error: sportsError } = await supabase
        .from('user_sports')
        .select('sport_name, sport_type')
        .eq('user_id', user.id);

      if (sportsError) {
        console.error('Error fetching sports:', sportsError);
      } else {
        console.log('Sports fetched:', sportsData);
        // Garantir que os tipos estão corretos
        const typedSports: UserSport[] = (sportsData || []).map(sport => ({
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

    console.log('Saving profile data:', profileData);

    // Garantir que full_name sempre tenha um valor
    const dataToSave = {
      id: user.id,
      full_name: profileData.full_name || '',
      ...profileData
    };

    const { error } = await supabase
      .from('user_profiles')
      .upsert(dataToSave);

    if (error) {
      console.error('Error saving profile:', error);
    } else {
      console.log('Profile saved successfully');
      await fetchUserData();
    }

    return { error };
  };

  const saveUserSports = async (userSports: UserSport[]) => {
    if (!user) return { error: 'Usuário não autenticado' };

    console.log('Saving sports data:', userSports);

    // Primeiro, remover todos os esportes existentes
    const { error: deleteError } = await supabase
      .from('user_sports')
      .delete()
      .eq('user_id', user.id);

    if (deleteError) {
      console.error('Error deleting existing sports:', deleteError);
    }

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

      if (error) {
        console.error('Error saving sports:', error);
      } else {
        console.log('Sports saved successfully');
        await fetchUserData();
      }

      return { error };
    }

    await fetchUserData();
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
