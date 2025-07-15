// Hook simplificado para recomendações - desabilitado temporariamente
import { useState } from 'react';

export interface RecommendationItem {
  id: string;
  name: string;
  type: 'establishment' | 'group' | 'event';
  reason: string;
  score: number;
}

export const useSmartRecommendations = () => {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async (userId?: string) => {
    // Funcionalidade de recomendações temporariamente desabilitada
    setRecommendations([]);
  };

  return {
    recommendations,
    loading,
    fetchRecommendations
  };
};