
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LoginAttemptResult {
  isLocked: boolean;
  attemptCount: number;
  ipAttemptCount: number;
  lastAttempt: string | null;
}

export const useLoginSecurity = () => {
  const { toast } = useToast();
  const [isCheckingAttempts, setIsCheckingAttempts] = useState(false);

  const checkLoginAttempts = async (email: string): Promise<LoginAttemptResult> => {
    setIsCheckingAttempts(true);
    try {
      const { data, error } = await supabase.rpc('check_login_attempts', {
        user_email: email
      });

      if (error) {
        console.error('Error checking login attempts:', error);
        return { isLocked: false, attemptCount: 0, ipAttemptCount: 0, lastAttempt: null };
      }

      // Enhanced response with IP tracking
      const result = data as unknown as {
        is_locked: boolean;
        attempt_count: number;
        ip_attempt_count: number;
        last_attempt: string | null;
      };

      return {
        isLocked: result.is_locked,
        attemptCount: result.attempt_count,
        ipAttemptCount: result.ip_attempt_count || 0,
        lastAttempt: result.last_attempt
      };
    } catch (error) {
      console.error('Error checking login attempts:', error);
      return { isLocked: false, attemptCount: 0, ipAttemptCount: 0, lastAttempt: null };
    } finally {
      setIsCheckingAttempts(false);
    }
  };

  const logLoginAttempt = async (email: string, success: boolean): Promise<void> => {
    try {
      const { error } = await supabase.rpc('log_login_attempt', {
        user_email: email,
        was_successful: success
      });

      if (error) {
        console.error('Error logging login attempt:', error);
      }
    } catch (error) {
      console.error('Error logging login attempt:', error);
    }
  };

  const handleAccountLocked = (attemptCount: number, ipAttemptCount?: number) => {
    const isIpLocked = ipAttemptCount && ipAttemptCount >= 10;
    const message = isIpLocked 
      ? `Dispositivo temporariamente bloqueado (${ipAttemptCount}/10 tentativas). Tente novamente em 15 minutos.`
      : `Conta temporariamente bloqueada (${attemptCount}/5 tentativas). Tente novamente em 15 minutos.`;
    
    toast({
      title: 'Acesso temporariamente restrito',
      description: message,
      variant: 'destructive',
    });
  };

  return {
    checkLoginAttempts,
    logLoginAttempt,
    handleAccountLocked,
    isCheckingAttempts
  };
};
