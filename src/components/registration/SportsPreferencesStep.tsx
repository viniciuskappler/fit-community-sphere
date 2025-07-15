import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { ValidationErrors } from '../../utils/formValidation';

interface SportsPreferencesStepProps {
  formData: {
    esportes_favoritos: string[];
    esportes_praticados: string[];
    esportes_interesse: string[];
  };
  onSportToggle: (field: 'esportes_favoritos' | 'esportes_praticados' | 'esportes_interesse', sport: string) => void;
  sportsList: string[];
  errors?: ValidationErrors;
}

const SportsPreferencesStep = ({ formData, onSportToggle, sportsList, errors = {} }: SportsPreferencesStepProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSports = sportsList.filter(sport =>
    sport.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSportToggle = (field: 'esportes_favoritos' | 'esportes_praticados' | 'esportes_interesse', sport: string) => {
    // Quando selecionamos um esporte em qualquer campo, removemos ele dos outros campos
    if (!formData[field].includes(sport)) {
      // Removendo de outros campos se estiver selecionado
      if (field !== 'esportes_favoritos' && formData.esportes_favoritos.includes(sport)) {
        onSportToggle('esportes_favoritos', sport);
      }
      if (field !== 'esportes_praticados' && formData.esportes_praticados.includes(sport)) {
        onSportToggle('esportes_praticados', sport);
      }
      if (field !== 'esportes_interesse' && formData.esportes_interesse.includes(sport)) {
        onSportToggle('esportes_interesse', sport);
      }
    }
    
    onSportToggle(field, sport);
  };

  // Filtrar esportes disponíveis para cada seção (removendo os já selecionados em outros campos)
  const getAvailableSports = (currentField: 'esportes_favoritos' | 'esportes_praticados' | 'esportes_interesse') => {
    return filteredSports.filter(sport => {
      // Manter se já está selecionado no campo atual
      if (formData[currentField].includes(sport)) return true;
      
      // Remover se está selecionado em outros campos
      const otherFields = ['esportes_favoritos', 'esportes_praticados', 'esportes_interesse'].filter(f => f !== currentField) as Array<'esportes_favoritos' | 'esportes_praticados' | 'esportes_interesse'>;
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
          Selecionados: {formData.esportes_favoritos.length}/20
        </p>
        {errors.esportes_favoritos && (
          <p className="text-red-500 text-sm mb-3">{errors.esportes_favoritos}</p>
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
          {getAvailableSports('esportes_favoritos').map((sport) => (
            <div key={sport} className="flex items-center space-x-2">
              <Checkbox
                id={`favorite-${sport}`}
                checked={formData.esportes_favoritos.includes(sport)}
                onCheckedChange={() => handleSportToggle('esportes_favoritos', sport)}
                disabled={formData.esportes_favoritos.length >= 20 && !formData.esportes_favoritos.includes(sport)}
                className={formData.esportes_favoritos.includes(sport) ? 'data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-red-600 data-[state=checked]:to-orange-500 data-[state=checked]:border-red-600' : ''}
              />
              <Label 
                htmlFor={`favorite-${sport}`} 
                className={`text-sm cursor-pointer ${
                  formData.esportes_favoritos.includes(sport) ? 'bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent font-medium' : ''
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
          Selecionados: {formData.esportes_praticados.length}/20
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 max-h-40 overflow-y-auto border rounded-lg p-3">
          {getAvailableSports('esportes_praticados').map((sport) => (
            <div key={sport} className="flex items-center space-x-2">
              <Checkbox
                id={`practiced-${sport}`}
                checked={formData.esportes_praticados.includes(sport)}
                onCheckedChange={() => handleSportToggle('esportes_praticados', sport)}
                disabled={formData.esportes_praticados.length >= 20 && !formData.esportes_praticados.includes(sport)}
                className={formData.esportes_praticados.includes(sport) ? 'data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-red-600 data-[state=checked]:to-orange-500 data-[state=checked]:border-red-600' : ''}
              />
              <Label 
                htmlFor={`practiced-${sport}`} 
                className={`text-sm cursor-pointer ${
                  formData.esportes_praticados.includes(sport) ? 'bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent font-medium' : ''
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
          Selecionados: {formData.esportes_interesse.length}/20
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 max-h-40 overflow-y-auto border rounded-lg p-3">
          {getAvailableSports('esportes_interesse').map((sport) => (
            <div key={sport} className="flex items-center space-x-2">
              <Checkbox
                id={`interested-${sport}`}
                checked={formData.esportes_interesse.includes(sport)}
                onCheckedChange={() => handleSportToggle('esportes_interesse', sport)}
                disabled={formData.esportes_interesse.length >= 20 && !formData.esportes_interesse.includes(sport)}
                className={formData.esportes_interesse.includes(sport) ? 'data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-red-600 data-[state=checked]:to-orange-500 data-[state=checked]:border-red-600' : ''}
              />
              <Label 
                htmlFor={`interested-${sport}`} 
                className={`text-sm cursor-pointer ${
                  formData.esportes_interesse.includes(sport) ? 'bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent font-medium' : ''
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