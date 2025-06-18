
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Users, Calendar, Star, Edit2, Camera, Building } from 'lucide-react';
import Header from '../components/Header';
import SecondaryHeader from '../components/SecondaryHeader';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

const Estabelecimento = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // Dados fictícios para demonstração
  const establishmentData = {
    name: 'Academia Fitness Pro',
    corporateName: 'Fitness Pro Ltda',
    cnpj: '12.345.678/0001-90',
    description: 'Academia completa com equipamentos modernos, aulas em grupo e personal trainers qualificados.',
    address: 'Rua das Flores, 123 - Centro',
    city: 'São Paulo',
    state: 'SP',
    cep: '01234-567',
    phone: '(11) 99999-9999',
    email: 'contato@fitnessprosp.com',
    rating: 4.8,
    totalReviews: 127
  };

  const sports = [
    'Musculação', 'Crossfit', 'Pilates', 'Yoga', 'Spinning', 'Natação'
  ];

  const events = [
    { id: 1, name: 'Torneio de Crossfit', date: '2024-07-20', participants: 45 },
    { id: 2, name: 'Aula Especial de Yoga', date: '2024-07-25', participants: 20 },
    { id: 3, name: 'Competição de Natação', date: '2024-08-01', participants: 67 }
  ];

  const recentReviews = [
    { id: 1, user: 'João Silva', rating: 5, comment: 'Excelente academia! Equipamentos novos e instrutores atenciosos.', date: '2024-06-15' },
    { id: 2, user: 'Maria Santos', rating: 4, comment: 'Ambiente muito bom, mas poderia ter mais aulas em grupo.', date: '2024-06-10' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SecondaryHeader isVisible={true} />
      <Header isSecondaryVisible={true} />
      
      <main className="pt-[120px] px-4 md:px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Header do Estabelecimento */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                  <Building size={40} className="text-white" />
                </div>
                <button className="absolute -bottom-2 -right-2 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors">
                  <Camera size={16} />
                </button>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                      {establishmentData.name}
                    </h1>
                    <p className="text-gray-600 text-sm md:text-base mt-1">
                      {establishmentData.corporateName} • CNPJ: {establishmentData.cnpj}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-500 fill-current" />
                        <span className="font-medium">{establishmentData.rating}</span>
                      </div>
                      <span className="text-gray-500 text-sm">({establishmentData.totalReviews} avaliações)</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{establishmentData.address}, {establishmentData.city} - {establishmentData.state}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Phone size={14} />
                        <span>{establishmentData.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail size={14} />
                        <span>{establishmentData.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 flex items-center gap-2"
                  >
                    <Edit2 size={16} />
                    <span className="text-sm">Editar Informações</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Descrição */}
          <Card className="bg-white shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-lg bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                Sobre o Estabelecimento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                {establishmentData.description}
              </p>
            </CardContent>
          </Card>

          {/* Grid de Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Modalidades Oferecidas */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                  <Users size={20} />
                  Modalidades Oferecidas
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

            {/* Avaliações Recentes */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow lg:col-span-2 xl:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                  <Star size={20} />
                  Avaliações Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{review.user}</h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-700 mb-1">{review.comment}</p>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Estatísticas */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                  Estatísticas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avaliação Média</span>
                    <span className="font-bold text-lg text-orange-600">{establishmentData.rating}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total de Avaliações</span>
                    <span className="font-bold text-lg text-orange-600">{establishmentData.totalReviews}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Modalidades</span>
                    <span className="font-bold text-lg text-orange-600">{sports.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Eventos Programados</span>
                    <span className="font-bold text-lg text-orange-600">{events.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="mt-12 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8 text-center border border-orange-200">
            <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-4">
              Gerencie seu Estabelecimento
            </h2>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              Mantenha suas informações atualizadas, organize eventos e conecte-se com mais praticantes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-sm">
                Adicionar Evento
              </Button>
              <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50 text-sm">
                Ver Todas as Avaliações
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Estabelecimento;
