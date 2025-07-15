import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Building2, Users, Dumbbell, Trophy, ArrowLeft, Star, Zap, Shield, Target, Sparkles, Award } from 'lucide-react';
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
      // Como não temos tabela subscription_plans, usar dados mock
      const mockPlans: Plan[] = [
        {
          id: '1',
          name: 'Gratuito',
          type: 'free',
          price_monthly: 0,
          price_yearly: 0,
          is_free: true,
          features: ['Acesso básico', 'Até 3 estabelecimentos']
        }
      ];
      setPlans(mockPlans);
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
      description: 'Para quem busca atividades esportivas e quer encontrar o esporte perfeito',
      icon: Dumbbell,
      color: 'from-red-600 to-orange-500',
      benefits: [
        'Encontre atividades próximas',
        'Conecte-se com outros praticantes',
        'Acesse avaliações de estabelecimentos',
        'Receba recomendações personalizadas'
      ]
    },
    {
      type: 'establishment', 
      name: 'Estabelecimento',
      description: 'Para academias, clubes e locais que oferecem atividades esportivas',
      icon: Building2,
      color: 'from-red-600 to-orange-500',
      benefits: [
        'Divulgue seus serviços',
        'Gerencie horários e preços',
        'Receba avaliações',
        'Aumente sua visibilidade'
      ]
    },
    {
      type: 'group',
      name: 'Grupo Esportivo', 
      description: 'Para grupos, equipes e coletivos esportivos organizados',
      icon: Users,
      color: 'from-red-600 to-orange-500',
      benefits: [
        'Organize seus eventos',
        'Gerencie membros',
        'Encontre novos participantes',
        'Compartilhe atividades'
      ]
    },
    {
      type: 'professional',
      name: 'Profissional',
      description: 'Para treinadores, personal trainers e profissionais do esporte',
      icon: Trophy,
      color: 'from-red-600 to-orange-500',
      benefits: [
        'Ofereça seus serviços',
        'Gerencie clientes',
        'Mostre seu portfólio',
        'Expanda sua rede'
      ]
    }
  ];

  // Benefícios expandidos para cada tipo de plano
  const getExpandedFeatures = (type: string, isPremium: boolean) => {
    const baseFeatures = {
      supporter: {
        free: [
          'Buscar estabelecimentos e grupos',
          'Ver informações básicas',
          'Criar conta gratuita',
          'Acesso limitado a 3 contatos por mês'
        ],
        premium: [
          '🚀 Busca ilimitada de estabelecimentos',
          '⭐ Recomendações personalizadas com IA',
          '💬 Contatos ilimitados com estabelecimentos',
          '🎯 Filtros avançados de busca',
          '📱 Notificações de novas atividades',
          '🏆 Sistema de conquistas e badges',
          '💰 Acesso a promoções exclusivas',
          '📊 Histórico completo de atividades',
          '🎪 Eventos premium exclusivos',
          '⚡ Suporte prioritário 24/7'
        ]
      },
      establishment: {
        free: [
          'Cadastro básico do estabelecimento',
          'Até 5 fotos',
          'Informações de contato',
          'Horários básicos de funcionamento'
        ],
        premium: [
          '🏢 Perfil completo e destacado',
          '📸 Galeria ilimitada de fotos e vídeos',
          '📊 Analytics detalhados de visualizações',
          '🎯 Posicionamento prioritário na busca',
          '💼 Gerenciamento avançado de serviços',
          '📅 Sistema de agendamento integrado',
          '⭐ Gestão completa de avaliações',
          '📱 App dedicado para gestão',
          '💰 Sistema de promoções e cupons',
          '🚀 Campanhas de marketing digitais'
        ]
      },
      group: {
        free: [
          'Cadastro básico do grupo',
          'Até 3 fotos',
          'Lista básica de atividades',
          'Informações de contato'
        ],
        premium: [
          '👥 Gerenciamento completo de membros',
          '📅 Calendário avançado de eventos',
          '📸 Galeria ilimitada do grupo',
          '🎯 Divulgação prioritária de eventos',
          '💬 Sistema de chat interno',
          '📊 Relatórios de participação',
          '🏆 Sistema de ranking de membros',
          '📱 Notificações push personalizadas',
          '💰 Gestão financeira do grupo',
          '⚡ Ferramentas de organização avançadas'
        ]
      },
      professional: {
        free: [
          'Perfil básico profissional',
          'Até 3 certificações',
          'Informações de contato',
          'Especialidades básicas'
        ],
        premium: [
          '🏅 Perfil profissional destacado',
          '📜 Certificações e cursos ilimitados',
          '💼 Portfólio completo de trabalhos',
          '📅 Sistema de agendamento próprio',
          '⭐ Gestão de avaliações de clientes',
          '📊 Dashboard de performance',
          '💰 Sistema de cobrança integrado',
          '🎯 Leads qualificados automáticos',
          '📱 App dedicado para profissionais',
          '🚀 Marketing pessoal automatizado'
        ]
      }
    };

    return isPremium ? baseFeatures[type]?.premium || [] : baseFeatures[type]?.free || [];
  };

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
            // Seleção do tipo de usuário - Interface melhorada
            <div className="max-w-7xl mx-auto">
              {/* Hero Section */}
              <div className="text-center mb-16 bg-gradient-to-br from-gray-50 to-orange-50 py-16 rounded-3xl">
                <div className="max-w-4xl mx-auto px-8">
                  <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                    Transforme seu <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">esporte</span>
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Escolha seu perfil e descubra como o <strong>Núcleo do Esporte</strong> pode revolucionar sua experiência esportiva
                  </p>
                  <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span>Mais de 50.000 usuários</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <span>100% Seguro</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-blue-500" />
                      <span>Líder no mercado</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Type Selection */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {userTypes.map((userType) => {
                  const Icon = userType.icon;
                  return (
                    <Card 
                      key={userType.type}
                      className="cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105 group border-2 hover:border-orange-300 bg-white hover:bg-gradient-to-br hover:from-white hover:to-orange-50"
                      onClick={() => setSelectedUserType(userType.type)}
                    >
                      <CardContent className="p-8 text-center relative">
                        <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${userType.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                          <Icon className="h-10 w-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                          {userType.name}
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {userType.description}
                        </p>
                        
                        {/* Mini preview dos benefícios */}
                        <div className="space-y-2 mb-6">
                          {userType.benefits.slice(0, 2).map((benefit, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-500">
                              <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                          <div className="text-xs text-orange-600 font-medium">
                            +{userType.benefits.length - 2} outros benefícios
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold group-hover:shadow-lg transition-all duration-300 group-hover:from-red-700 group-hover:to-orange-600">
                          Ver Planos
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Testimonial Section */}
              <div className="mt-20 text-center bg-gradient-to-r from-red-600 to-orange-500 text-white py-12 rounded-3xl">
                <div className="max-w-4xl mx-auto px-8">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-80" />
                  <h3 className="text-3xl font-bold mb-4">Junte-se à revolução do esporte!</h3>
                  <p className="text-xl opacity-90 mb-6">
                    "O Núcleo do Esporte transformou completamente como eu encontro e pratico esportes. A plataforma é incrível!"
                  </p>
                  <div className="text-lg font-semibold">- Maria Silva, Praticante Premium</div>
                </div>
              </div>
            </div>
          ) : (
            // Comparação de planos - Interface completamente renovada
            <div className="max-w-7xl mx-auto">
              {/* Navigation */}
              <div className="flex items-center justify-between mb-12">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedUserType(null)}
                  className="text-gray-600 hover:text-gray-900 hover:bg-orange-50"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar para seleção
                </Button>
                
                {/* Navigation tabs */}
                <div className="hidden md:flex space-x-1 bg-gray-100 rounded-xl p-1">
                  {userTypes.map((type) => (
                    <button
                      key={type.type}
                      onClick={() => setSelectedUserType(type.type)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedUserType === type.type
                          ? 'bg-white shadow-sm text-orange-600'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {type.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Header Section */}
              <div className="text-center mb-16">
                <div className="flex items-center justify-center mb-6">
                  {(() => {
                    const currentType = userTypes.find(t => t.type === selectedUserType);
                    if (!currentType) return null;
                    const Icon = currentType.icon;
                    return (
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${currentType.color} flex items-center justify-center shadow-lg mr-4`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                    );
                  })()}
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                    Planos para <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                      {userTypes.find(t => t.type === selectedUserType)?.name}
                    </span>
                  </h1>
                </div>
                
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  {userTypes.find(t => t.type === selectedUserType)?.description}
                </p>
                
                {/* Toggle anual/mensal */}
                <div className="flex items-center justify-center space-x-4 mb-8 bg-gray-50 rounded-2xl p-4 inline-flex">
                  <span className={`text-lg font-medium transition-colors ${!isYearly ? 'text-orange-600' : 'text-gray-500'}`}>
                    Mensal
                  </span>
                  <button
                    onClick={() => setIsYearly(!isYearly)}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      isYearly ? 'bg-gradient-to-r from-red-600 to-orange-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-lg ${
                        isYearly ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className={`text-lg font-medium transition-colors ${isYearly ? 'text-orange-600' : 'text-gray-500'}`}>
                    Anual
                  </span>
                  {isYearly && (
                    <Badge className="ml-3 bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
                      💰 Economize até 17%
                    </Badge>
                  )}
                </div>
              </div>

              {/* Comparação detalhada */}
              {freePlan && premiumPlan && (
                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                  {/* Plano Gratuito */}
                  <Card className="relative bg-white border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="text-center pb-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-lg">
                      <Badge className="mx-auto mb-4 bg-gray-200 text-gray-600 border-gray-300">
                        Gratuito
                      </Badge>
                      <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                        {freePlan.name}
                      </CardTitle>
                      <div className="flex items-baseline justify-center space-x-2 mb-4">
                        <span className="text-5xl font-bold text-gray-900">R$ 0</span>
                        <span className="text-gray-500 text-lg">/mês</span>
                      </div>
                      <p className="text-gray-600 text-lg">Perfeito para começar</p>
                    </CardHeader>

                    <CardContent className="p-8">
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-4 text-lg">✨ O que está incluído:</h4>
                          <ul className="space-y-3">
                            {getExpandedFeatures(selectedUserType!, false).map((feature, index) => (
                              <li key={index} className="flex items-start space-x-3">
                                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl">
                          <h5 className="font-medium text-gray-900 mb-2">🎯 Ideal para:</h5>
                          <p className="text-gray-600 text-sm">
                            Quem está começando e quer experimentar a plataforma
                          </p>
                        </div>

                        <Button
                          variant="outline"
                          className="w-full py-4 text-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                          disabled
                        >
                          ✅ Seu plano atual
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Plano Premium */}
                  <Card className="relative bg-white border-2 border-orange-300 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
                    {/* Badge de destaque */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-2 text-sm font-bold shadow-lg">
                        <Crown className="h-4 w-4 mr-1" />
                        MAIS POPULAR
                      </Badge>
                    </div>
                    
                    <CardHeader className="text-center pb-8 bg-gradient-to-br from-orange-50 to-red-50 rounded-t-lg">
                      <Badge className="mx-auto mb-4 bg-orange-100 text-orange-700 border-orange-200">
                        Premium
                      </Badge>
                      <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                        {premiumPlan.name}
                      </CardTitle>
                      <div className="flex items-baseline justify-center space-x-2 mb-4">
                        <span className="text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                          R$ {isYearly ? premiumPlan.price_yearly.toFixed(0) : premiumPlan.price_monthly.toFixed(0)}
                        </span>
                        <span className="text-gray-500 text-lg">
                          /{isYearly ? 'ano' : 'mês'}
                        </span>
                      </div>
                      {isYearly && premiumPlan.price_yearly > 0 && (
                        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium border border-green-200">
                          💰 Economize R$ {((premiumPlan.price_monthly * 12) - premiumPlan.price_yearly).toFixed(0)} por ano
                        </div>
                      )}
                      <p className="text-gray-600 text-lg mt-2">Acesso total + recursos exclusivos</p>
                    </CardHeader>

                    <CardContent className="p-8">
                      <div className="space-y-6">
                        {/* Benefícios exclusivos em destaque */}
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
                          <h4 className="font-bold text-orange-900 mb-3 text-lg">🚀 Recursos Exclusivos Premium:</h4>
                          <div className="grid gap-2">
                            {getExpandedFeatures(selectedUserType!, true).slice(0, 4).map((feature, index) => (
                              <div key={index} className="flex items-start space-x-3">
                                <Zap className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                <span className="text-orange-800 text-sm font-medium">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-4 text-lg">⭐ Recursos completos:</h4>
                          <ul className="space-y-3 max-h-64 overflow-y-auto">
                            {getExpandedFeatures(selectedUserType!, true).map((feature, index) => (
                              <li key={index} className="flex items-start space-x-3">
                                <Check className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                          <h5 className="font-medium text-orange-900 mb-2">🎯 Ideal para:</h5>
                          <p className="text-orange-800 text-sm">
                            Quem quer maximizar seus resultados e ter acesso a todas as ferramentas avançadas
                          </p>
                        </div>

                        <div className="space-y-3">
                          <Button
                            onClick={() => handleSubscribe(premiumPlan)}
                            className="w-full py-4 text-lg font-bold bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                          >
                            🚀 Assinar Agora - {isYearly ? 'Anual' : 'Mensal'}
                          </Button>
                          
                          <div className="text-center space-y-2">
                            <p className="text-xs text-gray-500">✅ Sem compromisso • Cancele quando quiser</p>
                            <p className="text-xs text-gray-500">🔒 Pagamento 100% seguro</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Seção de garantia e benefícios */}
              <div className="mt-20 bg-gradient-to-br from-gray-50 to-orange-50 rounded-3xl p-12">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Por que escolher o <span className="text-orange-600">Núcleo do Esporte Premium?</span>
                  </h3>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Garantia de 30 dias</h4>
                    <p className="text-gray-600">Se não ficar satisfeito, devolvemos 100% do seu dinheiro</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Target className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Resultados comprovados</h4>
                    <p className="text-gray-600">Usuários premium têm 3x mais engajamento esportivo</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Suporte VIP</h4>
                    <p className="text-gray-600">Atendimento prioritário 24/7 com nossa equipe especializada</p>
                  </div>
                </div>
              </div>
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