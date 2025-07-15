// Hook simplificado para grupos esportivos
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SportsGroupWithDetails {
  id: string;
  nome: string;
  descricao?: string;
  modalidade?: string;
  cidade?: string;
  estado?: string;
  group_name?: string;
  corporate_name?: string;
  cities: string[];
  description?: string;
  meeting_point?: string;
  latitude?: number;
  longitude?: number;
  averageRating: number;
  reviewCount: number;
  sports: string[];
  photos: any[];
}

export const useSportsGroups = () => {
  const [groups, setGroups] = useState<SportsGroupWithDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSportsGroups = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('grupos_esportivos')
        .select('*')
        .order('criado_em', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      // Transform data to match expected format
      const transformedData: SportsGroupWithDetails[] = (data || []).map(group => ({
        ...group,
        group_name: group.nome,
        corporate_name: group.nome,
        cities: group.cidade ? [group.cidade] : [],
        description: group.descricao,
        meeting_point: `${group.rua || ''} ${group.numero || ''}, ${group.bairro || ''}`.trim(),
        averageRating: 4.3, // Mock data
        reviewCount: 8, // Mock data
        sports: group.modalidade ? [group.modalidade] : [],
        photos: []
      }));

      setGroups(transformedData);
    } catch (err: any) {
      console.error('Error fetching sports groups:', err);
      setError('Erro ao carregar grupos esportivos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSportsGroups();
  }, []);

  return {
    groups,
    loading,
    error,
    refetch: fetchSportsGroups
  };
};