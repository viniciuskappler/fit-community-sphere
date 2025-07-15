
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SecondaryHeader from '../components/SecondaryHeader';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Users, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Busca = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('grupos');

  return (
    <div className="min-h-screen bg-background">
      <SecondaryHeader isVisible={true} />
      <Header isSecondaryVisible={true} />
      <main className="pt-[120px] px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Buscar e Conectar
            </h1>
            <p className="text-lg text-muted-foreground">
              Encontre grupos esportivos e estabelecimentos próximos a você
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grupos" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Buscar Grupos
              </TabsTrigger>
              <TabsTrigger value="estabelecimentos" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Buscar Locais
              </TabsTrigger>
            </TabsList>

            <TabsContent value="grupos" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-foreground">
                  Grupos Esportivos
                </h2>
                {user && (
                  <Button 
                    onClick={() => navigate('/criar-grupo-esportivo')}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Criar Grupo
                  </Button>
                )}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Grupos da Região</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      Busca de grupos em desenvolvimento
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Em breve você poderá encontrar grupos esportivos na sua região.
                    </p>
                    {user && (
                      <Button 
                        onClick={() => navigate('/criar-grupo-esportivo')}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Seja o primeiro a criar um grupo
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="estabelecimentos" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-foreground">
                  Estabelecimentos Esportivos
                </h2>
                {user && (
                  <Button 
                    onClick={() => navigate('/cadastro-estabelecimento')}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Cadastrar Estabelecimento
                  </Button>
                )}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Locais Próximos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <MapPin className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      Busca de estabelecimentos em desenvolvimento
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Em breve você poderá encontrar estabelecimentos esportivos na sua região.
                    </p>
                    {user && (
                      <Button 
                        onClick={() => navigate('/cadastro-estabelecimento')}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Seja o primeiro a cadastrar seu estabelecimento
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Busca;
