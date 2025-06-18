
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useAuthGuard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  const requireAuth = (action: string = 'realizar esta ação'): boolean => {
    if (!isAuthenticated) {
      toast({
        title: 'Acesso negado',
        description: `Você precisa estar logado para ${action}`,
        variant: 'destructive',
      });
      return false;
    }
    return true;
  };

  return {
    isAuthenticated,
    user,
    requireAuth
  };
};
