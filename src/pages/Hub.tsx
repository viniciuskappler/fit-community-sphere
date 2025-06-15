
import React, { useState } from 'react';
import { MapPin, Filter, Search } from 'lucide-react';
import Header from '../components/Header';
import SecondaryHeader from '../components/SecondaryHeader';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const Hub = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('');

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

  return (
    <div className="min-h-screen bg-white">
      <SecondaryHeader isVisible={true} />
      <Header isSecondaryVisible={true} />
      
      <main className="pt-[120px] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Hub do Núcleo do Esporte
            </h1>
            <p className="text-lg text-gray-600">
              Encontre atividades esportivas na sua região
            </p>
          </div>

          {/* Filtros de busca */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  Buscar
                </label>
                <Input
                  placeholder="Nome do local ou atividade"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex items-end">
                <Button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                  <Search size={16} className="mr-2" />
                  Buscar
                </Button>
              </div>
            </div>
          </div>

          {/* Área do mapa */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Mapa */}
            <div className="lg:col-span-2">
              <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <MapPin size={48} className="text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Mapa Interativo
                  </h3>
                  <p className="text-gray-500">
                    O mapa será exibido aqui mostrando estabelecimentos e grupos esportivos na região selecionada
                  </p>
                </div>
              </div>
            </div>

            {/* Lista de resultados */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Resultados da Busca
                </h3>
                
                {selectedRegion ? (
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-gray-800">Academia FitSport</h4>
                      <p className="text-sm text-gray-600 mb-2">Musculação, Pilates, Yoga</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin size={12} className="mr-1" />
                        <span>2.5 km de distância</span>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-gray-800">Grupo de Corrida Manhã</h4>
                      <p className="text-sm text-gray-600 mb-2">Corrida, Caminhada</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin size={12} className="mr-1" />
                        <span>1.8 km de distância</span>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-gray-800">Clube de Tênis Central</h4>
                      <p className="text-sm text-gray-600 mb-2">Tênis, Beach Tennis</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin size={12} className="mr-1" />
                        <span>3.2 km de distância</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Filter size={32} className="text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Selecione uma região para ver os resultados
                    </p>
                  </div>
                )}
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
