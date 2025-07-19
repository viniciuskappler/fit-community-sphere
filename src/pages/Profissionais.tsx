
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProfessionalsFilters from '@/components/professionals/ProfessionalsFilters';
import ProfessionalsList from '@/components/professionals/ProfessionalsList';
import ProfessionalRegistrationModal from '@/components/professionals/ProfessionalRegistrationModal';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Plus } from 'lucide-react';

const Profissionais = () => {
  const { user } = useAuth();
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [filters, setFilters] = useState({
    cidade: '',
    especialidade: '',
    modalidade: ''
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isSecondaryVisible={false} />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Profissionais do Esporte
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encontre profissionais qualificados para suas necessidades esportivas
            </p>
          </div>

          {/* Warning Alert */}
          <Alert className="mb-8 border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>Atenção:</strong> os dados exibidos nesta aba são fictícios, inseridos para testes e coleta de sugestões da comunidade. O cadastro real está disponível abaixo!
            </AlertDescription>
          </Alert>

          {/* Filters */}
          <ProfessionalsFilters filters={filters} onFiltersChange={setFilters} />

          {/* Professionals List */}
          <ProfessionalsList filters={filters} />

          {/* Registration Button */}
          {user && (
            <div className="text-center mt-12">
              <Button
                onClick={() => setShowRegistrationModal(true)}
                className="bg-gradient-to-r from-orange-600 to-orange-400 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Plus size={20} className="mr-2" />
                Cadastrar Profissional
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Registration Modal */}
      <ProfessionalRegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
      />
    </div>
  );
};

export default Profissionais;
