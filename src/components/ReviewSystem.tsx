
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Star, ThumbsUp, Flag, Camera, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import RatingStars from './RatingStars';

interface ReviewData {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  user_id: string;
  user_profiles?: { full_name: string } | null;
  helpful_count?: number;
  photos?: string[];
  categories?: {
    cleanliness: number;
    staff: number;
    facilities: number;
    value: number;
  };
}

interface ReviewSystemProps {
  establishmentId?: string;
  groupId?: string;
  reviews: ReviewData[];
  onReviewSubmitted: () => void;
  averageRating: number;
  totalReviews: number;
}

const ReviewSystem: React.FC<ReviewSystemProps> = ({
  establishmentId,
  groupId,
  reviews,
  onReviewSubmitted,
  averageRating,
  totalReviews
}) => {
  const { toast } = useToast();
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
    categories: {
      cleanliness: 0,
      staff: 0,
      facilities: 0,
      value: 0
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitReview = async () => {
    if (newReview.rating === 0) {
      toast({
        title: 'Erro',
        description: 'Por favor, selecione uma classificação',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: 'Login necessário',
          description: 'Faça login para avaliar',
          variant: 'destructive',
        });
        return;
      }

      const reviewData = {
        user_id: user.id,
        rating: newReview.rating,
        comment: newReview.comment,
        ...(establishmentId && { establishment_id: establishmentId }),
        ...(groupId && { group_id: groupId })
      };

      const { error } = await supabase
        .from('reviews')
        .insert(reviewData);

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: 'Avaliação enviada com sucesso!',
      });

      setNewReview({
        rating: 0,
        comment: '',
        categories: { cleanliness: 0, staff: 0, facilities: 0, value: 0 }
      });
      setShowWriteReview(false);
      onReviewSubmitted();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível enviar a avaliação',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();

  return (
    <div className="space-y-6">
      {/* Overview das Avaliações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Avaliações ({totalReviews})</span>
            <Button
              onClick={() => setShowWriteReview(!showWriteReview)}
              className="bg-orange-500 hover:bg-orange-600"
            >
              <Star className="w-4 h-4 mr-2" />
              Avaliar
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Média Geral */}
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">
                {averageRating.toFixed(1)}
              </div>
              <RatingStars rating={averageRating} size="lg" />
              <p className="text-sm text-gray-600 mt-2">
                Baseado em {totalReviews} avaliações
              </p>
            </div>

            {/* Distribuição por Estrelas */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center gap-2">
                  <span className="text-sm w-8">{stars}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{
                        width: `${totalReviews ? (ratingDistribution[stars as keyof typeof ratingDistribution] / totalReviews) * 100 : 0}%`
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">
                    {ratingDistribution[stars as keyof typeof ratingDistribution]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formulário de Nova Avaliação */}
      {showWriteReview && (
        <Card>
          <CardHeader>
            <CardTitle>Escrever Avaliação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Classificação Geral */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Classificação Geral
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="p-1"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= newReview.rating
                          ? 'fill-orange-500 text-orange-500'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comentário */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Comentário (opcional)
              </label>
              <Textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Conte sobre sua experiência..."
                rows={4}
              />
            </div>

            {/* Botões */}
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowWriteReview(false)}
              >
                Cancelar
              </Button>
              <Button
                onClick={submitReview}
                disabled={isSubmitting || newReview.rating === 0}
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Avaliações */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback>
                      {review.user_profiles?.full_name?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">
                        {review.user_profiles?.full_name || 'Usuário'}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {formatDate(review.created_at)}
                      </span>
                    </div>
                    
                    <RatingStars rating={review.rating} size="sm" />
                    
                    {review.comment && (
                      <p className="text-gray-700 leading-relaxed">
                        {review.comment}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-4 pt-2">
                      <Button variant="ghost" size="sm" className="text-gray-500">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        Útil ({review.helpful_count || 0})
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500">
                        <Flag className="w-4 h-4 mr-1" />
                        Reportar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                Nenhuma avaliação ainda. Seja o primeiro a avaliar!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ReviewSystem;
