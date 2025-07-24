import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, MapPin, Users, Award, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useEstablishments } from '@/hooks/useEstablishments';
import Header from '@/components/Header';
import SecondaryHeader from '@/components/SecondaryHeader';
import Footer from '@/components/Footer';
import EstablishmentsList from '@/components/establishments/EstablishmentsList';
import EstablishmentsFilters from '@/components/establishments/EstablishmentsFilters';
import EstablishmentRegistrationModal from '@/components/EstablishmentRegistrationModal';
import GroupsList from '@/components/groups/GroupsList';
import GroupRegistrationModal from '@/components/GroupRegistrationModal';
import ProfessionalsFilters from '@/components/professionals/ProfessionalsFilters';
import ProfessionalsList from '@/components/professionals/ProfessionalsList';
import ProfessionalRegistrationModal from '@/components/professionals/ProfessionalRegistrationModal';
import { EstablishmentWithDetails } from '@/hooks/useEstablishments';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

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
  }
];

interface EstablishmentFilters {
  name: string;
  city: string;
  type: string;
  sports: string[];
  amenities: string[];
}

const Hub = () => {
  const { user } = useAuth();
  const { establishments: realEstablishments, loading: establishmentsLoading } = useEstablishments();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('locais');

  // Handle deep linking
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['locais', 'grupos', 'profissionais', 'eventos'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);
  
  // Establishments state
  const [showEstablishmentModal, setShowEstablishmentModal] = useState(false);
  const [establishmentFilters, setEstablishmentFilters] = useState<EstablishmentFilters>({
    name: '',
    city: '',
    type: '',
    sports: [],
    amenities: []
  });
  
  // Groups state
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupSearchTerm, setGroupSearchTerm] = useState('');
  const [selectedGroupCity, setSelectedGroupCity] = useState('');
  const [selectedGroupSport, setSelectedGroupSport] = useState('');
  
  // Professionals state
  const [showProfessionalModal, setShowProfessionalModal] = useState(false);
  const [professionalFilters, setProfessionalFilters] = useState({
    cidade: '',
    especialidade: '',
    modalidade: ''
  });

  const handleEstablishmentFilterChange = (newFilters: Partial<EstablishmentFilters>) => {
    setEstablishmentFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleProfessionalFiltersChange = (newFilters: typeof professionalFilters) => {
    setProfessionalFilters(newFilters);
  };

  // Filter establishments
  const filteredMockEstablishments = mockEstablishments.filter(est => {
    if (establishmentFilters.name) {
      const matchesName = est.establishment_name.toLowerCase().includes(establishmentFilters.name.toLowerCase());
      if (!matchesName) return false;
    }
    if (establishmentFilters.city) {
      if (est.city !== establishmentFilters.city) return false;
    }
    if (establishmentFilters.type) {
      if (est.establishment_type !== establishmentFilters.type) return false;
    }
    if (establishmentFilters.sports.length > 0) {
      const hasSport = establishmentFilters.sports.some(sport => 
        est.sports.some(estSport => estSport.toLowerCase().includes(sport.toLowerCase()))
      );
      if (!hasSport) return false;
    }
    if (establishmentFilters.amenities.length > 0) {
      const hasAmenity = establishmentFilters.amenities.some(amenity => 
        est.amenities.some(estAmenity => estAmenity.toLowerCase().includes(amenity.toLowerCase()))
      );
      if (!hasAmenity) return false;
    }
    return true;
  });

  const filteredRealEstablishments = realEstablishments.filter(est => {
    if (establishmentFilters.name) {
      const matchesName = est.establishment_name.toLowerCase().includes(establishmentFilters.name.toLowerCase());
      if (!matchesName) return false;
    }
    if (establishmentFilters.city) {
      if (est.city !== establishmentFilters.city) return false;
    }
    if (establishmentFilters.type) {
      if (est.establishment_type !== establishmentFilters.type) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <SecondaryHeader isVisible={true} />
      <Header />
      
      <main className="pt-[120px] px-4 md:px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Hub do Esporte
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Descubra o mundo dos esportes: locais, grupos, profissionais e eventos em um só lugar. 
              Sua central completa para encontrar tudo relacionado ao esporte em qualquer lugar do mundo.
            </p>
          </div>

          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="locais" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Locais</span>
              </TabsTrigger>
              <TabsTrigger value="grupos" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Grupos</span>
              </TabsTrigger>
              <TabsTrigger value="profissionais" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span className="hidden sm:inline">Profissionais</span>
              </TabsTrigger>
              <TabsTrigger value="eventos" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Eventos</span>
              </TabsTrigger>
            </TabsList>

            {/* Locais Tab */}
            <TabsContent value="locais" className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  Locais de Prática
                </h2>
                <p className="text-muted-foreground mb-6">
                  Explore estabelecimentos e espaços voltados ao esporte e bem-estar
                </p>
                
                {user && (
                  <Button
                    onClick={() => setShowEstablishmentModal(true)}
                    className="mb-6"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Cadastrar Local
                  </Button>
                )}
              </div>

              <EstablishmentsFilters
                filters={establishmentFilters}
                onFilterChange={handleEstablishmentFilterChange}
              />

              {/* Mock Establishments */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-foreground">
                    Locais para Teste ({filteredMockEstablishments.length})
                  </h3>
                </div>
                
                <Alert className="mb-6 bg-yellow-50 border-yellow-200">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    <strong>⚠️ Atenção:</strong> Os locais abaixo são fictícios, inseridos apenas para demonstração visual da plataforma.
                  </AlertDescription>
                </Alert>

                <EstablishmentsList establishments={filteredMockEstablishments} showMockWarning={true} />
              </div>

              {/* Real Establishments */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-foreground">
                    Locais Cadastrados ({filteredRealEstablishments.length})
                  </h3>
                </div>

                {establishmentsLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : filteredRealEstablishments.length > 0 ? (
                  <EstablishmentsList establishments={filteredRealEstablishments} showMockWarning={false} />
                ) : (
                  <div className="text-center py-12 bg-card rounded-lg shadow-sm">
                    <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      Nenhum local encontrado
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Seja o primeiro a cadastrar um local na sua região!
                    </p>
                    {user && (
                      <Button
                        onClick={() => setShowEstablishmentModal(true)}
                        variant="outline"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Cadastrar Primeiro Local
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Grupos Tab */}
            <TabsContent value="grupos" className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  Grupos Esportivos
                </h2>
                <p className="text-muted-foreground mb-6">
                  Conecte-se com outros praticantes e encontre grupos para praticar seu esporte favorito
                </p>
                
                {user && (
                  <Button
                    onClick={() => setShowGroupModal(true)}
                    className="mb-6"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Grupo Esportivo
                  </Button>
                )}
              </div>

              <GroupsList 
                searchTerm={groupSearchTerm}
                selectedCity={selectedGroupCity}
                selectedSport={selectedGroupSport}
              />
            </TabsContent>

            {/* Profissionais Tab */}
            <TabsContent value="profissionais" className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  Profissionais do Esporte
                </h2>
                <p className="text-muted-foreground mb-6">
                  Encontre personal trainers, preparadores físicos e outros profissionais da área esportiva
                </p>
                
                {user && (
                  <Button
                    onClick={() => setShowProfessionalModal(true)}
                    className="mb-6"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Cadastrar como Profissional
                  </Button>
                )}
              </div>

              <ProfessionalsFilters 
                filters={professionalFilters} 
                onFiltersChange={handleProfessionalFiltersChange} 
              />
              <ProfessionalsList filters={professionalFilters} />
            </TabsContent>

            {/* Eventos Tab */}
            <TabsContent value="eventos" className="space-y-6">
              <div className="text-center py-12">
                <Calendar className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  Eventos Esportivos
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Esta seção estará disponível em breve. Aqui você encontrará eventos, competições e campeonatos esportivos.
                </p>
                <Button variant="outline" disabled>
                  <Plus className="w-4 h-4 mr-2" />
                  Em Breve
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />

      {/* Modals */}
      <EstablishmentRegistrationModal
        isOpen={showEstablishmentModal}
        onClose={() => setShowEstablishmentModal(false)}
      />
      
      <GroupRegistrationModal
        isOpen={showGroupModal}
        onClose={() => setShowGroupModal(false)}
      />
      
      <ProfessionalRegistrationModal
        isOpen={showProfessionalModal}
        onClose={() => setShowProfessionalModal(false)}
      />
    </div>
  );
};

export default Hub;