import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Calendar, MapPin, Users, Star } from 'lucide-react';

const EventsKanban = () => {
  const events = [
    {
      id: 1,
      title: 'Torneio de Futebol Society',
      date: '15 Ago 2024',
      time: '14:00',
      location: 'Arena São Paulo, Vila Madalena',
      participants: 24,
      maxParticipants: 32,
      price: 'R$ 25,00',
      image: '/lovable-uploads/e5644ad9-b874-4157-873e-40502cf056b0.png',
      sport: 'Futebol',
      comments: [
        {
          id: 1,
          user: 'Carlos Silva',
          avatar: 'CS',
          rating: 5,
          text: 'Evento incrível! Organização perfeita e nível técnico muito bom.'
        },
        {
          id: 2,
          user: 'Ana Costa',
          avatar: 'AC',
          rating: 4,
          text: 'Adorei participar! Ambiente muito acolhedor para todos os níveis.'
        }
      ]
    },
    {
      id: 2,
      title: 'CrossFit Open Challenge',
      date: '18 Ago 2024',
      time: '08:00',
      location: 'CrossFit Box, Pinheiros',
      participants: 18,
      maxParticipants: 20,
      price: 'R$ 40,00',
      image: '/lovable-uploads/72437099-6d2b-44fc-a4be-2de3feb06dbc.png',
      sport: 'CrossFit',
      comments: [
        {
          id: 1,
          user: 'Rafael Mendes',
          avatar: 'RM',
          rating: 5,
          text: 'WODs desafiadores e coaches excelentes! Superou expectativas.'
        }
      ]
    },
    {
      id: 3,
      title: 'Competição de Tiro com Arco',
      date: '22 Ago 2024',
      time: '09:00',
      location: 'Clube de Tiro, Morumbi',
      participants: 12,
      maxParticipants: 16,
      price: 'R$ 35,00',
      image: '/lovable-uploads/f837a4ce-7c6e-461f-ba63-edcf4bf741fc.png',
      sport: 'Tiro com Arco',
      comments: [
        {
          id: 1,
          user: 'Mariana Luz',
          avatar: 'ML',
          rating: 5,
          text: 'Primeira vez em uma competição e foi incrível! Muito bem organizado.'
        },
        {
          id: 2,
          user: 'João Pedro',
          avatar: 'JP',
          rating: 4,
          text: 'Bom nível técnico e ambiente respeitoso. Recomendo!'
        }
      ]
    },
    {
      id: 4,
      title: 'Escalada em Rocha Natural',
      date: '25 Ago 2024',
      time: '07:00',
      location: 'Pedra Grande, Atibaia',
      participants: 8,
      maxParticipants: 12,
      price: 'R$ 60,00',
      image: '/lovable-uploads/e86c5380-4c2d-4b0b-99e8-8b93aeca8636.png',
      sport: 'Escalada',
      comments: [
        {
          id: 1,
          user: 'Felipe Rocha',
          avatar: 'FR',
          rating: 5,
          text: 'Vista incrível e vias desafiadoras! Experiência única.'
        }
      ]
    },
    {
      id: 5,
      title: 'Corrida de Montanha 10K',
      date: '28 Ago 2024',
      time: '06:30',
      location: 'Parque Ibirapuera, São Paulo',
      participants: 45,
      maxParticipants: 60,
      price: 'R$ 30,00',
      image: '/lovable-uploads/5736d95e-4f42-43f5-8ef3-6377ff323c0b.png',
      sport: 'Corrida',
      comments: [
        {
          id: 1,
          user: 'Lucia Santos',
          avatar: 'LS',
          rating: 4,
          text: 'Percurso bem planejado e organização excelente!'
        },
        {
          id: 2,
          user: 'Eduardo Lima',
          avatar: 'EL',
          rating: 5,
          text: 'Minha primeira corrida de montanha. Amei a experiência!'
        }
      ]
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={12}
            className={`${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Eventos Esportivos por Perto
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Participe dos melhores eventos esportivos da sua região e conecte-se com outros atletas
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gray-200">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-orange-500 text-white">
                    {event.sport}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90">
                    {event.price}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{event.title}</CardTitle>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{event.date} às {event.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span className="truncate">{event.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>{event.participants}/{event.maxParticipants} participantes</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Comentários dos usuários */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-gray-900">
                    Comentários de participantes:
                  </h4>
                  
                  {event.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs bg-orange-100 text-orange-600">
                            {comment.avatar}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm text-gray-900">
                              {comment.user}
                            </span>
                            {renderStars(comment.rating)}
                          </div>
                          
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {comment.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button className="w-full mt-3 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    Participar do Evento
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsKanban;