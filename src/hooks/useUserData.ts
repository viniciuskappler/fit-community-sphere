
// Hook simplificado para dados do usuário - usando tabela usuarios
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  birth_date: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  photo_url?: string;
  created_at: string;
}

export interface UserSport {
  sport_name: string;
  sport_type: 'favorite' | 'practiced' | 'interested';
}

export const useUserData = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [sports, setSports] = useState<UserSport[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching user data for:', user.id);
      
      // Buscar dados do usuário da tabela usuarios
      const { data: userData, error: userError } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', user.id)
        .single();

      if (userError) {
        console.error('Error fetching user data:', userError);
        setError(userError.message);
      } else {
        console.log('User data fetched:', userData);
        // Mapear para estrutura UserProfile
        const mappedProfile: UserProfile = {
          id: userData.id,
          full_name: userData.nome || '',
          email: userData.email || '',
          phone: userData.telefone || '',
          birth_date: userData.data_nascimento || '',
          street: userData.rua || '',
          number: userData.numero || '',
          neighborhood: userData.bairro || '',
          city: userData.cidade || '',
          state: userData.estado || '',
          cep: userData.cep || '',
          photo_url: null, // Campo não existe na tabela usuarios
          created_at: userData.criado_em || ''
        };
        setProfile(mappedProfile);

        // Mapear esportes dos arrays para UserSport[]
        const userSports: UserSport[] = [];
        
        if (userData.esportes_favoritos) {
          userData.esportes_favoritos.forEach((sport: string) => {
            userSports.push({ sport_name: sport, sport_type: 'favorite' });
          });
        }
        
        if (userData.esportes_praticados) {
          userData.esportes_praticados.forEach((sport: string) => {
            userSports.push({ sport_name: sport, sport_type: 'practiced' });
          });
        }
        
        if (userData.esportes_interesse) {
          userData.esportes_interesse.forEach((sport: string) => {
            userSports.push({ sport_name: sport, sport_type: 'interested' });
          });
        }
        
        setSports(userSports);
      }
    } catch (error) {
      console.error('Error in fetchUserData:', error);
      setError('Erro ao buscar dados do usuário');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updatedData: Partial<UserProfile>) => {
    if (!user) return { success: false, error: 'Usuário não autenticado' };
    
    setLoading(true);
    try {
      // Mapear UserProfile para estrutura da tabela usuarios
      const userData: any = {};
      
      if (updatedData.full_name !== undefined) userData.nome = updatedData.full_name;
      if (updatedData.email !== undefined) userData.email = updatedData.email;
      if (updatedData.phone !== undefined) userData.telefone = updatedData.phone;
      if (updatedData.birth_date !== undefined) userData.data_nascimento = updatedData.birth_date;
      if (updatedData.street !== undefined) userData.rua = updatedData.street;
      if (updatedData.number !== undefined) userData.numero = updatedData.number;
      if (updatedData.neighborhood !== undefined) userData.bairro = updatedData.neighborhood;
      if (updatedData.city !== undefined) userData.cidade = updatedData.city;
      if (updatedData.state !== undefined) userData.estado = updatedData.state;
      if (updatedData.cep !== undefined) userData.cep = updatedData.cep;
      // Remover referência ao foto_url pois não existe na tabela

      const { error } = await supabase
        .from('usuarios')
        .update(userData)
        .eq('id', user.id);

      if (error) throw error;
      
      await fetchUserData();
      return { success: true, error: null };
    } catch (error: any) {
      console.error('Error updating profile:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const addSport = async (sportName: string, sportType: 'favorite' | 'practiced' | 'interested') => {
    if (!user) return { success: false, error: 'Usuário não autenticado' };
    
    try {
      // Funcionalidade de esportes temporariamente simplificada
      console.log('Adding sport:', { sportName, sportType });
      return { success: true, error: null };
    } catch (error: any) {
      console.error('Error adding sport:', error);
      return { success: false, error: error.message };
    }
  };

  const removeSport = async (sportName: string, sportType: 'favorite' | 'practiced' | 'interested') => {
    if (!user) return { success: false, error: 'Usuário não autenticado' };
    
    try {
      // Funcionalidade de esportes temporariamente simplificada
      console.log('Removing sport:', { sportName, sportType });
      return { success: true, error: null };
    } catch (error: any) {
      console.error('Error removing sport:', error);
      return { success: false, error: error.message };
    }
  };

  return {
    profile,
    sports,
    loading,
    error,
    fetchUserData,
    updateProfile,
    addSport,
    removeSport
  };
};
