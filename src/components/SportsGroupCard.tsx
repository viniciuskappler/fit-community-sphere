
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Heart, Star, Users } from 'lucide-react';
import RatingStars from './RatingStars';
import ReviewModal from './ReviewModal';
import { SportsGroupWithDetails } from '@/hooks/useSportsGroups';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SportsGroupCardProps {
  group: SportsGroupWithDetails;
  onFavoriteChange?: () => void;
}

const SportsGroupCard: React.FC<SportsGroupCardProps> = ({
  group,
  onFavoriteChange,
}) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const { toast } = useToast();

  const handleFavoriteToggle = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: 'Erro',
          description: 'Você precisa estar logado para favoritar',
          variant: 'destructive',
        });
        return;
      }

      if (isFavorited) {
        // Remover dos favoritos
        const { error } = await supabase
          .from('user_favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('group_id', group.id);

        if (error) throw error;
        setIsFavorited(false);
      } else {
        // Adicionar aos favoritos
        const { error } = await supabase
          .from('user_favorites')
          .insert({
            user_id: user.id,
            group_id: group.id,
          });

        if (error) throw error;
        setIsFavorited(true);
      }

      onFavoriteChange?.();
    } catch (error) {
      console.error('Erro ao favoritar:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar favoritos',
        variant: 'destructive',
      });
    }
  };

  const mainPhoto = group.photos.find(p => p.is_main)?.photo_url;

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow duration-300">
        {mainPhoto && (
          <div className="h-48 bg-cover bg-center rounded-t-lg" 
               style={{ backgroundImage: `url(${mainPhoto})` }} />
        )}
        
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-gray-900">
              {group.group_name}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFavoriteToggle}
              className={isFavorited ? 'text-red-500' : 'text-gray-400'}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
            </Button>
          </div>

          <div className="flex items-center gap-1 mb-2">
            <RatingStars rating={group.averageRating} size="sm" />
            <span className="text-xs text-gray-500">
              ({group.reviewCount} avaliações)
            </span>
          </div>

          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            {group.cities.join(', ')}
          </div>

          {group.meeting_point && (
            <div className="flex items-center text-gray-600 text-sm mb-2">
              <Users className="w-4 h-4 mr-1" />
              {group.meeting_point}
            </div>
          )}

          <div className="flex flex-wrap gap-1 mb-3">
            {group.sports.slice(0, 3).map((sport, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
              >
                {sport}
              </span>
            ))}
            {group.sports.length > 3 && (
              <span className="text-xs text-gray-500">
                +{group.sports.length - 3} mais
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowReviewModal(true)}
              className="flex-1"
            >
              <Star className="w-4 h-4 mr-1" />
              Avaliar
            </Button>
            <Button size="sm" className="flex-1">
              Ver Detalhes
            </Button>
          </div>
        </CardContent>
      </Card>

      <ReviewModal
        open={showReviewModal}
        onOpenChange={setShowReviewModal}
        groupId={group.id}
        groupName={group.group_name}
        onReviewSubmitted={() => {
          // Aqui você pode recarregar os dados ou atualizar o estado
          window.location.reload();
        }}
      />
    </>
  );
};

export default SportsGroupCard;
