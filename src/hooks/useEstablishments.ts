// Hook simplificado para estabelecimentos
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface EstablishmentWithDetails {
  id: string;
  nome: string;
  descricao?: string;
  cidade?: string;
  estado?: string;
  modalidades?: string[];
  telefone?: string;
  email?: string;
  imagem_url?: string;
  establishment_name?: string;
  city?: string;
  state?: string;
  description?: string;
  address?: string;
  phone?: string;
  latitude?: number;
  longitude?: number;
  averageRating: number;
  reviewCount: number;
  sports: string[];
  photos: any[];
}

export const useEstablishments = () => {
  const [establishments, setEstablishments] = useState<EstablishmentWithDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEstablishments = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('estabelecimentos_esportivos')
        .select('*')
        .order('criado_em', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      // Transform data to match expected format
      const transformedData: EstablishmentWithDetails[] = (data || []).map(est => ({
        ...est,
        establishment_name: est.nome,
        city: est.cidade,
        state: est.estado,
        description: est.descricao,
        address: `${est.rua || ''} ${est.numero || ''}, ${est.bairro || ''}`.trim(),
        phone: est.telefone,
        averageRating: 4.5, // Mock data
        reviewCount: 12, // Mock data
        sports: est.modalidades || [],
        photos: []
      }));

      setEstablishments(transformedData);
    } catch (err: any) {
      console.error('Error fetching establishments:', err);
      setError('Erro ao carregar estabelecimentos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstablishments();
  }, []);

  return {
    establishments,
    loading,
    error,
    refetch: fetchEstablishments
  };
};