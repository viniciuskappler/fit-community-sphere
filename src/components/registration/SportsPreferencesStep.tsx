
import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';

interface SportsPreferencesStepProps {
  formData: {
    favoriteStateSports: string[];
    practicedSports: string[];
    interestedSports: string[];
  };
  onSportToggle: (field: 'favoriteStateSports' | 'practicedSports' | 'interestedSports', sport: string) => void;
  sportsList: string[];
}

const SportsPreferencesStep = ({ formData, onSportToggle, sportsList }: SportsPreferencesStepProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSports = sportsList.filter(sport =>
    sport.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold text-orange-600">
          Esportes que mais gosta (selecione exatamente 5) *
        </Label>
        <p className="text-sm text-gray-600 mb-3">
          Selecionados: {formData.favoriteStateSports.length}/5
        </p>
        
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
                onCheckedChange={() => onSportToggle('favoriteStateSports', sport)}
                disabled={formData.favoriteStateSports.length >= 5 && !formData.favoriteStateSports.includes(sport)}
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
        <Label className="text-base font-semibold">Esportes que já praticou</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 max-h-40 overflow-y-auto border rounded-lg p-3">
          {filteredSports.map((sport) => (
            <div key={sport} className="flex items-center space-x-2">
              <Checkbox
                id={`practiced-${sport}`}
                checked={formData.practicedSports.includes(sport)}
                onCheckedChange={() => onSportToggle('practicedSports', sport)}
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
      </div>

      <div>
        <Label className="text-base font-semibold">Esportes que tem interesse</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 max-h-40 overflow-y-auto border rounded-lg p-3">
          {filteredSports.map((sport) => (
            <div key={sport} className="flex items-center space-x-2">
              <Checkbox
                id={`interested-${sport}`}
                checked={formData.interestedSports.includes(sport)}
                onCheckedChange={() => onSportToggle('interestedSports', sport)}
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
      </div>
    </div>
  );
};

export default SportsPreferencesStep;
