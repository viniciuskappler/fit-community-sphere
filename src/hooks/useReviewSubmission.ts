
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface UseReviewSubmissionProps {
  establishmentId?: string;
  groupId?: string;
  onReviewSubmitted: () => void;
}

export const useReviewSubmission = ({
  establishmentId,
  groupId,
  onReviewSubmitted
}: UseReviewSubmissionProps) => {
  const { toast } = useToast();
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

  return {
    newReview,
    setNewReview,
    isSubmitting,
    submitReview
  };
};
