
import React from 'react';

const SportsSection = () => {
  const sports = [
    { name: 'Musculação', icon: '💪', color: 'from-orange-500 to-red-600' },
    { name: 'Corrida', icon: '🏃‍♂️', color: 'from-blue-500 to-indigo-600' },
    { name: 'Natação', icon: '🏊‍♀️', color: 'from-cyan-500 to-blue-600' },
    { name: 'Rugby', icon: '🏈', color: 'from-green-500 to-emerald-600' },
    { name: 'Ciclismo', icon: '🚴‍♂️', color: 'from-yellow-500 to-orange-600' },
    { name: 'Canoagem', icon: '🛶', color: 'from-teal-500 to-cyan-600' },
    { name: 'Trekking', icon: '🥾', color: 'from-amber-500 to-orange-600' },
    { name: 'CrossFit', icon: '🏋️‍♀️', color: 'from-purple-500 to-pink-600' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Modalidades <span className="text-orange-500">Esportivas</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubra a modalidade perfeita para você e conecte-se com estabelecimentos especializados
          </p>
        </div>

        {/* Sports Carousel */}
        <div className="relative overflow-hidden">
          <div className="flex animate-[slide_30s_linear_infinite] space-x-6">
            {[...sports, ...sports].map((sport, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-64 h-40 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                <div className={`h-full bg-gradient-to-br ${sport.color} rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{sport.icon}</div>
                  <h3 className="text-white font-semibold text-lg text-center">{sport.name}</h3>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default SportsSection;
