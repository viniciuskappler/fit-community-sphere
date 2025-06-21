
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface WaitlistData {
  email: string;
  full_name: string;
  phone?: string;
}

export const useWaitlist = () => {
  const [loading, setLoading] = useState(false);

  const addToWaitlist = async (data: WaitlistData): Promise<boolean> => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert({
          email: data.email,
          full_name: data.full_name,
          phone: data.phone
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast.error('Este e-mail já está na lista de espera');
          return false;
        }
        console.error('Erro ao adicionar à lista de espera:', error);
        toast.error('Erro ao adicionar à lista de espera. Tente novamente.');
        return false;
      }

      toast.success('Cadastro realizado na lista de espera com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast.error('Erro inesperado. Tente novamente.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    addToWaitlist,
    loading
  };
};
