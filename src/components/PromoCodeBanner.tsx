
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
    <div className="bg-gradient-to-r from-orange-600 to-red-500 text-white p-6 rounded-xl mb-6 shadow-2xl border border-orange-400/30">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="bg-white text-orange-600 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            SQUAD 300
          </span>
          <span className="text-lg font-semibold">50% de desconto vitalício</span>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black">{stats.remaining_slots}</div>
          <div className="text-sm opacity-90 font-semibold">vagas restantes</div>
        </div>
      </div>
      
      <div className="bg-white bg-opacity-25 rounded-full h-4 mb-3 overflow-hidden">
        <div 
          className="bg-white h-4 rounded-full transition-all duration-500 shadow-lg"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="flex justify-between text-sm opacity-95 font-medium">
        <span>{stats.current_uses} / {stats.max_uses} preenchidas</span>
        <span>🏆 Desconto garantido para sempre!</span>
      </div>
    </div>
  );
};

export default PromoCodeBanner;
