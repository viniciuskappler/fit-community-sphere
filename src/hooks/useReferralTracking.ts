
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
      // Buscar códigos de referral do usuário
      const { data: codesData } = await supabase
        .from('referral_codes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (codesData) {
        setReferralCodes(codesData);
      }

      // Buscar conversões dos referrals do usuário
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

  const generateReferralCode = async (type: 'establishment' | 'group' | 'supporter') => {
    if (!user) return { error: 'Usuário não autenticado' };

    try {
      const { data, error } = await supabase.rpc('generate_referral_code', {
        user_id_param: user.id,
        type_param: type
      });

      if (error) {
        console.error('Erro ao gerar código:', error);
        return { error: error.message };
      }

      // Atualizar a lista de códigos
      await fetchReferralData();
      
      return { data, error: null };
    } catch (error) {
      console.error('Erro ao gerar código de referral:', error);
      return { error: 'Erro inesperado ao gerar código' };
    }
  };

  const trackConversion = async (referralCode: string, userId: string, conversionType: string) => {
    try {
      // Primeiro, encontrar o código de referral
      const { data: codeData } = await supabase
        .from('referral_codes')
        .select('id')
        .eq('code', referralCode)
        .single();

      if (!codeData) {
        return { error: 'Código de referral não encontrado' };
      }

      // Definir valor da comissão baseado no tipo
      let commissionAmount = 0;
      switch (conversionType) {
        case 'establishment':
          commissionAmount = 50.00;
          break;
        case 'group':
          commissionAmount = 30.00;
          break;
        case 'supporter':
          commissionAmount = 10.00;
          break;
      }

      // Criar a conversão
      const { error } = await supabase
        .from('referral_conversions')
        .insert({
          referral_code_id: codeData.id,
          referred_user_id: userId,
          conversion_type: conversionType,
          commission_amount: commissionAmount,
          commission_status: 'pending'
        });

      if (error) {
        console.error('Erro ao registrar conversão:', error);
        return { error: error.message };
      }

      return { error: null };
    } catch (error) {
      console.error('Erro ao rastrear conversão:', error);
      return { error: 'Erro inesperado ao rastrear conversão' };
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
    trackConversion,
    getTotalCommissions,
    getPaidCommissions,
    getPendingCommissions,
    refetch: fetchReferralData
  };
};
