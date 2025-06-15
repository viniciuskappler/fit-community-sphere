
import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface FinalStepProps {
  registrationType: 'supporter' | 'establishment' | 'group';
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const FinalStep = ({ registrationType, formData, onInputChange }: FinalStepProps) => {
  const formatDateForDisplay = (dateValue: string) => {
    if (!dateValue) return '';
    const [year, month, day] = dateValue.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="space-y-4">
      {registrationType === 'supporter' ? (
        // Confirmação para Esportista Apoiador
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Resumo do Cadastro</h4>
          
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium">Nome:</span> {formData.fullName}
            </div>
            <div>
              <span className="font-medium">CPF:</span> {formData.cpf}
            </div>
            <div>
              <span className="font-medium">E-mail:</span> {formData.email}
            </div>
            <div>
              <span className="font-medium">Cidade:</span> {formData.city}
            </div>
            <div>
              <span className="font-medium">Data de Nascimento:</span> {formatDateForDisplay(formData.birthDate)}
            </div>
            
            {formData.favoriteStateSports.length > 0 && (
              <div>
                <span className="font-medium">Esportes favoritos:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.favoriteStateSports.map((sport: string) => (
                    <span key={sport} className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                      {sport}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {formData.practicedSports.length > 0 && (
              <div>
                <span className="font-medium">Esportes praticados:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.practicedSports.map((sport: string) => (
                    <span key={sport} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {sport}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {formData.interestedSports.length > 0 && (
              <div>
                <span className="font-medium">Esportes de interesse:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.interestedSports.map((sport: string) => (
                    <span key={sport} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {sport}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Dados do Estabelecimento/Grupo
        <div className="space-y-4">
          <div>
            <Label htmlFor="businessName" className="text-orange-600">
              {registrationType === 'establishment' ? 'Nome do Estabelecimento' : 'Nome do Grupo'} *
            </Label>
            <Input
              id="businessName"
              value={formData.businessName}
              onChange={(e) => onInputChange('businessName', e.target.value)}
              placeholder={registrationType === 'establishment' ? 'Nome da sua academia, clube, etc.' : 'Nome do seu grupo esportivo'}
              required
            />
          </div>

          {registrationType === 'establishment' && (
            <div>
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input
                id="cnpj"
                value={formData.cnpj}
                onChange={(e) => onInputChange('cnpj', e.target.value)}
                placeholder="00.000.000/0000-00"
              />
            </div>
          )}

          <div>
            <Label htmlFor="description" className="text-orange-600">Descrição *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => onInputChange('description', e.target.value)}
              placeholder={`Descreva ${registrationType === 'establishment' ? 'seu estabelecimento' : 'seu grupo'} e as atividades oferecidas`}
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="address" className="text-orange-600">Endereço Completo *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => onInputChange('address', e.target.value)}
              placeholder="Rua, número, complemento"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="state" className="text-orange-600">Estado *</Label>
              <Select value={formData.state} onValueChange={(value) => onInputChange('state', value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sp">São Paulo</SelectItem>
                  <SelectItem value="rj">Rio de Janeiro</SelectItem>
                  <SelectItem value="mg">Minas Gerais</SelectItem>
                  <SelectItem value="rs">Rio Grande do Sul</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="cep" className="text-orange-600">CEP *</Label>
              <Input
                id="cep"
                value={formData.cep}
                onChange={(e) => onInputChange('cep', e.target.value)}
                placeholder="00000-000"
                required
              />
            </div>
          </div>

          {/* Mostrar as modalidades selecionadas também para estabelecimentos/grupos */}
          <div className="bg-gray-50 rounded-lg p-4 mt-4">
            <h5 className="font-semibold text-gray-900 mb-3">Modalidades Selecionadas</h5>
            
            {formData.favoriteStateSports.length > 0 && (
              <div className="mb-3">
                <span className="font-medium text-sm">Modalidades favoritas:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.favoriteStateSports.map((sport: string) => (
                    <span key={sport} className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                      {sport}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {formData.practicedSports.length > 0 && (
              <div className="mb-3">
                <span className="font-medium text-sm">Modalidades praticadas:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.practicedSports.map((sport: string) => (
                    <span key={sport} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {sport}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {formData.interestedSports.length > 0 && (
              <div>
                <span className="font-medium text-sm">Modalidades de interesse:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.interestedSports.map((sport: string) => (
                    <span key={sport} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {sport}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Termos */}
      <div className="border-t pt-4 space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={formData.acceptTerms}
            onCheckedChange={(checked) => onInputChange('acceptTerms', checked)}
            required
          />
          <Label htmlFor="terms" className="text-sm">
            Concordo com os <span className="text-orange-500 underline cursor-pointer">termos de uso e política de privacidade</span> *
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="newsletter"
            checked={formData.acceptNewsletter}
            onCheckedChange={(checked) => onInputChange('acceptNewsletter', checked)}
          />
          <Label htmlFor="newsletter" className="text-sm">
            Desejo receber newsletters e promoções
          </Label>
        </div>
      </div>
    </div>
  );
};

export default FinalStep;
