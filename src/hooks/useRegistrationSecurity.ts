
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface RegistrationRateLimit {
  isRateLimited: boolean;
  emailAttempts: number;
  ipAttempts: number;
}

export const useRegistrationSecurity = () => {
  const { toast } = useToast();
  const [isCheckingRate, setIsCheckingRate] = useState(false);

  const checkRegistrationRateLimit = async (email: string): Promise<RegistrationRateLimit> => {
    setIsCheckingRate(true);
    try {
      const { data, error } = await supabase.rpc('check_registration_rate_limit', {
        user_email: email
      });

      if (error) {
        console.error('Error checking registration rate limit:', error);
        return { isRateLimited: false, emailAttempts: 0, ipAttempts: 0 };
      }

      const result = data as unknown as {
        is_rate_limited: boolean;
        email_attempts: number;
        ip_attempts: number;
      };

      return {
        isRateLimited: result.is_rate_limited,
        emailAttempts: result.email_attempts,
        ipAttempts: result.ip_attempts
      };
    } catch (error) {
      console.error('Error checking registration rate limit:', error);
      return { isRateLimited: false, emailAttempts: 0, ipAttempts: 0 };
    } finally {
      setIsCheckingRate(false);
    }
  };

  const logRegistrationAttempt = async (email: string, success: boolean): Promise<void> => {
    try {
      const { error } = await supabase.rpc('log_registration_attempt', {
        user_email: email,
        was_successful: success
      });

      if (error) {
        console.error('Error logging registration attempt:', error);
      }
    } catch (error) {
      console.error('Error logging registration attempt:', error);
    }
  };

  const handleRateLimitExceeded = (emailAttempts: number, ipAttempts: number) => {
    const message = emailAttempts >= 3 
      ? `Muitas tentativas de cadastro com este e-mail (${emailAttempts}/3). Tente novamente em 1 hora.`
      : `Muitas tentativas de cadastro deste dispositivo (${ipAttempts}/5). Tente novamente em 1 hora.`;
    
    toast({
      title: 'Limite de tentativas excedido',
      description: message,
      variant: 'destructive',
    });
  };

  return {
    checkRegistrationRateLimit,
    logRegistrationAttempt,
    handleRateLimitExceeded,
    isCheckingRate
  };
};
