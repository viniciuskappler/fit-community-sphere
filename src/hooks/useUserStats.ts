
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UserStats {
  total_users: number;
  supporters: number;
  establishments: number;
  groups: number;
}

export const useUserStats = () => {
  const [stats, setStats] = useState<UserStats>({
    total_users: 0,
    supporters: 0,
    establishments: 0,
    groups: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      // Buscar contagem de usuários por tipo
      const { data: supporters, error: supportersError } = await supabase
        .from('user_profiles')
        .select('id', { count: 'exact', head: true })
        .eq('user_type', 'supporter');

      const { data: establishments, error: establishmentsError } = await supabase
        .from('user_profiles')
        .select('id', { count: 'exact', head: true })
        .eq('user_type', 'establishment');

      const { data: groups, error: groupsError } = await supabase
        .from('user_profiles')
        .select('id', { count: 'exact', head: true })
        .eq('user_type', 'group');

      if (supportersError || establishmentsError || groupsError) {
        console.error('Erro ao buscar estatísticas:', { supportersError, establishmentsError, groupsError });
        return;
      }

      const supporterCount = supporters?.length || 0;
      const establishmentCount = establishments?.length || 0;
      const groupCount = groups?.length || 0;
      const totalCount = supporterCount + establishmentCount + groupCount;

      setStats({
        total_users: totalCount,
        supporters: supporterCount,
        establishments: establishmentCount,
        groups: groupCount
      });
    } catch (error) {
      console.error('Erro inesperado ao buscar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    
    // Atualizar a cada 30 segundos
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return { stats, loading, refetch: fetchStats };
};
