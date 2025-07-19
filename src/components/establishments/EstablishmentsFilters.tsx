
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface EstablishmentFilters {
  name: string;
  city: string;
  type: string;
  sports: string[];
  amenities: string[];
}

interface EstablishmentsFiltersProps {
  filters: EstablishmentFilters;
  onFilterChange: (filters: Partial<EstablishmentFilters>) => void;
}

const cities = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Brasília', 'Salvador', 'Fortaleza'];
const establishmentTypes = ['Academia', 'Box CrossFit', 'Estúdio', 'Centro Aquático', 'Arena', 'Clínica'];
const sportsOptions = [
  'Musculação', 'CrossFit', 'Pilates', 'Yoga', 'Natação', 'Hidroginástica',
  'Vôlei de Praia', 'Beach Tennis', 'Futevôlei', 'Meditação', 'Aqua Fitness'
];
const amenitiesOptions = [
  'Estacionamento', 'Vestiário', 'Ar condicionado', 'Personal trainer',
  'Equipamentos CrossFit', 'Área externa', 'Piscina aquecida', 'Sauna',
  'Sala climatizada', 'Tapetes inclusos', 'Quadras de areia', 'Lanchonete'
];

const EstablishmentsFilters: React.FC<EstablishmentsFiltersProps> = ({
  filters,
  onFilterChange
}) => {
  const handleSportToggle = (sport: string) => {
    const newSports = filters.sports.includes(sport)
      ? filters.sports.filter(s => s !== sport)
      : [...filters.sports, sport];
    onFilterChange({ sports: newSports });
  };

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    onFilterChange({ amenities: newAmenities });
  };

  const clearFilters = () => {
    onFilterChange({
      name: '',
      city: '',
      type: '',
      sports: [],
      amenities: []
    });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900">Filtros</h3>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="w-4 h-4 mr-1" />
            Limpar
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Name Filter */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Local</Label>
            <Input
              id="name"
              value={filters.name}
              onChange={(e) => onFilterChange({ name: e.target.value })}
              placeholder="Buscar por nome..."
            />
          </div>

          {/* City Filter */}
          <div className="space-y-2">
            <Label htmlFor="city">Cidade</Label>
            <select
              id="city"
              value={filters.city}
              onChange={(e) => onFilterChange({ city: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Todas as cidades</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="space-y-2">
            <Label htmlFor="type">Tipo do Local</Label>
            <select
              id="type"
              value={filters.type}
              onChange={(e) => onFilterChange({ type: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Todos os tipos</option>
              {establishmentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Sports Filter */}
        <div className="mt-4">
          <Label className="text-sm font-medium">Modalidades</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {sportsOptions.map(sport => (
              <button
                key={sport}
                onClick={() => handleSportToggle(sport)}
                className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                  filters.sports.includes(sport)
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
        </div>

        {/* Amenities Filter */}
        <div className="mt-4">
          <Label className="text-sm font-medium">Estrutura</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {amenitiesOptions.map(amenity => (
              <button
                key={amenity}
                onClick={() => handleAmenityToggle(amenity)}
                className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                  filters.amenities.includes(amenity)
                    ? 'bg-green-500 text-white border-green-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-green-300'
                }`}
              >
                {amenity}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EstablishmentsFilters;
