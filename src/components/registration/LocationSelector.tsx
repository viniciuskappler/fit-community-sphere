
import React, { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';

interface LocationSelectorProps {
  stateValue: string;
  cityValue: string;
  onStateChange: (value: string) => void;
  onCityChange: (value: string) => void;
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

// Principais cidades por estado (exemplo para alguns estados)
const citiesByState: Record<string, string[]> = {
  'SP': ['São Paulo', 'Guarulhos', 'Campinas', 'São Bernardo do Campo', 'Santo André', 'Osasco', 'Ribeirão Preto', 'Sorocaba'],
  'RJ': ['Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu', 'Niterói', 'Belford Roxo', 'Campos dos Goytacazes'],
  'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim', 'Montes Claros', 'Ribeirão das Neves'],
  'RS': ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Canoas', 'Santa Maria', 'Gravataí', 'Viamão', 'Novo Hamburgo'],
  'BA': ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Juazeiro', 'Itabuna', 'Lauro de Freitas'],
  'PR': ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel', 'São José dos Pinhais', 'Foz do Iguaçu'],
  // Adicionar mais estados conforme necessário
};

const LocationSelector = ({ 
  stateValue, 
  cityValue, 
  onStateChange, 
  onCityChange, 
  stateError, 
  cityError 
}: LocationSelectorProps) => {
  const [citySearch, setCitySearch] = useState('');
  
  const availableCities = useMemo(() => {
    if (!stateValue) return [];
    return citiesByState[stateValue] || [];
  }, [stateValue]);

  const filteredCities = useMemo(() => {
    if (!citySearch) return availableCities;
    return availableCities.filter(city => 
      city.toLowerCase().includes(citySearch.toLowerCase())
    );
  }, [availableCities, citySearch]);

  const handleStateChange = (value: string) => {
    onStateChange(value);
    onCityChange(''); // Reset city when state changes
    setCitySearch('');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Select value={stateValue} onValueChange={handleStateChange}>
          <SelectTrigger className={stateError ? 'border-orange-500' : ''}>
            <SelectValue placeholder="Selecione o estado" />
          </SelectTrigger>
          <SelectContent>
            {states.map((state) => (
              <SelectItem key={state.value} value={state.value}>
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
            onChange={(e) => {
              setCitySearch(e.target.value);
              onCityChange(e.target.value);
            }}
            className={cityError ? 'border-orange-500' : ''}
            disabled={!stateValue}
          />
          {stateValue && filteredCities.length > 0 && citySearch && (
            <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-48 overflow-y-auto shadow-lg">
              {filteredCities.map((city) => (
                <div
                  key={city}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    onCityChange(city);
                    setCitySearch('');
                  }}
                >
                  {city}
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
