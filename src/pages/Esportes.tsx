
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SecondaryHeader from '../components/SecondaryHeader';
import Footer from '../components/Footer';
import { Input } from '../components/ui/input';
import { Search } from 'lucide-react';
import { sportsList } from '../utils/sportsData';

const Esportes = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const sportsWithIcons = sportsList.map(sport => ({
    name: sport,
    icon: getSportIcon(sport)
  }));

  const filteredSports = sportsWithIcons.filter(sport =>
    sport.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function getSportIcon(sport: string): string {
    const iconMap: { [key: string]: string } = {
      'Atletismo': '🏃‍♂️',
      'Badminton': '🏸',
      'Basquete': '🏀',
      'Beach Tennis': '🏐',
      'Boxe': '🥊',
      'Calistenia': '💪',
      'Canoagem': '🛶',
      'Capoeira': '🤸‍♂️',
      'Ciclismo': '🚴‍♂️',
      'Corrida de Rua': '🏃‍♀️',
      'Crossfit': '🏋️‍♀️',
      'Dança (Zumba, FitDance, etc.)': '💃',
      'Escalada': '🧗‍♂️',
      'Esgrima': '🤺',
      'Futebol': '⚽',
      'Futebol Americano': '🏈',
      'Futevôlei': '🏐',
      'Futsal': '⚽',
      'Ginástica Artística': '🤸‍♀️',
      'Ginástica Rítmica': '🎭',
      'Golf': '⛳',
      'Handebol': '🤾‍♂️',
      'Jiu-Jitsu': '🥋',
      'Judô': '🥋',
      'Karatê': '🥋',
      'MMA': '🥊',
      'Mountain Bike': '🚵‍♂️',
      'Muay Thai': '🥊',
      'Musculação': '💪',
      'Nado Sincronizado': '🏊‍♀️',
      'Natação': '🏊‍♀️',
      'Padel': '🎾',
      'Peteca': '🏸',
      'Pilates': '🧘‍♀️',
      'Polo Aquático': '🤽‍♂️',
      'Remo': '🚣‍♂️',
      'Rugby': '🏉',
      'Skate': '🛹',
      'Slackline': '🤸‍♂️',
      'Stand Up Paddle (SUP)': '🏄‍♂️',
      'Surfe': '🏄‍♂️',
      'Taekwondo': '🥋',
      'Tênis': '🎾',
      'Tênis de Mesa': '🏓',
      'Tiro com Arco': '🏹',
      'Ultimate Frisbee': '🥏',
      'Vôlei': '🏐',
      'Vôlei de Praia': '🏐',
      'Xadrez': '♟️',
      'Yoga': '🧘‍♀️'
    };
    
    return iconMap[sport] || '🏃‍♂️';
  }

  return (
    <div className="min-h-screen bg-white">
      <SecondaryHeader isVisible={true} />
      <Header isSecondaryVisible={true} />
      <main className="pt-[120px]">
        <div className="w-full md:w-11/12 lg:w-3/4 mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Modalidades <span className="text-orange-500">Esportivas</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Encontre a modalidade esportiva perfeita para você e conecte-se com estabelecimentos e grupos especializados.
            </p>
            
            {/* Barra de busca */}
            <div className="relative max-w-md mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Buscar modalidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-center"
              />
            </div>
          </div>

          {/* Grid de esportes */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredSports.map((sport, index) => (
              <Link
                key={index}
                to="/hub"
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group border border-gray-200"
              >
                <div className="p-6 text-center">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {sport.icon}
                  </div>
                  <h3 className="text-gray-900 font-semibold text-sm group-hover:text-orange-500 transition-colors">
                    {sport.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {filteredSports.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Nenhuma modalidade encontrada para "{searchTerm}"
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Esportes;
