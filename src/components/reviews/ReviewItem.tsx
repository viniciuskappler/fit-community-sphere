
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThumbsUp, Flag } from 'lucide-react';
import RatingStars from '../RatingStars';

interface ReviewData {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  user_id: string;
  user_profiles?: { full_name: string } | null;
  helpful_count?: number;
}

interface ReviewItemProps {
  review: ReviewData;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card>
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
  );
};

export default ReviewItem;
