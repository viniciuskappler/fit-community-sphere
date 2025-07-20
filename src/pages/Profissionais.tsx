
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import SecondaryHeader from '@/components/SecondaryHeader';
import Footer from '@/components/Footer';
import ProfessionalsFilters from '@/components/professionals/ProfessionalsFilters';
import ProfessionalsList from '@/components/professionals/ProfessionalsList';
import ProfessionalRegistrationModal from '@/components/professionals/ProfessionalRegistrationModal';

const Profissionais = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [filters, setFilters] = useState({
    cidade: '',
    especialidade: '',
    modalidade: ''
  });

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleOpenRegistration = () => {
    setShowRegistrationModal(true);
  };

  const handleCloseRegistration = () => {
    setShowRegistrationModal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SecondaryHeader isVisible={true} />
      <Header />
      <main className="pt-[120px] px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Profissionais do Esporte
            </h1>
            <p className="text-lg text-muted-foreground">
              Encontre personal trainers, preparadores físicos e outros profissionais da área esportiva
            </p>
          </div>

          {user && (
            <div className="flex justify-center mb-8">
              <Button
                onClick={handleOpenRegistration}
                className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500"
              >
                <Plus className="h-4 w-4" />
                Cadastrar como Profissional
              </Button>
            </div>
          )}

          <ProfessionalsFilters filters={filters} onFiltersChange={handleFiltersChange} />
          <ProfessionalsList filters={filters} />
        </div>
      </main>
      <Footer />

      <ProfessionalRegistrationModal
        isOpen={showRegistrationModal}
        onClose={handleCloseRegistration}
      />
    </div>
  );
};

export default Profissionais;
