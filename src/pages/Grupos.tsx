
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GroupsSearch from '@/components/groups/GroupsSearch';
import GroupsList from '@/components/groups/GroupsList';
import GroupRegistrationModal from '@/components/GroupRegistrationModal';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Grupos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('Todas as cidades');
  const [selectedSport, setSelectedSport] = useState('Todos os esportes');
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header isSecondaryVisible={false} />
      
      <main className="flex-1 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Alert sobre dados fictícios */}
          <Alert className="mb-6 bg-orange-50 border-orange-200">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>Atenção:</strong> os grupos exibidos aqui são fictícios e servem apenas como exemplo visual da plataforma. Cadastre o seu grupo logo abaixo!
            </AlertDescription>
          </Alert>

          {/* Cabeçalho */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Grupos Esportivos
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encontre grupos esportivos na sua região e conecte-se com outros praticantes
            </p>
          </div>

          {/* Filtros */}
          <div className="mb-8">
            <GroupsSearch
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedSport={selectedSport}
              setSelectedSport={setSelectedSport}
            />
          </div>

          {/* Lista de Grupos */}
          <GroupsList
            searchTerm={searchTerm}
            selectedCity={selectedCity}
            selectedSport={selectedSport}
          />

          {/* Botão Criar Grupo - só aparece para usuários logados */}
          {user && (
            <div className="mt-12 text-center">
              <Button
                onClick={() => setIsGroupModalOpen(true)}
                className="bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white px-8 py-3 text-lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Criar Grupo
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Modal de Cadastro de Grupo */}
      <GroupRegistrationModal
        isOpen={isGroupModalOpen}
        onClose={() => setIsGroupModalOpen(false)}
      />
    </div>
  );
};

export default Grupos;
