
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
      <div className="relative mx-auto max-w-6xl px-6 mb-16">
        <div className="relative backdrop-blur-xl bg-gradient-to-br from-orange-500/20 via-red-500/10 to-orange-600/20 rounded-3xl border border-orange-200/30 shadow-2xl overflow-hidden">
          <div className="relative z-10 p-8 md:p-12">
            <div className="animate-pulse">
              <div className="h-8 bg-orange-200 rounded mb-4"></div>
              <div className="h-16 bg-orange-200 rounded mb-6"></div>
              <div className="h-4 bg-orange-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-6xl px-6 mb-16">
      {/* Main Panel com Glassmorphism */}
      <div className="relative backdrop-blur-xl bg-gradient-to-br from-orange-500/20 via-red-500/10 to-orange-600/20 rounded-3xl border border-orange-200/30 shadow-2xl overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-red-100/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(239,68,68,0.2),transparent_50%)]"></div>
        
        {/* Header Inspirador */}
        <div className="relative z-10 text-center pt-8 px-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-full shadow-lg mr-4">
              <Zap className="text-white" size={36} />
            </div>
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4 rounded-full shadow-lg">
              <Target className="text-white" size={36} />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-orange-700 to-red-600 bg-clip-text text-transparent mb-3">
            🚀 Revolução do Esporte em Movimento!
          </h2>
          
          <p className="text-lg md:text-xl text-orange-700 font-semibold max-w-2xl mx-auto leading-relaxed">
            Junte-se aos milhares de atletas que já fazem parte desta transformação histórica do esporte brasileiro!
          </p>
        </div>

        <div className="relative z-10 p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Counter Section - Redesenhada */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-full shadow-lg animate-pulse">
                  <Users className="text-white" size={40} />
                </div>
                <div className="ml-4 flex items-center">
                  <TrendingUp className="text-orange-600 mr-2" size={28} />
                  <span className="text-orange-700 font-bold text-lg">Em crescimento!</span>
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-700 to-red-600 bg-clip-text text-transparent mb-4">
                Atletas Revolucionários
              </h3>
              
              {/* Big Counter com mais destaque */}
              <div className="mb-6 p-6 bg-white/40 rounded-2xl border border-orange-300/50 shadow-lg">
                <div className="flex items-center justify-center lg:justify-start mb-2">
                  <span className="text-7xl md:text-8xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    {registeredUsers.toLocaleString()}
                  </span>
                </div>
                <div className="text-xl text-orange-700 font-bold">
                  de {targetUsers.toLocaleString()} atletas pioneiros
                </div>
                <div className="text-sm text-orange-600 mt-1 font-medium">
                  🏆 {percentage.toFixed(1)}% da meta SQUAD 300 alcançada
                </div>
              </div>
              
              {/* Progress Bar melhorada */}
              <div className="bg-white/60 rounded-full h-6 overflow-hidden shadow-inner mb-4">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 transition-all duration-1000 ease-out rounded-full shadow-lg relative"
                  style={{ width: `${percentage}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
              
              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-6">
                <Button
                  onClick={scrollToRegistration}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  🔥 Entrar no SQUAD 300
                </Button>
                <Button
                  variant="outline"
                  onClick={scrollToRegistration}
                  className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold px-8 py-3 rounded-xl"
                >
                  ⚡ Ver Benefícios
                </Button>
              </div>
            </div>

            {/* Chart Section - Melhorada */}
            <div className="flex justify-center">
              <div className="relative w-64 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={85}
                      outerRadius={115}
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
                
                {/* Center Text melhorado */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center bg-white/80 rounded-full p-6 shadow-lg">
                    <div className="text-3xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      {percentage.toFixed(0)}%
                    </div>
                    <div className="text-sm text-orange-700 font-bold">
                      Completo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/40 rounded-2xl p-6 text-center border border-orange-200/50 shadow-lg">
              <div className="text-3xl font-black text-orange-600 mb-2">{stats.supporters}</div>
              <div className="text-orange-700 font-semibold">Praticantes</div>
            </div>
            <div className="bg-white/40 rounded-2xl p-6 text-center border border-orange-200/50 shadow-lg">
              <div className="text-3xl font-black text-red-600 mb-2">{stats.establishments}</div>
              <div className="text-red-700 font-semibold">Estabelecimentos</div>
            </div>
            <div className="bg-white/40 rounded-2xl p-6 text-center border border-orange-200/50 shadow-lg">
              <div className="text-3xl font-black text-orange-600 mb-2">{stats.groups}</div>
              <div className="text-orange-700 font-semibold">Grupos</div>
            </div>
          </div>
          
          {/* Final Call to Action */}
          <div className="text-center mt-12 p-8 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-2xl border border-orange-300/50 shadow-lg">
            <h4 className="text-2xl font-bold bg-gradient-to-r from-orange-700 to-red-600 bg-clip-text text-transparent mb-3">
              🎯 Seja Parte da História do Esporte!
            </h4>
            <p className="text-orange-700 text-lg mb-4 max-w-2xl mx-auto">
              Cada atleta que se junta ao SQUAD 300 não é apenas um número - é um revolucionário transformando o cenário esportivo brasileiro!
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-orange-600 font-medium">
              <span className="bg-white/50 px-4 py-2 rounded-full">🏆 Desconto Vitalício</span>
              <span className="bg-white/50 px-4 py-2 rounded-full">⚡ Acesso Exclusivo</span>
              <span className="bg-white/50 px-4 py-2 rounded-full">🚀 Comunidade Elite</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;
