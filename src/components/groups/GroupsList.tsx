
import React, { useState, useEffect } from 'react';
import GroupCard, { GroupData } from './GroupCard';

interface GroupsListProps {
  searchTerm: string;
  selectedCity: string;
  selectedSport: string;
}

// Updated mock data with additional fields
const mockGroups: GroupData[] = [
  {
    id: '1',
    nome: 'Futsal Zona Sul',
    modalidade: 'Futebol',
    descricao: 'Grupo de futsal para iniciantes e intermediários. Ambiente descontraído e focado na diversão! Venha fazer parte da nossa família esportiva.',
    bairro: 'Vila Madalena',
    cidade: 'São Paulo',
    estado: 'SP',
    dias_semana: ['Terça', 'Quinta'],
    horario: '19:00 - 21:00',
    image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop&crop=face',
    members: 24,
    whatsapp_url: 'https://wa.me/5511999999999',
    instagram_url: 'https://instagram.com/futsalzonasul',
    telefone: '11999999999'
  },
  {
    id: '2',
    nome: 'Basquete Carioca',
    modalidade: 'Basquete',
    descricao: 'Time de basquete competitivo. Treinamos regularmente e participamos de campeonatos locais. Buscamos jogadores dedicados e comprometidos.',
    bairro: 'Copacabana',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    dias_semana: ['Segunda', 'Quarta', 'Sexta'],
    horario: '18:30 - 20:30',
    image_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=150&h=150&fit=crop&crop=face',
    members: 18,
    whatsapp_url: 'https://wa.me/5521888888888',
    instagram_url: 'https://instagram.com/basquetecarioca',
    telefone: '21888888888'
  },
  {
    id: '3',
    nome: 'Vôlei de Praia BH',
    modalidade: 'Vôlei',
    descricao: 'Grupo descontraído de vôlei de praia. Todos os níveis são bem-vindos! Praticamos em uma das melhores areias da cidade.',
    bairro: 'Pampulha',
    cidade: 'Belo Horizonte',
    estado: 'MG',
    dias_semana: ['Sábado', 'Domingo'],
    horario: '16:00 - 18:00',
    image_url: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=150&h=150&fit=crop&crop=face',
    members: 32,
    whatsapp_url: 'https://wa.me/5531777777777',
    instagram_url: 'https://instagram.com/voleipraiabjh',
    telefone: '31777777777'
  },
  {
    id: '4',
    nome: 'Corrida Matinal',
    modalidade: 'Corrida',
    descricao: 'Grupo de corrida matinal no Parque da Cidade. Venha correr conosco e melhorar seu condicionamento! Todos os ritmos são bem-vindos.',
    bairro: 'Asa Norte',
    cidade: 'Brasília',
    estado: 'DF',
    dias_semana: ['Segunda', 'Quarta', 'Sexta'],
    horario: '06:00 - 07:00',
    image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face',
    members: 45,
    whatsapp_url: 'https://wa.me/5561666666666',
    instagram_url: 'https://instagram.com/corridamatinal',
    telefone: '61666666666'
  },
  {
    id: '5',
    nome: 'Natação Salvador',
    modalidade: 'Natação',
    descricao: 'Grupo de natação para adultos. Treinos técnicos e recreativos com foco no aprimoramento. Temos nadadores de todos os níveis.',
    bairro: 'Barra',
    cidade: 'Salvador',
    estado: 'BA',
    dias_semana: ['Segunda', 'Terça', 'Quinta'],
    horario: '07:00 - 08:30',
    image_url: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=150&h=150&fit=crop&crop=face',
    members: 28,
    whatsapp_url: 'https://wa.me/5571555555555',
    instagram_url: 'https://instagram.com/natacaosalvador',
    telefone: '71555555555'
  },
  {
    id: '6',
    nome: 'Ciclismo Fortaleza',
    modalidade: 'Ciclismo',
    descricao: 'Pedais em grupo pelos melhores percursos de Fortaleza. Nível intermediário com foco na resistência. Explore a cidade sobre duas rodas.',
    bairro: 'Meireles',
    cidade: 'Fortaleza',
    estado: 'CE',
    dias_semana: ['Sábado', 'Domingo'],
    horario: '17:00 - 19:00',
    image_url: 'https://images.unsplash.com/photo-1558168989-33c9a48b2e01?w=150&h=150&fit=crop&crop=face',
    members: 21,
    whatsapp_url: 'https://wa.me/5585444444444',
    instagram_url: 'https://instagram.com/ciclismofortaleza',
    telefone: '85444444444'
  }
];

const GroupsList: React.FC<GroupsListProps> = ({ searchTerm, selectedCity, selectedSport }) => {
  const [filteredGroups, setFilteredGroups] = useState<GroupData[]>(mockGroups);

  useEffect(() => {
    let filtered = mockGroups;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(group => 
        group.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.descricao.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by city
    if (selectedCity && selectedCity !== 'Todas as cidades') {
      filtered = filtered.filter(group => group.cidade === selectedCity);
    }

    // Filter by sport
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
        <GroupCard key={group.id} group={group} />
      ))}
    </div>
  );
};

export default GroupsList;
