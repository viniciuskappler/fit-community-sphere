
import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  size = 'md',
  showNumber = true,
  interactive = false,
  onRatingChange,
}) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const handleStarClick = (starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-gray-200 text-gray-200'
          } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          onClick={() => handleStarClick(star)}
        />
      ))}
      {showNumber && (
        <span className="text-sm text-gray-600 ml-1">
          {rating > 0 ? rating.toFixed(1) : 'Sem avaliações'}
        </span>
      )}
    </div>
  );
};

export default RatingStars;
