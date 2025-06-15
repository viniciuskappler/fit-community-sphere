
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Eventos <span className="text-orange-500">Próximos</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Participe de eventos esportivos na sua região e conheça pessoas com os mesmos interesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {event.category}
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-gray-800 text-sm font-semibold">
                  {event.date}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors">
                  {event.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Clock size={16} className="mr-2" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users size={16} className="mr-2" />
                    <span className="text-sm">{event.participants} participantes</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                  Participar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
            Ver todos os eventos
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
