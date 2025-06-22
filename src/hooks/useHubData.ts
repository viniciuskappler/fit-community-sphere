
import { useEstablishments } from '@/hooks/useEstablishments';
import { useSportsGroups } from '@/hooks/useSportsGroups';
import { useAdvancedSearch } from '@/hooks/useAdvancedSearch';
import { useGeolocation } from '@/hooks/useGeolocation';

export const useHubData = () => {
  const { location, error: locationError, requestPermission, isLocating } = useGeolocation();
  
  // Buscar dados
  const { data: establishments, isLoading: establishmentsLoading } = useEstablishments(location?.lat, location?.lng);
  const { data: groups, isLoading: groupsLoading } = useSportsGroups(location?.lat, location?.lng);

  // Sistema de busca avançada
  const {
    filters,
    updateFilters,
    clearFilters,
    filteredEstablishments,
    filteredGroups,
    totalResults
  } = useAdvancedSearch(establishments, groups, location || undefined);

  const isLoading = establishmentsLoading || groupsLoading;

  return {
    location,
    locationError,
    requestPermission,
    isLocating,
    establishments: establishments || [],
    groups: groups || [],
    isLoading,
    filters,
    updateFilters,
    clearFilters,
    filteredEstablishments,
    filteredGroups,
    totalResults
  };
};
