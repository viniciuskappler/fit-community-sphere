
import React from 'react';
import { Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterPanelProps {
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  selectedSport: string;
  setSelectedSport: (sport: string) => void;
  searchType: string;
  setSearchType: (type: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedRegion,
  setSelectedRegion,
  selectedSport,
  setSelectedSport,
  searchType,
  setSearchType,
}) => {
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
              <SelectItem value="all">Todas as modalidades</SelectItem>
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
  );
};

export default FilterPanel;
