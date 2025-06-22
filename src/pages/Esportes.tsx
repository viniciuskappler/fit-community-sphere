
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SecondaryHeader from '../components/SecondaryHeader';
import Footer from '../components/Footer';
import { Input } from '../components/ui/input';
import { Search } from 'lucide-react';
import { sportsList } from '../utils/sportsData';
import { supabase } from '@/integrations/supabase/client';

const Esportes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedSports, setSortedSports] = useState<Array<{name: string, count: number, icon: string}>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSportsStats = async () => {
      try {
        // Buscar estatísticas de esportes mais populares
        const { data: sportsData, error } = await supabase
          .from('user_sports')
          .select('sport_name, sport_type');

        if (error) {
          console.error('Erro ao buscar estatísticas dos esportes:', error);
          // Fallback para lista alfabética
          setSortedSports(sportsList.map(sport => ({
            name: sport,
            count: 0,
            icon: getSportIcon(sport)
          })));
        } else {
          // Contar ocorrências de cada esporte
          const sportCounts: { [key: string]: number } = {};
          
          sportsData.forEach(sport => {
            if (sportsList.includes(sport.sport_name)) {
              sportCounts[sport.sport_name] = (sportCounts[sport.sport_name] || 0) + 1;
            }
          });

          // Criar lista ordenada por popularidade
          const sportsWithStats = sportsList.map(sport => ({
            name: sport,
            count: sportCounts[sport] || 0,
            icon: getSportIcon(sport)
          }));

          // Ordenar por contagem (decrescente) e depois alfabeticamente
          sportsWithStats.sort((a, b) => {
            if (b.count !== a.count) {
              return b.count - a.count;
            }
            return a.name.localeCompare(b.name);
          });

          setSortedSports(sportsWithStats);
        }
      } catch (error) {
        console.error('Erro inesperado:', error);
        setSortedSports(sportsList.map(sport => ({
          name: sport,
          count: 0,
          icon: getSportIcon(sport)
        })));
      } finally {
        setLoading(false);
      }
    };

    fetchSportsStats();
  }, []);

  const filteredSports = sortedSports.filter(sport =>
    sport.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function getSportIcon(sport: string): string {
    const iconMap: { [key: string]: string } = {
      'Agilidade canina (Dog agility)': '🐕',
      'Artistic cycling': '🚴‍♀️',
      'Asa-delta': '🪂',
      'Atletismo': '🏃‍♂️',
      'Automobilismo': '🏎️',
      'Badminton': '🏸',
      'Bandy': '🏒',
      'Barco-dragão': '🚣‍♂️',
      'Base jump': '🪂',
      'Basquetebol': '🏀',
      'Beach Tennis': '🏐',
      'Beisebol': '⚾',
      'Biathlon': '🎿',
      'Bike Trial': '🚵‍♂️',
      'BMX Freestyle': '🚴‍♂️',
      'BMX Racing': '🚴‍♂️',
      'Bobsled': '🛷',
      'Bocha': '🎯',
      'Bodyboard': '🏄‍♂️',
      'Boliche': '🎳',
      'Boulder': '🧗‍♂️',
      'Boxe': '🥊',
      'Caiaque polo': '🛶',
      'Canoagem oceânica': '🛶',
      'Canoagem slalom': '🛶',
      'Canoagem velocidade': '🛶',
      'Capoeira': '🤸‍♂️',
      'Carom billiards': '🎱',
      'Cheerleading': '📣',
      'Ciclismo de estrada': '🚴‍♂️',
      'Ciclismo de pista': '🚴‍♂️',
      'Combinado nórdico': '⛷️',
      'Corrida de aventura': '🏃‍♂️',
      'Corr... camelos': '🐪',
      'Corrida de cavalos': '🏇',
      'Corrida de montanha / Trail running': '🏃‍♀️',
      'Corrida de obstáculos (OCR)': '🏃‍♂️',
      'Corrida de rua': '🏃‍♀️',
      'Críquete': '🏏',
      'Croquet': '🔨',
      'Cross-country running': '🏃‍♂️',
      'CrossFit': '🏋️‍♀️',
      'Curling': '🥌',
      'Cycle-ball': '🚴‍♂️',
      'Cyclo-cross': '🚵‍♂️',
      'Dardos': '🎯',
      'Disc golf': '🥏',
      'Dodgeball': '⚽',
      'Drone racing': '🚁',
      'Duatlo': '🏃‍♂️',
      'Enduro off-road (moto)': '🏍️',
      'Escalada esportiva': '🧗‍♂️',
      'Escalada no gelo': '🧗‍♂️',
      'Esgrima': '🤺',
      'Esqui alpino': '⛷️',
      'Esqui aquático': '🎿',
      'Esqui cross-country': '⛷️',
      'Esqui freestyle': '⛷️',
      'Falcoaria competitiva': '🦅',
      'Fisiculturismo (Bodybuilding)': '💪',
      'Floorball': '🏒',
      'Futebol': '⚽',
      'Futebol americano': '🏈',
      'Futebol australiano': '🏈',
      'Futebol gaélico': '⚽',
      'Futsal': '⚽',
      'Ginástica acrobática': '🤸‍♀️',
      'Ginástica artística': '🤸‍♀️',
      'Ginástica de trampolim': '🤸‍♂️',
      'Ginástica rítmica': '🎭',
      'Golfe': '⛳',
      'Halterofilismo (Weightlifting)': '🏋️‍♂️',
      'Handebol': '🤾‍♂️',
      'Hipismo (Saltos, Adestramento, CCE)': '🏇',
      'Hóquei em campo': '🏑',
      'Hóquei em patins': '🏒',
      'Hóquei no gelo': '🏒',
      'Jiu-Jitsu Brasileiro': '🥋',
      'Judô': '🥋',
      'Kabaddi': '🤼‍♂️',
      'Karate': '🥋',
      'Kart': '🏎️',
      'Kendo': '🥋',
      'Kickboxing': '🥊',
      'Kitesurfe': '🪁',
      'Korfball': '🏀',
      'Lacrosse': '🥍',
      'Luge': '🛷',
      'Marcha atlética': '🚶‍♂️',
      'Mergulho livre (Freediving)': '🤿',
      'MMA (Artes Marciais Mistas)': '🥊',
      'Montanhismo / Alpinismo': '🏔️',
      'Motociclismo (velocidade)': '🏍️',
      'Motocross': '🏍️',
      'Mountain bike': '🚵‍♂️',
      'Muay Thai': '🥊',
      'Mushing (trenó com cães)': '🛷',
      'Nado artístico': '🏊‍♀️',
      'Natação (piscina)': '🏊‍♀️',
      'Natação em águas abertas': '🏊‍♂️',
      'Netball': '🏐',
      'Padel': '🎾',
      'Parapente': '🪂',
      'Paraquedismo': '🪂',
      'Parkour': '🤸‍♂️',
      'Patinação artística': '⛸️',
      'Patinação de velocidade': '⛸️',
      'Patinação de velocidade curta': '⛸️',
      'Pickleball': '🏓',
      'Platform tennis': '🎾',
      'Poker esportivo': '🃏',
      'Polo': '🏇',
      'Polo aquático': '🤽‍♂️',
      'Powerboat racing': '🚤',
      'Powerlifting': '🏋️‍♂️',
      'Racquetball': '🎾',
      'Rali': '🏎️',
      'Remo': '🚣‍♂️',
      'Rodeio / Montaria em touro': '🤠',
      'Rugby League': '🏉',
      'Rugby Union': '🏉',
      'Salto de esqui': '⛷️',
      'Saltos ornamentais': '🏊‍♂️',
      'Sambo': '🤼‍♂️',
      'Savate': '🥊',
      'Sepak Takraw': '🏐',
      'Sinuca / Bilhar': '🎱',
      'Skeleton': '🛷',
      'Slackline / Highline': '🤸‍♂️',
      'Snooker': '🎱',
      'Snowboard': '🏂',
      'Softbol': '⚾',
      'Speedway (moto em pista oval)': '🏍️',
      'Squash': '🎾',
      'Stand Up Paddle (SUP)': '🏄‍♂️',
      'Strongman': '💪',
      'Sumô': '🤼‍♂️',
      'Surfe': '🏄‍♂️',
      'Taekwondo': '🥋',
      'Tênis': '🎾',
      'Tênis de mesa': '🏓',
      'Teqball': '⚽',
      'Tiro com arco': '🏹',
      'Tiro esportivo': '🎯',
      'Triatlo': '🏊‍♂️',
      'Vela': '⛵',
      'Vôlei de praia': '🏐',
      'Voleibol': '🏐',
      'Wakeboard': '🏄‍♂️',
      'Windsurfe': '🏄‍♂️',
      'Wingsuit flying': '🪂',
      'Wrestling': '🤼‍♂️',
      'Xadrez': '♟️'
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
            
            {!loading && (
              <p className="text-sm text-gray-500 mb-4">
                Esportes ordenados por popularidade entre nossos usuários
              </p>
            )}
          </div>

          {/* Grid de esportes */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {Array.from({ length: 20 }).map((_, index) => (
                <div key={index} className="bg-gray-200 rounded-xl h-24 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredSports.map((sport, index) => (
                <Link
                  key={index}
                  to="/hub"
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group border border-gray-200 relative"
                >
                  <div className="p-6 text-center">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                      {sport.icon}
                    </div>
                    <h3 className="text-gray-900 font-semibold text-sm group-hover:text-orange-500 transition-colors">
                      {sport.name}
                    </h3>
                    {sport.count > 0 && (
                      <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                        {sport.count}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && filteredSports.length === 0 && (
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
