// Hook simplificado para reviews - desabilitado temporariamente
import { useState } from 'react';

export const useReviewSubmission = () => {
  const [submitting, setSubmitting] = useState(false);

  const submitReview = async (reviewData: {
    rating: number;
    comment: string;
    establishmentId?: string;
    groupId?: string;
  }) => {
    // Funcionalidade de reviews temporariamente desabilitada
    console.log('Review submission disabled:', reviewData);
    return { success: false, error: 'Reviews temporariamente desabilitados' };
  };

  return {
    submitReview,
    submitting
  };
};