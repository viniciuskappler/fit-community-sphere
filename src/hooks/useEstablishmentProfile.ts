// Hook simplificado para perfil de estabelecimento
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface EstablishmentData {
  id: string;
  nome: string;
  descricao?: string;
  cnpj?: string;
  telefone?: string;
  email?: string;
  site?: string;
  cidade?: string;
  estado?: string;
  bairro?: string;
  rua?: string;
  numero?: string;
  cep?: string;
  latitude?: number;
  longitude?: number;
  modalidades?: string[];
  estrutura?: string[];
  horario_funcionamento?: string;
  imagem_url?: string;
  user_id?: string;
  criado_em?: string;
}

export const useEstablishmentProfile = (id?: string) => {
  const [establishment, setEstablishment] = useState<EstablishmentData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEstablishment = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('estabelecimentos_esportivos')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      setEstablishment(data);
    } catch (err: any) {
      console.error('Error fetching establishment:', err);
      setError('Erro ao carregar dados do estabelecimento');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstablishment();
  }, [id]);

  return {
    establishment,
    loading,
    error,
    refetch: fetchEstablishment
  };
};