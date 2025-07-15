import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useEmailCheck = () => {
  const [checking, setChecking] = useState(false);

  const checkEmailExists = async (email: string): Promise<boolean> => {
    if (!email || !email.includes('@')) {
      return false;
    }

    setChecking(true);
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('id')
        .eq('email', email.toLowerCase().trim())
        .maybeSingle();

      if (error) {
        console.error('Error checking email:', error);
        return false;
      }

      return !!data;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    } finally {
      setChecking(false);
    }
  };

  return {
    checkEmailExists,
    checking
  };
};