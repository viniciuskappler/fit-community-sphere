
import React, { useState } from 'react';
import ReviewOverview from './reviews/ReviewOverview';
import WriteReviewForm from './reviews/WriteReviewForm';
import ReviewList from './reviews/ReviewList';
import { useReviewSubmission } from '@/hooks/useReviewSubmission';

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
  const [showWriteReview, setShowWriteReview] = useState(false);
  
  const {
    newReview,
    setNewReview,
    isSubmitting,
    submitReview
  } = useReviewSubmission({
    establishmentId,
    groupId,
    onReviewSubmitted: () => {
      setShowWriteReview(false);
      onReviewSubmitted();
    }
  });

  const handleSubmit = async () => {
    await submitReview();
  };

  return (
    <div className="space-y-6">
      <ReviewOverview
        averageRating={averageRating}
        totalReviews={totalReviews}
        onWriteReviewClick={() => setShowWriteReview(!showWriteReview)}
      />

      <WriteReviewForm
        isVisible={showWriteReview}
        rating={newReview.rating}
        comment={newReview.comment}
        isSubmitting={isSubmitting}
        onRatingChange={(rating) => setNewReview({ ...newReview, rating })}
        onCommentChange={(comment) => setNewReview({ ...newReview, comment })}
        onSubmit={handleSubmit}
        onCancel={() => setShowWriteReview(false)}
      />

      <ReviewList reviews={reviews} />
    </div>
  );
};

export default ReviewSystem;
