
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import RatingStars from './RatingStars';

interface ReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  establishmentId?: string;
  groupId?: string;
  establishmentName?: string;
  groupName?: string;
  onReviewSubmitted: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  open,
  onOpenChange,
  establishmentId,
  groupId,
  establishmentName,
  groupName,
  onReviewSubmitted,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        title: 'Erro',
        description: 'Por favor, selecione uma avaliação',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: 'Erro',
          description: 'Você precisa estar logado para avaliar',
          variant: 'destructive',
        });
        return;
      }

      const { error } = await supabase
        .from('reviews')
        .insert({
          user_id: user.id,
          establishment_id: establishmentId || null,
          group_id: groupId || null,
          rating,
          comment: comment.trim() || null,
        });

      if (error) throw error;

      toast({
        title: 'Sucesso!',
        description: 'Sua avaliação foi enviada com sucesso',
      });

      // Reset form
      setRating(0);
      setComment('');
      onOpenChange(false);
      onReviewSubmitted();
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível enviar sua avaliação',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Avaliar {establishmentName || groupName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Sua avaliação *
            </label>
            <RatingStars
              rating={rating}
              size="lg"
              showNumber={false}
              interactive
              onRatingChange={setRating}
            />
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium mb-2">
              Comentário (opcional)
            </label>
            <Textarea
              id="comment"
              placeholder="Conte sobre sua experiência..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting || rating === 0}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
