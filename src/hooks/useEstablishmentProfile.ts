
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
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

export const useEstablishmentProfile = (id: string | undefined) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [establishment, setEstablishment] = useState<EstablishmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);

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

  useEffect(() => {
    fetchEstablishment();
    if (user) {
      checkFavoriteStatus();
    }
  }, [id, user]);

  return {
    establishment,
    loading,
    isFavorited,
    toggleFavorite,
    shareEstablishment,
    fetchEstablishment
  };
};
