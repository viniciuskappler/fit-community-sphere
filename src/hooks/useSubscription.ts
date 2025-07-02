import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Plan {
  id: string;
  name: string;
  type: string;
  price_monthly: number;
  price_yearly: number;
  features: any[];
  is_free: boolean;
}

interface UserSubscription {
  id: string;
  plan_id: string;
  status: string;
  current_period_end: string;
  plan: Plan;
}

export const useSubscription = () => {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserSubscriptions();
    }
  }, [user]);

  const fetchUserSubscriptions = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select(`
          *,
          plan:subscription_plans(*)
        `)
        .eq('user_id', user.id)
        .eq('status', 'active');

      if (error) throw error;
      setSubscriptions(data?.map(sub => ({
        ...sub,
        plan: {
          ...sub.plan,
          features: Array.isArray(sub.plan.features) ? sub.plan.features : []
        }
      })) || []);
    } catch (error) {
      console.error('Erro ao buscar assinaturas:', error);
    } finally {
      setLoading(false);
    }
  };

  const hasActivePlan = (type: string) => {
    return subscriptions.some(sub => 
      sub.plan.type === type && sub.status === 'active'
    );
  };

  const getActivePlan = (type: string) => {
    return subscriptions.find(sub => 
      sub.plan.type === type && sub.status === 'active'
    );
  };

  return {
    subscriptions,
    loading,
    hasActivePlan,
    getActivePlan,
    refetch: fetchUserSubscriptions
  };
};