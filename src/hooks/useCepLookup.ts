
import { useState } from 'react';
import cep from 'cep-promise';

interface CepData {
  cep: string;
  state: string;
  city: string;
  district: string;
  street: string;
}

interface UseCepLookupReturn {
  lookupCep: (cepValue: string) => Promise<CepData | null>;
  loading: boolean;
  error: string | null;
}

export const useCepLookup = (): UseCepLookupReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookupCep = async (cepValue: string): Promise<CepData | null> => {
    if (!cepValue || cepValue.replace(/\D/g, '').length !== 8) {
      setError('CEP deve ter 8 dígitos');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const cleanCep = cepValue.replace(/\D/g, '');
      const result = await cep(cleanCep);
      
      setLoading(false);
      return {
        cep: result.cep,
        state: result.state,
        city: result.city,
        district: result.neighborhood, // Fix: use 'neighborhood' from cep-promise instead of 'district'
        street: result.street
      };
    } catch (err: any) {
      setLoading(false);
      setError('CEP não encontrado');
      return null;
    }
  };

  return { lookupCep, loading, error };
};
