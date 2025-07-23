
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface SubscriptionStatsProps {
  discountActive: boolean;
}

const SubscriptionStats = ({ discountActive }: SubscriptionStatsProps) => {
  const [stats, setStats] = useState({
    newUsers: 0,
    usersToday: 0,
    totalSubscribers: 0
  });

  useEffect(() => {
    // Simulação de estatísticas que aumentam com o tempo
    // Em produção, isso seria substituído por dados reais do backend
    const interval = setInterval(() => {
      setStats(prev => ({
        newUsers: prev.newUsers + Math.floor(Math.random() * 3),
        usersToday: prev.usersToday + Math.floor(Math.random() * 5),
        totalSubscribers: Math.floor(prev.totalSubscribers * 1.001) + 1
      }));
    }, 5000);

    // Valores iniciais
    setStats({
      newUsers: 87,
      usersToday: 342,
      totalSubscribers: 4817
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Novos assinantes na última hora</CardDescription>
          <CardTitle className="flex items-center gap-2">
            {stats.newUsers}
            <Badge variant="default" className="animate-pulse">
              Agora
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Pessoas que assinaram um plano Premium na última hora
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Assinaturas hoje</CardDescription>
          <CardTitle>{stats.usersToday}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Total de assinantes premium só hoje
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total de assinantes</CardDescription>
          <CardTitle className="flex items-center gap-2">
            {stats.totalSubscribers}
            {discountActive && (
              <Badge variant="destructive">Restam poucas vagas</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Pessoas já aproveitando recursos premium
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionStats;
