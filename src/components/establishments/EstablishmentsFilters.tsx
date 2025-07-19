
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"

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
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900">Filtros</h3>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="w-4 h-4 mr-1" />
            Limpar
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
            <Label>Cidade</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {filters.city || 'Todas as cidades'}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem onClick={() => onFilterChange({ city: '' })}>
                  Todas as cidades
                </DropdownMenuItem>
                {cities.map(city => (
                  <DropdownMenuItem key={city} onClick={() => onFilterChange({ city })}>
                    {city}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Type Filter */}
          <div className="space-y-2">
            <Label>Tipo do Local</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {filters.type || 'Todos os tipos'}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem onClick={() => onFilterChange({ type: '' })}>
                  Todos os tipos
                </DropdownMenuItem>
                {establishmentTypes.map(type => (
                  <DropdownMenuItem key={type} onClick={() => onFilterChange({ type })}>
                    {type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Sports Filter */}
          <div className="space-y-2">
            <Label>Modalidades</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {filters.sports.length > 0 ? `${filters.sports.length} selecionadas` : 'Modalidades'}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {sportsOptions.map(sport => (
                  <DropdownMenuCheckboxItem
                    key={sport}
                    checked={filters.sports.includes(sport)}
                    onCheckedChange={() => handleSportToggle(sport)}
                  >
                    {sport}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Amenities Filter */}
          <div className="space-y-2">
            <Label>Estrutura</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {filters.amenities.length > 0 ? `${filters.amenities.length} selecionadas` : 'Estrutura'}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {amenitiesOptions.map(amenity => (
                  <DropdownMenuCheckboxItem
                    key={amenity}
                    checked={filters.amenities.includes(amenity)}
                    onCheckedChange={() => handleAmenityToggle(amenity)}
                  >
                    {amenity}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EstablishmentsFilters;
