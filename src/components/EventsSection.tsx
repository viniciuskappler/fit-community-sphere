
import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

const EventsSection = () => {
  const events = [
    {
      id: 1,
      title: 'Corrida Matinal no Parque',
      date: '15 Jun',
      time: '06:00',
      location: 'Parque Ibirapuera',
      participants: 24,
      image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'Corrida'
    },
    {
      id: 2,
      title: 'Treino de CrossFit',
      date: '16 Jun',
      time: '19:00',
      location: 'Box CrossFit Vila Madalena',
      participants: 12,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'CrossFit'
    },
    {
      id: 3,
      title: 'Natação Técnica',
      date: '17 Jun',
      time: '07:30',
      location: 'Centro Aquático',
      participants: 8,
      image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'Natação'
    },
    {
      id: 4,
      title: 'Pedal Urbano',
      date: '18 Jun',
      time: '08:00',
      location: 'Ciclovia Marginal Pinheiros',
      participants: 18,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'Ciclismo'
    }
  ];

  return (
    <section className="bg-white py-[100px]">
      <div className="w-3/4 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Eventos <span className="text-orange-500">Próximos</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Participe de eventos esportivos na sua região e conheça pessoas com os mesmos interesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {events.map(event => (
            <div key={event.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden group cursor-pointer">
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                />
                <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                  {event.category}
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-gray-800 text-xs font-semibold">
                  {event.date}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                  {event.title}
                </h3>

                <div className="space-y-1 mb-3">
                  <div className="flex items-center text-gray-600">
                    <Clock size={14} className="mr-2" />
                    <span className="text-xs">{event.time}</span>
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

                <button className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300">
                  Participar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors">
            Ver todos os eventos
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
