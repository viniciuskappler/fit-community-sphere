
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Plan {
  id: string;
  name: string;
  type: string;
  price_monthly: number;
  price_yearly: number;
  features: string[];
  is_free: boolean;
  active: boolean;
}

interface UserSubscription {
  id: string;
  plan_id: string;
  status: string;
  current_period_end: string;
  plan: Plan;
}

export const useSubscription = () => {
  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Função para verificar se há desconto de beta tester
  const isBetaTesterDiscountActive = () => {
    const betaDiscountEndDate = new Date('2025-08-10T23:59:59');
    return new Date() < betaDiscountEndDate;
  };

  // Aplicar desconto de 50% para Beta Tester se estiver no período
  const getDiscountedPrice = (price: number) => {
    return isBetaTesterDiscountActive() ? price / 2 : price;
  };

  // Verificar se o usuário tem um plano ativo de determinado tipo
  const hasActivePlan = (type: string) => {
    return subscriptions.some(sub => 
      sub.plan.type === type && 
      sub.status === 'active' && 
      new Date(sub.current_period_end) > new Date()
    );
  };

  // Obter plano ativo de determinado tipo
  const getActivePlan = (type: string) => {
    return subscriptions.find(sub => 
      sub.plan.type === type && 
      sub.status === 'active' && 
      new Date(sub.current_period_end) > new Date()
    );
  };

  // Buscar planos disponíveis
  const fetchPlans = async () => {
    try {
      console.log('🔍 Buscando planos...');
      setError(null);
      
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('active', true)
        .order('is_free', { ascending: true });
      
      if (error) {
        console.error('❌ Erro na query de planos:', error);
        throw error;
      }
      
      console.log('✅ Planos carregados:', data?.length || 0);
      setPlans(data as Plan[] || []);
    } catch (error: any) {
      console.error('❌ Erro ao buscar planos:', error.message);
      setError(`Erro ao carregar planos: ${error.message}`);
      setPlans([]);
    }
  };

  // Buscar assinaturas do usuário
  const fetchUserSubscriptions = async () => {
    setLoading(true);
    try {
      console.log('🔍 Buscando assinaturas do usuário...');
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log('ℹ️ Usuário não logado');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('user_subscriptions')
        .select(`
          *,
          plan:plan_id(*)
        `)
        .eq('user_id', user.id);
      
      if (error) {
        console.error('❌ Erro na query de assinaturas:', error);
        throw error;
      }
      
      console.log('✅ Assinaturas carregadas:', data?.length || 0);
      setSubscriptions(data as UserSubscription[] || []);
    } catch (error: any) {
      console.error('❌ Erro ao buscar assinaturas:', error.message);
      setError(`Erro ao carregar assinaturas: ${error.message}`);
      setSubscriptions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('🚀 Inicializando useSubscription...');
    fetchPlans();
    fetchUserSubscriptions();
  }, []);

  return {
    subscriptions,
    plans,
    loading,
    error,
    hasActivePlan,
    getActivePlan,
    isBetaTesterDiscountActive,
    getDiscountedPrice,
    refetch: fetchUserSubscriptions
  };
};
