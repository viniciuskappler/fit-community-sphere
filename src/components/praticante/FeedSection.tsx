
import React from 'react';
import UserPost from './UserPost';
import EventPost from './EventPost';

const FeedSection = () => {
  // Mock data para demonstração
  const mockUserPost = {
    usuario: "Juliana Ribeiro",
    idade: 27,
    esporte: "Beach Tennis",
    descricao: "Treinando com a galera nesse sábado incrível! ☀️🏖️",
    imagens: ["/lovable-uploads/44959214-1bcf-4335-9376-cdaa51c8183c.png", "/lovable-uploads/5736d95e-4f42-43f5-8ef3-6377ff323c0b.png"],
    mock: true
  };

  const mockEventPost = {
    evento: "Torneio de Vôlei de Praia",
    grupo_organizador: "Vôlei Litoral RS",
    imagem: ["/lovable-uploads/5736d95e-4f42-43f5-8ef3-6377ff323c0b.png"],
    descricao: "Inscreva-se já! Evento válido pelo ranking estadual.",
    data: "2025-09-21",
    hora: "08:30",
    local: "Praia Central - Arroio do Sal",
    valor: "R$ 50,00",
    mock: true
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">Feed da Comunidade</h2>
      
      {/* Publicação de usuário */}
      <UserPost {...mockUserPost} />
      
      {/* Publicação de evento */}
      <EventPost {...mockEventPost} />
    </div>
  );
};

export default FeedSection;
