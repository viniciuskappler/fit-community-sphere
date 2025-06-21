
import React, { useState, useEffect } from 'react';
import { usePromoCode } from '@/hooks/usePromoCode';

interface PromoCodeBannerProps {
  promoCode: string;
}

const PromoCodeBanner = ({ promoCode }: PromoCodeBannerProps) => {
  const { getPromoStats } = usePromoCode();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const result = await getPromoStats(promoCode);
      setStats(result);
      setLoading(false);
    };

    fetchStats();
    
    // Atualizar a cada 30 segundos
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [promoCode, getPromoStats]);

  if (loading || !stats || stats.error) {
    return null;
  }

  const percentage = (stats.current_uses / stats.max_uses) * 100;

  return (
    <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white p-4 rounded-lg mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="bg-white text-red-600 px-3 py-1 rounded-full text-sm font-bold">
            SQUAD 300
          </span>
          <span className="text-sm">50% de desconto vitalício</span>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold">{stats.remaining_slots}</div>
          <div className="text-xs opacity-90">vagas restantes</div>
        </div>
      </div>
      
      <div className="bg-white bg-opacity-20 rounded-full h-3 mb-2">
        <div 
          className="bg-white h-3 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs opacity-90">
        <span>{stats.current_uses} / {stats.max_uses} preenchidas</span>
        <span>Garante desconto para sempre!</span>
      </div>
    </div>
  );
};

export default PromoCodeBanner;
