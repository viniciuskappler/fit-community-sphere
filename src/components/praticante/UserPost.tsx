
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AlertTriangle } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface UserPostProps {
  usuario: string;
  idade: number;
  esporte: string;
  descricao: string;
  imagens: string[];
  mock?: boolean;
}

const UserPost = ({ usuario, idade, esporte, descricao, imagens, mock = false }: UserPostProps) => {
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
            <AvatarImage src="/placeholder.svg" alt={usuario} />
            <AvatarFallback>
              {usuario.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-sm">{usuario}</h4>
            <p className="text-xs text-muted-foreground">
              {idade} anos • Praticando {esporte}
            </p>
          </div>
        </div>

        {/* Descrição */}
        <p className="text-sm mb-3">{descricao}</p>

        {/* Carrossel de imagens */}
        {imagens.length > 0 && (
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                {imagens.map((imagem, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <img 
                        src={imagem} 
                        alt={`Foto ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-muted-foreground text-sm">Imagem ${index + 1}</div>`;
                        }}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {imagens.length > 1 && (
                <>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </>
              )}
            </Carousel>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserPost;
