
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
  establishment_name: string;
  establishment_type: string;
  city: string;
  state: string;
  neighborhood: string;
  street: string;
  number: string;
  cep: string;
  description: string;
  address?: string;
  phone?: string;
  latitude: number;
  longitude: number;
  averageRating: number;
  reviewCount: number;
  sports: string[];
  amenities: string[];
  operating_hours: string;
  instagram_url?: string;
  website_url?: string;
  photos: Array<{ photo_url: string; is_main: boolean }>;
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
        establishment_type: 'Academia', // Mock data
        city: est.cidade,
        state: est.estado,
        neighborhood: est.bairro || '',
        street: est.rua || '',
        number: est.numero || '',
        cep: est.cep || '',
        description: est.descricao,
        address: `${est.rua || ''} ${est.numero || ''}, ${est.bairro || ''}`.trim(),
        phone: est.telefone,
        latitude: est.latitude || -23.5505,
        longitude: est.longitude || -46.6333,
        averageRating: 4.5, // Mock data
        reviewCount: 12, // Mock data
        sports: est.modalidades || [],
        amenities: ['Estacionamento', 'Vestiário'], // Mock data
        operating_hours: '06h às 22h', // Mock data
        instagram_url: est.site, // Use site field for now since instagram field doesn't exist
        website_url: est.site,
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
