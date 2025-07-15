import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useUserData } from '@/hooks/useUserData';

interface SportEvent {
  id: string;
  titulo: string;
  descricao: string;
  data: string;
  hora: string;
  modalidade: string;
  cidade: string;
  estado: string;
  rua: string;
  bairro: string;
  valor_ingresso: number;
  ingressos_disponiveis: number;
  evento_privado: boolean;
}

const EventsSection = () => {
  const { profile } = useUserData();
  const [events, setEvents] = useState<SportEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNearbyEvents();
  }, [profile]);

  const fetchNearbyEvents = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('eventos_esportivos')
        .select('*')
        .eq('evento_privado', false)
        .order('data', { ascending: true })
        .limit(10);

      // Filtrar por cidade se disponível
      if (profile?.city) {
        query = query.eq('cidade', profile.city);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Erro ao buscar eventos:', error);
        return;
      }

      setEvents(data || []);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    if (price === 0) return 'Gratuito';
    return `R$ ${price.toFixed(2)}`;
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Eventos Próximos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Eventos Esportivos Próximos</CardTitle>
        {profile?.city && (
          <p className="text-sm text-muted-foreground">
            Eventos em {profile.city}, {profile.state}
          </p>
        )}
      </CardHeader>
      
      <CardContent>
        {events.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Nenhum evento encontrado
            </h3>
            <p className="text-sm text-muted-foreground">
              Não há eventos esportivos disponíveis na sua região no momento.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1">
                      {event.titulo}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {event.modalidade}
                    </Badge>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">
                      {formatPrice(event.valor_ingresso)}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDate(event.data)}</span>
                    {event.hora && (
                      <>
                        <Clock className="h-4 w-4 ml-4 mr-2" />
                        <span>{event.hora}</span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>
                      {event.rua && `${event.rua}, `}
                      {event.bairro && `${event.bairro}, `}
                      {event.cidade}
                    </span>
                  </div>

                  {event.ingressos_disponiveis > 0 && (
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{event.ingressos_disponiveis} vagas disponíveis</span>
                    </div>
                  )}
                </div>

                {event.descricao && (
                  <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                    {event.descricao}
                  </p>
                )}

                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="default" className="flex-1">
                    Ver Detalhes
                  </Button>
                  {event.ingressos_disponiveis > 0 && (
                    <Button size="sm" variant="outline">
                      Participar
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventsSection;