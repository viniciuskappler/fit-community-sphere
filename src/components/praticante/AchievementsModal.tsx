
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Trophy, Award, Users, Calendar, MapPin, Star } from 'lucide-react';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: string[];
}

const AchievementsModal = ({ isOpen, onClose, achievements }: AchievementsModalProps) => {
  const mockDetailedAchievements = [
    {
      icon: <Trophy className="h-8 w-8 text-yellow-500" />,
      title: "Participante Ativo",
      description: "Participou de 5 eventos esportivos",
      badge: "Ouro",
      badgeColor: "bg-yellow-500"
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "Criador de Comunidades",
      description: "Criou 3 grupos esportivos",
      badge: "Prata",
      badgeColor: "bg-gray-400"
    },
    {
      icon: <Star className="h-8 w-8 text-purple-500" />,
      title: "Networking Esportivo",
      description: "Conectou-se com 25 praticantes",
      badge: "Bronze",
      badgeColor: "bg-orange-500"
    },
    {
      icon: <Calendar className="h-8 w-8 text-green-500" />,
      title: "Frequência Constante",
      description: "Ativo na plataforma por 30 dias",
      badge: "Iniciante",
      badgeColor: "bg-green-500"
    },
    {
      icon: <MapPin className="h-8 w-8 text-red-500" />,
      title: "Explorador de Locais",
      description: "Visitou 10 estabelecimentos diferentes",
      badge: "Explorador",
      badgeColor: "bg-red-500"
    },
    {
      icon: <Award className="h-8 w-8 text-indigo-500" />,
      title: "Perfil Completo",
      description: "Preencheu 100% das informações do perfil",
      badge: "Completo",
      badgeColor: "bg-indigo-500"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Suas Conquistas
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {mockDetailedAchievements.map((achievement, index) => (
            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {achievement.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">
                      {achievement.title}
                    </h3>
                    <Badge 
                      className={`text-white text-xs ${achievement.badgeColor}`}
                    >
                      {achievement.badge}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Próximas Conquistas
          </h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Participar de 10 eventos (5/10 concluído)</p>
            <p>• Criar 5 grupos esportivos (3/5 concluído)</p>
            <p>• Conectar-se com 50 praticantes (25/50 concluído)</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AchievementsModal;
