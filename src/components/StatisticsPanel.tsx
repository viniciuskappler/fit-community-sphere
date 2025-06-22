
import React from 'react';
import { Users, TrendingUp, Target, Zap } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useUserStats } from '@/hooks/useUserStats';
import { Button } from './ui/button';

const StatisticsPanel = () => {
  const { stats, loading } = useUserStats();
  const targetUsers = 5000;
  
  const registeredUsers = stats.total_users;
  const percentage = Math.min((registeredUsers / targetUsers) * 100, 100);
  
  const data = [
    { name: 'Cadastrados', value: registeredUsers, color: '#ea580c' },
    { name: 'Restantes', value: Math.max(targetUsers - registeredUsers, 0), color: '#fed7aa' }
  ];

  const scrollToRegistration = () => {
    const registrationSection = document.getElementById('registration-section');
    if (registrationSection) {
      registrationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="relative mx-auto max-w-5xl px-4 mb-12">
        <div className="relative backdrop-blur-xl bg-gradient-to-br from-orange-500/15 via-red-500/10 to-orange-600/15 rounded-2xl border border-orange-200/30 shadow-xl overflow-hidden">
          <div className="relative z-10 p-6 md:p-8">
            <div className="animate-pulse">
              <div className="h-6 bg-orange-200 rounded mb-3"></div>
              <div className="h-12 bg-orange-200 rounded mb-4"></div>
              <div className="h-3 bg-orange-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-5xl px-4 mb-12">
      {/* Main Panel com Glassmorphism - Mais compacto */}
      <div className="relative backdrop-blur-xl bg-gradient-to-br from-orange-500/15 via-red-500/10 to-orange-600/15 rounded-2xl border border-orange-200/30 shadow-xl overflow-hidden">
        {/* Background Pattern - Mais sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/30 to-red-100/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.2),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(239,68,68,0.15),transparent_50%)]"></div>
        
        {/* Header mais compacto */}
        <div className="relative z-10 text-center pt-6 px-6">
          <div className="flex items-center justify-center mb-3">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-full shadow-lg mr-3">
              <Zap className="text-white" size={24} />
            </div>
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-3 rounded-full shadow-lg">
              <Target className="text-white" size={24} />
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-orange-700 to-red-600 bg-clip-text text-transparent mb-2">
            🚀 Revolução do Esporte em Movimento!
          </h2>
          
          <p className="text-base md:text-lg text-orange-700 font-semibold max-w-xl mx-auto leading-relaxed">
            Junte-se aos milhares de atletas que já fazem parte desta transformação!
          </p>
        </div>

        <div className="relative z-10 p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Counter Section - Mais compacta */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-full shadow-lg animate-pulse">
                  <Users className="text-white" size={28} />
                </div>
                <div className="ml-3 flex items-center">
                  <TrendingUp className="text-orange-600 mr-2" size={20} />
                  <span className="text-orange-700 font-bold text-base">Em crescimento!</span>
                </div>
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-700 to-red-600 bg-clip-text text-transparent mb-3">
                Atletas Revolucionários
              </h3>
              
              {/* Big Counter mais compacto */}
              <div className="mb-4 p-4 bg-white/30 rounded-xl border border-orange-300/50 shadow-lg">
                <div className="flex items-center justify-center lg:justify-start mb-1">
                  <span className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    {registeredUsers.toLocaleString()}
                  </span>
                </div>
                <div className="text-lg text-orange-700 font-bold">
                  de {targetUsers.toLocaleString()} atletas pioneiros
                </div>
                <div className="text-sm text-orange-600 mt-1 font-medium">
                  🏆 {percentage.toFixed(1)}% da meta SQUAD 300 alcançada
                </div>
              </div>
              
              {/* Progress Bar mais fina */}
              <div className="bg-white/50 rounded-full h-4 overflow-hidden shadow-inner mb-3">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 transition-all duration-1000 ease-out rounded-full shadow-lg relative"
                  style={{ width: `${percentage}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
              
              {/* Call to Action Buttons mais compactos */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mt-4">
                <Button
                  onClick={scrollToRegistration}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-6 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  🔥 Entrar no SQUAD 300
                </Button>
                <Button
                  variant="outline"
                  onClick={scrollToRegistration}
                  className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold px-6 py-2 rounded-lg"
                >
                  ⚡ Ver Benefícios
                </Button>
              </div>
            </div>

            {/* Chart Section - Mais compacta */}
            <div className="flex justify-center">
              <div className="relative w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Center Text mais compacto */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center bg-white/70 rounded-full p-4 shadow-lg">
                    <div className="text-2xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      {percentage.toFixed(0)}%
                    </div>
                    <div className="text-xs text-orange-700 font-bold">
                      Completo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats Cards mais compactas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/30 rounded-xl p-4 text-center border border-orange-200/50 shadow-lg">
              <div className="text-2xl font-black text-orange-600 mb-1">{stats.supporters}</div>
              <div className="text-orange-700 font-semibold text-sm">Praticantes</div>
            </div>
            <div className="bg-white/30 rounded-xl p-4 text-center border border-orange-200/50 shadow-lg">
              <div className="text-2xl font-black text-red-600 mb-1">{stats.establishments}</div>
              <div className="text-red-700 font-semibold text-sm">Estabelecimentos</div>
            </div>
            <div className="bg-white/30 rounded-xl p-4 text-center border border-orange-200/50 shadow-lg">
              <div className="text-2xl font-black text-orange-600 mb-1">{stats.groups}</div>
              <div className="text-orange-700 font-semibold text-sm">Grupos</div>
            </div>
          </div>
          
          {/* Final Call to Action mais compacto */}
          <div className="text-center mt-8 p-6 bg-gradient-to-r from-orange-500/25 to-red-500/25 rounded-xl border border-orange-300/50 shadow-lg">
            <h4 className="text-xl font-bold bg-gradient-to-r from-orange-700 to-red-600 bg-clip-text text-transparent mb-2">
              🎯 Seja Parte da História do Esporte!
            </h4>
            <p className="text-orange-700 text-base mb-3 max-w-xl mx-auto">
              Cada atleta que se junta ao SQUAD 300 não é apenas um número - é um revolucionário!
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-orange-600 font-medium">
              <span className="bg-white/40 px-3 py-1 rounded-full">🏆 Desconto Vitalício</span>
              <span className="bg-white/40 px-3 py-1 rounded-full">⚡ Acesso Exclusivo</span>
              <span className="bg-white/40 px-3 py-1 rounded-full">🚀 Comunidade Elite</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;
