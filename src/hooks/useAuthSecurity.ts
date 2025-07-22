
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

      if (data?.user && !error) {
        console.log('✅ Login realizado com sucesso para:', email);
      }

      return { data, error };
    } catch (error: any) {
      console.error('❌ Erro no login seguro:', error);
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
      console.log('🚀 Iniciando cadastro seguro para:', email);
      const redirectUrl = `${window.location.origin}/hub`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: metadata || {}
        }
      });

      if (data?.user && !error) {
        console.log('✅ Cadastro realizado com sucesso para:', email);
      } else if (error) {
        console.error('❌ Erro no cadastro:', error);
      }

      return { data, error };
    } catch (error: any) {
      console.error('💥 Erro inesperado no cadastro:', error);
      return { data: null, error };
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const cleanupUserSessions = useCallback(async (userId: string) => {
    try {
      console.log('🧹 Limpando sessões do usuário:', userId);
      const { error } = await supabase.rpc('cleanup_user_sessions', {
        user_id_param: userId
      });
      
      if (error) {
        console.error('❌ Erro ao limpar sessões:', error);
      } else {
        console.log('✅ Sessões limpas com sucesso');
      }
    } catch (error) {
      console.error('💥 Erro inesperado ao limpar sessões:', error);
    }
  }, []);

  return {
    secureSignIn,
    secureSignUp,
    cleanupUserSessions,
    isProcessing
  };
};
