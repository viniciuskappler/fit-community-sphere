import React, { useState, useEffect } from 'react';
import GroupCard, { GroupData } from './GroupCard';
import { useSportsGroups } from '@/hooks/useSportsGroups';

interface GroupsGridProps {
  searchTerm: string;
  selectedCity: string;
  selectedSport: string;
}

// Dados de exemplo dos grupos
const mockGroups: GroupData[] = [
  {
    id: '1',
    nome: 'Futsal Zona Sul',
    modalidade: 'Futebol',
    cidade: 'São Paulo',
    estado: 'SP',
    descricao: 'Grupo de futsal para iniciantes e intermediários. Jogamos toda terça e quinta à noite.',
    members: 24,
    image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    bairro: 'Vila Madalena',
    horario: '19:00',
    dias_semana: ['Terça', 'Quinta']
  },
  {
    id: '2',
    nome: 'Basquete Carioca',
    modalidade: 'Basquete',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    descricao: 'Time de basquete competitivo. Treinamos regularmente e participamos de campeonatos locais.',
    members: 18,
    image_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop',
    bairro: 'Copacabana',
    horario: '18:30',
    dias_semana: ['Segunda', 'Quarta', 'Sexta']
  },
  {
    id: '3',
    nome: 'Vôlei de Praia BH',
    modalidade: 'Vôlei',
    cidade: 'Belo Horizonte',
    estado: 'MG',
    descricao: 'Grupo descontraído de vôlei de praia. Todos os níveis são bem-vindos!',
    members: 32,
    image_url: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400&h=300&fit=crop',
    bairro: 'Pampulha',
    horario: '16:00',
    dias_semana: ['Sábado', 'Domingo']
  },
  {
    id: '4',
    nome: 'Corrida Matinal',
    modalidade: 'Corrida',
    cidade: 'Brasília',
    estado: 'DF',
    descricao: 'Grupo de corrida matinal no Parque da Cidade. Venha correr conosco!',
    members: 45,
    image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    bairro: 'Asa Norte',
    horario: '06:00',
    dias_semana: ['Segunda', 'Quarta', 'Sexta']
  },
  {
    id: '5',
    nome: 'Natação Salvador',
    modalidade: 'Natação',
    cidade: 'Salvador',
    estado: 'BA',
    descricao: 'Grupo de natação para adultos. Treinos técnicos e recreativos.',
    members: 28,
    image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    bairro: 'Barra',
    horario: '07:00',
    dias_semana: ['Segunda', 'Terça', 'Quinta']
  },
  {
    id: '6',
    nome: 'Ciclismo Fortaleza',
    modalidade: 'Ciclismo',
    cidade: 'Fortaleza',
    estado: 'CE',
    descricao: 'Pedais em grupo pelos melhores percursos de Fortaleza. Nível intermediário.',
    members: 21,
    image_url: 'https://images.unsplash.com/photo-1558168989-33c9a48b2e01?w=400&h=300&fit=crop',
    bairro: 'Meireles',
    horario: '17:00',
    dias_semana: ['Sábado', 'Domingo']
  }
];

const GroupsGrid: React.FC<GroupsGridProps> = ({ searchTerm, selectedCity, selectedSport }) => {
  const { groups: dbGroups, loading, error } = useSportsGroups();
  const [filteredGroups, setFilteredGroups] = useState<GroupData[]>([]);

  useEffect(() => {
    // Combinar grupos do banco com grupos mock
    const allGroups = [...mockGroups, ...dbGroups.map(group => ({
      id: group.id,
      nome: group.nome || 'Grupo sem nome',
      modalidade: group.modalidade || 'Sem modalidade',
      cidade: group.cidade || 'Cidade não informada',
      estado: group.estado || 'Estado não informado',
      descricao: group.descricao || 'Descrição não disponível',
      members: Math.floor(Math.random() * 50) + 10, // Mock members count
      image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      bairro: (group as any).bairro || 'Bairro não informado',
      horario: (group as any).horario || 'Horário não informado',
      dias_semana: (group as any).dias_semana || []
    }))];

    let filtered = allGroups;

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
  }, [searchTerm, selectedCity, selectedSport, dbGroups]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-muted h-48 rounded-t-lg mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Erro ao carregar grupos: {error}</p>
      </div>
    );
  }

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredGroups.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}
    </div>
  );
};

export default GroupsGrid;