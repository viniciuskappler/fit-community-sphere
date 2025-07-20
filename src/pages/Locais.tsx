
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, MapPin, Navigation } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useGeolocation } from '@/hooks/useGeolocation';
import Header from '@/components/Header';
import EstablishmentsList from '@/components/establishments/EstablishmentsList';
import EstablishmentsFilters from '@/components/establishments/EstablishmentsFilters';
import EstablishmentRegistrationModal from '@/components/EstablishmentRegistrationModal';
import MapLibre from '@/components/MapLibre';
import { EstablishmentWithDetails } from '@/hooks/useEstablishments';

// Mock data for establishments
const mockEstablishments: EstablishmentWithDetails[] = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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
    id: '4',
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
    id: '5',
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
  amenities: string[];
}

// Calculate distance between two coordinates in km
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return distance;
};

const Locais = () => {
  const { user } = useAuth();
  const { location, error: locationError, isLocating, requestPermission } = useGeolocation();
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [filteredEstablishments, setFilteredEstablishments] = useState(mockEstablishments);
  const [filters, setFilters] = useState<EstablishmentFilters>({
    name: '',
    city: '',
    type: '',
    sports: [],
    amenities: []
  });

  // Apply filters and location-based filtering
  useEffect(() => {
    let filtered = mockEstablishments;

    // Apply location filter first (50km radius)
    if (location) {
      filtered = filtered.filter(est => {
        const distance = calculateDistance(
          location.lat, 
          location.lng, 
          est.latitude, 
          est.longitude
        );
        return distance <= 50; // 50km radius
      });
    }

    // Apply other filters
    if (filters.name) {
      filtered = filtered.filter(est => 
        est.establishment_name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.city) {
      filtered = filtered.filter(est => est.city === filters.city);
    }

    if (filters.type) {
      filtered = filtered.filter(est => est.establishment_type === filters.type);
    }

    if (filters.sports.length > 0) {
      filtered = filtered.filter(est => 
        filters.sports.some(sport => est.sports.includes(sport))
      );
    }

    if (filters.amenities.length > 0) {
      filtered = filtered.filter(est => 
        filters.amenities.some(amenity => est.amenities.includes(amenity))
      );
    }

    setFilteredEstablishments(filtered);
  }, [filters, location]);

  const handleFilterChange = (newFilters: Partial<EstablishmentFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Calculate map center based on user location or default to São Paulo
  const mapCenter = location ? { lat: location.lat, lng: location.lng } : { lat: -23.5505, lng: -46.6333 };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Locais de Prática
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore estabelecimentos e espaços voltados ao esporte e bem-estar próximos de você
          </p>
        </div>

        {/* Location Status */}
        {isLocating && (
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <Navigation className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              Obtendo sua localização para mostrar estabelecimentos próximos...
            </AlertDescription>
          </Alert>
        )}

        {locationError && (
          <Alert className="mb-6 bg-yellow-50 border-yellow-200">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <div className="flex items-center justify-between">
                <span>{locationError}</span>
                <Button onClick={requestPermission} size="sm" variant="outline">
                  Tentar novamente
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {location && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <MapPin className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Mostrando estabelecimentos num raio de 50km da sua localização atual.
            </AlertDescription>
          </Alert>
        )}

        {/* Warning Banner */}
        <Alert className="mb-6 bg-yellow-50 border-yellow-200">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <strong>Atenção:</strong> os locais exibidos aqui são fictícios, inseridos como exemplo visual. 
            Você pode sugerir melhorias ou cadastrar um local real abaixo!
          </AlertDescription>
        </Alert>

        {/* Create Establishment Button */}
        {user && (
          <div className="mb-6 text-center">
            <Button
              onClick={() => setShowRegistrationModal(true)}
              className="bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Cadastrar Local
            </Button>
          </div>
        )}

        {/* Filters */}
        <EstablishmentsFilters
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Map - Featured prominently */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Mapa Interativo
          </h2>
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <MapLibre
              establishments={filteredEstablishments.map(est => ({
                id: est.id,
                establishment_name: est.establishment_name,
                latitude: est.latitude,
                longitude: est.longitude,
                city: est.city,
                state: est.state,
                sports: est.sports,
                photos: est.photos
              }))}
              center={mapCenter}
              zoom={location ? 12 : 11}
              height="600px"
            />
          </div>
        </div>

        {/* Establishments List */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Estabelecimentos ({filteredEstablishments.length})
            {location && <span className="text-sm font-normal text-gray-600 ml-2">(até 50km de distância)</span>}
          </h2>
          <EstablishmentsList establishments={filteredEstablishments} />
        </div>
      </div>

      {/* Registration Modal */}
      <EstablishmentRegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
      />
    </div>
  );
};

export default Locais;
