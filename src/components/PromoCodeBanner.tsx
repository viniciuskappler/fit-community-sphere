
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
    <div className="bg-gradient-to-r from-orange-600 to-red-500 text-white p-4 rounded-lg mb-4 shadow-lg border border-orange-400/30">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="bg-white text-orange-600 px-3 py-1 rounded-full text-xs font-bold shadow-md">
            SQUAD 300
          </span>
          <span className="text-base font-semibold">50% de desconto vitalício</span>
        </div>
        <div className="text-right">
          <div className="text-xl font-black">{stats.remaining_slots}</div>
          <div className="text-xs opacity-90 font-semibold">vagas restantes</div>
        </div>
      </div>
      
      <div className="bg-white bg-opacity-20 rounded-full h-3 mb-2 overflow-hidden">
        <div 
          className="bg-white h-3 rounded-full transition-all duration-500 shadow-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs opacity-90 font-medium">
        <span>{stats.current_uses} / {stats.max_uses} preenchidas</span>
        <span>🏆 Desconto garantido para sempre!</span>
      </div>
    </div>
  );
};

export default PromoCodeBanner;
