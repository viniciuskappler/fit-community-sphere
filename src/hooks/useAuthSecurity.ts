
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLoginSecurity } from './useLoginSecurity';

export const useAuthSecurity = () => {
  const { checkLoginAttempts, logLoginAttempt, handleAccountLocked } = useLoginSecurity();
  const [isProcessing, setIsProcessing] = useState(false);

  const secureSignIn = useCallback(async (email: string, password: string) => {
    setIsProcessing(true);
    
    try {
      // Check if account is locked before attempting login
      const { isLocked, attemptCount, ipAttemptCount } = await checkLoginAttempts(email);
      
      if (isLocked) {
        handleAccountLocked(attemptCount, ipAttemptCount);
        return { data: null, error: { message: 'Conta temporariamente bloqueada' } };
      }

      // Attempt login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      // Log the attempt
      await logLoginAttempt(email, !error);

      return { data, error };
    } catch (error: any) {
      // Log failed attempt
      await logLoginAttempt(email, false);
      return { data: null, error };
    } finally {
      setIsProcessing(false);
    }
  }, [checkLoginAttempts, logLoginAttempt, handleAccountLocked]);

  const secureSignUp = useCallback(async (email: string, password: string, metadata?: any) => {
    setIsProcessing(true);
    
    try {
      const redirectUrl = `${window.location.origin}/hub`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: metadata || {}
        }
      });

      return { data, error };
    } catch (error: any) {
      return { data: null, error };
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const cleanupUserSessions = useCallback(async (userId: string) => {
    try {
      const { error } = await supabase.rpc('cleanup_user_sessions', {
        user_id_param: userId
      });
      
      if (error) {
        console.error('Error cleaning up user sessions:', error);
      }
    } catch (error) {
      console.error('Error cleaning up user sessions:', error);
    }
  }, []);

  return {
    secureSignIn,
    secureSignUp,
    cleanupUserSessions,
    isProcessing
  };
};
