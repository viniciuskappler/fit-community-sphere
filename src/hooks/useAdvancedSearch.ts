
import { useState, useMemo } from 'react';
import { EstablishmentWithDetails } from './useEstablishments';
import { SportsGroupWithDetails } from './useSportsGroups';
import { SearchFilters, defaultFilters } from '@/types/searchTypes';
import { filterEstablishments, filterGroups } from '@/utils/searchFilters';
import { sortResults } from '@/utils/searchSorting';

export const useAdvancedSearch = (
  establishments: EstablishmentWithDetails[] = [],
  groups: SportsGroupWithDetails[] = [],
  userLocation?: { lat: number; lng: number }
) => {
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);

  const filteredEstablishments = useMemo(() => {
    return filterEstablishments(establishments, filters, userLocation);
  }, [establishments, filters, userLocation]);

  const filteredGroups = useMemo(() => {
    return filterGroups(groups, filters, userLocation);
  }, [groups, filters, userLocation]);

  const sortedEstablishments = useMemo(() => {
    return sortResults(filteredEstablishments, filters, 'establishment', userLocation);
  }, [filteredEstablishments, filters, userLocation]);

  const sortedGroups = useMemo(() => {
    return sortResults(filteredGroups, filters, 'group', userLocation);
  }, [filteredGroups, filters, userLocation]);

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  return {
    filters,
    updateFilters,
    clearFilters,
    filteredEstablishments: sortedEstablishments,
    filteredGroups: sortedGroups,
    totalResults: sortedEstablishments.length + sortedGroups.length
  };
};

// Re-export the interface for backward compatibility
export type { SearchFilters } from '@/types/searchTypes';
