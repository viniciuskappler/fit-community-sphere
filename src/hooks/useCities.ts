
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface City {
  ibge_code: string;
  name: string;
  state_code: string;
}

interface State {
  code: string;
  name: string;
}

export const useCities = () => {
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('states')
          .select('code, name')
          .order('name');

        if (fetchError) {
          throw fetchError;
        }

        setStates(data || []);
      } catch (err: any) {
        console.error('Erro ao buscar estados:', err);
        setError('Erro ao carregar estados');
      }
    };

    fetchStates();
  }, []);

  const loadCities = async (stateCode: string) => {
    if (!stateCode) {
      setCities([]);
      return;
    }

    setLoading(true);
    setError('');
    
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

  return { states, cities, loadCities, loading, error };
};
