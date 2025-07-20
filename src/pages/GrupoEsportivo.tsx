
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Users, Calendar, MapPin, Trophy } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import SecondaryHeader from '@/components/SecondaryHeader';
import Footer from '@/components/Footer';
import GroupRegistrationModal from '@/components/GroupRegistrationModal';

const GrupoEsportivo = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const handleCreateGroup = () => {
    if (!user) {
      navigate('/praticante');
      return;
    }
    navigate('/criar-grupo-esportivo');
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
                Grupos Esportivos
              </h1>
              <p className="text-xl text-muted-foreground">
                Conecte-se com pessoas que compartilham sua paixão pelo esporte
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <Plus className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Criar Grupo</CardTitle>
                  <CardDescription>
                    Organize seu próprio grupo esportivo e encontre companheiros de treino
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={handleCreateGroup}
                    className="w-full"
                    size="lg"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Criar Grupo
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-secondary" />
                  </div>
                  <CardTitle className="text-2xl">Encontrar Grupos</CardTitle>
                  <CardDescription>
                    Encontre grupos próximos a você para praticar seu esporte favorito
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => navigate('/grupos')}
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Buscar Grupos
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Benefits Section */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Organize Treinos</h3>
                <p className="text-muted-foreground">
                  Defina horários fixos e organize treinos regulares com seu grupo
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Encontre Locais</h3>
                <p className="text-muted-foreground">
                  Descubra e compartilhe os melhores locais para praticar esporte
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Alcance Metas</h3>
                <p className="text-muted-foreground">
                  Motive-se com outros praticantes e alcance seus objetivos esportivos
                </p>
              </div>
            </div>
          </div>
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

export default GrupoEsportivo;
