
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MapPin, Users, Calendar, Clock, Instagram, MessageCircle, Phone } from 'lucide-react';
import { GroupData } from './GroupCard';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface GroupDetailModalProps {
  group: GroupData | null;
  isOpen: boolean;
  onClose: () => void;
}

const GroupDetailModal: React.FC<GroupDetailModalProps> = ({ group, isOpen, onClose }) => {
  const [isJoining, setIsJoining] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  if (!group) return null;

  const handleJoinGroup = async () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para participar de um grupo",
        variant: "destructive"
      });
      return;
    }

    setIsJoining(true);
    
    try {
      // Simulate joining group - in real implementation, this would update the database
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Sucesso!",
        description: "Você agora faz parte deste grupo!"
      });
      
      // Open WhatsApp group link
      if (group.whatsapp_url) {
        window.open(group.whatsapp_url, '_blank');
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível participar do grupo. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsJoining(false);
    }
  };

  const handleContactOrganizer = () => {
    if (group.telefone) {
      const phoneNumber = group.telefone.replace(/\D/g, '');
      window.open(`https://wa.me/55${phoneNumber}`, '_blank');
    }
  };

  const handleInstagramRedirect = () => {
    if (group.instagram_url) {
      window.open(group.instagram_url, '_blank');
    }
  };

  // Mock gallery images
  const galleryImages = [
    group.image_url,
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop'
  ];

  // Mock members data
  const mockMembers = [
    { nome: 'João Silva', idade: 28 },
    { nome: 'Maria Santos', idade: 32 },
    { nome: 'Pedro Costa', idade: 25 },
    { nome: 'Ana Oliveira', idade: 29 },
    { nome: 'Carlos Ferreira', idade: 34 },
    { nome: 'Lucia Almeida', idade: 27 }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{group.nome}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image Gallery */}
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                {galleryImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-64 w-full">
                      <img 
                        src={image} 
                        alt={`${group.nome} - Imagem ${index + 1}`}
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

          {/* Group Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Sobre o Grupo</h3>
                <p className="text-muted-foreground">{group.descricao}</p>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {group.dias_semana.join(', ')} - {group.horario}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {group.bairro}, {group.cidade} - {group.estado}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{group.members} membros</span>
              </div>

              <div>
                <Badge variant="secondary">{group.modalidade}</Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Membros do Grupo</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {mockMembers.map((member, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {member.nome.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{member.nome}</p>
                        <p className="text-xs text-muted-foreground">{member.idade} anos</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Próximos Eventos</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-sm font-medium">Treino Especial</p>
                    <p className="text-xs text-muted-foreground">Sábado, 25/01 às 16:00</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-sm font-medium">Amistoso</p>
                    <p className="text-xs text-muted-foreground">Domingo, 02/02 às 14:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t">
            <Button 
              onClick={handleJoinGroup}
              disabled={isJoining}
              className="flex-1 min-w-[200px]"
            >
              <Users className="w-4 h-4 mr-2" />
              {isJoining ? 'Entrando...' : 'Participar do Grupo'}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleInstagramRedirect}
              className="flex-1 min-w-[150px]"
            >
              <Instagram className="w-4 h-4 mr-2" />
              Ver Instagram
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleContactOrganizer}
              className="flex-1 min-w-[150px]"
            >
              <Phone className="w-4 h-4 mr-2" />
              Falar com organizador
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GroupDetailModal;
