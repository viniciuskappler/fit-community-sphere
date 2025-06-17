
import React from 'react';
import { Star, MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import AuthGuard from './AuthGuard';

const EstablishmentsSection = () => {
  const establishments = [{
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
  }, {
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
  }, {
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
  }];
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="w-full md:w-11/12 lg:w-3/4 mx-auto px-4 md:px-8 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-5xl font-bold text-gray-900 mb-3">
            Estabelecimentos em <span className="text-orange-500">Destaque</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Encontre academias, boxes e centros esportivos próximos à você com as melhores avaliações
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {establishments.map(establishment => (
            <div key={establishment.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img src={establishment.image} alt={establishment.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {establishment.type}
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                  <Star size={12} className="text-yellow-500 mr-1 fill-current" />
                  <span className="text-gray-800 text-xs font-semibold">{establishment.rating}</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {establishment.price}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                  {establishment.name}
                </h3>

                <div className="space-y-1 mb-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin size={14} className="mr-2" />
                    <span className="text-xs">{establishment.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone size={14} className="mr-2" />
                    <span className="text-xs">{establishment.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock size={14} className="mr-2" />
                    <span className="text-xs">{establishment.hours}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {establishment.amenities.map((amenity, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <AuthGuard className="flex-1">
                    <button className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-1">
                      <span>Agendar</span>
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
            <button className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300 px-[32px] py-[12px] flex items-center space-x-2">
              <span>Ver mais estabelecimentos</span>
              <ArrowRight size={16} />
            </button>
          </AuthGuard>
        </div>
      </div>
    </section>
  );
};

export default EstablishmentsSection;
