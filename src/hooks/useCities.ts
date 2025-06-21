
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface City {
  ibge_code: string;
  name: string;
  state_code: string;
}

export const useCities = (stateCode?: string) => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!stateCode) {
      setCities([]);
      return;
    }

    const fetchCities = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const { data, error: fetchError } = await supabase
          .from('cities')
          .select('ibge_code, name, state_code')
          .eq('state_code', stateCode)
          .order('name');

        if (fetchError) {
          throw fetchError;
        }

        setCities(data || []);
      } catch (err: any) {
        console.error('Erro ao buscar cidades:', err);
        setError('Erro ao carregar cidades');
        setCities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [stateCode]);

  return { cities, loading, error };
};
