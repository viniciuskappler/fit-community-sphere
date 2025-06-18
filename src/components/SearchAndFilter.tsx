
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, MapPin } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface SearchAndFilterProps {
  onSearch: (term: string) => void;
  onLocationSearch: () => void;
  isLocating?: boolean;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  onSearch,
  onLocationSearch,
  isLocating = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar estabelecimentos, grupos ou modalidades..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit">
          Buscar
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onLocationSearch}
          disabled={isLocating}
        >
          <MapPin className="w-4 h-4 mr-1" />
          {isLocating ? 'Localizando...' : 'Próximos a mim'}
        </Button>
      </form>

      <Collapsible open={showFilters} onOpenChange={setShowFilters}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <Filter className="w-4 h-4 mr-1" />
            Filtros avançados
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tipo</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option value="">Todos</option>
                <option value="establishment">Estabelecimentos</option>
                <option value="group">Grupos Esportivos</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Cidade</label>
              <Input placeholder="Digite a cidade..." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Modalidade</label>
              <Input placeholder="Digite a modalidade..." />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default SearchAndFilter;
