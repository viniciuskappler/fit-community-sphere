
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Star, Instagram, Globe, Phone, AlertTriangle } from 'lucide-react';
import { EstablishmentWithDetails } from '@/hooks/useEstablishments';
import EstablishmentDetailModal from './EstablishmentDetailModal';

interface MockEstablishmentCardProps {
  establishment: EstablishmentWithDetails;
}

const MockEstablishmentCard: React.FC<MockEstablishmentCardProps> = ({ establishment }) => {
  const [showDetailModal, setShowDetailModal] = useState(false);

  const mainPhoto = establishment.photos.find(p => p.is_main)?.photo_url;

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow duration-300 relative">
        {/* Mock Warning Badge */}
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-yellow-100 border border-yellow-300 rounded-lg px-2 py-1 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-yellow-600" />
            <span className="text-xs font-medium text-yellow-800">Local fictício para testes</span>
          </div>
        </div>

        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-48 h-48 md:h-32 flex-shrink-0">
              {mainPhoto ? (
                <img
                  src={mainPhoto}
                  alt={establishment.establishment_name}
                  className="w-full h-full object-cover rounded-l-lg"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-l-lg flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 p-4 pt-12 md:pt-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {establishment.establishment_name}
                  </h3>
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                    {establishment.establishment_type}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{establishment.averageRating}</span>
                  <span className="text-xs text-gray-500">({establishment.reviewCount})</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{establishment.neighborhood}, {establishment.city} - {establishment.state}</span>
                </div>

                <div className="flex items-center text-gray-600 text-sm">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{establishment.operating_hours}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {establishment.sports.slice(0, 3).map((sport, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {sport}
                    </span>
                  ))}
                  {establishment.sports.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{establishment.sports.length - 3} mais
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {establishment.amenities.slice(0, 3).map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                    >
                      {amenity}
                    </span>
                  ))}
                  {establishment.amenities.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{establishment.amenities.length - 3} mais
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {establishment.instagram_url && (
                      <a 
                        href={establishment.instagram_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:text-pink-700"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                    )}
                    {establishment.website_url && (
                      <a 
                        href={establishment.website_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                    {establishment.phone && (
                      <a 
                        href={`tel:${establishment.phone}`}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDetailModal(true)}
                  >
                    Ver Local
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <EstablishmentDetailModal
        establishment={establishment}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </>
  );
};

export default MockEstablishmentCard;
