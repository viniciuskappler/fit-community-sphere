import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Users, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

interface Sport {
  id: number;
  name: string;
  phrase: string;
  backgroundImage: string;
  description: string;
  images: string[];
}

interface SportDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  sport: Sport;
}

const SportDetailsModal: React.FC<SportDetailsModalProps> = ({ isOpen, onClose, sport }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Dados de exemplo para grupos e estabelecimentos
  const nearbyGroups = [
    {
      id: 1,
      name: `Grupo ${sport.name} Centro`,
      members: 24,
      description: `Praticantes de ${sport.name} da região central`,
      location: 'Centro, São Paulo'
    },
    {
      id: 2,
      name: `${sport.name} Masters`,
      members: 18,
      description: `Grupo avançado de ${sport.name}`,
      location: 'Vila Madalena, São Paulo'
    },
    {
      id: 3,
      name: `${sport.name} Iniciantes`,
      members: 32,
      description: `Ideal para quem está começando no ${sport.name}`,
      location: 'Pinheiros, São Paulo'
    }
  ];

  const nearbyEstablishments = [
    {
      id: 1,
      name: `Arena ${sport.name} Premium`,
      type: 'Centro Esportivo',
      location: 'Moema, São Paulo',
      distance: '2.3 km'
    },
    {
      id: 2,
      name: `Espaço ${sport.name}`,
      type: 'Academia',
      location: 'Itaim Bibi, São Paulo',
      distance: '3.1 km'
    },
    {
      id: 3,
      name: `Clube de ${sport.name}`,
      type: 'Clube',
      location: 'Jardins, São Paulo',
      distance: '4.2 km'
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % sport.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + sport.images.length) % sport.images.length);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">{sport.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Carrossel de Imagens */}
          <div className="relative">
            <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
              <img 
                src={sport.images[currentImageIndex]} 
                alt={`${sport.name} ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {sport.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <button 
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                  
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {sport.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Descrição do Esporte */}
          <Card>
            <CardHeader>
              <CardTitle>Sobre o {sport.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">{sport.description}</p>
            </CardContent>
          </Card>

          {/* Grupos Próximos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users size={20} />
                Grupos de {sport.name} por perto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {nearbyGroups.map((group) => (
                  <Card key={group.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-sm mb-2">{group.name}</h4>
                      <p className="text-xs text-gray-600 mb-2">{group.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <Badge variant="secondary" className="text-xs">
                          {group.members} membros
                        </Badge>
                        <span className="text-gray-500">{group.location}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Estabelecimentos Próximos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin size={20} />
                Locais para praticar {sport.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {nearbyEstablishments.map((establishment) => (
                  <Card key={establishment.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-sm mb-2">{establishment.name}</h4>
                      <div className="flex items-center justify-between text-xs">
                        <Badge variant="outline" className="text-xs">
                          {establishment.type}
                        </Badge>
                        <span className="text-gray-500">{establishment.distance}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">{establishment.location}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SportDetailsModal;