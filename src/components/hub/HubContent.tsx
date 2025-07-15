
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SearchAndFilter from '@/components/SearchAndFilter';
import MapLibre from '@/components/MapLibre';
import AdvancedFilters, { AdvancedFiltersState } from '@/components/hub/AdvancedFilters';
import ImprovedResultsList from '@/components/hub/ImprovedResultsList';
import SmartRecommendations from '@/components/SmartRecommendations';
import DevelopmentModal from '@/components/DevelopmentModal';
import { useDevelopmentModal } from '@/hooks/useDevelopmentModal';
import { EstablishmentWithDetails } from '@/hooks/useEstablishments';
import { SportsGroupWithDetails } from '@/hooks/useSportsGroups';

interface HubContentProps {
  user: any;
  location: { lat: number; lng: number } | null;
  isLocating: boolean;
  requestPermission: () => void;
  establishments: EstablishmentWithDetails[];
  groups: SportsGroupWithDetails[];
  isLoading: boolean;
  filters: any;
  updateFilters: (filters: any) => void;
  clearFilters: () => void;
  filteredEstablishments: EstablishmentWithDetails[];
  filteredGroups: SportsGroupWithDetails[];
  totalResults: number;
}

const HubContent: React.FC<HubContentProps> = ({
  user,
  location,
  isLocating,
  requestPermission,
  isLoading,
  filters,
  updateFilters,
  clearFilters,
  filteredEstablishments,
  filteredGroups,
  totalResults
}) => {
  const [activeTab, setActiveTab] = useState('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const { isOpen, showDevelopmentModal, closeDevelopmentModal } = useDevelopmentModal();

  const handleSearch = (term: string) => {
    updateFilters({ searchTerm: term });
  };

  const handleLocationSearch = () => {
    if (!location) {
      requestPermission();
    }
  };

  const handleFiltersChange = (newFilters: AdvancedFiltersState) => {
    updateFilters(newFilters);
  };

  const handleSortChange = (sortBy: string) => {
    updateFilters({ sortBy: sortBy as any });
  };

  // Preparar dados para o mapa
  const mapEstablishments = (activeTab === 'all' || activeTab === 'establishments') ? filteredEstablishments : [];
  const mapGroups = (activeTab === 'all' || activeTab === 'groups') ? filteredGroups : [];

  // Preparar dados filtrados por aba
  const getFilteredData = () => {
    switch (activeTab) {
      case 'establishments':
        return { establishments: filteredEstablishments, groups: [] };
      case 'groups':
        return { establishments: [], groups: filteredGroups };
      default:
        return { establishments: filteredEstablishments, groups: filteredGroups };
    }
  };

  const { establishments: displayEstablishments, groups: displayGroups } = getFilteredData();

  return (
    <>
      {/* Header da página */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Hub Esportivo
        </h1>
        <p className="text-gray-600">
          Encontre estabelecimentos e grupos esportivos próximos a você
        </p>
      </div>

      {/* Barra de busca */}
      <SearchAndFilter
        onSearch={handleSearch}
        onLocationSearch={handleLocationSearch}
        isLocating={isLocating}
      />

      {/* Filtros Avançados */}
      <div className="mb-6">
        <AdvancedFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={clearFilters}
          isOpen={showAdvancedFilters}
          onToggle={() => setShowAdvancedFilters(!showAdvancedFilters)}
        />
      </div>

      {/* Recomendações Inteligentes */}
      {!filters.searchTerm && totalResults > 0 && (
        <div className="mb-8">
          <SmartRecommendations
            userId={user?.id}
            userPreferences={[]}
          />
        </div>
      )}

      {/* Conteúdo Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de resultados */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-6">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="establishments">Locais</TabsTrigger>
                <TabsTrigger value="groups">Grupos</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                </div>
              ) : (
                <ImprovedResultsList
                  establishments={displayEstablishments}
                  groups={displayGroups}
                  sortBy={filters.sortBy}
                  onSortChange={handleSortChange}
                  userLocation={location || undefined}
                />
              )}
            </TabsContent>

            <TabsContent value="establishments" className="space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                </div>
              ) : (
                <ImprovedResultsList
                  establishments={displayEstablishments}
                  groups={[]}
                  sortBy={filters.sortBy}
                  onSortChange={handleSortChange}
                  userLocation={location || undefined}
                />
              )}
            </TabsContent>

            <TabsContent value="groups" className="space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                </div>
              ) : (
                <ImprovedResultsList
                  establishments={[]}
                  groups={displayGroups}
                  sortBy={filters.sortBy}
                  onSortChange={handleSortChange}
                  userLocation={location || undefined}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Mapa */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <MapLibre
              establishments={mapEstablishments.map(est => ({
                id: est.id,
                establishment_name: est.nome || '',
                latitude: est.latitude || 0,
                longitude: est.longitude || 0,
                city: est.cidade || '',
                state: est.estado || '',
                sports: est.modalidades || []
              }))}
              groups={mapGroups.map(group => ({
                id: group.id,
                group_name: group.nome || '',
                latitude: group.latitude || 0,
                longitude: group.longitude || 0,
                cities: [group.cidade || ''],
                sports: group.modalidade ? [group.modalidade] : []
              }))}
              center={location || { lat: -23.5505, lng: -46.6333 }}
              zoom={location ? 12 : 11}
              height="600px"
              onMarkerClick={(item) => {
                console.log('Marker clicked:', item);
              }}
            />
          </div>
        </div>
      </div>

      <DevelopmentModal 
        isOpen={isOpen} 
        onClose={closeDevelopmentModal} 
      />
    </>
  );
};

export default HubContent;
