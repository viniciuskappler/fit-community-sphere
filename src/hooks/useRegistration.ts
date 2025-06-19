
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useUserData } from './useUserData';

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
  const { saveUserProfile, saveUserSports } = useUserData();
  const [loading, setLoading] = useState(false);

  const registerUser = async (
    data: RegistrationData,
    registrationType: 'supporter' | 'establishment' | 'group',
    referralCode?: string
  ): Promise<RegistrationResult> => {
    console.log('🚀 Starting registration submission...');
    setLoading(true);

    try {
      // 1. Create user account
      console.log('👤 Creating user account...');
      const { data: signUpData, error: signUpError } = await signUp(data.email, data.password, {
        fullName: data.fullName
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

      console.log('✅ User account created successfully');

      // 2. Track referral conversion if referralCode is present
      if (referralCode) {
        await trackReferralConversion(referralCode, newUserId, registrationType);
      }

      // 3. Save user profile and sports data
      await saveAdditionalUserData(data, newUserId);

      console.log('🎉 Registration completed successfully!');
      return {
        success: true,
        userId: newUserId
      };

    } catch (error) {
      console.error('💥 Unexpected registration error:', error);
      return {
        success: false,
        error: 'Erro inesperado. Tente novamente.'
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

  const saveAdditionalUserData = async (data: RegistrationData, userId: string) => {
    // Use setTimeout to ensure user creation is complete
    return new Promise<void>((resolve) => {
      setTimeout(async () => {
        try {
          console.log('💾 Saving user profile...');
          
          const { error: profileError } = await saveUserProfile({
            full_name: data.fullName,
            cpf: data.cpf,
            phone: data.phone,
            city: data.city,
            birth_date: data.birthDate
          });

          if (profileError) {
            console.error('❌ Error saving profile:', profileError);
          } else {
            console.log('✅ Profile saved successfully');
          }

          // Save sports data
          const allSports = [
            ...data.favoriteStateSports.map(sport => ({ sport_name: sport, sport_type: 'favorite' as const })),
            ...data.practicedSports.map(sport => ({ sport_name: sport, sport_type: 'practiced' as const })),
            ...data.interestedSports.map(sport => ({ sport_name: sport, sport_type: 'interested' as const }))
          ];

          if (allSports.length > 0) {
            console.log('🏃 Saving user sports...');
            const { error: sportsError } = await saveUserSports(allSports);
            if (sportsError) {
              console.error('❌ Error saving sports:', sportsError);
            } else {
              console.log('✅ Sports saved successfully');
            }
          }

          resolve();
        } catch (error) {
          console.error('💥 Error saving additional data:', error);
          resolve(); // Don't fail the whole process for this
        }
      }, 1000);
    });
  };

  return {
    registerUser,
    loading
  };
};
