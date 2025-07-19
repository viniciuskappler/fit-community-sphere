
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SportInfoModalProps {
  sport: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const SportInfoModal: React.FC<SportInfoModalProps> = ({ sport, isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!sport) return null;

  const handleFindLocations = () => {
    onClose();
    navigate(`/busca?modalidade=${encodeURIComponent(sport)}`);
  };

  // Mock sport data
  const sportsData: Record<string, {
    description: string;
    images: string[];
    videoUrl?: string;
  }> = {
    'Futebol': {
      description: 'O futebol é o esporte mais popular do mundo, praticado por milhões de pessoas. É um jogo de equipe que desenvolve coordenação, resistência cardiovascular e trabalho em equipe. Pode ser praticado em campos grandes (futebol de campo) ou em espaços menores (futsal).',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1609766908274-b3bfb5e2f46d?w=500&h=300&fit=crop'
      ],
      videoUrl: 'https://www.youtube.com/embed/XdL7EDKr_rk'
    },
    'Basquete': {
      description: 'O basquetebol é um esporte coletivo jogado entre duas equipes de cinco jogadores cada. O objetivo é marcar pontos arremessando a bola através da cesta adversária. Desenvolve agilidade, coordenação e altura de salto.',
      images: [
        'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1520511550709-77e0b80b6e0c?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1606924842584-fbc7d7a5a3c6?w=500&h=300&fit=crop'
      ]
    },
    'Vôlei': {
      description: 'O voleibol é um esporte jogado entre duas equipes separadas por uma rede. O objetivo é fazer a bola tocar o chão do lado adversário. Desenvolve reflexos, coordenação e trabalho em equipe. Pode ser praticado em quadra ou na praia.',
      images: [
        'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1594736797933-d0500ba2fe65?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop'
      ]
    },
    'Corrida': {
      description: 'A corrida é uma das formas mais naturais de exercício físico. Pode ser praticada individualmente ou em grupo, em diferentes terrenos e distâncias. Desenvolve resistência cardiovascular, força nas pernas e disciplina mental.',
      images: [
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop'
      ]
    },
    'Natação': {
      description: 'A natação é um esporte aquático que trabalha todo o corpo de forma harmoniosa. É considerada uma das atividades físicas mais completas, desenvolvendo resistência, força muscular e flexibilidade, além de ser de baixo impacto.',
      images: [
        'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=500&h=300&fit=crop'
      ]
    },
    'Ciclismo': {
      description: 'O ciclismo é um esporte que utiliza a bicicleta como meio de locomoção. Pode ser praticado em estradas, montanhas ou pistas. Desenvolve resistência cardiovascular, força nas pernas e é uma excelente opção de transporte sustentável.',
      images: [
        'https://images.unsplash.com/photo-1558168989-33c9a48b2e01?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500&h=300&fit=crop',
        'https://images.unsplash.com/photo-1544191696-15693072e886?w=500&h=300&fit=crop'
      ]
    }
  };

  const sportInfo = sportsData[sport] || {
    description: 'Esporte que promove saúde, bem-estar e integração social.',
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop']
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{sport}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image Gallery */}
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                {sportInfo.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-64 w-full">
                      <img 
                        src={image} 
                        alt={`${sport} - Imagem ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Sport Description */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Sobre o {sport}</h3>
            <p className="text-muted-foreground leading-relaxed">{sportInfo.description}</p>
          </div>

          {/* Video Section */}
          {sportInfo.videoUrl && (
            <div>
              <h3 className="font-semibold text-lg mb-3">Vídeo Demonstrativo</h3>
              <div className="aspect-video w-full">
                <iframe
                  src={sportInfo.videoUrl}
                  title={`Vídeo sobre ${sport}`}
                  className="w-full h-full rounded-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-4 border-t">
            <Button 
              onClick={handleFindLocations}
              className="w-full"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Ver locais próximos para praticar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SportInfoModal;
