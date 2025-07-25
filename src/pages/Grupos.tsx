
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import SecondaryHeader from '@/components/SecondaryHeader';
import Footer from '@/components/Footer';
import GroupsList from '@/components/groups/GroupsList';
import GroupRegistrationModal from '@/components/GroupRegistrationModal';

const Grupos = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SecondaryHeader isVisible={true} />
      <Header />
      <main className="pt-[120px] px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Grupos Esportivos
            </h1>
            <p className="text-lg text-muted-foreground">
              Conecte-se com outros praticantes e encontre grupos para praticar seu esporte favorito
            </p>
          </div>

          {user && (
            <div className="flex justify-center mb-8">
              <Button
                onClick={() => setShowRegistrationModal(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Criar Grupo Esportivo
              </Button>
            </div>
          )}

          <GroupsList 
            searchTerm={searchTerm}
            selectedCity={selectedCity}
            selectedSport={selectedSport}
          />
        </div>
      </main>
      <Footer />

      <GroupRegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
      />
    </div>
  );
};

export default Grupos;
