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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background border shadow-2xl">
        {/* Header com gradiente da identidade visual */}
        <div className="bg-gradient-to-r from-primary via-primary-foreground to-accent p-6 -m-6 mb-0 rounded-t-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-white drop-shadow-lg">
              {sport.name}
            </DialogTitle>
            <p className="text-center text-white/90 mt-2 font-medium">
              Descubra tudo sobre este esporte incrível
            </p>
          </DialogHeader>
        </div>
        
        <div className="space-y-6 p-6 bg-background">
          {/* Carrossel de Imagens */}
          <div className="relative">
            <div className="relative h-64 bg-muted rounded-lg overflow-hidden shadow-lg border">
              <img 
                src={sport.images[currentImageIndex]} 
                alt={`${sport.name} ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {sport.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-primary/80 text-primary-foreground p-2 rounded-full hover:bg-primary transition-all duration-200 shadow-lg"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <button 
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary/80 text-primary-foreground p-2 rounded-full hover:bg-primary transition-all duration-200 shadow-lg"
                  >
                    <ChevronRight size={20} />
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {sport.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === currentImageIndex 
                            ? 'bg-primary scale-110 shadow-lg' 
                            : 'bg-primary/50 hover:bg-primary/70'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Descrição do Esporte */}
          <Card className="border-2 border-primary/20 shadow-lg bg-card">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
              <CardTitle className="text-primary">Sobre o {sport.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed text-sm">{sport.description}</p>
            </CardContent>
          </Card>

          {/* Grupos Próximos */}
          <Card className="border-2 border-secondary/30 shadow-lg bg-card">
            <CardHeader className="bg-gradient-to-r from-secondary/10 to-primary/10">
              <CardTitle className="flex items-center gap-2 text-primary">
                <Users size={20} className="text-secondary" />
                Grupos de {sport.name} por perto
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {nearbyGroups.map((group) => (
                  <Card key={group.id} className="border border-border hover:border-primary/50 transition-all duration-200 hover:shadow-md bg-card">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-sm mb-2 text-foreground">{group.name}</h4>
                      <p className="text-xs text-muted-foreground mb-3">{group.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <Badge variant="secondary" className="text-xs bg-secondary/20 text-secondary-foreground">
                          {group.members} membros
                        </Badge>
                        <span className="text-muted-foreground">{group.location}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Estabelecimentos Próximos */}
          <Card className="border-2 border-accent/30 shadow-lg bg-card">
            <CardHeader className="bg-gradient-to-r from-accent/10 to-secondary/10">
              <CardTitle className="flex items-center gap-2 text-primary">
                <MapPin size={20} className="text-accent" />
                Locais para praticar {sport.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {nearbyEstablishments.map((establishment) => (
                  <Card key={establishment.id} className="border border-border hover:border-accent/50 transition-all duration-200 hover:shadow-md bg-card">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-sm mb-2 text-foreground">{establishment.name}</h4>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <Badge variant="outline" className="text-xs border-accent text-accent">
                          {establishment.type}
                        </Badge>
                        <span className="text-muted-foreground font-medium">{establishment.distance}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{establishment.location}</p>
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