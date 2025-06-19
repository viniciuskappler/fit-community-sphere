
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface ReferralCode {
  id: string;
  code: string;
  type: 'establishment' | 'group' | 'supporter';
  created_at: string;
  is_active: boolean;
}

interface ReferralConversion {
  id: string;
  conversion_type: string;
  commission_amount: number;
  commission_status: 'pending' | 'paid' | 'cancelled';
  created_at: string;
  paid_at: string | null;
  referred_user_id: string;
  referral_code: {
    code: string;
    type: string;
  };
}

interface GenerateCodeResult {
  success: boolean;
  code?: string;
  error?: string;
}

export const useReferralTracking = () => {
  const { user } = useAuth();
  const [referralCodes, setReferralCodes] = useState<ReferralCode[]>([]);
  const [conversions, setConversions] = useState<ReferralConversion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchReferralData();
    }
  }, [user]);

  const fetchReferralData = async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      // Fetch user's referral codes
      const { data: codesData } = await supabase
        .from('referral_codes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (codesData) {
        setReferralCodes(codesData as ReferralCode[]);
      }

      // Fetch conversions from user's referrals
      const { data: conversionsData } = await supabase
        .from('referral_conversions')
        .select(`
          *,
          referral_code:referral_codes!inner(code, type)
        `)
        .eq('referral_codes.user_id', user.id)
        .order('created_at', { ascending: false });

      if (conversionsData) {
        setConversions(conversionsData as any);
      }
    } catch (error) {
      console.error('Erro ao buscar dados de referral:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateReferralCode = async (type: 'establishment' | 'group' | 'supporter'): Promise<GenerateCodeResult> => {
    if (!user) {
      return { success: false, error: 'Usuário não autenticado' };
    }

    try {
      // Create the code directly instead of using RPC
      const codePrefix = type === 'establishment' ? 'EST' : type === 'group' ? 'GRP' : 'SUP';
      const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
      const finalCode = `${codePrefix}${randomSuffix}`;

      const { data, error } = await supabase
        .from('referral_codes')
        .insert({
          user_id: user.id,
          code: finalCode,
          type: type
        })
        .select()
        .single();

      if (error) {
        console.error('Erro ao gerar código:', error);
        return { success: false, error: error.message };
      }

      // Update the codes list
      await fetchReferralData();
      
      return { success: true, code: finalCode };
    } catch (error) {
      console.error('Erro ao gerar código de referral:', error);
      return { success: false, error: 'Erro inesperado ao gerar código' };
    }
  };

  const getTotalCommissions = () => {
    return conversions.reduce((total, conversion) => {
      return total + (conversion.commission_amount || 0);
    }, 0);
  };

  const getPaidCommissions = () => {
    return conversions
      .filter(c => c.commission_status === 'paid')
      .reduce((total, conversion) => {
        return total + (conversion.commission_amount || 0);
      }, 0);
  };

  const getPendingCommissions = () => {
    return conversions
      .filter(c => c.commission_status === 'pending')
      .reduce((total, conversion) => {
        return total + (conversion.commission_amount || 0);
      }, 0);
  };

  return {
    referralCodes,
    conversions,
    loading,
    generateReferralCode,
    getTotalCommissions,
    getPaidCommissions,
    getPendingCommissions,
    refetch: fetchReferralData
  };
};
