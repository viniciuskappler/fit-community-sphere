
import React, { useState } from 'react';
import Header from '../components/Header';
import SecondaryHeader from '../components/SecondaryHeader';
import Footer from '../components/Footer';
import SearchAndFilter from '../components/SearchAndFilter';
import EstablishmentCard from '../components/EstablishmentCard';
import SportsGroupCard from '../components/SportsGroupCard';
import { useGeolocation } from '../hooks/useGeolocation';
import { useEstablishments } from '../hooks/useEstablishments';
import { useSportsGroups } from '../hooks/useSportsGroups';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Loader2 } from 'lucide-react';

const Mapa = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { latitude, longitude, loading: locationLoading, error: locationError } = useGeolocation();
  
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

  return (
    <div className="min-h-screen bg-gray-50">
      <SecondaryHeader isVisible={true} />
      <Header isSecondaryVisible={true} />
      
      <main className="pt-[120px] px-4 md:px-8">
        <div className="max-w-7xl mx-auto py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              <MapPin className="inline-block w-8 h-8 mr-2 text-orange-500" />
              Mapa de Estabelecimentos e Grupos
            </h1>
            <p className="text-lg text-gray-600">
              Encontre estabelecimentos e grupos esportivos próximos à você
            </p>
            {locationError && (
              <p className="text-sm text-red-500 mt-2">
                {locationError}
              </p>
            )}
          </div>

          <SearchAndFilter
            onSearch={handleSearch}
            onLocationSearch={handleLocationSearch}
            isLocating={locationLoading}
          />

          <Tabs defaultValue="establishments" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="establishments">
                Estabelecimentos ({filteredEstablishments.length})
              </TabsTrigger>
              <TabsTrigger value="groups">
                Grupos Esportivos ({filteredGroups.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="establishments" className="mt-6">
              {establishmentsLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin" />
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

            <TabsContent value="groups" className="mt-6">
              {groupsLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin" />
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Mapa;
