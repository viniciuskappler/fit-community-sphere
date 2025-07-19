
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GroupDetailModal from './GroupDetailModal';
import SportInfoModal from './SportInfoModal';

export interface GroupData {
  id: string;
  nome: string;
  modalidade: string;
  cidade: string;
  estado: string;
  descricao: string;
  members: number;
  image_url: string;
  bairro: string;
  horario: string;
  dias_semana: string[];
  whatsapp_url?: string;
  instagram_url?: string;
  telefone?: string;
}

interface GroupCardProps {
  group: GroupData;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  const [showGroupDetail, setShowGroupDetail] = useState(false);
  const [showSportInfo, setShowSportInfo] = useState(false);
  const navigate = useNavigate();

  const handleViewGroup = () => {
    setShowGroupDetail(true);
  };

  const handleSportImageClick = () => {
    setShowSportInfo(true);
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={group.image_url} 
            alt={group.nome}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-background/80 text-foreground">
              {group.modalidade}
            </Badge>
          </div>
          <div 
            className="absolute top-3 right-3 cursor-pointer"
            onClick={handleSportImageClick}
          >
            <div className="relative">
              <div className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center text-white text-xs font-semibold hover:bg-black/80 transition-colors">
                <img 
                  src={group.image_url} 
                  alt={group.modalidade}
                  className="w-full h-full object-cover rounded-full opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
                  {group.modalidade}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg text-foreground truncate">
                {group.nome}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {group.descricao}
              </p>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{group.members} membros</span>
              </div>
              {group.horario && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{group.horario}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">
                {group.bairro}, {group.cidade} - {group.estado}
              </span>
            </div>

            {group.dias_semana && group.dias_semana.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {group.dias_semana.map(dia => (
                  <Badge key={dia} variant="outline" className="text-xs">
                    {dia}
                  </Badge>
                ))}
              </div>
            )}

            <Button 
              onClick={handleViewGroup}
              className="w-full mt-3"
              variant="outline"
            >
              Ver Grupo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <GroupDetailModal 
        group={group}
        isOpen={showGroupDetail}
        onClose={() => setShowGroupDetail(false)}
      />
      
      <SportInfoModal 
        sport={group.modalidade}
        isOpen={showSportInfo}
        onClose={() => setShowSportInfo(false)}
      />
    </>
  );
};

export default GroupCard;
