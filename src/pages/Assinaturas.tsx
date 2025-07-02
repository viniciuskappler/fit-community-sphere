import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Building2, Users, Dumbbell, Trophy, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import LoginModal from '@/components/LoginModal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Plan {
  id: string;
  name: string;
  type: string;
  price_monthly: number;
  price_yearly: number;
  features: any[];
  is_free: boolean;
}

const Assinaturas = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isYearly, setIsYearly] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('active', true)
        .order('type', { ascending: true });

      if (error) throw error;
      setPlans(data?.map(plan => ({
        ...plan,
        features: Array.isArray(plan.features) ? plan.features : []
      })) || []);
    } catch (error) {
      console.error('Erro ao buscar planos:', error);
      toast.error('Erro ao carregar planos de assinatura');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (plan: Plan) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    if (plan.is_free) {
      toast.success('Você já tem acesso ao plano gratuito!');
      return;
    }

    // Aqui será implementada a integração com Stripe
    toast.info('Integração com Stripe em desenvolvimento');
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'supporter': return <Dumbbell className="h-6 w-6" />;
      case 'establishment': return <Building2 className="h-6 w-6" />;
      case 'group': return <Users className="h-6 w-6" />;
      case 'professional': return <Trophy className="h-6 w-6" />;
      default: return <Dumbbell className="h-6 w-6" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'supporter': return 'Praticante';
      case 'establishment': return 'Estabelecimento';
      case 'group': return 'Grupo Esportivo';
      case 'professional': return 'Profissional';
      default: return type;
    }
  };

  const userTypes = [
    {
      type: 'supporter',
      name: 'Praticante',
      description: 'Para quem busca atividades esportivas',
      icon: Dumbbell,
      color: 'from-orange-500 to-orange-600'
    },
    {
      type: 'establishment', 
      name: 'Estabelecimento',
      description: 'Para locais que oferecem atividades',
      icon: Building2,
      color: 'from-blue-500 to-blue-600'
    },
    {
      type: 'group',
      name: 'Grupo Esportivo', 
      description: 'Para grupos que organizam atividades',
      icon: Users,
      color: 'from-green-500 to-green-600'
    },
    {
      type: 'professional',
      name: 'Profissional',
      description: 'Para profissionais do esporte',
      icon: Trophy,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const selectedPlans = selectedUserType ? plans.filter(p => p.type === selectedUserType) : [];
  const freePlan = selectedPlans.find(p => p.is_free);
  const premiumPlan = selectedPlans.find(p => !p.is_free);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando planos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header isSecondaryVisible={true} />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {!selectedUserType ? (
            // Seleção do tipo de usuário
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Planos de <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">Assinatura</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Primeiro, selecione seu perfil para ver os planos disponíveis
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {userTypes.map((userType) => {
                  const Icon = userType.icon;
                  return (
                    <Card 
                      key={userType.type}
                      className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 group border-2 hover:border-orange-200"
                      onClick={() => setSelectedUserType(userType.type)}
                    >
                      <CardContent className="p-8 text-center">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${userType.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {userType.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {userType.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ) : (
            // Comparação de planos
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-8">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedUserType(null)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </div>

              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Planos para <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                    {userTypes.find(t => t.type === selectedUserType)?.name}
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Compare os benefícios e escolha o plano ideal
                </p>
                
                <div className="flex items-center justify-center space-x-4 mb-8">
                  <span className={`text-sm ${!isYearly ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                    Mensal
                  </span>
                  <button
                    onClick={() => setIsYearly(!isYearly)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isYearly ? 'bg-orange-500' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isYearly ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className={`text-sm ${isYearly ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                    Anual
                  </span>
                  {isYearly && (
                    <Badge className="ml-2 bg-green-100 text-green-700 hover:bg-green-100">
                      Economize até 17%
                    </Badge>
                  )}
                </div>
              </div>

              {freePlan && premiumPlan && (
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {/* Plano Gratuito */}
                  <Card className="relative">
                    <CardHeader className="text-center pb-6">
                      <CardTitle className="text-2xl font-bold text-gray-900">
                        {freePlan.name}
                      </CardTitle>
                      <CardDescription className="text-lg">
                        <div className="flex items-baseline justify-center space-x-2">
                          <span className="text-3xl font-bold text-gray-900">
                            Gratuito
                          </span>
                        </div>
                        <p className="text-gray-600 mt-2">Para começar sua jornada</p>
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <ul className="space-y-3">
                        {freePlan.features.map((feature, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        variant="outline"
                        className="w-full py-3 text-lg font-semibold border-gray-300 text-gray-700 hover:bg-gray-50"
                        disabled
                      >
                        Plano Atual
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Plano Premium */}
                  <Card className="relative border-2 border-orange-200 shadow-lg">
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-600 to-orange-400 text-white px-4 py-2 rounded-bl-lg rounded-tr-lg">
                      <Crown className="h-4 w-4 inline mr-1" />
                      Recomendado
                    </div>
                    
                    <CardHeader className="text-center pb-6">
                      <CardTitle className="text-2xl font-bold text-gray-900">
                        {premiumPlan.name}
                      </CardTitle>
                      <CardDescription className="text-lg">
                        <div className="flex items-baseline justify-center space-x-2">
                          <span className="text-3xl font-bold text-gray-900">
                            R$ {isYearly ? premiumPlan.price_yearly.toFixed(2) : premiumPlan.price_monthly.toFixed(2)}
                          </span>
                          <span className="text-gray-500">
                            /{isYearly ? 'ano' : 'mês'}
                          </span>
                        </div>
                        {isYearly && premiumPlan.price_yearly > 0 && (
                          <div className="text-sm text-green-600 mt-2 font-medium">
                            Economize R$ {((premiumPlan.price_monthly * 12) - premiumPlan.price_yearly).toFixed(2)} por ano
                          </div>
                        )}
                        <p className="text-gray-600 mt-2">Acesso completo às funcionalidades</p>
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <ul className="space-y-3">
                        {premiumPlan.features.map((feature, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <Check className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        onClick={() => handleSubscribe(premiumPlan)}
                        className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Assinar Agora
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
};

export default Assinaturas;