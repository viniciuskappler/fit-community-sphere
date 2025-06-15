
import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Search } from 'lucide-react';
import { ValidationErrors } from '../../utils/formValidation';

interface SportsPreferencesStepProps {
  formData: {
    favoriteStateSports: string[];
    practicedSports: string[];
    interestedSports: string[];
  };
  onSportToggle: (field: 'favoriteStateSports' | 'practicedSports' | 'interestedSports', sport: string) => void;
  sportsList: string[];
  errors?: ValidationErrors;
}

const SportsPreferencesStep = ({ formData, onSportToggle, sportsList, errors = {} }: SportsPreferencesStepProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSports = sportsList.filter(sport =>
    sport.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderSportsGrid = (
    selectedSports: string[], 
    field: 'favoriteStateSports' | 'practicedSports' | 'interestedSports'
  ) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-60 overflow-y-auto">
      {filteredSports.map((sport) => {
        const isSelected = selectedSports.includes(sport);
        const isDisabled = !isSelected && selectedSports.length >= 20;
        
        return (
          <div key={sport} className="flex items-center space-x-2">
            <Checkbox
              id={`${field}-${sport}`}
              checked={isSelected}
              onCheckedChange={() => onSportToggle(field, sport)}
              disabled={isDisabled}
              className={isSelected ? 'data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500' : ''}
            />
            <Label
              htmlFor={`${field}-${sport}`}
              className={`text-sm cursor-pointer ${isDisabled && !isSelected ? 'text-gray-400' : ''}`}
            >
              {sport}
            </Label>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Campo de busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <Input
          placeholder="Buscar modalidade..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Modalidades que mais gosta */}
      <div>
        <Label className="text-orange-600 text-base font-medium">
          Modalidades que mais gosta *
        </Label>
        <p className="text-sm text-gray-500 mb-3">
          Selecione pelo menos 5 modalidades que você mais gosta (máximo 20)
        </p>
        {renderSportsGrid(formData.favoriteStateSports, 'favoriteStateSports')}
        <p className="text-xs text-gray-500 mt-2">
          Selecionadas: {formData.favoriteStateSports.length}/20
        </p>
        {errors.favoriteStateSports && (
          <p className="text-orange-500 text-sm mt-1">{errors.favoriteStateSports}</p>
        )}
      </div>

      {/* Modalidades que pratica */}
      <div>
        <Label className="text-orange-600 text-base font-medium">
          Modalidades que pratica
        </Label>
        <p className="text-sm text-gray-500 mb-3">
          Selecione as modalidades que você pratica regularmente
        </p>
        {renderSportsGrid(formData.practicedSports, 'practicedSports')}
        <p className="text-xs text-gray-500 mt-2">
          Selecionadas: {formData.practicedSports.length}/20
        </p>
      </div>

      {/* Modalidades de interesse */}
      <div>
        <Label className="text-orange-600 text-base font-medium">
          Modalidades de interesse
        </Label>
        <p className="text-sm text-gray-500 mb-3">
          Selecione modalidades que você tem interesse em conhecer ou praticar
        </p>
        {renderSportsGrid(formData.interestedSports, 'interestedSports')}
        <p className="text-xs text-gray-500 mt-2">
          Selecionadas: {formData.interestedSports.length}/20
        </p>
      </div>
    </div>
  );
};

export default SportsPreferencesStep;
