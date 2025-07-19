
import React from 'react';
import ProfessionalCard from './ProfessionalCard';

interface FiltersProps {
  filters: {
    cidade: string;
    especialidade: string;
    modalidade: string;
  };
}

const ProfessionalsList = ({ filters }: FiltersProps) => {
  const mockProfessionals = [
    {
      id: '1',
      nome: 'Dr. Carlos Silva',
      imagem_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face',
      especialidade: 'Personal Trainer',
      modalidades: ['Musculação', 'Crossfit', 'Corrida'],
      cidade: 'São Paulo',
      estado: 'SP',
      bio: 'Personal trainer com 10 anos de experiência, especializado em emagrecimento e ganho de massa muscular.',
      verificado: true
    },
    {
      id: '2',
      nome: 'Ana Beatriz Santos',
      imagem_url: 'https://images.unsplash.com/photo-1594824475317-87d82daf7e6f?w=300&h=300&fit=crop&crop=face',
      especialidade: 'Fisioterapeuta',
      modalidades: ['Reabilitação', 'Pilates', 'RPG'],
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
      bio: 'Fisioterapeuta especializada em lesões esportivas e reabilitação de atletas.',
      verificado: true
    },
    {
      id: '3',
      nome: 'Pedro Oliveira',
      imagem_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      especialidade: 'Preparador Físico',
      modalidades: ['Futebol', 'Vôlei', 'Basquete'],
      cidade: 'Belo Horizonte',
      estado: 'MG',
      bio: 'Preparador físico com experiência em clubes profissionais, focado em performance esportiva.',
      verificado: false
    },
    {
      id: '4',
      nome: 'Mariana Costa',
      imagem_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      especialidade: 'Nutricionista Esportivo',
      modalidades: ['Nutrição', 'Suplementação', 'Emagrecimento'],
      cidade: 'Salvador',
      estado: 'BA',
      bio: 'Nutricionista especializada em nutrição esportiva e estratégias de performance.',
      verificado: true
    },
    {
      id: '5',
      nome: 'Rafael Mendes',
      imagem_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      especialidade: 'Psicólogo Esportivo',
      modalidades: ['Coaching', 'Preparação Mental', 'Motivação'],
      cidade: 'Brasília',
      estado: 'DF',
      bio: 'Psicólogo esportivo com foco em preparação mental para competições e superação de limites.',
      verificado: true
    },
    {
      id: '6',
      nome: 'Juliana Ferreira',
      imagem_url: 'https://images.unsplash.com/photo-1494790108755-2616b69d4027?w=300&h=300&fit=crop&crop=face',
      especialidade: 'Professor de Educação Física',
      modalidades: ['Natação', 'Hidroginástica', 'Aqua Fitness'],
      cidade: 'Curitiba',
      estado: 'PR',
      bio: 'Professora de educação física especializada em atividades aquáticas para todas as idades.',
      verificado: false
    }
  ];

  const filteredProfessionals = mockProfessionals.filter(professional => {
    const matchesCidade = !filters.cidade || professional.cidade === filters.cidade;
    const matchesEspecialidade = !filters.especialidade || professional.especialidade === filters.especialidade;
    const matchesModalidade = !filters.modalidade || professional.modalidades.includes(filters.modalidade);
    
    return matchesCidade && matchesEspecialidade && matchesModalidade;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProfessionals.map((professional) => (
        <ProfessionalCard key={professional.id} professional={professional} />
      ))}
    </div>
  );
};

export default ProfessionalsList;
