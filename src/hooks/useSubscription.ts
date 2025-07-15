// Hook simplificado para assinaturas - temporariamente desabilitado
import { useState } from 'react';

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
  const [subscriptions] = useState<UserSubscription[]>([]);
  const [loading] = useState(false);

  const hasActivePlan = (type: string) => {
    return false; // Temporariamente desabilitado
  };

  const getActivePlan = (type: string) => {
    return undefined; // Temporariamente desabilitado
  };

  const fetchUserSubscriptions = async () => {
    // Temporariamente desabilitado
    console.log('Subscriptions temporarily disabled');
  };

  return {
    subscriptions,
    loading,
    hasActivePlan,
    getActivePlan,
    refetch: fetchUserSubscriptions
  };
};