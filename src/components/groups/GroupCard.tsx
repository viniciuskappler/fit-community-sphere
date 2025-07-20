
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Calendar, AlertTriangle } from 'lucide-react';
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

  // Check if this is a mock group (grupos with IDs 1-6 are mock data)
  const isMockGroup = ['1', '2', '3', '4', '5', '6'].includes(group.id);

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
        {/* Mock Group Badge */}
        {isMockGroup && (
          <div className="absolute top-2 right-2 z-10">
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-300 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Grupo de demonstração
            </Badge>
          </div>
        )}

        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Imagem do Grupo - Lado Esquerdo */}
            <div className="w-full md:w-48 h-48 md:h-auto flex-shrink-0">
              <img 
                src={group.image_url} 
                alt={group.nome}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Descrição do Grupo - Centro */}
            <div className="flex-1 p-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-xl text-foreground">
                      {group.nome}
                    </h3>
                    <Badge variant="secondary" className="ml-2">
                      {group.modalidade}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {group.descricao}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span>
                      {group.bairro}, {group.cidade} - {group.estado}
                    </span>
                  </div>
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

                {group.dias_semana && group.dias_semana.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {group.dias_semana.map(dia => (
                      <Badge key={dia} variant="outline" className="text-xs">
                        {dia}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="pt-2">
                  <Button 
                    onClick={handleViewGroup}
                    variant="outline"
                    className="w-full md:w-auto"
                  >
                    Ver Grupo
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Imagem do Esporte - Lado Direito */}
            <div className="w-full md:w-32 h-32 md:h-auto flex-shrink-0 relative">
              <div 
                className="w-full h-full bg-cover bg-center cursor-pointer group relative overflow-hidden"
                style={{ backgroundImage: `url(${group.image_url})` }}
                onClick={handleSportImageClick}
              >
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-sm text-center px-2">
                    {group.modalidade}
                  </span>
                </div>
              </div>
            </div>
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
