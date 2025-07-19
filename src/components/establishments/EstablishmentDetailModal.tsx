
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Star, Instagram, Globe, Phone, Navigation, Share2 } from 'lucide-react';
import { EstablishmentWithDetails } from '@/hooks/useEstablishments';
import { toast } from 'sonner';

interface EstablishmentDetailModalProps {
  establishment: EstablishmentWithDetails;
  isOpen: boolean;
  onClose: () => void;
}

const EstablishmentDetailModal: React.FC<EstablishmentDetailModalProps> = ({
  establishment,
  isOpen,
  onClose
}) => {
  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${establishment.latitude},${establishment.longitude}`;
    window.open(url, '_blank');
  };

  const handleShareLocation = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copiado para a área de transferência!');
    } catch (error) {
      toast.error('Erro ao copiar link');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            {establishment.establishment_name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {establishment.photos.map((photo, index) => (
              <img
                key={index}
                src={photo.photo_url}
                alt={`${establishment.establishment_name} - Foto ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Informações Básicas</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="bg-orange-100 text-orange-800 text-sm px-2 py-1 rounded">
                      {establishment.establishment_type}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      {establishment.street}, {establishment.number} - {establishment.neighborhood}
                      <br />
                      {establishment.city} - {establishment.state}, {establishment.cep}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{establishment.operating_hours}</span>
                  </div>

                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    <span className="font-medium">{establishment.averageRating}</span>
                    <span className="text-gray-500 text-sm ml-1">
                      ({establishment.reviewCount} avaliações)
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Descrição</h3>
                <p className="text-gray-600 text-sm">{establishment.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Sports */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Modalidades</h3>
                <div className="flex flex-wrap gap-2">
                  {establishment.sports.map((sport, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                    >
                      {sport}
                    </span>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Estrutura Disponível</h3>
                <div className="flex flex-wrap gap-2">
                  {establishment.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t">
            {establishment.instagram_url && (
              <Button
                variant="outline"
                onClick={() => window.open(establishment.instagram_url!, '_blank')}
                className="flex items-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                Visitar Instagram
              </Button>
            )}

            {establishment.website_url && (
              <Button
                variant="outline"
                onClick={() => window.open(establishment.website_url!, '_blank')}
                className="flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                Visitar Site
              </Button>
            )}

            {establishment.phone && (
              <Button
                variant="outline"
                onClick={() => window.open(`tel:${establishment.phone}`, '_blank')}
                className="flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Ligar
              </Button>
            )}

            <Button
              onClick={handleGetDirections}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Navigation className="w-4 h-4" />
              Como Chegar
            </Button>

            <Button
              variant="outline"
              onClick={handleShareLocation}
              className="flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Indicar para um Amigo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EstablishmentDetailModal;
