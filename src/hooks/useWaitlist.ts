// Hook simplificado para waitlist - temporariamente desabilitado
import { useState } from 'react';
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
      // Funcionalidade de waitlist temporariamente desabilitada
      console.log('Waitlist functionality disabled:', data);
      
      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Funcionalidade temporariamente indisponível. Tente novamente mais tarde.');
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