
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Building2, Search, MapPin, Trophy } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import SecondaryHeader from '@/components/SecondaryHeader';
import Footer from '@/components/Footer';
import EstablishmentRegistrationModal from '@/components/EstablishmentRegistrationModal';

const Estabelecimento = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const handleRegisterEstablishment = () => {
    if (!user) {
      navigate('/praticante');
      return;
    }
    setShowRegistrationModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <SecondaryHeader isVisible={true} />
      <Header />
      
      <main className="pt-[120px] pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Estabelecimentos Esportivos
              </h1>
              <p className="text-xl text-muted-foreground">
                Encontre ou cadastre estabelecimentos esportivos na sua região
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <Plus className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Cadastrar Estabelecimento</CardTitle>
                  <CardDescription>
                    Cadastre seu estabelecimento esportivo e alcance mais clientes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={handleRegisterEstablishment}
                    className="w-full"
                    size="lg"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Cadastrar Local
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Search className="w-8 h-8 text-secondary" />
                  </div>
                  <CardTitle className="text-2xl">Buscar Locais</CardTitle>
                  <CardDescription>
                    Encontre estabelecimentos próximos a você para praticar esporte
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => navigate('/locais')}
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Buscar Locais
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Benefits Section */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Visibilidade</h3>
                <p className="text-muted-foreground">
                  Aumente a visibilidade do seu estabelecimento esportivo
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Localização</h3>
                <p className="text-muted-foreground">
                  Seja encontrado facilmente por praticantes da sua região
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Qualidade</h3>
                <p className="text-muted-foreground">
                  Receba avaliações e construa uma reputação sólida
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      <EstablishmentRegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
      />
    </div>
  );
};

export default Estabelecimento;
