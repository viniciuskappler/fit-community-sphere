import React, { useState, useMemo } from 'react';
import { MapPin, Filter, Search } from 'lucide-react';
import Header from '../components/Header';
import SecondaryHeader from '../components/SecondaryHeader';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import EstablishmentCard, { Establishment } from '../components/hub/EstablishmentCard';
import GroupCard, { Group } from '../components/hub/GroupCard';

const establishmentsData: Establishment[] = [
  { id: 'e1', name: 'Academia FitSport Power', type: 'establishment', sports: ['Musculação', 'Pilates', 'Yoga', 'Futebol'], region: 'São Paulo - SP', address: 'Rua Augusta, 123', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop' },
  { id: 'e2', name: 'Box CrossFit Pinheiros', type: 'establishment', sports: ['CrossFit', 'Academia'], region: 'São Paulo - SP', address: 'Av. Faria Lima, 456', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop' },
  { id: 'e3', name: 'Clube de Tênis Central', type: 'establishment', sports: ['Tênis', 'Beach Tennis'], region: 'Rio de Janeiro - RJ', address: 'Av. Atlântica, 789', image: 'https://images.unsplash.com/photo-1594420310243-63642a182b3a?q=80&w=2070&auto=format&fit=crop' },
  { id: 'e4', name: 'Aquatic Center', type: 'establishment', sports: ['Natação'], region: 'Belo Horizonte - MG', address: 'R. da Bahia, 1500', image: 'https://images.unsplash.com/photo-1612053639462-61348b037332?q=80&w=2070&auto=format&fit=crop' }
];

const groupsData: Group[] = [
  { id: 'g1', name: 'Grupo de Corrida Manhã', type: 'group', sports: ['Corrida', 'Caminhada'], region: 'São Paulo - SP', members: 15, meeting_point: 'Parque Ibirapuera, Portão 3', image: 'https://images.unsplash.com/photo-1512428208316-80f034d026a7?q=80&w=1974&auto=format&fit=crop' },
  { id: 'g2', name: 'Vôlei de Praia Copacabana', type: 'group', sports: ['Vôlei'], region: 'Rio de Janeiro - RJ', members: 22, meeting_point: 'Praia de Copacabana, Posto 4', image: 'https://images.unsplash.com/photo-1595179177695-8270e3957b47?q=80&w=2070&auto=format&fit=crop' },
  { id: 'g3', name: 'Pedal Savassi', type: 'group', sports: ['Ciclismo'], region: 'Belo Horizonte - MG', members: 30, meeting_point: 'Praça da Savassi', image: 'https://images.unsplash.com/photo-1471542326543-09403a0a2a49?q=80&w=2070&auto=format&fit=crop' },
];

const allData = [...establishmentsData, ...groupsData];

const Hub = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [searchType, setSearchType] = useState('all');

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

  const filteredResults = useMemo(() => {
    if (!selectedRegion) return [];

    return allData.filter(item => {
      const regionMatch = item.region === selectedRegion;
      const sportMatch = !selectedSport || item.sports.includes(selectedSport);
      const searchTermMatch = !searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const typeMatch = searchType === 'all' || item.type === searchType;
      return regionMatch && sportMatch && searchTermMatch && typeMatch;
    });
  }, [selectedRegion, selectedSport, searchTerm, searchType]);

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
                <Button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                  <Search size={16} className="mr-2" />
                  Buscar
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
                </h3>
                
                <div className="flex-grow overflow-y-auto pr-2 -mr-2">
                {selectedRegion ? (
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
