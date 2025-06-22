
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Clock, DollarSign, Star, Filter, X } from 'lucide-react';

export interface AdvancedFiltersState {
  distance: number[];
  priceRange: number[];
  categories: string[];
  amenities: string[];
  ratings: number[];
  openNow: boolean;
  hasParking: boolean;
  acceptsCards: boolean;
}

interface AdvancedFiltersProps {
  filters: AdvancedFiltersState;
  onFiltersChange: (filters: AdvancedFiltersState) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

const categories = [
  'Academia', 'Quadra de Futsal', 'Campo de Futebol', 'Quadra de Basquete',
  'Quadra de Vôlei', 'Quadra de Tênis', 'Piscina', 'Estúdio de Dança',
  'Centro de Artes Marciais', 'Crossfit', 'Pilates', 'Yoga'
];

const amenities = [
  'Estacionamento', 'Vestiário', 'Chuveiro', 'Lanchonete', 'Ar Condicionado',
  'Wi-Fi', 'Som Ambiente', 'Iluminação LED', 'Arquibancada', 'Acessibilidade'
];

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  isOpen,
  onToggle
}) => {
  const [localFilters, setLocalFilters] = useState<AdvancedFiltersState>(filters);

  const updateFilter = (key: keyof AdvancedFiltersState, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleCategory = (category: string) => {
    const newCategories = localFilters.categories.includes(category)
      ? localFilters.categories.filter(c => c !== category)
      : [...localFilters.categories, category];
    updateFilter('categories', newCategories);
  };

  const toggleAmenity = (amenity: string) => {
    const newAmenities = localFilters.amenities.includes(amenity)
      ? localFilters.amenities.filter(a => a !== amenity)
      : [...localFilters.amenities, amenity];
    updateFilter('amenities', newAmenities);
  };

  const hasActiveFilters = () => {
    return localFilters.distance[0] < 50 ||
           localFilters.priceRange[0] > 0 || localFilters.priceRange[1] < 500 ||
           localFilters.categories.length > 0 ||
           localFilters.amenities.length > 0 ||
           localFilters.ratings[0] > 0 ||
           localFilters.openNow ||
           localFilters.hasParking ||
           localFilters.acceptsCards;
  };

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        variant="outline"
        className="flex items-center gap-2"
      >
        <Filter size={16} />
        Filtros Avançados
        {hasActiveFilters() && (
          <Badge variant="secondary" className="ml-1">
            {[
              localFilters.categories.length,
              localFilters.amenities.length,
              localFilters.openNow ? 1 : 0,
              localFilters.hasParking ? 1 : 0,
              localFilters.acceptsCards ? 1 : 0
            ].reduce((a, b) => a + b, 0)}
          </Badge>
        )}
      </Button>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Filtros Avançados</CardTitle>
        <div className="flex gap-2">
          {hasActiveFilters() && (
            <Button
              onClick={onClearFilters}
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700"
            >
              <X size={16} className="mr-1" />
              Limpar
            </Button>
          )}
          <Button onClick={onToggle} variant="ghost" size="sm">
            <X size={16} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Distância */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-500" />
            <label className="text-sm font-medium">
              Distância: {localFilters.distance[0]}km
            </label>
          </div>
          <Slider
            value={localFilters.distance}
            onValueChange={(value) => updateFilter('distance', value)}
            max={50}
            min={1}
            step={1}
            className="w-full"
          />
        </div>

        {/* Faixa de Preço */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-gray-500" />
            <label className="text-sm font-medium">
              Preço: R$ {localFilters.priceRange[0]} - R$ {localFilters.priceRange[1]}
            </label>
          </div>
          <Slider
            value={localFilters.priceRange}
            onValueChange={(value) => updateFilter('priceRange', value)}
            max={500}
            min={0}
            step={10}
            className="w-full"
          />
        </div>

        {/* Avaliação Mínima */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Star size={16} className="text-gray-500" />
            <label className="text-sm font-medium">
              Avaliação mínima: {localFilters.ratings[0]} estrelas
            </label>
          </div>
          <Slider
            value={localFilters.ratings}
            onValueChange={(value) => updateFilter('ratings', value)}
            max={5}
            min={0}
            step={0.5}
            className="w-full"
          />
        </div>

        {/* Opções Rápidas */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-500" />
            <label className="text-sm font-medium">Opções</label>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="openNow"
                checked={localFilters.openNow}
                onCheckedChange={(checked) => updateFilter('openNow', checked)}
              />
              <label htmlFor="openNow" className="text-sm">Aberto agora</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasParking"
                checked={localFilters.hasParking}
                onCheckedChange={(checked) => updateFilter('hasParking', checked)}
              />
              <label htmlFor="hasParking" className="text-sm">Com estacionamento</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="acceptsCards"
                checked={localFilters.acceptsCards}
                onCheckedChange={(checked) => updateFilter('acceptsCards', checked)}
              />
              <label htmlFor="acceptsCards" className="text-sm">Aceita cartão</label>
            </div>
          </div>
        </div>

        {/* Categorias */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Modalidades</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={localFilters.categories.includes(category) ? "default" : "outline"}
                className="cursor-pointer hover:opacity-80"
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Comodidades */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Comodidades</label>
          <div className="flex flex-wrap gap-2">
            {amenities.map((amenity) => (
              <Badge
                key={amenity}
                variant={localFilters.amenities.includes(amenity) ? "default" : "outline"}
                className="cursor-pointer hover:opacity-80"
                onClick={() => toggleAmenity(amenity)}
              >
                {amenity}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedFilters;
