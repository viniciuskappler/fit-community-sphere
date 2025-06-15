
import React from 'react';
import { Star, MapPin, Phone, Clock } from 'lucide-react';

const EstablishmentsSection = () => {
  const establishments = [
    {
      id: 1,
      name: 'Smart Fit Vila Madalena',
      type: 'Academia',
      rating: 4.8,
      address: 'Rua Harmonia, 456',
      phone: '(11) 3456-7890',
      hours: '06h às 22h',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      price: 'R$ 89/mês',
      amenities: ['Musculação', 'Cardio', 'Funcionais']
    },
    {
      id: 2,
      name: 'CrossFit Box São Paulo',
      type: 'Box CrossFit',
      rating: 4.9,
      address: 'Av. Faria Lima, 123',
      phone: '(11) 9876-5432',
      hours: '05h às 21h',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      price: 'R$ 180/mês',
      amenities: ['CrossFit', 'Weightlifting', 'Ginástica']
    },
    {
      id: 3,
      name: 'Aqua Center Natação',
      type: 'Centro Aquático',
      rating: 4.7,
      address: 'Rua das Piscinas, 789',
      phone: '(11) 1234-5678',
      hours: '06h às 20h',
      image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      price: 'R$ 120/mês',
      amenities: ['Natação', 'Hidro', 'Aqua Fitness']
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Estabelecimentos em <span className="text-orange-500">Destaque</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encontre academias, boxes e centros esportivos próximos a você com as melhores avaliações
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {establishments.map((establishment) => (
            <div
              key={establishment.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden group cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={establishment.image}
                  alt={establishment.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {establishment.type}
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                  <Star size={14} className="text-yellow-500 mr-1 fill-current" />
                  <span className="text-gray-800 text-sm font-semibold">{establishment.rating}</span>
                </div>
                <div className="absolute bottom-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {establishment.price}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                  {establishment.name}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    <span className="text-sm">{establishment.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone size={16} className="mr-2" />
                    <span className="text-sm">{establishment.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock size={16} className="mr-2" />
                    <span className="text-sm">{establishment.hours}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {establishment.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                    Agendar
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    ♡
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
            Ver mais estabelecimentos
          </button>
        </div>
      </div>
    </section>
  );
};

export default EstablishmentsSection;
