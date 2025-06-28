
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useRegistrationSecurity } from './useRegistrationSecurity';
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
  promoCode?: string;
}

interface RegistrationResult {
  success: boolean;
  error?: string;
  userId?: string;
}

export const useRegistration = () => {
  const { signUp } = useAuth();
  const { 
    checkRegistrationRateLimit, 
    logRegistrationAttempt, 
    handleRateLimitExceeded,
    isCheckingRate 
  } = useRegistrationSecurity();
  const [loading, setLoading] = useState(false);

  const registerUser = async (
    data: RegistrationData,
    registrationType: 'supporter' | 'establishment' | 'group',
    referralCode?: string
  ): Promise<RegistrationResult> => {
    console.log('🚀 Starting registration submission...');
    setLoading(true);

    try {
      // 1. Check registration rate limiting
      console.log('🔒 Checking registration rate limits...');
      const rateLimitResult = await checkRegistrationRateLimit(data.email);
      
      if (rateLimitResult.isRateLimited) {
        handleRateLimitExceeded(rateLimitResult.emailAttempts, rateLimitResult.ipAttempts);
        return {
          success: false,
          error: 'Limite de tentativas de cadastro excedido. Tente novamente mais tarde.'
        };
      }

      // 2. Create user account with enhanced metadata
      console.log('👤 Creating user account...');
      const { data: signUpData, error: signUpError } = await signUp(data.email, data.password, {
        fullName: data.fullName,
        full_name: data.fullName,
        registration_type: registrationType,
        promo_code: data.promoCode
      });
      
      // 3. Log registration attempt
      await logRegistrationAttempt(data.email, !signUpError);
      
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

      // 4. Wait for profile creation by trigger with retry mechanism
      console.log('⏳ Waiting for profile creation...');
      let profileCreated = false;
      let retries = 0;
      const maxRetries = 5;

      while (!profileCreated && retries < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 2000 + (retries * 1000)));
        
        const { data: profile, error: profileCheckError } = await supabase
          .from('user_profiles')
          .select('id')
          .eq('id', newUserId)
          .single();

        if (profile && !profileCheckError) {
          profileCreated = true;
          console.log('✅ Profile found, proceeding with update');
        } else {
          retries++;
          console.log(`⏳ Profile not ready yet, retry ${retries}/${maxRetries}`);
          
          if (retries === maxRetries) {
            // Force create profile if trigger failed
            console.log('🔧 Trigger failed, creating profile manually');
            const { error: manualProfileError } = await supabase
              .from('user_profiles')
              .insert({
                id: newUserId,
                full_name: data.fullName
              });

            if (manualProfileError && !manualProfileError.message.includes('duplicate')) {
              console.error('❌ Manual profile creation failed:', manualProfileError);
            } else {
              profileCreated = true;
            }
          }
        }
      }

      // 5. Update profile with complete data
      console.log('💾 Updating user profile with complete data...');
      const { error: profileError } = await supabase
        .from('user_profiles')
        .update({
          full_name: data.fullName,
          cpf: data.cpf,
          phone: data.phone,
          city: data.city,
          birth_date: data.birthDate,
          promo_code: data.promoCode || null
        })
        .eq('id', newUserId);

      if (profileError) {
        console.error('❌ Error updating profile:', profileError);
        toast.error('Aviso: Alguns dados do perfil podem não ter sido salvos');
      } else {
        console.log('✅ Profile updated successfully');
      }

      // 6. Save user sports with enhanced error handling
      const allSports = [
        ...data.favoriteStateSports.map(sport => ({ 
          user_id: newUserId,
          sport_name: sport, 
          sport_type: 'favorite' as const
        })),
        ...data.practicedSports.map(sport => ({ 
          user_id: newUserId,
          sport_name: sport, 
          sport_type: 'practiced' as const
        })),
        ...data.interestedSports.map(sport => ({ 
          user_id: newUserId,
          sport_name: sport, 
          sport_type: 'interested' as const
        }))
      ];

      if (allSports.length > 0) {
        console.log('🏃 Saving user sports...', allSports.length, 'sports');
        
        // First, clear any existing sports for this user
        const { error: deleteError } = await supabase
          .from('user_sports')
          .delete()
          .eq('user_id', newUserId);

        if (deleteError) {
          console.warn('⚠️ Warning clearing existing sports:', deleteError);
        }

        // Then insert new sports with retry mechanism
        let sportsRetries = 0;
        let sportsSaved = false;

        while (!sportsSaved && sportsRetries < 3) {
          const { error: sportsError } = await supabase
            .from('user_sports')
            .insert(allSports);

          if (sportsError) {
            sportsRetries++;
            console.error(`❌ Error saving sports (attempt ${sportsRetries}):`, sportsError);
            
            if (sportsRetries < 3) {
              await new Promise(resolve => setTimeout(resolve, 1000 * sportsRetries));
            } else {
              toast.error('Aviso: Esportes podem não ter sido salvos completamente');
            }
          } else {
            sportsSaved = true;
            console.log('✅ Sports saved successfully');
          }
        }
      }

      // 7. Track referral conversion if referralCode is present
      if (referralCode) {
        await trackReferralConversion(referralCode, newUserId, registrationType);
      }

      console.log('🎉 Registration completed successfully!');
      
      // Success message based on promo code
      if (data.promoCode === 'SQUAD300') {
        toast.success('🎉 Bem-vindo ao SQUAD 300! Desconto vitalício garantido!');
      } else {
        toast.success('Cadastro realizado com sucesso! Verifique seu email para confirmar.');
      }
      
      return {
        success: true,
        userId: newUserId
      };

    } catch (error: any) {
      console.error('💥 Unexpected registration error:', error);
      // Log failed attempt for unexpected errors too
      await logRegistrationAttempt(data.email, false);
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

      const { error: conversionError } = await supabase
        .from('referral_conversions')
        .insert({
          referral_code_id: codeData.id,
          referred_user_id: userId,
          conversion_type: conversionType,
          commission_amount: 0,
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
    loading: loading || isCheckingRate
  };
};
