// Hook simplificado para reviews - desabilitado temporariamente
import { useState } from 'react';

interface ReviewSubmissionProps {
  establishmentId?: string;
  groupId?: string;
  onReviewSubmitted?: () => void;
}

export const useReviewSubmission = (props?: ReviewSubmissionProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: ''
  });

  const submitReview = async (reviewData?: {
    rating: number;
    comment: string;
    establishmentId?: string;
    groupId?: string;
  }) => {
    // Funcionalidade de reviews temporariamente desabilitada
    console.log('Review submission disabled:', reviewData || newReview);
    setSubmitting(true);
    
    // Simular delay
    setTimeout(() => {
      setSubmitting(false);
      if (props?.onReviewSubmitted) {
        props.onReviewSubmitted();
      }
    }, 1000);
    
    return { success: false, error: 'Reviews temporariamente desabilitados' };
  };

  return {
    submitReview,
    submitting,
    newReview,
    setNewReview,
    isSubmitting: submitting
  };
};