
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AlertTriangle, Calendar, MapPin, DollarSign } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface EventPostProps {
  evento: string;
  grupo_organizador: string;
  imagem: string[];
  descricao: string;
  data: string;
  hora: string;
  local: string;
  valor?: string;
  mock?: boolean;
}

const EventPost = ({ 
  evento, 
  grupo_organizador, 
  imagem, 
  descricao, 
  data, 
  hora, 
  local, 
  valor, 
  mock = false 
}: EventPostProps) => {
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "dd 'de' MMMM", { locale: ptBR });
    } catch {
      return dateString;
    }
  };

  return (
    <Card className="w-full relative">
      {mock && (
        <Badge 
          variant="outline" 
          className="absolute top-2 right-2 z-10 bg-orange-100 text-orange-800 border-orange-300"
        >
          <AlertTriangle className="h-3 w-3 mr-1" />
          Mock de teste
        </Badge>
      )}
      
      <CardContent className="p-4">
        {/* Header da publicação */}
        <div className="flex items-center mb-3">
          <Avatar className="w-10 h-10 mr-3">
            <AvatarImage src="/placeholder.svg" alt={grupo_organizador} />
            <AvatarFallback>
              {grupo_organizador.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-sm">{grupo_organizador}</h4>
            <p className="text-xs text-muted-foreground">Organizando evento</p>
          </div>
        </div>

        {/* Carrossel de imagens do evento */}
        {imagem.length > 0 && (
          <div className="relative mb-3">
            <Carousel className="w-full">
              <CarouselContent>
                {imagem.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <img 
                        src={img} 
                        alt={`${evento} - Imagem ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-muted-foreground text-sm">Imagem do evento</div>`;
                        }}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {imagem.length > 1 && (
                <>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </>
              )}
            </Carousel>
          </div>
        )}

        {/* Título do evento */}
        <h3 className="text-lg font-bold mb-2">{evento}</h3>

        {/* Descrição */}
        <p className="text-sm mb-3 text-muted-foreground">{descricao}</p>

        {/* Informações do evento */}
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{formatDate(data)} às {hora}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{local}</span>
          </div>
          
          {valor && (
            <div className="flex items-center text-sm">
              <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="font-medium text-green-600">{valor}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventPost;
