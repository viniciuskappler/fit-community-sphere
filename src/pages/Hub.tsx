
import React, { useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useEstablishments } from '@/hooks/useEstablishments';
import { useSportsGroups } from '@/hooks/useSportsGroups';
import Header from '../components/Header';
import SecondaryHeader from '../components/SecondaryHeader';
import Footer from '../components/Footer';
import SearchAndFilter from '../components/SearchAndFilter';
import HubHeader from '../components/hub/HubHeader';
import FilterPanel from '../components/hub/FilterPanel';
import ResultsList from '../components/hub/ResultsList';
import MapPlaceholder from '../components/hub/MapPlaceholder';
import CallToAction from '../components/hub/CallToAction';
import TabContentEstablishments from '../components/hub/TabContentEstablishments';
import TabContentGroups from '../components/hub/TabContentGroups';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Define the types locally to avoid import issues
interface EstablishmentWithDetails {
  id: string;
  establishment_name: string;
  city: string;
  state: string;
  sports: string[];
  photos: Array<{ photo_url: string; is_main: boolean }>;
  latitude?: number;
  longitude?: number;
}

interface SportsGroupWithDetails {
  id: string;
  group_name: string;
  cities: string[];
  sports: string[];
  latitude?: number | null;
  longitude?: number | null;
}

const Hub = () => {
  console.log('🚀 Hub component is starting to load...');
  
  const { user } = useAuth();
  const { latitude, longitude, loading: locationLoading, error: locationError } = useGeolocation();
  
  const [selectedRegion, setSelectedRegion] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [searchType, setSearchType] = useState('all');

  const {
    data: establishments = [],
    isLoading: establishmentsLoading,
    refetch: refetchEstablishments,
  } = useEstablishments(latitude, longitude);

  const {
    data: groups = [],
    isLoading: groupsLoading,
    refetch: refetchGroups,
  } = useSportsGroups(latitude, longitude);

  console.log('👤 User from auth context:', user);
  console.log('📊 Current state:', {
    selectedRegion,
    searchTerm,
    selectedSport,
    searchType,
    establishmentsCount: establishments.length,
    groupsCount: groups.length,
    locationLoading
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleLocationSearch = () => {
    if (latitude && longitude) {
      refetchEstablishments();
      refetchGroups();
    }
  };

  const filteredEstablishments = establishments.filter(est =>
    est.establishment_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    est.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    est.sports.some(sport => sport.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredGroups = groups.filter(group =>
    group.group_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.cities.some(city => city.toLowerCase().includes(searchTerm.toLowerCase())) ||
    group.sports.some(sport => sport.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const allData = [...establishments, ...groups];
  const regionFilteredResults = useMemo(() => {
    if (!selectedRegion) {
      return [];
    }

    const filtered = allData.filter(item => {
      const regionMatch = 'city' in item 
        ? item.city.includes(selectedRegion.split(' - ')[0]) || `${item.city} - ${item.state}` === selectedRegion
        : item.cities.some(city => city.includes(selectedRegion.split(' - ')[0]));
      const sportMatch = selectedSport === 'all' || item.sports.includes(selectedSport);
      const searchTermMatch = !searchTerm || 
        ('establishment_name' in item ? item.establishment_name.toLowerCase().includes(searchTerm.toLowerCase()) :
         'group_name' in item ? item.group_name.toLowerCase().includes(searchTerm.toLowerCase()) : false);
      const typeMatch = searchType === 'all' || 
        (searchType === 'establishment' && 'establishment_name' in item) ||
        (searchType === 'group' && 'group_name' in item);
      return regionMatch && sportMatch && searchTermMatch && typeMatch;
    });
    
    return filtered;
  }, [selectedRegion, selectedSport, searchTerm, searchType, allData]);

  return (
    <div className="min-h-screen bg-gray-50">
      <SecondaryHeader isVisible={true} />
      <Header isSecondaryVisible={true} />
      
      <main className="pt-[120px] px-4 md:px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <HubHeader user={user} locationError={locationError} />

          <SearchAndFilter
            onSearch={handleSearch}
            onLocationSearch={handleLocationSearch}
            isLocating={locationLoading}
          />

          <div className="mb-6">
            <Tabs defaultValue="map-view" className="w-full">
              <div className="mb-6">
                <TabsList className="grid w-full grid-cols-3 h-auto bg-white border border-gray-200 rounded-xl p-1 gap-1">
                  <TabsTrigger 
                    value="map-view" 
                    className="text-xs md:text-sm font-medium py-2 md:py-3 px-1 md:px-2 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-orange-400 data-[state=active]:text-white transition-all duration-300"
                  >
                    <span className="flex flex-col items-center gap-1">
                      <span>🗺️</span>
                      <span className="hidden sm:inline">Vista do Mapa</span>
                      <span className="sm:hidden">Mapa</span>
                    </span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="establishments" 
                    className="text-xs md:text-sm font-medium py-2 md:py-3 px-1 md:px-2 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-orange-400 data-[state=active]:text-white transition-all duration-300"
                  >
                    <span className="flex flex-col items-center gap-1">
                      <span>🏢</span>
                      <span className="hidden sm:inline">Estabelecimentos ({filteredEstablishments.length})</span>
                      <span className="sm:hidden">Locais ({filteredEstablishments.length})</span>
                    </span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="groups" 
                    className="text-xs md:text-sm font-medium py-2 md:py-3 px-1 md:px-2 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-orange-400 data-[state=active]:text-white transition-all duration-300"
                  >
                    <span className="flex flex-col items-center gap-1">
                      <span>👥</span>
                      <span className="hidden sm:inline">Grupos ({filteredGroups.length})</span>
                      <span className="sm:hidden">Grupos ({filteredGroups.length})</span>
                    </span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="map-view" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <FilterPanel
                      selectedRegion={selectedRegion}
                      setSelectedRegion={setSelectedRegion}
                      selectedSport={selectedSport}
                      setSelectedSport={setSelectedSport}
                      searchType={searchType}
                      setSearchType={setSearchType}
                    />

                    <ResultsList
                      selectedRegion={selectedRegion}
                      regionFilteredResults={regionFilteredResults}
                      refetchEstablishments={refetchEstablishments}
                      refetchGroups={refetchGroups}
                    />
                  </div>

                  <div className="lg:col-span-2">
                    <MapPlaceholder
                      selectedRegion={selectedRegion}
                      resultCount={regionFilteredResults.length}
                      establishments={selectedRegion ? regionFilteredResults.filter(item => 'establishment_name' in item) as EstablishmentWithDetails[] : filteredEstablishments}
                      groups={selectedRegion ? regionFilteredResults.filter(item => 'group_name' in item) as SportsGroupWithDetails[] : filteredGroups}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="establishments" className="mt-0">
                <TabContentEstablishments
                  establishmentsLoading={establishmentsLoading}
                  filteredEstablishments={filteredEstablishments}
                  searchTerm={searchTerm}
                  refetchEstablishments={refetchEstablishments}
                />
              </TabsContent>

              <TabsContent value="groups" className="mt-0">
                <TabContentGroups
                  groupsLoading={groupsLoading}
                  filteredGroups={filteredGroups}
                  searchTerm={searchTerm}
                  refetchGroups={refetchGroups}
                />
              </TabsContent>
            </Tabs>
          </div>

          <CallToAction />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Hub;
