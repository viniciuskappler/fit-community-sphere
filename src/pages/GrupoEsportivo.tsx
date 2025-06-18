
import React, { useState } from 'react';
import { Users, MapPin, Phone, Mail, Calendar, Star, Edit2, Camera, UserPlus } from 'lucide-react';
import Header from '../components/Header';
import SecondaryHeader from '../components/SecondaryHeader';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

const GrupoEsportivo = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // Dados fictícios para demonstração
  const groupData = {
    name: 'Corrida Matinal SP',
    corporateName: 'Associação Esportiva Corrida SP',
    description: 'Grupo dedicado à prática de corrida matinal em São Paulo. Todos os níveis são bem-vindos!',
    cities: ['São Paulo', 'Guarulhos', 'Osasco'],
    meetingPoint: 'Parque do Ibirapuera - Portão 3',
    phone: '(11) 98888-7777',
    email: 'contato@corridamaterialsp.com',
    members: 156,
    rating: 4.9,
    totalReviews: 89
  };

  const sports = [
    'Corrida', 'Caminhada', 'Trail Run', 'Maratona'
  ];

  const events = [
    { id: 1, name: 'Corrida 5K Ibirapuera', date: '2024-07-21', participants: 45 },
    { id: 2, name: 'Treino de Velocidade', date: '2024-07-28', participants: 23 },
    { id: 3, name: 'Preparatório Maratona SP', date: '2024-08-05', participants: 67 }
  ];

  const recentMembers = [
    { id: 1, name: 'Ana Costa', joinDate: '2024-06-15', level: 'Iniciante' },
    { id: 2, name: 'Carlos Lima', joinDate: '2024-06-12', level: 'Intermediário' },
    { id: 3, name: 'Beatriz Silva', joinDate: '2024-06-10', level: 'Avançado' }
  ];

  const testimonials = [
    { id: 1, user: 'Pedro Santos', rating: 5, comment: 'Grupo incrível! Me ajudaram muito a melhorar minha performance.', date: '2024-06-18' },
    { id: 2, user: 'Julia Oliveira', rating: 5, comment: 'Ambiente acolhedor e motivador. Recomendo para todos!', date: '2024-06-15' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SecondaryHeader isVisible={true} />
      <Header isSecondaryVisible={true} />
      
      <main className="pt-[120px] px-4 md:px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Header do Grupo */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                  <Users size={40} className="text-white" />
                </div>
                <button className="absolute -bottom-2 -right-2 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors">
                  <Camera size={16} />
                </button>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                      {groupData.name}
                    </h1>
                    <p className="text-gray-600 text-sm md:text-base mt-1">
                      {groupData.corporateName}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-500 fill-current" />
                        <span className="font-medium">{groupData.rating}</span>
                      </div>
                      <span className="text-gray-500 text-sm">({groupData.totalReviews} avaliações)</span>
                      <div className="flex items-center gap-1">
                        <Users size={16} className="text-orange-500" />
                        <span className="font-medium text-orange-600">{groupData.members} membros</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{groupData.cities.join(', ')}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Phone size={14} />
                        <span>{groupData.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail size={14} />
                        <span>{groupData.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button className="bg-gradient-to-r from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 flex items-center gap-2 text-sm">
                      <UserPlus size={16} />
                      Participar do Grupo
                    </Button>
                    <Button
                      onClick={() => setIsEditing(!isEditing)}
                      variant="outline"
                      className="border-orange-300 text-orange-600 hover:bg-orange-50 flex items-center gap-2 text-sm"
                    >
                      <Edit2 size={16} />
                      Editar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Descrição e Ponto de Encontro */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                  Sobre o Grupo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {groupData.description}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                  <MapPin size={20} />
                  Ponto de Encontro
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm md:text-base">
                  {groupData.meetingPoint}
                </p>
                <div className="mt-3">
                  <h4 className="font-medium text-sm mb-2">Cidades de Atuação:</h4>
                  <div className="flex flex-wrap gap-2">
                    {groupData.cities.map((city) => (
                      <Badge key={city} variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                        {city}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Grid de Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Modalidades */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                  <Users size={20} />
                  Modalidades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {sports.map((sport) => (
                    <Badge key={sport} variant="secondary" className="bg-orange-100 text-orange-700 border-orange-200">
                      {sport}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Próximos Eventos */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow lg:col-span-2 xl:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                  <Calendar size={20} />
                  Próximos Eventos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {events.map((event) => (
                    <div key={event.id} className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">{event.name}</h4>
                      <p className="text-xs text-gray-600 mb-1">📅 {event.date}</p>
                      <p className="text-xs text-gray-600">👥 {event.participants} participantes</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Novos Membros */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                  <UserPlus size={20} />
                  Novos Membros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentMembers.map((member) => (
                    <div key={member.id} className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-sm">{member.name}</h4>
                      <p className="text-xs text-gray-600">{member.level} • {member.joinDate}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Depoimentos */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                  <Star size={20} />
                  Depoimentos dos Membros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{testimonial.user}</h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={i < testimonial.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-700 mb-1">{testimonial.comment}</p>
                      <p className="text-xs text-gray-500">{testimonial.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="mt-12 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8 text-center border border-orange-200">
            <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-4">
              Faça Parte da Nossa Comunidade
            </h2>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              Junte-se a nós e descubra o prazer de praticar esporte em grupo, conhecer pessoas e superar seus limites.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 text-sm">
                Participar do Grupo
              </Button>
              <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50 text-sm">
                Ver Todos os Eventos
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GrupoEsportivo;
