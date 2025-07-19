
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MapPin, Award, CheckCircle } from 'lucide-react';

interface ProfessionalCardProps {
  professional: {
    id: string;
    nome: string;
    imagem_url: string;
    especialidade: string;
    modalidades: string[];
    cidade: string;
    estado: string;
    bio: string;
    verificado: boolean;
  };
}

const ProfessionalCard = ({ professional }: ProfessionalCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={professional.imagem_url} alt={professional.nome} />
          <AvatarFallback>{professional.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-900">{professional.nome}</h3>
            {professional.verificado && (
              <span title="Profissional verificado">
                <CheckCircle size={16} className="text-green-500" />
              </span>
            )}
          </div>
          
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Award size={14} className="mr-1" />
            {professional.especialidade}
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={14} className="mr-1" />
            {professional.cidade}, {professional.estado}
          </div>
        </div>
      </div>

      {/* Bio */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
        {professional.bio}
      </p>

      {/* Modalidades */}
      <div className="flex flex-wrap gap-2">
        {professional.modalidades.slice(0, 3).map((modalidade) => (
          <Badge key={modalidade} variant="secondary" className="text-xs">
            {modalidade}
          </Badge>
        ))}
        {professional.modalidades.length > 3 && (
          <Badge variant="outline" className="text-xs">
            +{professional.modalidades.length - 3} mais
          </Badge>
        )}
      </div>
    </div>
  );
};

export default ProfessionalCard;
