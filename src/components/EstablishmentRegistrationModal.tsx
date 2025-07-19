
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface EstablishmentRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  establishmentName: string;
  slug: string;
  corporateName: string;
  cnpj: string;
  description: string;
  establishmentType: string;
  address: string;
  city: string;
  state: string;
  cep: string;
  operatingHours: string;
  instagram: string;
  website: string;
  phone: string;
  sports: string[];
  amenities: string[];
}

const EstablishmentRegistrationModal: React.FC<EstablishmentRegistrationModalProps> = ({
  isOpen,
  onClose
}) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    establishmentName: '',
    slug: '',
    corporateName: '',
    cnpj: '',
    description: '',
    establishmentType: '',
    address: '',
    city: '',
    state: '',
    cep: '',
    operatingHours: '',
    instagram: '',
    website: '',
    phone: '',
    sports: [],
    amenities: []
  });

  const establishmentTypes = ['Academia', 'Box CrossFit', 'Estúdio', 'Centro Aquático', 'Arena', 'Clínica'];
  const availableSports = ['Musculação', 'CrossFit', 'Pilates', 'Yoga', 'Natação', 'Hidroginástica', 'Vôlei de Praia', 'Beach Tennis', 'Futevôlei'];
  const availableAmenities = ['Estacionamento', 'Vestiário', 'Ar condicionado', 'Personal trainer', 'Equipamentos CrossFit', 'Área externa', 'Piscina aquecida', 'Sauna'];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayToggle = (field: 'sports' | 'amenities', item: string) => {
    setFormData(prev => {
      const currentArray = prev[field];
      const newArray = currentArray.includes(item)
        ? currentArray.filter(i => i !== item)
        : [...currentArray, item];
      
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Você precisa estar logado para cadastrar um estabelecimento');
      return;
    }

    if (!formData.establishmentName || !formData.city) {
      toast.error('Por favor, preencha os campos obrigatórios');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('estabelecimentos_esportivos')
        .insert({
          nome: formData.establishmentName,
          slug: formData.slug || formData.establishmentName.toLowerCase().replace(/\s+/g, '-'),
          razao_social: formData.corporateName,
          cnpj: formData.cnpj,
          descricao: formData.description,
          tipo: formData.establishmentType,
          endereco: formData.address,
          cidade: formData.city,
          estado: formData.state,
          cep: formData.cep,
          horario_funcionamento: formData.operatingHours,
          instagram: formData.instagram,
          site: formData.website,
          telefone: formData.phone,
          modalidades: formData.sports,
          estrutura: formData.amenities,
          user_id: user.id
        });

      if (error) {
        console.error('Error creating establishment:', error);
        toast.error('Erro ao cadastrar estabelecimento');
        return;
      }

      toast.success('Estabelecimento cadastrado com sucesso!');
      onClose();
      
      // Reset form
      setFormData({
        establishmentName: '',
        slug: '',
        corporateName: '',
        cnpj: '',
        description: '',
        establishmentType: '',
        address: '',
        city: '',
        state: '',
        cep: '',
        operatingHours: '',
        instagram: '',
        website: '',
        phone: '',
        sports: [],
        amenities: []
      });

    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro inesperado ao cadastrar estabelecimento');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Cadastrar Estabelecimento Esportivo
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="establishmentName">Nome do Estabelecimento *</Label>
                <Input
                  id="establishmentName"
                  value={formData.establishmentName}
                  onChange={(e) => handleInputChange('establishmentName', e.target.value)}
                  placeholder="Ex: Academia FitMax"
                  required
                />
              </div>

              <div>
                <Label htmlFor="establishmentType">Tipo do Estabelecimento</Label>
                <select
                  id="establishmentType"
                  value={formData.establishmentType}
                  onChange={(e) => handleInputChange('establishmentType', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Selecione o tipo</option>
                  {establishmentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Descreva seu estabelecimento..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="operatingHours">Horário de Funcionamento</Label>
                <Input
                  id="operatingHours"
                  value={formData.operatingHours}
                  onChange={(e) => handleInputChange('operatingHours', e.target.value)}
                  placeholder="Ex: 06h às 22h"
                />
              </div>
            </div>

            {/* Contact and Location */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Endereço Completo</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Rua, número, bairro"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="city">Cidade *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="São Paulo"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="SP"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={formData.instagram}
                  onChange={(e) => handleInputChange('instagram', e.target.value)}
                  placeholder="@seu_instagram"
                />
              </div>

              <div>
                <Label htmlFor="website">Site</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://seusite.com"
                />
              </div>
            </div>
          </div>

          {/* Sports */}
          <div>
            <Label className="text-base font-medium">Modalidades Oferecidas</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {availableSports.map(sport => (
                <button
                  key={sport}
                  type="button"
                  onClick={() => handleArrayToggle('sports', sport)}
                  className={`text-sm px-3 py-1 rounded-full border transition-colors ${
                    formData.sports.includes(sport)
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                  }`}
                >
                  {sport}
                </button>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <Label className="text-base font-medium">Estrutura Disponível</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {availableAmenities.map(amenity => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => handleArrayToggle('amenities', amenity)}
                  className={`text-sm px-3 py-1 rounded-full border transition-colors ${
                    formData.amenities.includes(amenity)
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-green-300'
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar Estabelecimento'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EstablishmentRegistrationModal;
