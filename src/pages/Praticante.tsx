
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, UserPlus, LogIn } from 'lucide-react';
import Header from '@/components/Header';
import SecondaryHeader from '@/components/SecondaryHeader';
import Footer from '@/components/Footer';
import LoginModal from '@/components/LoginModal';
import RegistrationModal from '@/components/RegistrationModal';

const Praticante = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  // If user is already logged in, redirect to dashboard
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  if (user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <SecondaryHeader isVisible={false} />
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Área do Praticante
              </h1>
              <p className="text-xl text-muted-foreground">
                Faça login ou cadastre-se para acessar sua conta e descobrir novas oportunidades esportivas
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowLoginModal(true)}>
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <LogIn className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Fazer Login</CardTitle>
                  <CardDescription>
                    Já tem uma conta? Faça login para acessar sua área pessoal
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => setShowLoginModal(true)}
                    className="w-full"
                    size="lg"
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    Entrar
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowRegistrationModal(true)}>
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-secondary/10 rounded-full flex items-center justify-center">
                    <UserPlus className="w-8 h-8 text-secondary" />
                  </div>
                  <CardTitle className="text-2xl">Cadastrar-se</CardTitle>
                  <CardDescription>
                    Novo por aqui? Crie sua conta e comece a explorar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => setShowRegistrationModal(true)}
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Cadastrar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      <RegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
      />
    </div>
  );
};

export default Praticante;
