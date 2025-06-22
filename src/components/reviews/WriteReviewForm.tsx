
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star, Send } from 'lucide-react';

interface WriteReviewFormProps {
  isVisible: boolean;
  rating: number;
  comment: string;
  isSubmitting: boolean;
  onRatingChange: (rating: number) => void;
  onCommentChange: (comment: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const WriteReviewForm: React.FC<WriteReviewFormProps> = ({
  isVisible,
  rating,
  comment,
  isSubmitting,
  onRatingChange,
  onCommentChange,
  onSubmit,
  onCancel
}) => {
  if (!isVisible) return null;

  return (
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
                onClick={() => onRatingChange(star)}
                className="p-1"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= rating
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
            value={comment}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder="Conte sobre sua experiência..."
            rows={4}
          />
        </div>

        {/* Botões */}
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isSubmitting || rating === 0}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WriteReviewForm;
