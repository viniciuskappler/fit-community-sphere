
import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Users, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Group {
  id: string;
  nome: string;
  imagem_grupo: string;
  modalidade: string;
  descricao: string;
  bairro: string;
  cidade: string;
  estado: string;
  dias_semana: string[];
  horario: string;
  publico_alvo: string;
  imagem_modalidade: string;
  members: number;
}

interface GroupsListProps {
  searchTerm: string;
  selectedCity: string;
  selectedSport: string;
}

// Dados mockados dos grupos
const mockGroups: Group[] = [
  {
    id: '1',
    nome: 'Futsal Zona Sul',
    imagem_grupo: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop&crop=face',
    modalidade: 'Futebol',
    descricao: 'Grupo de futsal para iniciantes e intermediários. Ambiente descontraído e focado na diversão!',
    bairro: 'Vila Madalena',
    cidade: 'São Paulo',
    estado: 'SP',
    dias_semana: ['Terça', 'Quinta'],
    horario: '19:00 - 21:00',
    publico_alvo: 'Iniciantes e Intermediários',
    imagem_modalidade: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop',
    members: 24
  },
  {
    id: '2',
    nome: 'Basquete Carioca',
    imagem_grupo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=150&h=150&fit=crop&crop=face',
    modalidade: 'Basquete',
    descricao: 'Time de basquete competitivo. Treinamos regularmente e participamos de campeonatos locais.',
    bairro: 'Copacabana',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    dias_semana: ['Segunda', 'Quarta', 'Sexta'],
    horario: '18:30 - 20:30',
    publico_alvo: 'Intermediários e Avançados',
    imagem_modalidade: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=150&fit=crop',
    members: 18
  },
  {
    id: '3',
    nome: 'Vôlei de Praia BH',
    imagem_grupo: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=150&h=150&fit=crop&crop=face',
    modalidade: 'Vôlei',
    descricao: 'Grupo descontraído de vôlei de praia. Todos os níveis são bem-vindos!',
    bairro: 'Pampulha',
    cidade: 'Belo Horizonte',
    estado: 'MG',
    dias_semana: ['Sábado', 'Domingo'],
    horario: '16:00 - 18:00',
    publico_alvo: 'Todos os níveis',
    imagem_modalidade: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=200&h=150&fit=crop',
    members: 32
  },
  {
    id: '4',
    nome: 'Corrida Matinal',
    imagem_grupo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face',
    modalidade: 'Corrida',
    descricao: 'Grupo de corrida matinal no Parque da Cidade. Venha correr conosco e melhorar seu condicionamento!',
    bairro: 'Asa Norte',
    cidade: 'Brasília',
    estado: 'DF',
    dias_semana: ['Segunda', 'Quarta', 'Sexta'],
    horario: '06:00 - 07:00',
    publico_alvo: 'Todos os níveis',
    imagem_modalidade: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=150&fit=crop',
    members: 45
  },
  {
    id: '5',
    nome: 'Natação Salvador',
    imagem_grupo: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=150&h=150&fit=crop&crop=face',
    modalidade: 'Natação',
    descricao: 'Grupo de natação para adultos. Treinos técnicos e recreativos com foco no aprimoramento.',
    bairro: 'Barra',
    cidade: 'Salvador',
    estado: 'BA',
    dias_semana: ['Segunda', 'Terça', 'Quinta'],
    horario: '07:00 - 08:30',
    publico_alvo: 'Intermediários',
    imagem_modalidade: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=200&h=150&fit=crop',
    members: 28
  },
  {
    id: '6',
    nome: 'Ciclismo Fortaleza',
    imagem_grupo: 'https://images.unsplash.com/photo-1558168989-33c9a48b2e01?w=150&h=150&fit=crop&crop=face',  
    modalidade: 'Ciclismo',
    descricao: 'Pedais em grupo pelos melhores percursos de Fortaleza. Nível intermediário com foco na resistência.',
    bairro: 'Meireles',
    cidade: 'Fortaleza',
    estado: 'CE',
    dias_semana: ['Sábado', 'Domingo'],
    horario: '17:00 - 19:00',
    publico_alvo: 'Intermediários',
    imagem_modalidade: 'https://images.unsplash.com/photo-1558168989-33c9a48b2e01?w=200&h=150&fit=crop',
    members: 21
  }
];

const GroupsList: React.FC<GroupsListProps> = ({ searchTerm, selectedCity, selectedSport }) => {
  const [filteredGroups, setFilteredGroups] = useState<Group[]>(mockGroups);

  useEffect(() => {
    let filtered = mockGroups;

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(group => 
        group.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.descricao.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por cidade
    if (selectedCity && selectedCity !== 'Todas as cidades') {
      filtered = filtered.filter(group => group.cidade === selectedCity);
    }

    // Filtrar por esporte
    if (selectedSport && selectedSport !== 'Todos os esportes') {
      filtered = filtered.filter(group => group.modalidade === selectedSport);
    }

    setFilteredGroups(filtered);
  }, [searchTerm, selectedCity, selectedSport]);

  if (filteredGroups.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground">
          <p className="text-lg font-medium mb-2">Nenhum grupo encontrado</p>
          <p>Tente ajustar os filtros ou crie um novo grupo!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredGroups.map((group) => (
        <Card key={group.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* Imagem do grupo - esquerda */}
              <div className="w-full md:w-32 h-32 flex-shrink-0">
                <img 
                  src={group.imagem_grupo} 
                  alt={group.nome}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Conteúdo central */}
              <div className="flex-1 p-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    {/* Nome do grupo */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{group.nome}</h3>
                    
                    {/* Descrição */}
                    <p className="text-gray-600 mb-3 line-clamp-2">{group.descricao}</p>
                    
                    {/* Informações do grupo */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{group.bairro}, {group.cidade} - {group.estado}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{group.members} membros</span>
                        </div>
                      </div>
                      
                      {/* Dias da semana */}
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div className="flex flex-wrap gap-1">
                          {group.dias_semana.map(dia => (
                            <Badge key={dia} variant="outline" className="text-xs">
                              {dia}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {/* Horário */}
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{group.horario}</span>
                      </div>
                    </div>
                  </div>

                  {/* Botão Ver Grupo */}
                  <div className="mt-4 md:mt-0 md:ml-4">
                    <Button variant="outline" className="w-full md:w-auto">
                      Ver Grupo
                    </Button>
                  </div>
                </div>
              </div>

              {/* Imagem da modalidade - direita */}
              <div className="relative w-full md:w-48 h-32 flex-shrink-0">
                <img 
                  src={group.imagem_modalidade} 
                  alt={group.modalidade}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <Badge className="bg-white text-black hover:bg-white font-semibold px-3 py-1">
                    {group.modalidade}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GroupsList;
