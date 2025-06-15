
import React from 'react';
import { Link } from 'react-router-dom';

const SportsSection = () => {
  const sports = [
    {
      name: 'Musculação',
      icon: '💪',
      color: 'from-orange-500 to-red-600'
    },
    {
      name: 'Corrida',
      icon: '🏃‍♂️',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      name: 'Natação',
      icon: '🏊‍♀️',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      name: 'Rugby',
      icon: '🏈',
      color: 'from-green-500 to-emerald-600'
    },
    {
      name: 'Ciclismo',
      icon: '🚴‍♂️',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      name: 'Canoagem',
      icon: '🛶',
      color: 'from-teal-500 to-cyan-600'
    },
    {
      name: 'Trekking',
      icon: '🥾',
      color: 'from-amber-500 to-orange-600'
    },
    {
      name: 'CrossFit',
      icon: '🏋️‍♀️',
      color: 'from-purple-500 to-pink-600'
    },
    {
      name: 'Futebol',
      icon: '⚽',
      color: 'from-green-600 to-lime-600'
    },
    {
      name: 'Escalada',
      icon: '🧗‍♂️',
      color: 'from-stone-500 to-gray-600'
    },
    {
      name: 'Vôlei',
      icon: '🏐',
      color: 'from-pink-500 to-rose-600'
    },
    {
      name: 'Basquete',
      icon: '🏀',
      color: 'from-orange-600 to-red-500'
    },
    {
      name: 'Hipismo',
      icon: '🏇',
      color: 'from-brown-500 to-amber-700'
    }
  ];

  return (
    <section className="bg-gray-50 py-[101px]">
      <div className="w-3/4 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Explore Modalidades <span className="text-orange-500">Esportivas</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Descubra a modalidade perfeita para você e conecte-se com estabelecimentos especializados
          </p>
        </div>

        {/* Sports Carousel */}
        <div className="relative overflow-hidden">
          <div className="flex animate-slide space-x-4">
            {[...sports, ...sports].map((sport, index) => (
              <Link to="/modalidades-esportivas" key={index} className="flex-shrink-0">
                <div className="w-32 h-20 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-125 hover:z-30 hover:animate-shake cursor-pointer group relative transform-gpu">
                  <div className={`h-full bg-gradient-to-br ${sport.color} rounded-xl p-3 flex flex-col items-center justify-center relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-10 h-10 bg-white/10 rounded-full -translate-y-5 translate-x-5"></div>
                    <div className="text-xl mb-1 group-hover:scale-110 transition-transform">{sport.icon}</div>
                    <h3 className="text-white font-semibold text-sm text-center">{sport.name}</h3>
                    <div className="absolute bottom-0 left-0 w-8 h-8 bg-white/10 rounded-full translate-y-4 -translate-x-4"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SportsSection;
