
import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { sanitizeInput, escapeHtml } from '@/utils/validation';
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
  const { requireAuth, user } = useAuthGuard();

  const handleSubmit = useCallback(async () => {
    if (!requireAuth('avaliar')) return;

    if (rating === 0) {
      toast({
        title: 'Erro',
        description: 'Por favor, selecione uma avaliação',
        variant: 'destructive',
      });
      return;
    }

    if (rating < 1 || rating > 5) {
      toast({
        title: 'Erro',
        description: 'A avaliação deve ser entre 1 e 5 estrelas',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      // Sanitize and validate input
      const sanitizedComment = comment.trim() ? sanitizeInput(comment) : null;
      
      // TODO: Implementar sistema de reviews quando a tabela for criada
      toast({
        title: 'Em desenvolvimento',
        description: 'Sistema de avaliações será implementado em breve',
      });
      
      // Reset form
      setRating(0);
      setComment('');
      onOpenChange(false);
      onReviewSubmitted();
    } catch (error: any) {
      console.error('Erro ao enviar avaliação:', error);
      
      let errorMessage = 'Não foi possível enviar sua avaliação';
      if (error.message?.includes('duplicate')) {
        errorMessage = 'Você já avaliou este item anteriormente';
      }
      
      toast({
        title: 'Erro',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [rating, comment, requireAuth, user, establishmentId, groupId, toast, onOpenChange, onReviewSubmitted]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 500) { // Limit comment length
      setComment(value);
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
              placeholder="Conte sobre sua experiência... (máximo 500 caracteres)"
              value={comment}
              onChange={handleCommentChange}
              rows={4}
              maxLength={500}
            />
            <div className="text-xs text-gray-500 mt-1">
              {comment.length}/500 caracteres
            </div>
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
