
import React from 'react';
import { Search, MapPin, Award, Activity } from 'lucide-react';

interface FiltersProps {
  filters: {
    cidade: string;
    especialidade: string;
    modalidade: string;
  };
  onFiltersChange: (filters: any) => void;
}

const ProfessionalsFilters = ({ filters, onFiltersChange }: FiltersProps) => {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const cidades = [
    'São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Salvador', 'Brasília',
    'Curitiba', 'Porto Alegre', 'Recife', 'Fortaleza', 'Campinas'
  ];

  const especialidades = [
    'Personal Trainer', 'Fisioterapeuta', 'Nutricionista Esportivo',
    'Preparador Físico', 'Psicólogo Esportivo', 'Massagista',
    'Professor de Educação Física', 'Treinador'
  ];

  const modalidades = [
    'Futebol', 'Basquete', 'Vôlei', 'Tênis', 'Natação', 'Corrida',
    'Musculação', 'Crossfit', 'Pilates', 'Yoga', 'Artes Marciais'
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Search size={20} className="text-orange-500" />
        <h3 className="text-lg font-semibold text-gray-800">Filtros</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Cidade Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin size={16} className="inline mr-1" />
            Cidade
          </label>
          <select
            value={filters.cidade}
            onChange={(e) => handleFilterChange('cidade', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Todas as cidades</option>
            {cidades.map((cidade) => (
              <option key={cidade} value={cidade}>{cidade}</option>
            ))}
          </select>
        </div>

        {/* Especialidade Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Award size={16} className="inline mr-1" />
            Especialidade
          </label>
          <select
            value={filters.especialidade}
            onChange={(e) => handleFilterChange('especialidade', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Todas as especialidades</option>
            {especialidades.map((especialidade) => (
              <option key={especialidade} value={especialidade}>{especialidade}</option>
            ))}
          </select>
        </div>

        {/* Modalidade Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Activity size={16} className="inline mr-1" />
            Modalidade
          </label>
          <select
            value={filters.modalidade}
            onChange={(e) => handleFilterChange('modalidade', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Todas as modalidades</option>
            {modalidades.map((modalidade) => (
              <option key={modalidade} value={modalidade}>{modalidade}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalsFilters;
