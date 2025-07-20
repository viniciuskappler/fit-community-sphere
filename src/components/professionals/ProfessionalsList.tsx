
import React, { useState } from 'react';
import ProfessionalCard from './ProfessionalCard';
import ProfessionalDetailModal from './ProfessionalDetailModal';

interface FiltersProps {
  filters: {
    cidade: string;
    especialidade: string;
    modalidade: string;
  };
}

const ProfessionalsList = ({ filters }: FiltersProps) => {
  const [selectedProfessional, setSelectedProfessional] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockProfessionals = [
    {
      id: '1',
      nome: 'Dr. Carlos Silva',
      imagem_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face',
      especialidade: 'Personal Trainer',
      modalidades: ['Musculação', 'Crossfit', 'Corrida'],
      cidade: 'São Paulo',
      estado: 'SP',
      rua: 'Rua das Flores',
      numero: '123',
      bairro: 'Jardins',
      bio: 'Personal trainer com 10 anos de experiência, especializado em emagrecimento e ganho de massa muscular.',
      telefone: '(11) 99999-9999',
      email: 'carlos.silva@email.com',
      instagram: '@carlospt',
      verificado: true,
      data_nascimento: '1985-03-15'
    },
    {
      id: '2',
      nome: 'Ana Beatriz Santos',
      imagem_url: 'https://images.unsplash.com/photo-1594824475317-87d82daf7e6f?w=300&h=300&fit=crop&crop=face',
      especialidade: 'Fisioterapeuta',
      modalidades: ['Reabilitação', 'Pilates', 'RPG'],
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
      rua: 'Avenida Copacabana',
      numero: '456',
      bairro: 'Copacabana',
      bio: 'Fisioterapeuta especializada em lesões esportivas e reabilitação de atletas.',
      telefone: '(21) 88888-8888',
      email: 'ana.santos@email.com',
      instagram: '@anafisio',
      verificado: true,
      data_nascimento: '1990-07-22'
    },
    {
      id: '3',
      nome: 'Pedro Oliveira',
      imagem_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      especialidade: 'Preparador Físico',
      modalidades: ['Futebol', 'Vôlei', 'Basquete'],
      cidade: 'Belo Horizonte',
      estado: 'MG',
      rua: 'Rua do Esporte',
      numero: '789',
      bairro: 'Savassi',
      bio: 'Preparador físico com experiência em clubes profissionais, focado em performance esportiva.',
      telefone: '(31) 77777-7777',
      email: 'pedro.oliveira@email.com',
      instagram: '@pedroprep',
      verificado: false,
      data_nascimento: '1982-11-10'
    },
    {
      id: '4',
      nome: 'Mariana Costa',
      imagem_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      especialidade: 'Nutricionista Esportivo',
      modalidades: ['Nutrição', 'Suplementação', 'Emagrecimento'],
      cidade: 'Salvador',
      estado: 'BA',
      rua: 'Rua da Saúde',
      numero: '321',
      bairro: 'Barra',
      bio: 'Nutricionista especializada em nutrição esportiva e estratégias de performance.',
      telefone: '(71) 66666-6666',
      email: 'mariana.costa@email.com',
      instagram: '@marinutri',
      verificado: true,
      data_nascimento: '1988-01-05'
    },
    {
      id: '5',
      nome: 'Rafael Mendes',
      imagem_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      especialidade: 'Psicólogo Esportivo',
      modalidades: ['Coaching', 'Preparação Mental', 'Motivação'],
      cidade: 'Brasília',
      estado: 'DF',
      rua: 'SQN 123',
      numero: '45',
      bairro: 'Asa Norte',
      bio: 'Psicólogo esportivo com foco em preparação mental para competições e superação de limites.',
      telefone: '(61) 55555-5555',
      email: 'rafael.mendes@email.com',
      instagram: '@rafaelpsi',
      verificado: true,
      data_nascimento: '1986-09-18'
    },
    {
      id: '6',
      nome: 'Juliana Ferreira',
      imagem_url: 'https://images.unsplash.com/photo-1494790108755-2616b69d4027?w=300&h=300&fit=crop&crop=face',
      especialidade: 'Professor de Educação Física',
      modalidades: ['Natação', 'Hidroginástica', 'Aqua Fitness'],
      cidade: 'Curitiba',
      estado: 'PR',
      rua: 'Rua das Águas',
      numero: '678',
      bairro: 'Centro',
      bio: 'Professora de educação física especializada em atividades aquáticas para todas as idades.',
      telefone: '(41) 44444-4444',
      email: 'juliana.ferreira@email.com',
      instagram: '@juliaquatica',
      verificado: false,
      data_nascimento: '1992-04-30'
    }
  ];

  const filteredProfessionals = mockProfessionals.filter(professional => {
    const matchesCidade = !filters.cidade || professional.cidade === filters.cidade;
    const matchesEspecialidade = !filters.especialidade || professional.especialidade === filters.especialidade;
    const matchesModalidade = !filters.modalidade || professional.modalidades.includes(filters.modalidade);
    
    return matchesCidade && matchesEspecialidade && matchesModalidade;
  });

  const handleProfessionalClick = (professional: any) => {
    setSelectedProfessional(professional);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProfessional(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfessionals.map((professional) => (
          <ProfessionalCard 
            key={professional.id} 
            professional={professional}
            onClick={() => handleProfessionalClick(professional)}
          />
        ))}
      </div>

      <ProfessionalDetailModal
        professional={selectedProfessional}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ProfessionalsList;
