
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PromoCodeResult {
  success: boolean;
  error?: string;
  error_type?: 'invalid_code' | 'limit_exceeded';
  discount_percent?: number;
  remaining_slots?: number;
}

interface PromoStats {
  current_uses: number;
  max_uses: number;
  remaining_slots: number;
  discount_percent: number;
  active: boolean;
  error?: string;
}

export const usePromoCode = () => {
  const [loading, setLoading] = useState(false);

  const validatePromoCode = async (code: string): Promise<PromoCodeResult> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('apply_promo_code', {
        promo_code_input: code
      });

      if (error) {
        console.error('Erro ao validar código promocional:', error);
        return {
          success: false,
          error: 'Erro interno. Tente novamente.',
          error_type: 'invalid_code'
        };
      }

      // Safe type conversion with validation
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        return data as PromoCodeResult;
      }

      return {
        success: false,
        error: 'Resposta inválida do servidor.',
        error_type: 'invalid_code'
      };
    } catch (error) {
      console.error('Erro inesperado:', error);
      return {
        success: false,
        error: 'Erro inesperado. Tente novamente.',
        error_type: 'invalid_code'
      };
    } finally {
      setLoading(false);
    }
  };

  const getPromoStats = async (code: string): Promise<PromoStats | null> => {
    try {
      const { data, error } = await supabase.rpc('get_promo_stats', {
        promo_code_input: code
      });

      if (error) {
        console.error('Erro ao buscar estatísticas:', error);
        return null;
      }

      // Safe type conversion with validation
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        return data as PromoStats;
      }

      return null;
    } catch (error) {
      console.error('Erro inesperado:', error);
      return null;
    }
  };

  return {
    validatePromoCode,
    getPromoStats,
    loading
  };
};
