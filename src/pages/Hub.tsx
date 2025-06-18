
import React, { useState, useMemo, useEffect } from 'react';
import { MapPin, Filter, Search, Star, Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useEstablishments } from '@/hooks/useEstablishments';
import { useSportsGroups } from '@/hooks/useSportsGroups';
import Header from '../components/Header';
import SecondaryHeader from '../components/SecondaryHeader';
import Footer from '../components/Footer';
import SearchAndFilter from '../components/SearchAndFilter';
import EstablishmentCard from '../components/EstablishmentCard';
import SportsGroupCard from '../components/SportsGroupCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Hub = () => {
  console.log('🚀 Hub component is starting to load...');
  
  const { user } = useAuth();
  const { latitude, longitude, loading: locationLoading, error: locationError } = useGeolocation();
  
  const [selectedRegion, setSelectedRegion] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
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

  const regions = [
    'São Paulo - SP',
    'Rio de Janeiro - RJ',
    'Belo Horizonte - MG',
    'Porto Alegre - RS',
    'Salvador - BA',
    'Brasília - DF',
    'Fortaleza - CE',
    'Recife - PE'
  ];

  const sports = [
    'Futebol',
    'Vôlei',
    'Basquete',
    'Tênis',
    'Natação',
    'Corrida',
    'Ciclismo',
    'Academia'
  ];

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
      const sportMatch = !selectedSport || item.sports.includes(selectedSport);
      const searchTermMatch = !searchTerm || item.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
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
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Hub do Núcleo do Esporte
            </h1>
            <p className="text-lg text-gray-600">
              Encontre, avalie e conecte-se com estabelecimentos e grupos esportivos.
            </p>
            {user && (
              <p className="text-sm text-orange-600 mt-2">
                Bem-vindo, {user.user_metadata?.full_name || user.email}!
              </p>
            )}
            {locationError && (
              <p className="text-sm text-red-500 mt-2">
                {locationError}
              </p>
            )}
          </div>

          {/* Search and Filter Component */}
          <SearchAndFilter
            onSearch={handleSearch}
            onLocationSearch={handleLocationSearch}
            isLocating={locationLoading}
          />

          {/* Tabs for different views */}
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

            {/* Map View Tab */}
            <TabsContent value="map-view" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Filters for Map View */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Filtros de Busca
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Região
                        </label>
                        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione sua região" />
                          </SelectTrigger>
                          <SelectContent>
                            {regions.map((region) => (
                              <SelectItem key={region} value={region}>
                                {region}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Modalidade
                        </label>
                        <Select value={selectedSport} onValueChange={setSelectedSport}>
                          <SelectTrigger>
                            <SelectValue placeholder="Todas as modalidades" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Todas as modalidades</SelectItem>
                            {sports.map((sport) => (
                              <SelectItem key={sport} value={sport}>
                                {sport}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo
                        </label>
                        <Select value={searchType} onValueChange={setSearchType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Todos os tipos" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="establishment">Estabelecimentos</SelectItem>
                            <SelectItem value="group">Grupos Esportivos</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Results List */}
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 max-h-[600px] overflow-y-auto">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Resultados 
                      {regionFilteredResults.length > 0 && (
                        <span className="text-sm font-normal text-gray-500 ml-2">
                          ({regionFilteredResults.length})
                        </span>
                      )}
                    </h3>
                    
                    {selectedRegion ? (
                      regionFilteredResults.length > 0 ? (
                        <div className="space-y-4">
                          {regionFilteredResults.map(item => {
                            if ('establishment_name' in item) {
                              return (
                                <EstablishmentCard
                                  key={item.id}
                                  establishment={item}
                                  onFavoriteChange={() => refetchEstablishments()}
                                />
                              );
                            } else {
                              return (
                                <SportsGroupCard
                                  key={item.id}
                                  group={item}
                                  onFavoriteChange={() => refetchGroups()}
                                />
                              );
                            }
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Search size={32} className="text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">
                            Nenhum resultado encontrado para esta região.
                          </p>
                        </div>
                      )
                    ) : (
                      <div className="text-center py-8">
                        <Filter size={32} className="text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">
                          Selecione uma região para ver os resultados.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Interactive Map */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Mapa Interativo
                    </h3>
                    <div className="bg-gray-100 rounded-xl h-[600px] flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <MapPin size={48} className="text-gray-400 mx-auto mb-4" />
                        <h4 className="text-xl font-semibold text-gray-600 mb-2">
                          Mapa em Desenvolvimento
                        </h4>
                        <p className="text-gray-500 max-w-sm">
                          {selectedRegion 
                            ? `Mapa mostrará ${regionFilteredResults.length} resultados para ${selectedRegion}`
                            : "Selecione uma região para visualizar os locais no mapa"
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Establishments Tab */}
            <TabsContent value="establishments" className="mt-6">
              {establishmentsLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mb-4"></div>
                  <span className="ml-2">Carregando estabelecimentos...</span>
                </div>
              ) : filteredEstablishments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredEstablishments.map((establishment) => (
                    <EstablishmentCard
                      key={establishment.id}
                      establishment={establishment}
                      onFavoriteChange={() => refetchEstablishments()}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    {searchTerm
                      ? `Nenhum estabelecimento encontrado para "${searchTerm}"`
                      : 'Nenhum estabelecimento cadastrado ainda'}
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Groups Tab */}
            <TabsContent value="groups" className="mt-6">
              {groupsLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mb-4"></div>
                  <span className="ml-2">Carregando grupos...</span>
                </div>
              ) : filteredGroups.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredGroups.map((group) => (
                    <SportsGroupCard
                      key={group.id}
                      group={group}
                      onFavoriteChange={() => refetchGroups()}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    {searchTerm
                      ? `Nenhum grupo encontrado para "${searchTerm}"`
                      : 'Nenhum grupo cadastrado ainda'}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Call to Action */}
          <div className="mt-12 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Não encontrou o que procura?
              </h2>
              <p className="text-gray-600 mb-6">
                Cadastre seu estabelecimento ou grupo esportivo e faça parte da nossa rede!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline"
                  className="border-orange-300 text-orange-600 hover:bg-orange-50"
                  onClick={() => window.location.href = '/estabelecimento'}
                >
                  Cadastrar Estabelecimento
                </Button>
                <Button 
                  variant="outline"
                  className="border-orange-300 text-orange-600 hover:bg-orange-50"
                  onClick={() => window.location.href = '/grupo-esportivo'}
                >
                  Cadastrar Grupo Esportivo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Hub;
