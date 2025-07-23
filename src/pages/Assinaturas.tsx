
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useSubscription } from '@/hooks/useSubscription';
import SubscriptionPlanCard from '@/components/SubscriptionPlanCard';
import CountdownTimer from '@/components/CountdownTimer';
import SubscriptionStats from '@/components/SubscriptionStats';
import TestimonialsSection from '@/components/TestimonialsSection';
import SubscriptionBenefits from '@/components/SubscriptionBenefits';
import SubscriptionFAQ from '@/components/SubscriptionFAQ';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Assinaturas = () => {
  const { plans, loading, isBetaTesterDiscountActive, getDiscountedPrice } = useSubscription();
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedType, setSelectedType] = useState<string>('supporter');
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Data de término do desconto beta tester: 10 de agosto de 2025 às 23:59
  const betaEndDate = new Date('2025-08-10T23:59:59');
  
  const isDiscountActive = isBetaTesterDiscountActive();
  
  const handlePlanSelect = (id: string) => {
    if (!user) {
      toast({
        title: 'Login necessário',
        description: 'Faça login para assinar um plano premium.',
        variant: 'destructive',
      });
      // Redirecionar para login ou abrir modal de login
      return;
    }
    
    setSelectedPlanId(id);
  };
  
  const handleSubscribe = () => {
    if (!selectedPlanId) {
      toast({
        title: 'Selecione um plano',
        description: 'Por favor, selecione um plano para continuar.',
        variant: 'destructive',
      });
      return;
    }
    
    // Aqui será implementada a integração com o Stripe
    toast({
      title: 'Em breve!',
      description: 'A funcionalidade de pagamento será habilitada em breve. Fique ligado!',
      variant: 'default',
    });
  };
  
  const filteredPlans = plans.filter(
    (plan) => plan.type === selectedType && !plan.is_free
  );
  
  const freePlan = plans.find(
    (plan) => plan.type === selectedType && plan.is_free
  );

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-6">Planos e Assinaturas</h1>
      <p className="text-xl text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
        Desbloqueie todo o potencial do Núcleo do Esporte com nossos planos Premium. 
        Escolha a opção ideal para suas necessidades e eleve sua experiência esportiva.
      </p>
      
      {/* Contador regressivo */}
      <div className="mb-8 max-w-3xl mx-auto">
        <CountdownTimer targetDate={betaEndDate} />
      </div>
      
      {/* Estatísticas em tempo real */}
      <div className="mb-8">
        <SubscriptionStats discountActive={isDiscountActive} />
      </div>
      
      {!user && (
        <Alert variant="warning" className="mb-8 max-w-3xl mx-auto">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Você não está logado</AlertTitle>
          <AlertDescription>
            Faça login para poder assinar um plano premium e aproveitar o desconto de beta tester.
            <div className="mt-2">
              <Button variant="outline" size="sm" onClick={() => navigate("/")}>
                Fazer Login
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      {/* Alerta de desconto para Beta Testers */}
      {isDiscountActive && (
        <Alert className="mb-8 max-w-3xl mx-auto border-primary bg-primary/10">
          <AlertCircle className="h-4 w-4 text-primary" />
          <AlertTitle className="text-primary">Oferta especial para Beta Testers</AlertTitle>
          <AlertDescription>
            Assine qualquer plano Premium até 10/08/2025 e ganhe 50% de desconto vitalício!
            Esta oferta é limitada e não será repetida após o lançamento oficial.
          </AlertDescription>
        </Alert>
      )}
      
      {/* Tabs para escolher tipo de plano */}
      <Tabs 
        defaultValue="supporter" 
        className="mb-8"
        onValueChange={(value) => setSelectedType(value as string)}
      >
        <div className="flex justify-center mb-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="supporter">Praticante</TabsTrigger>
            <TabsTrigger value="establishment">Estabelecimento</TabsTrigger>
            <TabsTrigger value="group">Grupo</TabsTrigger>
            <TabsTrigger value="professional">Profissional</TabsTrigger>
          </TabsList>
        </div>
        
        {/* Tabs para escolher período (mensal/anual) */}
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-2 w-full max-w-xs">
            <TabsTrigger 
              value="monthly"
              onClick={() => setSelectedPeriod('monthly')}
              className={selectedPeriod === 'monthly' ? 'data-[state=active]' : ''}
            >
              Mensal
            </TabsTrigger>
            <TabsTrigger 
              value="yearly"
              onClick={() => setSelectedPeriod('yearly')}
              className={selectedPeriod === 'yearly' ? 'data-[state=active]' : ''}
            >
              Anual <span className="ml-1 text-xs text-green-500">(Economize)</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        {/* Conteúdo das tabs - mostramos para todos os tipos pois as tabs já filtram */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Plano Gratuito */}
          {freePlan && (
            <SubscriptionPlanCard
              id={freePlan.id}
              name={freePlan.name}
              type={freePlan.type}
              price={0}
              period={selectedPeriod}
              features={freePlan.features as string[]}
              isFree={true}
              onSelect={handlePlanSelect}
            />
          )}
          
          {/* Plano Premium */}
          {filteredPlans.map((plan) => {
            const basePrice = selectedPeriod === 'monthly' ? plan.price_monthly : plan.price_yearly;
            const discountedPrice = isDiscountActive ? getDiscountedPrice(basePrice) : undefined;
            
            return (
              <SubscriptionPlanCard
                key={plan.id}
                id={plan.id}
                name={plan.name}
                type={plan.type}
                price={basePrice}
                discountedPrice={discountedPrice}
                period={selectedPeriod}
                features={plan.features as string[]}
                isFree={false}
                isPopular={true}
                isDiscounted={isDiscountActive}
                onSelect={handlePlanSelect}
                isSelected={selectedPlanId === plan.id}
              />
            );
          })}
        </div>
        
        {/* Botão para assinar */}
        {selectedPlanId && (
          <div className="mt-8 text-center">
            <Button 
              size="lg"
              onClick={handleSubscribe}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary px-8 py-6 text-lg"
            >
              {isDiscountActive ? 'Assinar com 50% OFF' : 'Assinar Agora'}
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              {isDiscountActive 
                ? 'Aproveite! Esta oferta é por tempo limitado.'
                : 'Cancele quando quiser. Sem taxas adicionais.'}
            </p>
          </div>
        )}
      </Tabs>
      
      <Separator className="my-12" />
      
      {/* Seção de benefícios */}
      <SubscriptionBenefits />
      
      <Separator className="my-12" />
      
      {/* Seção de depoimentos */}
      <TestimonialsSection />
      
      <Separator className="my-12" />
      
      {/* FAQ */}
      <SubscriptionFAQ />
    </div>
  );
};

export default Assinaturas;
