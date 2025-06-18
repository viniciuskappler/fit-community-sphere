
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface SearchAndFilterProps {
  onSearch: (term: string) => void;
  onLocationSearch: () => void;
  isLocating: boolean;
}

const SearchAndFilter = ({ onSearch, onLocationSearch, isLocating }: SearchAndFilterProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Buscar estabelecimentos, grupos esportivos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pr-20 h-12 text-sm md:text-base bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-500"
          />
          <Button
            onClick={handleSearch}
            className="absolute right-1 top-1 h-10 px-4 bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white border-0"
          >
            <Search size={16} />
            <span className="ml-2 hidden sm:inline text-xs">Buscar</span>
          </Button>
        </div>
        
        <Button
          onClick={onLocationSearch}
          disabled={isLocating}
          variant="outline"
          className="h-12 px-4 border-orange-300 text-orange-600 hover:bg-orange-50 flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <MapPin size={16} />
          <span className="text-xs md:text-sm">
            {isLocating ? 'Localizando...' : 'Usar Localização'}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default SearchAndFilter;
