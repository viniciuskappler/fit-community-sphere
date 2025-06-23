
import React, { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { useCities } from '@/hooks/useCities';

interface LocationSelectorProps {
  stateValue: string;
  cityValue: string;
  onStateChange: (value: string) => void;
  onCityChange: (value: string, ibgeCode?: string) => void;
  stateError?: string;
  cityError?: string;
}

// Estados brasileiros
const states = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' }
];

const LocationSelector = ({ 
  stateValue, 
  cityValue, 
  onStateChange, 
  onCityChange, 
  stateError, 
  cityError 
}: LocationSelectorProps) => {
  const [citySearch, setCitySearch] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const { cities, loading, error } = useCities(stateValue);
  
  const filteredCities = useMemo(() => {
    if (!citySearch) return cities;
    return cities.filter(city => 
      city.name.toLowerCase().includes(citySearch.toLowerCase())
    );
  }, [cities, citySearch]);

  const handleStateChange = (value: string) => {
    onStateChange(value);
    onCityChange(''); // Reset city when state changes
    setCitySearch('');
    setShowCityDropdown(false);
  };

  const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCitySearch(value);
    onCityChange(value);
    setShowCityDropdown(value.length > 0 && filteredCities.length > 0);
  };

  const handleCitySelect = (city: { name: string; ibge_code: string }) => {
    onCityChange(city.name, city.ibge_code);
    setCitySearch('');
    setShowCityDropdown(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Select value={stateValue} onValueChange={handleStateChange}>
          <SelectTrigger className={stateError ? 'border-orange-500' : ''}>
            <SelectValue placeholder="Selecione o estado" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg z-50 max-h-60 overflow-y-auto">
            {states.map((state) => (
              <SelectItem key={state.value} value={state.value} className="hover:bg-gray-100">
                {state.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {stateError && (
          <p className="text-orange-500 text-sm mt-1">{stateError}</p>
        )}
      </div>

      <div>
        <div className="relative">
          <Input
            placeholder="Digite o nome da cidade"
            value={cityValue || citySearch}
            onChange={handleCityInputChange}
            onFocus={() => {
              if (stateValue && citySearch && filteredCities.length > 0) {
                setShowCityDropdown(true);
              }
            }}
            onBlur={() => {
              // Delay to allow click on dropdown items
              setTimeout(() => setShowCityDropdown(false), 200);
            }}
            className={cityError ? 'border-orange-500' : ''}
            disabled={!stateValue || loading}
          />
          {error && (
            <p className="text-red-500 text-xs mt-1">Erro ao carregar cidades</p>
          )}
          {showCityDropdown && stateValue && filteredCities.length > 0 && (
            <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-48 overflow-y-auto shadow-lg">
              {filteredCities.map((city) => (
                <div
                  key={city.ibge_code}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-900"
                  onClick={() => handleCitySelect(city)}
                >
                  {city.name}
                </div>
              ))}
            </div>
          )}
        </div>
        {cityError && (
          <p className="text-orange-500 text-sm mt-1">{cityError}</p>
        )}
      </div>
    </div>
  );
};

export default LocationSelector;
