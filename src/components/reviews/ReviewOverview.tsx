
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import RatingStars from '../RatingStars';

interface ReviewOverviewProps {
  averageRating: number;
  totalReviews: number;
  onWriteReviewClick: () => void;
}

const ReviewOverview: React.FC<ReviewOverviewProps> = ({
  averageRating,
  totalReviews,
  onWriteReviewClick
}) => {
  const getRatingDistribution = () => {
    // For now, we'll use mock data since we don't have individual reviews here
    // In a real implementation, this would be calculated from the reviews array
    return { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  };

  const ratingDistribution = getRatingDistribution();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Avaliações ({totalReviews})</span>
          <Button
            onClick={onWriteReviewClick}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <Star className="w-4 h-4 mr-2" />
            Avaliar
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Média Geral */}
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-500 mb-2">
              {averageRating.toFixed(1)}
            </div>
            <RatingStars rating={averageRating} size="lg" />
            <p className="text-sm text-gray-600 mt-2">
              Baseado em {totalReviews} avaliações
            </p>
          </div>

          {/* Distribuição por Estrelas */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-2">
                <span className="text-sm w-8">{stars}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{
                      width: `${totalReviews ? (ratingDistribution[stars as keyof typeof ratingDistribution] / totalReviews) * 100 : 0}%`
                    }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">
                  {ratingDistribution[stars as keyof typeof ratingDistribution]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewOverview;
