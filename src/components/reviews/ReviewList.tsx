
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import ReviewItem from './ReviewItem';

interface ReviewData {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  user_id: string;
  user_profiles?: { full_name: string } | null;
  helpful_count?: number;
}

interface ReviewListProps {
  reviews: ReviewData[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">
            Nenhuma avaliação ainda. Seja o primeiro a avaliar!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
