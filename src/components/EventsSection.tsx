
import React from 'react';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import AuthGuard from './AuthGuard';

const EventsSection = () => {
  const events = [
    {
      id: 1,
      title: 'Maratona São Paulo 2025',
      date: '15 de Março, 2025',
      time: '06:00',
      location: 'Parque Ibirapuera',
      participants: 1250,
      category: 'Corrida',
      image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&w=400&q=80',
      price: 'R$ 85',
      difficulty: 'Intermediário'
    },
    {
      id: 2,
      title: 'Torneio de Vôlei de Praia',
      date: '22 de Março, 2025',
      time: '14:00',
      location: 'Praia de Copacabana',
      participants: 64,
      category: 'Vôlei',
      image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=400&q=80',
      price: 'R$ 120',
      difficulty: 'Avançado'
    },
    {
      id: 3,
      title: 'Pedalada Ecológica',
      date: '30 de Março, 2025',
      time: '08:00',
      location: 'Parque Villa Lobos',
      participants: 180,
      category: 'Ciclismo',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=400&q=80',
      price: 'Gratuito',
      difficulty: 'Iniciante'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-green-100 text-green-700';
      case 'Intermediário': return 'bg-yellow-100 text-yellow-700';
      case 'Avançado': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="w-full md:w-11/12 lg:w-3/4 mx-auto px-4 md:px-8 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-5xl font-bold text-gray-900 mb-3">
            Eventos <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">Esportivos</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Participe de eventos incríveis e conecte-se com outros atletas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <div key={event.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-600 to-orange-400 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {event.category}
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                  <span className="text-gray-800 text-xs font-semibold">{event.price}</span>
                </div>
                <div className={`absolute bottom-3 left-3 px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(event.difficulty)}`}>
                  {event.difficulty}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                  {event.title}
                </h3>

                <div className="space-y-1 mb-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar size={14} className="mr-2" />
                    <span className="text-xs">{event.date} às {event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={14} className="mr-2" />
                    <span className="text-xs">{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users size={14} className="mr-2" />
                    <span className="text-xs">{event.participants} participantes</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <AuthGuard className="flex-1">
                    <button className="w-full bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-1">
                      <span>Participar</span>
                      <ArrowRight size={14} />
                    </button>
                  </AuthGuard>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                    ♡
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <AuthGuard className="inline-block">
            <button className="bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300 px-[32px] py-[12px] flex items-center space-x-2">
              <span>Ver mais eventos</span>
              <ArrowRight size={16} />
            </button>
          </AuthGuard>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
