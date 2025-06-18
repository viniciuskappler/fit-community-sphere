
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
    // Se está desmarcando de favoritos, remover também dos outros campos
    if (field === 'favoriteStateSports' && formData.favoriteStateSports.includes(sport)) {
      onSportToggle('practicedSports', sport);
      onSportToggle('interestedSports', sport);
    }
    
    onSportToggle(field, sport);
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold text-orange-600">
          Esportes que você mais gosta (selecione entre 5 e 20) *
        </Label>
        <p className="text-sm text-gray-600 mb-3">
          Selecionados: {formData.favoriteStateSports.length}/20
        </p>
        {errors.favoriteStateSports && (
          <p className="text-orange-500 text-sm mb-3">{errors.favoriteStateSports}</p>
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
          {filteredSports.map((sport) => (
            <div key={sport} className="flex items-center space-x-2">
              <Checkbox
                id={`favorite-${sport}`}
                checked={formData.favoriteStateSports.includes(sport)}
                onCheckedChange={() => handleSportToggle('favoriteStateSports', sport)}
                disabled={formData.favoriteStateSports.length >= 20 && !formData.favoriteStateSports.includes(sport)}
                className={formData.favoriteStateSports.includes(sport) ? 'data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500' : ''}
              />
              <Label 
                htmlFor={`favorite-${sport}`} 
                className={`text-sm cursor-pointer ${
                  formData.favoriteStateSports.includes(sport) ? 'text-orange-500 font-medium' : ''
                }`}
              >
                {sport}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-semibold">Esportes que você já praticou (máximo 20)</Label>
        <p className="text-sm text-gray-600 mb-3">
          Selecionados: {formData.practicedSports.length}/20
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 max-h-40 overflow-y-auto border rounded-lg p-3">
          {filteredSports
            .filter(sport => !formData.favoriteStateSports.includes(sport))
            .map((sport) => (
            <div key={sport} className="flex items-center space-x-2">
              <Checkbox
                id={`practiced-${sport}`}
                checked={formData.practicedSports.includes(sport)}
                onCheckedChange={() => onSportToggle('practicedSports', sport)}
                disabled={formData.practicedSports.length >= 20 && !formData.practicedSports.includes(sport)}
                className={formData.practicedSports.includes(sport) ? 'data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500' : ''}
              />
              <Label 
                htmlFor={`practiced-${sport}`} 
                className={`text-sm cursor-pointer ${
                  formData.practicedSports.includes(sport) ? 'text-orange-500 font-medium' : ''
                }`}
              >
                {sport}
              </Label>
            </div>
          ))}
        </div>
        {formData.favoriteStateSports.length > 0 && (
          <p className="text-xs text-gray-500 mt-2">
            * Os esportes que você mais gosta já estão incluídos automaticamente
          </p>
        )}
      </div>

      <div>
        <Label className="text-base font-semibold">Esportes que tem interesse (máximo 20)</Label>
        <p className="text-sm text-gray-600 mb-3">
          Selecionados: {formData.interestedSports.length}/20
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 max-h-40 overflow-y-auto border rounded-lg p-3">
          {filteredSports
            .filter(sport => !formData.favoriteStateSports.includes(sport))
            .map((sport) => (
            <div key={sport} className="flex items-center space-x-2">
              <Checkbox
                id={`interested-${sport}`}
                checked={formData.interestedSports.includes(sport)}
                onCheckedChange={() => onSportToggle('interestedSports', sport)}
                disabled={formData.interestedSports.length >= 20 && !formData.interestedSports.includes(sport)}
                className={formData.interestedSports.includes(sport) ? 'data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500' : ''}
              />
              <Label 
                htmlFor={`interested-${sport}`} 
                className={`text-sm cursor-pointer ${
                  formData.interestedSports.includes(sport) ? 'text-orange-500 font-medium' : ''
                }`}
              >
                {sport}
              </Label>
            </div>
          ))}
        </div>
        {formData.favoriteStateSports.length > 0 && (
          <p className="text-xs text-gray-500 mt-2">
            * Os esportes que você mais gosta já estão incluídos automaticamente
          </p>
        )}
      </div>
    </div>
  );
};

export default SportsPreferencesStep;
