
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const useAdminCheck = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        console.log('🔍 Verificando status de administrador para:', user.email);
        
        const { data, error } = await supabase
          .from('usuarios')
          .select('papel')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('❌ Erro ao verificar status de admin:', error);
          setIsAdmin(false);
        } else {
          const adminStatus = data?.papel === 'admin';
          console.log('✅ Status de admin:', adminStatus);
          setIsAdmin(adminStatus);
        }
      } catch (error) {
        console.error('💥 Erro inesperado ao verificar admin:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  return { isAdmin, loading };
};
