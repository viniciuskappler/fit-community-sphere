// Hook simplificado para dados do hub
import { useEstablishments } from '@/hooks/useEstablishments';
import { useSportsGroups } from '@/hooks/useSportsGroups';

export const useHubData = () => {
  const { establishments, loading: establishmentsLoading, error: establishmentsError } = useEstablishments();
  const { groups, loading: groupsLoading, error: groupsError } = useSportsGroups();

  return {
    establishments,
    groups,
    loading: establishmentsLoading || groupsLoading,
    error: establishmentsError || groupsError,
    refetch: () => {
      // Simplified refetch
    }
  };
};