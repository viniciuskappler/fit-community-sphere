import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Building2, Users, Dumbbell, Trophy } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import LoginModal from '@/components/LoginModal';

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

  const groupedPlans = plans.reduce((acc, plan) => {
    if (!acc[plan.type]) acc[plan.type] = [];
    acc[plan.type].push(plan);
    return acc;
  }, {} as Record<string, Plan[]>);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando planos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Planos de Assinatura
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Escolha o plano ideal para suas necessidades esportivas
          </p>
          
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm ${!isYearly ? 'font-semibold' : 'text-gray-500'}`}>
              Mensal
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isYearly ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isYearly ? 'font-semibold' : 'text-gray-500'}`}>
              Anual
            </span>
            {isYearly && (
              <Badge variant="secondary" className="ml-2">
                Economize até 17%
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-12">
          {Object.entries(groupedPlans).map(([type, typePlans]) => (
            <div key={type} className="space-y-6">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-3 mb-2">
                  {getIcon(type)}
                  <h2 className="text-2xl font-bold text-gray-900">
                    {getTypeLabel(type)}
                  </h2>
                </div>
                <p className="text-gray-600">
                  {type === 'supporter' && 'Para quem busca atividades esportivas'}
                  {type === 'establishment' && 'Para locais que oferecem atividades'}
                  {type === 'group' && 'Para grupos que organizam atividades'}
                  {type === 'professional' && 'Para profissionais do esporte'}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {typePlans.map((plan) => (
                  <Card
                    key={plan.id}
                    className={`relative transition-all duration-300 hover:shadow-xl ${
                      !plan.is_free ? 'ring-2 ring-blue-200 scale-105' : ''
                    }`}
                  >
                    {!plan.is_free && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg">
                        <Crown className="h-4 w-4 inline mr-1" />
                        Premium
                      </div>
                    )}
                    
                    <CardHeader className="text-center pb-6">
                      <CardTitle className="text-2xl font-bold">
                        {plan.name}
                      </CardTitle>
                      <CardDescription className="text-lg">
                        <div className="flex items-baseline justify-center space-x-2">
                          <span className="text-3xl font-bold text-gray-900">
                            R$ {isYearly ? plan.price_yearly.toFixed(2) : plan.price_monthly.toFixed(2)}
                          </span>
                          <span className="text-gray-500">
                            /{isYearly ? 'ano' : 'mês'}
                          </span>
                        </div>
                        {isYearly && plan.price_yearly > 0 && (
                          <div className="text-sm text-green-600 mt-2">
                            Economize R$ {((plan.price_monthly * 12) - plan.price_yearly).toFixed(2)} por ano
                          </div>
                        )}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        onClick={() => handleSubscribe(plan)}
                        className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${
                          plan.is_free
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                        }`}
                        variant={plan.is_free ? 'outline' : 'default'}
                      >
                        {plan.is_free ? 'Plano Atual' : 'Assinar Agora'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="px-8 py-3"
          >
            Voltar ao Início
          </Button>
        </div>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
};

export default Assinaturas;