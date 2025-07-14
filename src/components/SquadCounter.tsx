
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const SquadCounter = () => {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const fetchSquadCount = async () => {
    try {
      const { data, error, count: totalCount } = await supabase
        .from('usuarios')
        .select('id', { count: 'exact' })
        .eq('code', 'SQUAD300');

      if (error) {
        console.error('Erro ao buscar contagem do SQUAD300:', error);
        return;
      }

      setCount(totalCount || 0);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar contagem do SQUAD300:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Buscar contagem inicial
    fetchSquadCount();

    // Configurar atualização a cada 10 segundos
    const interval = setInterval(() => {
      fetchSquadCount();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-48 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-4">
      <p className="text-lg font-semibold text-orange-600">
        Já somos <span className="text-2xl font-bold text-orange-500">{count}</span> pessoas no SQUAD300! 🏆
      </p>
      <p className="text-sm text-gray-600 mt-1">
        Contagem atualizada em tempo real
      </p>
    </div>
  );
};

export default SquadCounter;
