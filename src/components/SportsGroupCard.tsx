
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Heart, Star, Users } from 'lucide-react';
import RatingStars from './RatingStars';
import ReviewModal from './ReviewModal';
import { SportsGroupWithDetails } from '@/hooks/useSportsGroups';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { escapeHtml } from '@/utils/validation';

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
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { requireAuth, user } = useAuthGuard();

  // Check if group is favorited on component mount
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!user) return;
      
      try {
        // TODO: Implementar sistema de favoritos quando a tabela for criada
        setIsFavorited(false);
      } catch (error) {
        console.error('Erro ao verificar favoritos:', error);
      }
    };

    checkFavoriteStatus();
  }, [user, group.id]);

  const handleFavoriteToggle = async () => {
    if (!requireAuth('favoritar')) return;
    if (isLoading) return;

    toast({
      title: 'Em desenvolvimento',
      description: 'Sistema de favoritos será implementado em breve',
    });
  };

  const mainPhoto = group.photos.find(p => p.is_main)?.photo_url;
  const displayName = escapeHtml(group.group_name);
  const displayCities = group.cities.map(city => escapeHtml(city)).join(', ');
  const displayMeetingPoint = group.meeting_point ? escapeHtml(group.meeting_point) : null;

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow duration-300">
        {mainPhoto && (
          <div 
            className="h-48 bg-cover bg-center rounded-t-lg" 
            style={{ backgroundImage: `url(${mainPhoto})` }}
            role="img"
            aria-label={`Foto do grupo ${displayName}`}
          />
        )}
        
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 
              className="font-bold text-lg text-gray-900"
              dangerouslySetInnerHTML={{ __html: displayName }}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFavoriteToggle}
              disabled={isLoading}
              className={isFavorited ? 'text-red-500' : 'text-gray-400'}
              aria-label={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
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
            <span dangerouslySetInnerHTML={{ __html: displayCities }} />
          </div>

          {displayMeetingPoint && (
            <div className="flex items-center text-gray-600 text-sm mb-2">
              <Users className="w-4 h-4 mr-1" />
              <span dangerouslySetInnerHTML={{ __html: displayMeetingPoint }} />
            </div>
          )}

          <div className="flex flex-wrap gap-1 mb-3">
            {group.sports.slice(0, 3).map((sport, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
              >
                {escapeHtml(sport)}
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
              disabled={!user}
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
          onFavoriteChange?.();
        }}
      />
    </>
  );
};

export default SportsGroupCard;
