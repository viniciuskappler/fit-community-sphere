
import React, { useState } from 'react';
import { User, Heart, Users, Calendar, MapPin, Phone, Mail, Edit2, Camera } from 'lucide-react';
import Header from '../components/Header';
import SecondaryHeader from '../components/SecondaryHeader';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useUserData } from '@/hooks/useUserData';

const Praticante = () => {
  const { user } = useAuth();
  const { profile, sports, loading } = useUserData();
  const [isEditing, setIsEditing] = useState(false);

  // Dados fictícios para demonstração
  const mockEstablishments = [
    { id: 1, name: 'Academia Fitness Pro', sport: 'Musculação', city: 'São Paulo' },
    { id: 2, name: 'Quadra Esportiva Central', sport: 'Futebol', city: 'São Paulo' }
  ];

  const mockGroups = [
    { id: 1, name: 'Corrida Matinal SP', sport: 'Corrida', members: 45 },
    { id: 2, name: 'Vôlei de Praia Itanhaém', sport: 'Vôlei', members: 23 }
  ];

  const mockEvents = [
    { id: 1, name: 'Torneio de Futebol Amador', date: '2024-07-15', location: 'Campo do Pacaembu' },
    { id: 2, name: 'Corrida 10K Ibirapuera', date: '2024-07-22', location: 'Parque do Ibirapuera' }
  ];

  const favoriteStateSports = sports.filter(s => s.sport_type === 'favorite');
  const practicedSports = sports.filter(s => s.sport_type === 'practiced');
  const interestedSports = sports.filter(s => s.sport_type === 'interested');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SecondaryHeader isVisible={true} />
        <Header isSecondaryVisible={true} />
        <main className="pt-[120px] px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Carregando seus dados...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SecondaryHeader isVisible={true} />
      <Header isSecondaryVisible={true} />
      
      <main className="pt-[120px] px-4 md:px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Header do Perfil */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                  <User size={40} className="text-white" />
                </div>
                <button className="absolute -bottom-2 -right-2 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors">
                  <Camera size={16} />
                </button>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                      {profile?.full_name || user?.user_metadata?.full_name || 'Atleta'}
                    </h1>
                    <p className="text-gray-600 text-sm md:text-base mt-1">
                      Praticante de Esportes • Cadastro #{user?.id?.slice(-6).toUpperCase()}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                      {profile?.city && (
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          <span>{profile.city}</span>
                        </div>
                      )}
                      {profile?.phone && (
                        <div className="flex items-center gap-1">
                          <Phone size={14} />
                          <span>{profile.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Mail size={14} />
                        <span>{user?.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 flex items-center gap-2"
                  >
                    <Edit2 size={16} />
                    <span className="text-sm">Editar Perfil</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Esportes Favoritos */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                  <Heart size={20} />
                  Esportes Favoritos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {favoriteStateSports.length > 0 ? (
                    favoriteStateSports.map((sport) => (
                      <Badge key={sport.sport_name} variant="secondary" className="bg-red-100 text-red-700 border-red-200">
                        {sport.sport_name}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">Nenhum esporte favorito cadastrado</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Esportes Praticados */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                  <User size={20} />
                  Esportes Praticados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {practicedSports.length > 0 ? (
                    practicedSports.map((sport) => (
                      <Badge key={sport.sport_name} variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                        {sport.sport_name}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">Nenhum esporte praticado cadastrado</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Esportes de Interesse */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                  <Calendar size={20} />
                  Interesses Esportivos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {interestedSports.length > 0 ? (
                    interestedSports.map((sport) => (
                      <Badge key={sport.sport_name} variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                        {sport.sport_name}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">Nenhum interesse esportivo cadastrado</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Estabelecimentos Seguidos */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow lg:col-span-2 xl:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                  <MapPin size={20} />
                  Estabelecimentos Seguidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockEstablishments.map((establishment) => (
                    <div key={establishment.id} className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-sm">{establishment.name}</h4>
                      <p className="text-xs text-gray-600">{establishment.sport} • {establishment.city}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Grupos Participantes */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow lg:col-span-2 xl:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                  <Users size={20} />
                  Grupos Esportivos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockGroups.map((group) => (
                    <div key={group.id} className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-sm">{group.name}</h4>
                      <p className="text-xs text-gray-600">{group.sport} • {group.members} membros</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Eventos de Interesse */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow lg:col-span-2 xl:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                  <Calendar size={20} />
                  Próximos Eventos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockEvents.map((event) => (
                    <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-sm">{event.name}</h4>
                      <p className="text-xs text-gray-600">{event.date} • {event.location}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="mt-12 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8 text-center border border-orange-200">
            <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-4">
              Continue Expandindo sua Rede Esportiva
            </h2>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              Descubra novos estabelecimentos, participe de grupos e eventos esportivos em sua região.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-sm">
                Explorar Estabelecimentos
              </Button>
              <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50 text-sm">
                Encontrar Grupos
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Praticante;
