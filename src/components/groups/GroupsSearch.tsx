import React from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface GroupsSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedSport: string;
  setSelectedSport: (sport: string) => void;
}

const GroupsSearch: React.FC<GroupsSearchProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCity,
  setSelectedCity,
  selectedSport,
  setSelectedSport
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const cities = [
    'Todas as cidades',
    'São Paulo',
    'Rio de Janeiro',
    'Belo Horizonte',
    'Brasília',
    'Salvador',
    'Fortaleza'
  ];

  const sports = [
    'Todos os esportes',
    'Futebol',
    'Basquete',
    'Vôlei',
    'Tênis',
    'Natação',
    'Corrida',
    'Ciclismo',
    'Crossfit'
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar por nome do grupo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Selecione a cidade" />
          </SelectTrigger>
          <SelectContent>
            {cities.map(city => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedSport} onValueChange={setSelectedSport}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Selecione o esporte" />
          </SelectTrigger>
          <SelectContent>
            {sports.map(sport => (
              <SelectItem key={sport} value={sport}>
                {sport}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {user && (
          <Button 
            onClick={() => navigate('/criar-grupo-esportivo')}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="h-4 w-4" />
            Criar Grupo
          </Button>
        )}
      </div>
    </div>
  );
};

export default GroupsSearch;