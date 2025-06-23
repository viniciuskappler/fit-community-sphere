
import React from 'react';
import { Link } from 'react-router-dom';

const SportsSection = () => {
  const sports = [{
    name: 'Musculação',
    icon: '💪',
    color: 'from-orange-500 to-orange-600'
  }, {
    name: 'Corrida',
    icon: '🏃‍♂️',
    color: 'from-orange-600 to-orange-400'
  }, {
    name: 'Natação',
    icon: '🏊‍♀️',
    color: 'from-orange-500 to-orange-700'
  }, {
    name: 'Rugby',
    icon: '🏈',
    color: 'from-orange-600 to-orange-500'
  }, {
    name: 'Ciclismo',
    icon: '🚴‍♂️',
    color: 'from-orange-400 to-orange-600'
  }, {
    name: 'Canoagem',
    icon: '🛶',
    color: 'from-orange-600 to-orange-400'
  }, {
    name: 'Trekking',
    icon: '🥾',
    color: 'from-orange-500 to-orange-600'
  }, {
    name: 'CrossFit',
    icon: '🏋️‍♀️',
    color: 'from-orange-600 to-orange-400'
  }, {
    name: 'Futebol',
    icon: '⚽',
    color: 'from-orange-500 to-orange-700'
  }, {
    name: 'Escalada',
    icon: '🧗‍♂️',
    color: 'from-orange-600 to-orange-500'
  }, {
    name: 'Vôlei',
    icon: '🏐',
    color: 'from-orange-400 to-orange-600'
  }, {
    name: 'Basquete',
    icon: '🏀',
    color: 'from-orange-600 to-orange-400'
  }, {
    name: 'Hipismo',
    icon: '🏇',
    color: 'from-orange-500 to-orange-600'
  }, {
    name: 'Tênis',
    icon: '🎾',
    color: 'from-orange-600 to-orange-400'
  }, {
    name: 'Boxe',
    icon: '🥊',
    color: 'from-orange-500 to-orange-700'
  }, {
    name: 'Yoga',
    icon: '🧘‍♀️',
    color: 'from-orange-400 to-orange-600'
  }];

  return (
    <section className="bg-gray-50 py-[101px] reveal-on-scroll">
      <div className="w-full px-6 md:w-11/12 lg:w-3/4 mx-auto md:px-8 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-3">
            Explore Modalidades <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">Esportivas</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Descubra a modalidade perfeita para você e 
            <br className="md:hidden" />
            {' '}conecte-se com estabelecimentos especializados
          </p>
        </div>

        {/* Sports Carousel */}
        <div className="relative overflow-hidden">
          <div className="flex animate-slide-fast space-x-4">
            {[...sports, ...sports, ...sports].map((sport, index) => (
              <Link to="/esportes" key={index} className="flex-shrink-0">
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
