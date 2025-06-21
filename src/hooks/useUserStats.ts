
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
      // Buscar contagem total de usuários
      const { count: totalCount, error: totalError } = await supabase
        .from('user_profiles')
        .select('*', { count: 'exact', head: true });

      // Buscar contagem de estabelecimentos
      const { count: establishmentCount, error: establishmentError } = await supabase
        .from('establishments')
        .select('*', { count: 'exact', head: true });

      // Buscar contagem de grupos
      const { count: groupCount, error: groupError } = await supabase
        .from('sports_groups')
        .select('*', { count: 'exact', head: true });

      if (totalError || establishmentError || groupError) {
        console.error('Erro ao buscar estatísticas:', { totalError, establishmentError, groupError });
        return;
      }

      const supporters = Math.max(0, (totalCount || 0) - (establishmentCount || 0) - (groupCount || 0));

      setStats({
        total_users: totalCount || 0,
        supporters: supporters,
        establishments: establishmentCount || 0,
        groups: groupCount || 0
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
