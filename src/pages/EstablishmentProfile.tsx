
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { MapPin, Phone, Mail, Clock, Star, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import SecondaryHeader from '@/components/SecondaryHeader';
import Footer from '@/components/Footer';
import MapLibre from '@/components/MapLibre';
import ReviewSystem from '@/components/ReviewSystem';
import SmartRecommendations from '@/components/SmartRecommendations';
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

interface EstablishmentData {
  id: string;
  establishment_name: string;
  corporate_name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  cep: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
  created_at: string;
  establishment_sports: Array<{ sport_name: string }>;
  establishment_photos: Array<{ photo_url: string; is_main: boolean; caption: string }>;
  reviews: ReviewData[];
}

const EstablishmentProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [establishment, setEstablishment] = useState<EstablishmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    fetchEstablishment();
    if (user) {
      checkFavoriteStatus();
    }
  }, [id, user]);

  const fetchEstablishment = async () => {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from('establishments')
        .select(`
          *,
          establishment_sports(sport_name),
          establishment_photos(photo_url, is_main, caption),
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

        const establishmentWithReviews: EstablishmentData = {
          ...data,
          reviews: reviewsWithProfiles
        };

        setEstablishment(establishmentWithReviews);
      } else {
        setEstablishment({ ...data, reviews: [] });
      }
    } catch (error) {
      console.error('Error fetching establishment:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os dados do estabelecimento',
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
        .eq('establishment_id', id)
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
        description: 'Faça login para favoritar estabelecimentos',
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
          .eq('establishment_id', id);
        
        setIsFavorited(false);
        toast({
          title: 'Removido dos favoritos',
          description: 'Estabelecimento removido dos seus favoritos',
        });
      } else {
        await supabase
          .from('user_favorites')
          .insert({
            user_id: user.id,
            establishment_id: id,
          });
        
        setIsFavorited(true);
        toast({
          title: 'Adicionado aos favoritos',
          description: 'Estabelecimento adicionado aos seus favoritos',
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

  const shareEstablishment = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: establishment?.establishment_name,
          text: `Confira este estabelecimento no Núcleo do Esporte`,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copiado',
        description: 'Link do estabelecimento copiado para a área de transferência',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SecondaryHeader isVisible={true} />
        <Header isSecondaryVisible={true} />
        <main className="pt-[120px] px-4 md:px-6 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-64 bg-gray-300 rounded-lg mb-6"></div>
              <div className="h-8 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!establishment) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SecondaryHeader isVisible={true} />
        <Header isSecondaryVisible={true} />
        <main className="pt-[120px] px-4 md:px-6 pb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Estabelecimento não encontrado
            </h1>
            <p className="text-gray-600">
              O estabelecimento que você procura não existe ou foi removido.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const averageRating = establishment.reviews.length > 0
    ? establishment.reviews.reduce((sum, review) => sum + review.rating, 0) / establishment.reviews.length
    : 0;

  const photos = establishment.establishment_photos.length > 0 
    ? establishment.establishment_photos 
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
              alt={establishment.establishment_name}
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
                        {establishment.establishment_name}
                      </h1>
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
                      <Button variant="outline" size="sm" onClick={shareEstablishment}>
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{establishment.address}, {establishment.city} - {establishment.state}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {establishment.establishment_sports.map((sport, index) => (
                      <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-800">
                        {sport.sport_name}
                      </Badge>
                    ))}
                  </div>

                  {establishment.description && (
                    <p className="text-gray-700 leading-relaxed">
                      {establishment.description}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Map */}
              {establishment.latitude && establishment.longitude && (
                <Card>
                  <CardContent className="p-0">
                    <MapLibre
                      establishments={[{
                        id: establishment.id,
                        establishment_name: establishment.establishment_name,
                        latitude: establishment.latitude,
                        longitude: establishment.longitude,
                        city: establishment.city,
                        state: establishment.state,
                        sports: establishment.establishment_sports.map(s => s.sport_name),
                        photos: establishment.establishment_photos,
                      }]}
                      center={{
                        lat: establishment.latitude,
                        lng: establishment.longitude,
                      }}
                      zoom={15}
                      height="300px"
                    />
                  </CardContent>
                </Card>
              )}

              {/* Sistema de Reviews Melhorado */}
              <ReviewSystem
                establishmentId={establishment.id}
                reviews={establishment.reviews}
                onReviewSubmitted={fetchEstablishment}
                averageRating={averageRating}
                totalReviews={establishment.reviews.length}
              />
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
                      <a href={`tel:${establishment.phone}`} className="text-orange-600 hover:underline">
                        {establishment.phone}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-3 text-gray-500" />
                      <a href={`mailto:${establishment.email}`} className="text-orange-600 hover:underline">
                        {establishment.email}
                      </a>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 mr-3 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm">{establishment.address}</p>
                        <p className="text-sm text-gray-600">
                          {establishment.city} - {establishment.state}
                        </p>
                        <p className="text-sm text-gray-600">CEP: {establishment.cep}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => window.open(`https://wa.me/55${establishment.phone.replace(/\D/g, '')}`, '_blank')}
                    >
                      WhatsApp
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={() => window.open(`tel:${establishment.phone}`, '_self')}
                    >
                      Ligar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Business Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Informações</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Razão Social:</span>
                      <p className="text-gray-600">{establishment.corporate_name}</p>
                    </div>
                    <div>
                      <span className="font-medium">Cadastrado desde:</span>
                      <p className="text-gray-600">
                        {new Date(establishment.created_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recomendações */}
              <SmartRecommendations
                userId={user?.id}
                currentItemId={establishment.id}
                currentItemType="establishment"
                userPreferences={establishment.establishment_sports.map(s => s.sport_name)}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EstablishmentProfile;
