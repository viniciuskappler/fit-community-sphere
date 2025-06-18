
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SportsGroupWithDetails {
  id: string;
  group_name: string;
  corporate_name: string;
  cities: string[];
  phone: string;
  email: string;
  description: string | null;
  meeting_point: string | null;
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

export const useSportsGroups = (userLat?: number | null, userLng?: number | null) => {
  return useQuery({
    queryKey: ['sports-groups', userLat, userLng],
    queryFn: async () => {
      // Buscar grupos com seus esportes e fotos
      const { data: groups, error } = await supabase
        .from('sports_groups')
        .select(`
          id,
          group_name,
          corporate_name,
          cities,
          phone,
          email,
          description,
          meeting_point,
          latitude,
          longitude,
          group_sports(sport_name),
          group_photos(id, photo_url, caption, is_main)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Buscar reviews para cada grupo
      const { data: reviews } = await supabase
        .from('reviews')
        .select('group_id, rating')
        .not('group_id', 'is', null);

      // Processar dados
      const groupsWithDetails: SportsGroupWithDetails[] = groups.map(group => {
        const groupReviews = reviews?.filter(r => r.group_id === group.id) || [];
        const avgRating = groupReviews.length > 0 
          ? groupReviews.reduce((sum, r) => sum + r.rating, 0) / groupReviews.length 
          : 0;

        return {
          ...group,
          sports: group.group_sports?.map(s => s.sport_name) || [],
          photos: group.group_photos || [],
          averageRating: Math.round(avgRating * 10) / 10,
          reviewCount: groupReviews.length,
        };
      });

      // Ordenar por proximidade se localização do usuário estiver disponível
      if (userLat && userLng) {
        groupsWithDetails.sort((a, b) => {
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

      return groupsWithDetails;
    },
  });
};
