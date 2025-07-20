import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, MapPin, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useEstablishments } from '@/hooks/useEstablishments';
import Header from '@/components/Header';
import SecondaryHeader from '@/components/SecondaryHeader';
import Footer from '@/components/Footer';
import EstablishmentsList from '@/components/establishments/EstablishmentsList';
import EstablishmentsFilters from '@/components/establishments/EstablishmentsFilters';
import EstablishmentRegistrationModal from '@/components/EstablishmentRegistrationModal';
import { EstablishmentWithDetails } from '@/hooks/useEstablishments';

// Mock data for demonstration purposes
const mockEstablishments: EstablishmentWithDetails[] = [
  {
    id: 'mock-1',
    nome: 'Academia FitMax Elite',
    establishment_name: 'Academia FitMax Elite',
    establishment_type: 'Academia',
    city: 'São Paulo',
    state: 'SP',
    neighborhood: 'Vila Madalena',
    street: 'Rua Harmonia',
    number: '456',
    cep: '05435-000',
    latitude: -23.5505,
    longitude: -46.6833,
    sports: ['Musculação', 'Pilates', 'CrossFit'],
    amenities: ['Estacionamento', 'Vestiário', 'Ar condicionado', 'Personal trainer'],
    operating_hours: '06h às 22h',
    instagram_url: 'https://instagram.com/fitmaxelite',
    website_url: 'https://fitmaxelite.com.br',
    phone: '(11) 3456-7890',
    description: 'Academia moderna com equipamentos de última geração e personal trainers qualificados.',
    photos: [
      { photo_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80', is_main: true }
    ],
    averageRating: 4.8,
    reviewCount: 156
  },
  {
    id: 'mock-2',
    nome: 'CrossFit Box São Paulo',
    establishment_name: 'CrossFit Box São Paulo',
    establishment_type: 'Box CrossFit',
    city: 'São Paulo',
    state: 'SP',
    neighborhood: 'Itaim Bibi',
    street: 'Av. Faria Lima',
    number: '2500',
    cep: '04538-132',
    latitude: -23.5870,
    longitude: -46.6814,
    sports: ['CrossFit', 'Weightlifting', 'Ginástica'],
    amenities: ['Estacionamento', 'Vestiário', 'Equipamentos CrossFit', 'Área externa'],
    operating_hours: '05h às 21h',
    instagram_url: 'https://instagram.com/crossfitboxsp',
    website_url: null,
    phone: '(11) 9876-5432',
    description: 'Box de CrossFit com metodologia completa e comunidade acolhedora.',
    photos: [
      { photo_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80', is_main: true }
    ],
    averageRating: 4.9,
    reviewCount: 89
  },
  {
    id: 'mock-3',
    nome: 'Aqua Center Natação',
    establishment_name: 'Aqua Center Natação',
    establishment_type: 'Centro Aquático',
    city: 'São Paulo',
    state: 'SP',
    neighborhood: 'Moema',
    street: 'Rua das Piscinas',
    number: '789',
    cep: '04077-000',
    latitude: -23.6081,
    longitude: -46.6570,
    sports: ['Natação', 'Hidroginástica', 'Aqua Fitness'],
    amenities: ['Piscina aquecida', 'Vestiário', 'Estacionamento', 'Sauna'],
    operating_hours: '06h às 20h',
    instagram_url: 'https://instagram.com/aquacentersp',
    website_url: 'https://aquacenter.com.br',
    phone: '(11) 1234-5678',
    description: 'Centro aquático completo com piscinas aquecidas e instrutores especializados.',
    photos: [
      { photo_url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80', is_main: true }
    ],
    averageRating: 4.7,
    reviewCount: 203
  },
  {
    id: 'mock-4',
    nome: 'Estúdio Yoga Zen',
    establishment_name: 'Estúdio Yoga Zen',
    establishment_type: 'Estúdio',
    city: 'Rio de Janeiro',
    state: 'RJ',
    neighborhood: 'Copacabana',
    street: 'Rua Barata Ribeiro',
    number: '123',
    cep: '22040-000',
    latitude: -22.9668,
    longitude: -43.1822,
    sports: ['Yoga', 'Meditação', 'Pilates'],
    amenities: ['Sala climatizada', 'Vestiário', 'Tapetes inclusos', 'Área de relaxamento'],
    operating_hours: '07h às 21h',
    instagram_url: 'https://instagram.com/yogazenrj',
    website_url: null,
    phone: '(21) 3456-7890',
    description: 'Estúdio aconchegante para práticas contemplativas e fortalecimento.',
    photos: [
      { photo_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80', is_main: true }
    ],
    averageRating: 4.6,
    reviewCount: 78
  },
  {
    id: 'mock-5',
    nome: 'Arena Vôlei Beach',
    establishment_name: 'Arena Vôlei Beach',
    establishment_type: 'Arena',
    city: 'Rio de Janeiro',
    state: 'RJ',
    neighborhood: 'Barra da Tijuca',
    street: 'Av. das Américas',
    number: '4000',
    cep: '22640-102',
    latitude: -23.0205,
    longitude: -43.3137,
    sports: ['Vôlei de Praia', 'Beach Tennis', 'Futevôlei'],
    amenities: ['Quadras de areia', 'Vestiário', 'Lanchonete', 'Aluguel de equipamentos'],
    operating_hours: '08h às 22h',
    instagram_url: 'https://instagram.com/arenavoleibeach',
    website_url: 'https://arenavoleibeach.com',
    phone: '(21) 9876-5432',
    description: 'Arena com quadras de areia profissionais para esportes de praia.',
    photos: [
      { photo_url: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=800&q=80', is_main: true }
    ],
    averageRating: 4.5,
    reviewCount: 134
  }
];

interface EstablishmentFilters {
  name: string;
  city: string;
  type: string;
  sports: string[];
}

const Locais = () => {
  const { user } = useAuth();
  const { establishments: realEstablishments, loading } = useEstablishments();
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [filteredMockEstablishments, setFilteredMockEstablishments] = useState(mockEstablishments);
  const [filteredRealEstablishments, setFilteredRealEstablishments] = useState(realEstablishments);
  const [filters, setFilters] = useState<EstablishmentFilters>({
    name: '',
    city: '',
    type: '',
    sports: []
  });

  // Apply filters to both mock and real establishments
  useEffect(() => {
    const applyFilters = (establishments: EstablishmentWithDetails[]) => {
      return establishments.filter(est => {
        // Name filter
        if (filters.name) {
          const matchesName = est.establishment_name.toLowerCase().includes(filters.name.toLowerCase());
          if (!matchesName) return false;
        }

        // City filter
        if (filters.city) {
          if (est.city !== filters.city) return false;
        }

        // Type filter
        if (filters.type) {
          if (est.establishment_type !== filters.type) return false;
        }

        // Sports filter
        if (filters.sports.length > 0) {
          const hasSport = filters.sports.some(sport => 
            est.sports.some(estSport => estSport.toLowerCase().includes(sport.toLowerCase()))
          );
          if (!hasSport) return false;
        }

        return true;
      });
    };

    setFilteredMockEstablishments(applyFilters(mockEstablishments));
    setFilteredRealEstablishments(applyFilters(realEstablishments));
  }, [filters, realEstablishments]);

  const handleFilterChange = (newFilters: Partial<EstablishmentFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SecondaryHeader isVisible={true} />
      <Header />
      
      <div className="container mx-auto px-4 py-8 pt-[140px]">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Locais de Prática
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore estabelecimentos e espaços voltados ao esporte e bem-estar
          </p>
        </div>

        {/* Create Establishment Button - Only for logged in users */}
        {user && (
          <div className="mb-6 text-center">
            <Button
              onClick={() => setShowRegistrationModal(true)}
              className="bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Cadastrar Local
            </Button>
          </div>
        )}

        {/* Filters */}
        <EstablishmentsFilters
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Mock Establishments Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Locais para Teste ({filteredMockEstablishments.length})
            </h2>
          </div>
          
          <Alert className="mb-6 bg-yellow-50 border-yellow-200">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <strong>⚠️ Atenção:</strong> Os locais abaixo são fictícios, inseridos apenas para demonstração visual da plataforma.
            </AlertDescription>
          </Alert>

          <EstablishmentsList establishments={filteredMockEstablishments} showMockWarning={true} />
        </div>

        {/* Real Establishments Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Locais Cadastrados ({filteredRealEstablishments.length})
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
          ) : filteredRealEstablishments.length > 0 ? (
            <EstablishmentsList establishments={filteredRealEstablishments} showMockWarning={false} />
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum local encontrado
              </h3>
              <p className="text-gray-500 mb-4">
                {filters.name || filters.city || filters.type || filters.sports.length > 0
                  ? 'Tente ajustar os filtros para encontrar mais locais.'
                  : 'Seja o primeiro a cadastrar um local na sua região!'
                }
              </p>
              {user && (
                <Button
                  onClick={() => setShowRegistrationModal(true)}
                  variant="outline"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Cadastrar Primeiro Local
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
      
      {/* Registration Modal */}
      <EstablishmentRegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
      />
    </div>
  );
};

export default Locais;
