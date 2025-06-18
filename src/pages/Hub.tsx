
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
      
      <main className="pt-[120px] px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <HubHeader user={user} locationError={locationError} />

          <SearchAndFilter
            onSearch={handleSearch}
            onLocationSearch={handleLocationSearch}
            isLocating={locationLoading}
          />

          <Tabs defaultValue="map-view" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="map-view">Vista do Mapa</TabsTrigger>
              <TabsTrigger value="establishments">
                Estabelecimentos ({filteredEstablishments.length})
              </TabsTrigger>
              <TabsTrigger value="groups">
                Grupos Esportivos ({filteredGroups.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="map-view" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="establishments" className="mt-6">
              <TabContentEstablishments
                establishmentsLoading={establishmentsLoading}
                filteredEstablishments={filteredEstablishments}
                searchTerm={searchTerm}
                refetchEstablishments={refetchEstablishments}
              />
            </TabsContent>

            <TabsContent value="groups" className="mt-6">
              <TabContentGroups
                groupsLoading={groupsLoading}
                filteredGroups={filteredGroups}
                searchTerm={searchTerm}
                refetchGroups={refetchGroups}
              />
            </TabsContent>
          </Tabs>

          <CallToAction />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Hub;
