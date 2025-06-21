
import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
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

  const handleSportToggle = (field: 'favoriteStateSports' | 'practicedSports' | 'interestedSports', sport: string) => {
    // Quando selecionamos um esporte em qualquer campo, removemos ele dos outros campos
    if (!formData[field].includes(sport)) {
      // Removendo de outros campos se estiver selecionado
      if (field !== 'favoriteStateSports' && formData.favoriteStateSports.includes(sport)) {
        onSportToggle('favoriteStateSports', sport);
      }
      if (field !== 'practicedSports' && formData.practicedSports.includes(sport)) {
        onSportToggle('practicedSports', sport);
      }
      if (field !== 'interestedSports' && formData.interestedSports.includes(sport)) {
        onSportToggle('interestedSports', sport);
      }
    }
    
    onSportToggle(field, sport);
  };

  // Filtrar esportes disponíveis para cada seção (removendo os já selecionados em outros campos)
  const getAvailableSports = (currentField: 'favoriteStateSports' | 'practicedSports' | 'interestedSports') => {
    return filteredSports.filter(sport => {
      // Manter se já está selecionado no campo atual
      if (formData[currentField].includes(sport)) return true;
      
      // Remover se está selecionado em outros campos
      const otherFields = ['favoriteStateSports', 'practicedSports', 'interestedSports'].filter(f => f !== currentField) as Array<'favoriteStateSports' | 'practicedSports' | 'interestedSports'>;
      return !otherFields.some(field => formData[field].includes(sport));
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
          Esportes que você mais gosta (selecione entre 5 e 20) *
        </Label>
        <p className="text-sm text-gray-600 mb-3">
          Selecionados: {formData.favoriteStateSports.length}/20
        </p>
        {errors.favoriteStateSports && (
          <p className="text-red-500 text-sm mb-3">{errors.favoriteStateSports}</p>
        )}
        
        {/* Barra de pesquisa */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar modalidade esportiva..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-40 overflow-y-auto border rounded-lg p-3">
          {getAvailableSports('favoriteStateSports').map((sport) => (
            <div key={sport} className="flex items-center space-x-2">
              <Checkbox
                id={`favorite-${sport}`}
                checked={formData.favoriteStateSports.includes(sport)}
                onCheckedChange={() => handleSportToggle('favoriteStateSports', sport)}
                disabled={formData.favoriteStateSports.length >= 20 && !formData.favoriteStateSports.includes(sport)}
                className={formData.favoriteStateSports.includes(sport) ? 'data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-red-600 data-[state=checked]:to-orange-500 data-[state=checked]:border-red-600' : ''}
              />
              <Label 
                htmlFor={`favorite-${sport}`} 
                className={`text-sm cursor-pointer ${
                  formData.favoriteStateSports.includes(sport) ? 'bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent font-medium' : ''
                }`}
              >
                {sport}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-semibold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
          Esportes que você já praticou (máximo 20)
        </Label>
        <p className="text-sm text-gray-600 mb-3">
          Selecionados: {formData.practicedSports.length}/20
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 max-h-40 overflow-y-auto border rounded-lg p-3">
          {getAvailableSports('practicedSports').map((sport) => (
            <div key={sport} className="flex items-center space-x-2">
              <Checkbox
                id={`practiced-${sport}`}
                checked={formData.practicedSports.includes(sport)}
                onCheckedChange={() => handleSportToggle('practicedSports', sport)}
                disabled={formData.practicedSports.length >= 20 && !formData.practicedSports.includes(sport)}
                className={formData.practicedSports.includes(sport) ? 'data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-red-600 data-[state=checked]:to-orange-500 data-[state=checked]:border-red-600' : ''}
              />
              <Label 
                htmlFor={`practiced-${sport}`} 
                className={`text-sm cursor-pointer ${
                  formData.practicedSports.includes(sport) ? 'bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent font-medium' : ''
                }`}
              >
                {sport}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-semibold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
          Esportes que tem interesse (máximo 20)
        </Label>
        <p className="text-sm text-gray-600 mb-3">
          Selecionados: {formData.interestedSports.length}/20
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 max-h-40 overflow-y-auto border rounded-lg p-3">
          {getAvailableSports('interestedSports').map((sport) => (
            <div key={sport} className="flex items-center space-x-2">
              <Checkbox
                id={`interested-${sport}`}
                checked={formData.interestedSports.includes(sport)}
                onCheckedChange={() => handleSportToggle('interestedSports', sport)}
                disabled={formData.interestedSports.length >= 20 && !formData.interestedSports.includes(sport)}
                className={formData.interestedSports.includes(sport) ? 'data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-red-600 data-[state=checked]:to-orange-500 data-[state=checked]:border-red-600' : ''}
              />
              <Label 
                htmlFor={`interested-${sport}`} 
                className={`text-sm cursor-pointer ${
                  formData.interestedSports.includes(sport) ? 'bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent font-medium' : ''
                }`}
              >
                {sport}
              </Label>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          * Modalidades selecionadas em outros campos são removidas automaticamente desta lista
        </p>
      </div>
    </div>
  );
};

export default SportsPreferencesStep;
