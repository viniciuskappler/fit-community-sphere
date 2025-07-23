
import { Activity, Building, Crown, LineChart, MapPin, Medal, Rocket, Shield, Users, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Benefit = ({ icon, title, description }: BenefitProps) => (
  <Card className="border border-muted">
    <CardHeader className="pb-2">
      <div className="bg-primary/10 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-2">
        {icon}
      </div>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription>{description}</CardDescription>
    </CardContent>
  </Card>
);

const SubscriptionBenefits = () => {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-center mb-2">Por Que Escolher Premium</h2>
      <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
        O plano Premium desbloqueia todo o potencial da sua experiência esportiva, 
        garantindo acesso a recursos exclusivos e oportunidades únicas.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Benefit 
          icon={<Zap className="text-primary h-5 w-5" />}
          title="Visibilidade Aumentada" 
          description="Apareça em destaque nas buscas e seja recomendado para praticantes interessados na sua modalidade."
        />
        <Benefit 
          icon={<Users className="text-primary h-5 w-5" />}
          title="Comunidade Exclusiva" 
          description="Acesse grupos premium e conecte-se com outros entusiastas e profissionais do esporte."
        />
        <Benefit 
          icon={<LineChart className="text-primary h-5 w-5" />}
          title="Analytics Detalhados" 
          description="Receba insights valiosos sobre seu desempenho, engajamento e oportunidades."
        />
        <Benefit 
          icon={<Shield className="text-primary h-5 w-5" />}
          title="Suporte Prioritário" 
          description="Tenha acesso a uma equipe dedicada para resolver qualquer questão em tempo recorde."
        />
        <Benefit 
          icon={<Crown className="text-primary h-5 w-5" />}
          title="Recursos Avançados" 
          description="Utilize ferramentas premium exclusivas para gerenciamento, organização e promoção."
        />
        <Benefit 
          icon={<Building className="text-primary h-5 w-5" />}
          title="Parcerias Estratégicas" 
          description="Seja conectado com marcas, eventos e oportunidades alinhadas ao seu perfil."
        />
        <Benefit 
          icon={<Medal className="text-primary h-5 w-5" />}
          title="Selo de Verificação" 
          description="Ganhe credibilidade com um selo exclusivo que confirma sua autenticidade na plataforma."
        />
        <Benefit 
          icon={<Rocket className="text-primary h-5 w-5" />}
          title="Prioridade em Lançamentos" 
          description="Seja o primeiro a acessar novas funcionalidades e recursos da plataforma."
        />
        <Benefit 
          icon={<Activity className="text-primary h-5 w-5" />}
          title="Engajamento Otimizado" 
          description="Aumente significativamente suas interações através de ferramentas exclusivas de promoção."
        />
      </div>
    </section>
  );
};

export default SubscriptionBenefits;
