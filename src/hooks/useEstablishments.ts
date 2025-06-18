
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface EstablishmentWithDetails {
  id: string;
  establishment_name: string;
  corporate_name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  email: string;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  sports: string[];
  photos: Array<{
    id: string;
    photo_url: string;
    caption: string | null;
    is_main: boolean;
  }>;
  averageRating: number;
  reviewCount: number;
}

export const useEstablishments = (userLat?: number | null, userLng?: number | null) => {
  return useQuery({
    queryKey: ['establishments', userLat, userLng],
    queryFn: async () => {
      // Buscar estabelecimentos com seus esportes e fotos
      const { data: establishments, error } = await supabase
        .from('establishments')
        .select(`
          id,
          establishment_name,
          corporate_name,
          city,
          state,
          address,
          phone,
          email,
          description,
          latitude,
          longitude,
          establishment_sports(sport_name),
          establishment_photos(id, photo_url, caption, is_main)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Buscar reviews para cada estabelecimento
      const { data: reviews } = await supabase
        .from('reviews')
        .select('establishment_id, rating')
        .not('establishment_id', 'is', null);

      // Processar dados
      const establishmentsWithDetails: EstablishmentWithDetails[] = establishments.map(est => {
        const estReviews = reviews?.filter(r => r.establishment_id === est.id) || [];
        const avgRating = estReviews.length > 0 
          ? estReviews.reduce((sum, r) => sum + r.rating, 0) / estReviews.length 
          : 0;

        return {
          ...est,
          sports: est.establishment_sports?.map(s => s.sport_name) || [],
          photos: est.establishment_photos || [],
          averageRating: Math.round(avgRating * 10) / 10,
          reviewCount: estReviews.length,
        };
      });

      // Ordenar por proximidade se localização do usuário estiver disponível
      if (userLat && userLng) {
        establishmentsWithDetails.sort((a, b) => {
          if (!a.latitude || !a.longitude) return 1;
          if (!b.latitude || !b.longitude) return -1;

          const distA = Math.sqrt(
            Math.pow(a.latitude - userLat, 2) + Math.pow(a.longitude - userLng, 2)
          );
          const distB = Math.sqrt(
            Math.pow(b.latitude - userLat, 2) + Math.pow(b.longitude - userLng, 2)
          );

          return distA - distB;
        });
      }

      return establishmentsWithDetails;
    },
  });
};
