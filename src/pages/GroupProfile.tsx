
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
import GoogleMap from '@/components/GoogleMap';
import RatingStars from '@/components/RatingStars';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface ReviewData {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  user_id: string;
  user_profiles?: { full_name: string } | null;
}

interface GroupData {
  id: string;
  group_name: string;
  corporate_name: string;
  description: string;
  cities: string[];
  meeting_point: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
  created_at: string;
  group_sports: Array<{ sport_name: string }>;
  group_photos: Array<{ photo_url: string; is_main: boolean; caption: string }>;
  reviews: ReviewData[];
}

const GroupProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [group, setGroup] = useState<GroupData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    fetchGroup();
    if (user) {
      checkFavoriteStatus();
    }
  }, [id, user]);

  const fetchGroup = async () => {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from('sports_groups')
        .select(`
          *,
          group_sports(sport_name),
          group_photos(photo_url, is_main, caption),
          reviews(id, rating, comment, created_at, user_id)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      // Get user profiles for reviews separately
      if (data.reviews && data.reviews.length > 0) {
        const userIds = data.reviews.map((r: any) => r.user_id);
        const { data: profiles } = await supabase
          .from('user_profiles')
          .select('id, full_name')
          .in('id', userIds);

        // Map profiles to reviews
        const reviewsWithProfiles: ReviewData[] = data.reviews.map((review: any) => {
          const profile = profiles?.find(p => p.id === review.user_id);
          return {
            ...review,
            user_profiles: profile ? { full_name: profile.full_name } : null
          };
        });

        const groupWithReviews: GroupData = {
          ...data,
          reviews: reviewsWithProfiles
        };

        setGroup(groupWithReviews);
      } else {
        setGroup({ ...data, reviews: [] });
      }
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

  const checkFavoriteStatus = async () => {
    if (!user || !id) return;

    try {
      const { data } = await supabase
        .from('user_favorites')
        .select('id')
        .eq('user_id', user.id)
        .eq('group_id', id)
        .maybeSingle();

      setIsFavorited(!!data);
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      toast({
        title: 'Login necessário',
        description: 'Faça login para favoritar grupos',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (isFavorited) {
        await supabase
          .from('user_favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('group_id', id);
        
        setIsFavorited(false);
        toast({
          title: 'Removido dos favoritos',
          description: 'Grupo removido dos seus favoritos',
        });
      } else {
        await supabase
          .from('user_favorites')
          .insert({
            user_id: user.id,
            group_id: id,
          });
        
        setIsFavorited(true);
        toast({
          title: 'Adicionado aos favoritos',
          description: 'Grupo adicionado aos seus favoritos',
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar favoritos',
        variant: 'destructive',
      });
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

  const averageRating = group.reviews.length > 0
    ? group.reviews.reduce((sum, review) => sum + review.rating, 0) / group.reviews.length
    : 0;

  const photos = group.group_photos.length > 0 
    ? group.group_photos 
    : [{ photo_url: '/placeholder.svg', is_main: true, caption: '' }];

  return (
    <div className="min-h-screen bg-gray-50">
      <SecondaryHeader isVisible={true} />
      <Header isSecondaryVisible={true} />
      
      <main className="pt-[120px] px-4 md:px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Photo Gallery */}
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-6 shadow-lg">
            <img
              src={photos[currentPhotoIndex]?.photo_url || '/placeholder.svg'}
              alt={group.group_name}
              className="w-full h-full object-cover"
            />
            {photos.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPhotoIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
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
                        {group.group_name}
                      </h1>
                      <div className="flex items-center gap-2 mb-2">
                        <RatingStars rating={averageRating} size="sm" />
                        <span className="text-sm text-gray-600">
                          ({group.reviews.length} avaliações)
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleFavorite}
                        className={isFavorited ? 'text-red-500' : ''}
                      >
                        <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{group.cities.join(', ')}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {group.group_sports.map((sport, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                        {sport.sport_name}
                      </Badge>
                    ))}
                  </div>

                  {group.description && (
                    <p className="text-gray-700 leading-relaxed">
                      {group.description}
                    </p>
                  )}

                  {group.meeting_point && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-800 mb-1">Ponto de Encontro:</p>
                      <p className="text-blue-700">{group.meeting_point}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Map */}
              {group.latitude && group.longitude && (
                <Card>
                  <CardContent className="p-0">
                    <GoogleMap
                      groups={[{
                        id: group.id,
                        group_name: group.group_name,
                        latitude: group.latitude,
                        longitude: group.longitude,
                        cities: group.cities,
                        sports: group.group_sports.map(s => s.sport_name),
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
                      <Phone className="w-4 h-4 mr-3 text-gray-500" />
                      <a href={`tel:${group.phone}`} className="text-blue-600 hover:underline">
                        {group.phone}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-3 text-gray-500" />
                      <a href={`mailto:${group.email}`} className="text-blue-600 hover:underline">
                        {group.email}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-3 text-gray-500" />
                      <span className="text-sm">Grupo Esportivo</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => window.open(`https://wa.me/55${group.phone.replace(/\D/g, '')}`, '_blank')}
                    >
                      WhatsApp
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={() => window.open(`tel:${group.phone}`, '_self')}
                    >
                      Ligar
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
                      <span className="font-medium">Razão Social:</span>
                      <p className="text-gray-600">{group.corporate_name}</p>
                    </div>
                    <div>
                      <span className="font-medium">Cidades de Atuação:</span>
                      <p className="text-gray-600">{group.cities.join(', ')}</p>
                    </div>
                    <div>
                      <span className="font-medium">Cadastrado desde:</span>
                      <p className="text-gray-600">
                        {new Date(group.created_at).toLocaleDateString('pt-BR')}
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
