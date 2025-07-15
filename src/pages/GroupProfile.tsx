import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { MapPin, Phone, Mail, Users, Star, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import SecondaryHeader from '@/components/SecondaryHeader';
import Footer from '@/components/Footer';
import MapLibre from '@/components/MapLibre';
import RatingStars from '@/components/RatingStars';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface GroupData {
  id: string;
  nome: string;
  descricao: string;
  cidade: string;
  estado: string;
  modalidade: string;
  latitude: number;
  longitude: number;
  criado_em: string;
}

const GroupProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [group, setGroup] = useState<GroupData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroup();
  }, [id]);

  const fetchGroup = async () => {
    if (!id) return;

    try {
      const { data: groupData, error } = await supabase
        .from('grupos_esportivos')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Erro ao buscar grupo:', error);
        throw error;
      }

      if (!groupData) {
        throw new Error('Grupo não encontrado');
      }

      setGroup(groupData);
    } catch (error) {
      console.error('Error fetching group:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os dados do grupo',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading || !group) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SecondaryHeader isVisible={true} />
        <Header isSecondaryVisible={true} />
        <main className="pt-[120px] px-4 md:px-6 pb-12">
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-64 bg-gray-300 rounded-lg mb-6"></div>
                <div className="h-8 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            ) : (
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Grupo não encontrado
                </h1>
                <p className="text-gray-600">
                  O grupo que você procura não existe ou foi removido.
                </p>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SecondaryHeader isVisible={true} />
      <Header isSecondaryVisible={true} />
      
      <main className="pt-[120px] px-4 md:px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Header Image Placeholder */}
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-6 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-white">
                <Users className="h-16 w-16 mx-auto mb-4" />
                <h2 className="text-2xl font-bold">{group.nome}</h2>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        {group.nome}
                      </h1>
                      <div className="flex items-center gap-2 mb-2">
                        <RatingStars rating={0} size="sm" />
                        <span className="text-sm text-gray-600">
                          (0 avaliações)
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{group.cidade}, {group.estado}</span>
                  </div>

                  {group.modalidade && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {group.modalidade}
                      </Badge>
                    </div>
                  )}

                  {group.descricao && (
                    <p className="text-gray-700 leading-relaxed">
                      {group.descricao}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Map */}
              {group.latitude && group.longitude && (
                <Card>
                  <CardContent className="p-0">
                    <MapLibre
                      groups={[{
                        id: group.id,
                        group_name: group.nome,
                        latitude: group.latitude,
                        longitude: group.longitude,
                        cities: [group.cidade],
                        sports: group.modalidade ? [group.modalidade] : [],
                      }]}
                      center={{
                        lat: group.latitude,
                        lng: group.longitude,
                      }}
                      zoom={15}
                      height="300px"
                    />
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Contato</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-3 text-gray-500" />
                      <span className="text-sm">Grupo Esportivo</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => window.open(`https://wa.me/`, '_blank')}
                    >
                      Entre em Contato
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Group Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Informações do Grupo</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Localização:</span>
                      <p className="text-gray-600">{group.cidade}, {group.estado}</p>
                    </div>
                    {group.modalidade && (
                      <div>
                        <span className="font-medium">Modalidade:</span>
                        <p className="text-gray-600">{group.modalidade}</p>
                      </div>
                    )}
                    <div>
                      <span className="font-medium">Cadastrado desde:</span>
                      <p className="text-gray-600">
                        {new Date(group.criado_em).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GroupProfile;