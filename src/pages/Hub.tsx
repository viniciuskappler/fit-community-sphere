import React, { useState, useMemo, useEffect } from 'react';
import { MapPin, Filter, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import Header from '../components/Header';
import SecondaryHeader from '../components/SecondaryHeader';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import EstablishmentCard, { Establishment } from '../components/hub/EstablishmentCard';
import GroupCard, { Group } from '../components/hub/GroupCard';

const Hub = () => {
  console.log('🚀 Hub component is starting to load...');
  
  const { user } = useAuth();
  console.log('👤 User from auth context:', user);
  
  const [selectedRegion, setSelectedRegion] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);

  console.log('📊 Current state:', {
    selectedRegion,
    searchTerm,
    selectedSport,
    searchType,
    establishmentsCount: establishments.length,
    groupsCount: groups.length,
    loading
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

  // Buscar dados reais do banco
  useEffect(() => {
    console.log('⚡ Hub useEffect triggered - about to fetch data');
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log('🔄 Starting fetchData function...');
    setLoading(true);
    
    try {
      console.log('🏢 Fetching establishments from Supabase...');
      
      // Buscar estabelecimentos
      const { data: establishmentsData, error: establishmentsError } = await supabase
        .from('establishments')
        .select(`
          id,
          establishment_name,
          address,
          city,
          state,
          establishment_sports(sport_name)
        `);

      if (establishmentsError) {
        console.error('❌ Error fetching establishments:', establishmentsError);
      } else {
        console.log('✅ Establishments data fetched successfully:', establishmentsData);
      }

      if (establishmentsData) {
        const formattedEstablishments: Establishment[] = establishmentsData.map(est => ({
          id: est.id,
          name: est.establishment_name,
          type: 'establishment',
          sports: est.establishment_sports?.map((s: any) => s.sport_name) || [],
          region: `${est.city} - ${est.state}`,
          address: est.address,
          image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop'
        }));
        console.log('🏢 Formatted establishments:', formattedEstablishments);
        setEstablishments(formattedEstablishments);
      }

      console.log('👥 Fetching groups from Supabase...');

      // Buscar grupos esportivos
      const { data: groupsData, error: groupsError } = await supabase
        .from('sports_groups')
        .select(`
          id,
          group_name,
          cities,
          description,
          group_sports(sport_name)
        `);

      if (groupsError) {
        console.error('❌ Error fetching groups:', groupsError);
      } else {
        console.log('✅ Groups data fetched successfully:', groupsData);
      }

      if (groupsData) {
        const formattedGroups: Group[] = groupsData.map(group => ({
          id: group.id,
          name: group.group_name,
          type: 'group',
          sports: group.group_sports?.map((s: any) => s.sport_name) || [],
          region: group.cities?.[0] || '',
          members: Math.floor(Math.random() * 30) + 10, // Número aleatório por enquanto
          meeting_point: group.description || 'Local a definir',
          image: 'https://images.unsplash.com/photo-1512428208316-80f034d026a7?q=80&w=1974&auto=format&fit=crop'
        }));
        console.log('👥 Formatted groups:', formattedGroups);
        setGroups(formattedGroups);
      }

    } catch (error) {
      console.error('💥 Unexpected error in fetchData:', error);
    } finally {
      setLoading(false);
      console.log('🏁 Data fetching completed');
    }
  };

  const allData = [...establishments, ...groups];
  console.log('📋 Combined data:', allData);

  const filteredResults = useMemo(() => {
    console.log('🔍 Filtering results with:', { selectedRegion, selectedSport, searchTerm, searchType });
    
    if (!selectedRegion) {
      console.log('🚫 No region selected, returning empty array');
      return [];
    }

    const filtered = allData.filter(item => {
      const regionMatch = item.region.includes(selectedRegion.split(' - ')[0]) || item.region === selectedRegion;
      const sportMatch = !selectedSport || item.sports.includes(selectedSport);
      const searchTermMatch = !searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const typeMatch = searchType === 'all' || item.type === searchType;
      return regionMatch && sportMatch && searchTermMatch && typeMatch;
    });
    
    console.log('✅ Filtered results:', filtered);
    return filtered;
  }, [selectedRegion, selectedSport, searchTerm, searchType, allData]);

  console.log('🎨 Hub component is rendering...');

  return (
    <div className="min-h-screen bg-gray-50">
      <SecondaryHeader isVisible={true} />
      <Header isSecondaryVisible={true} />
      
      <main className="pt-[120px] px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Explore o Universo Esportivo
            </h1>
            <p className="text-lg text-gray-600">
              Encontre atividades, locais e grupos esportivos na sua região.
            </p>
            {user && (
              <p className="text-sm text-orange-600 mt-2">
                Bem-vindo, {user.user_metadata?.full_name || user.email}!
              </p>
            )}
            
            {/* Debug info - remover depois */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg text-left text-sm">
              <p><strong>Debug Info:</strong></p>
              <p>User: {user ? '✅ Logado' : '❌ Não logado'}</p>
              <p>Establishments: {establishments.length}</p>
              <p>Groups: {groups.length}</p>
              <p>Loading: {loading ? 'Sim' : 'Não'}</p>
            </div>
          </div>

          {/* Filtros de busca */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
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
                    <SelectItem value="todas">Todas as modalidades</SelectItem>
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

              <div className="lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar
                </label>
                <Input
                  placeholder="Nome do local ou grupo"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="w-full">
                <Button 
                  className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
                  onClick={fetchData}
                  disabled={loading}
                >
                  <Search size={16} className="mr-2" />
                  {loading ? 'Buscando...' : 'Buscar'}
                </Button>
              </div>
            </div>
          </div>

          {/* Área do mapa e resultados */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Mapa */}
            <div className="lg:col-span-2">
              <div className="bg-gray-100 rounded-xl h-[600px] flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <MapPin size={48} className="text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Mapa Interativo
                  </h3>
                  <p className="text-gray-500 max-w-sm">
                    {selectedRegion 
                      ? "O mapa exibirá os resultados da sua busca. Clique em um pino para ver detalhes."
                      : "Selecione uma região para visualizar o mapa com locais e grupos."
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Lista de resultados */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 h-[600px] flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex-shrink-0">
                  Resultados da Busca
                  {filteredResults.length > 0 && (
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      ({filteredResults.length} encontrado{filteredResults.length !== 1 ? 's' : ''})
                    </span>
                  )}
                </h3>
                
                <div className="flex-grow overflow-y-auto pr-2 -mr-2">
                  {loading ? (
                    <div className="text-center py-8 h-full flex flex-col justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mb-4"></div>
                      <p className="text-gray-500">Carregando dados...</p>
                    </div>
                  ) : selectedRegion ? (
                    filteredResults.length > 0 ? (
                      <div className="space-y-4">
                        {filteredResults.map(item =>
                          item.type === 'establishment' ? (
                            <EstablishmentCard key={item.id} establishment={item as Establishment} />
                          ) : (
                            <GroupCard key={item.id} group={item as Group} />
                          )
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8 h-full flex flex-col justify-center items-center">
                        <Search size={32} className="text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">
                          Nenhum resultado encontrado. Tente ajustar seus filtros.
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="text-center py-8 h-full flex flex-col justify-center items-center">
                      <Filter size={32} className="text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">
                        Selecione uma região para ver os resultados.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Informações adicionais */}
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
