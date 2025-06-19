
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface RegistrationData {
  fullName: string;
  cpf: string;
  phone: string;
  email: string;
  city: string;
  birthDate: string;
  favoriteStateSports: string[];
  practicedSports: string[];
  interestedSports: string[];
  password: string;
}

interface RegistrationResult {
  success: boolean;
  error?: string;
  userId?: string;
}

export const useRegistration = () => {
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);

  const registerUser = async (
    data: RegistrationData,
    registrationType: 'supporter' | 'establishment' | 'group',
    referralCode?: string
  ): Promise<RegistrationResult> => {
    console.log('🚀 Starting registration submission...');
    setLoading(true);

    try {
      // 1. Create user account with metadata
      console.log('👤 Creating user account...');
      const { data: signUpData, error: signUpError } = await signUp(data.email, data.password, {
        fullName: data.fullName,
        full_name: data.fullName // Garantir que ambos os formatos sejam enviados
      });
      
      if (signUpError) {
        console.error('❌ Signup failed:', signUpError);
        return {
          success: false,
          error: signUpError.message || 'Erro ao criar conta. Tente novamente.'
        };
      }

      const newUserId = signUpData?.user?.id;
      if (!newUserId) {
        return {
          success: false,
          error: 'Erro ao obter ID do usuário criado.'
        };
      }

      console.log('✅ User account created successfully with ID:', newUserId);

      // 2. Aguardar um pouco para o trigger criar o perfil
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 3. Atualizar perfil com dados completos
      console.log('💾 Updating user profile...');
      const { error: profileError } = await supabase
        .from('user_profiles')
        .update({
          full_name: data.fullName,
          cpf: data.cpf,
          phone: data.phone,
          city: data.city,
          birth_date: data.birthDate
        })
        .eq('id', newUserId);

      if (profileError) {
        console.error('❌ Error updating profile:', profileError);
        // Não falhar por causa disso, apenas avisar
        toast.error('Aviso: Alguns dados do perfil podem não ter sido salvos');
      } else {
        console.log('✅ Profile updated successfully');
      }

      // 4. Salvar esportes do usuário
      const allSports = [
        ...data.favoriteStateSports.map(sport => ({ 
          user_id: newUserId,
          sport_name: sport, 
          sport_type: 'favorite' 
        })),
        ...data.practicedSports.map(sport => ({ 
          user_id: newUserId,
          sport_name: sport, 
          sport_type: 'practiced' 
        })),
        ...data.interestedSports.map(sport => ({ 
          user_id: newUserId,
          sport_name: sport, 
          sport_type: 'interested' 
        }))
      ];

      if (allSports.length > 0) {
        console.log('🏃 Saving user sports...');
        const { error: sportsError } = await supabase
          .from('user_sports')
          .insert(allSports);

        if (sportsError) {
          console.error('❌ Error saving sports:', sportsError);
          toast.error('Aviso: Esportes podem não ter sido salvos');
        } else {
          console.log('✅ Sports saved successfully');
        }
      }

      // 5. Track referral conversion if referralCode is present
      if (referralCode) {
        await trackReferralConversion(referralCode, newUserId, registrationType);
      }

      console.log('🎉 Registration completed successfully!');
      toast.success('Cadastro realizado com sucesso!');
      
      return {
        success: true,
        userId: newUserId
      };

    } catch (error: any) {
      console.error('💥 Unexpected registration error:', error);
      toast.error('Erro inesperado durante o cadastro');
      
      return {
        success: false,
        error: error.message || 'Erro inesperado. Tente novamente.'
      };
    } finally {
      setLoading(false);
    }
  };

  const trackReferralConversion = async (
    referralCode: string,
    userId: string,
    conversionType: string
  ) => {
    console.log('📊 Tracking referral conversion:', referralCode);
    try {
      const { data: codeData, error: codeError } = await supabase
        .from('referral_codes')
        .select('id')
        .eq('code', referralCode)
        .single();

      if (codeError || !codeData) {
        console.log('❌ Referral code not found:', referralCode);
        return;
      }

      const commissionAmount = 0; // Will be 10% of future plans

      const { error: conversionError } = await supabase
        .from('referral_conversions')
        .insert({
          referral_code_id: codeData.id,
          referred_user_id: userId,
          conversion_type: conversionType,
          commission_amount: commissionAmount,
          commission_status: 'pending'
        });

      if (conversionError) {
        console.error('❌ Error tracking conversion:', conversionError);
      } else {
        console.log('✅ Referral conversion tracked successfully');
      }
    } catch (error) {
      console.error('❌ Error in referral tracking:', error);
    }
  };

  return {
    registerUser,
    loading
  };
};
