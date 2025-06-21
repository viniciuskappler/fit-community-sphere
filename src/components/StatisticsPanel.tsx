
import React, { useState, useEffect } from 'react';
import { Users, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const StatisticsPanel = () => {
  const [registeredUsers, setRegisteredUsers] = useState(2847);
  const [targetUsers] = useState(5000);
  
  useEffect(() => {
    // Simular aumento gradual dos cadastros
    const interval = setInterval(() => {
      setRegisteredUsers(prev => {
        if (prev < targetUsers) {
          return prev + Math.floor(Math.random() * 3) + 1;
        }
        return prev;
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [targetUsers]);

  const percentage = Math.min((registeredUsers / targetUsers) * 100, 100);
  
  const data = [
    { name: 'Cadastrados', value: registeredUsers, color: '#ea580c' },
    { name: 'Restantes', value: Math.max(targetUsers - registeredUsers, 0), color: '#fed7aa' }
  ];

  return (
    <div className="relative mx-auto max-w-4xl px-6 mb-16">
      {/* Glassmorphism Panel */}
      <div className="relative backdrop-blur-xl bg-gradient-to-br from-orange-500/20 via-red-500/10 to-orange-600/20 rounded-3xl border border-orange-200/30 shadow-2xl overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-red-100/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(239,68,68,0.2),transparent_50%)]"></div>
        
        <div className="relative z-10 p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Counter Section */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-full shadow-lg">
                  <Users className="text-white" size={32} />
                </div>
                <TrendingUp className="text-orange-600 ml-3" size={24} />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-700 to-red-600 bg-clip-text text-transparent mb-2">
                Atletas Cadastrados
              </h3>
              
              {/* Big Counter */}
              <div className="mb-4">
                <span className="text-6xl md:text-7xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  {registeredUsers.toLocaleString()}
                </span>
                <div className="text-lg text-orange-700 font-semibold mt-2">
                  de {targetUsers.toLocaleString()} atletas
                </div>
              </div>
              
              <div className="bg-white/50 rounded-full h-4 overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-1000 ease-out rounded-full shadow-lg"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="text-sm text-orange-700 mt-2 font-medium">
                {percentage.toFixed(1)}% da meta alcançada
              </div>
            </div>

            {/* Chart Section */}
            <div className="flex justify-center">
              <div className="relative w-64 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Center Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      {percentage.toFixed(0)}%
                    </div>
                    <div className="text-sm text-orange-700 font-medium">
                      Completo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-8 p-6 bg-white/30 rounded-2xl border border-orange-200/50">
            <p className="text-lg font-semibold bg-gradient-to-r from-orange-700 to-red-600 bg-clip-text text-transparent mb-2">
              🚀 Faça parte desta revolução esportiva!
            </p>
            <p className="text-orange-700">
              Cada novo atleta fortalece nossa comunidade e expande o movimento do esporte no Brasil.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;
