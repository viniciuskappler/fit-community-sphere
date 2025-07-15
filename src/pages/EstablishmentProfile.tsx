
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import SecondaryHeader from '@/components/SecondaryHeader';
import Footer from '@/components/Footer';
import ReviewSystem from '@/components/ReviewSystem';
import SmartRecommendations from '@/components/SmartRecommendations';
import EstablishmentHeader from '@/components/establishment/EstablishmentHeader';
import EstablishmentPhotoGallery from '@/components/establishment/EstablishmentPhotoGallery';
import EstablishmentContactInfo from '@/components/establishment/EstablishmentContactInfo';
import EstablishmentMap from '@/components/establishment/EstablishmentMap';
import { useEstablishmentProfile } from '@/hooks/useEstablishmentProfile';
import { useAuth } from '@/contexts/AuthContext';

const EstablishmentProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const {
    establishment,
    loading,
    error,
    refetch
  } = useEstablishmentProfile(id);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SecondaryHeader isVisible={true} />
        <Header isSecondaryVisible={true} />
        <main className="pt-[120px] px-4 md:px-6 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-64 bg-gray-300 rounded-lg mb-6"></div>
              <div className="h-8 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!establishment) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SecondaryHeader isVisible={true} />
        <Header isSecondaryVisible={true} />
        <main className="pt-[120px] px-4 md:px-6 pb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Estabelecimento não encontrado
            </h1>
            <p className="text-gray-600">
              O estabelecimento que você procura não existe ou foi removido.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Mock data for reviews since reviews table doesn't exist
  const averageRating = 4.5;
  const mockReviews = [];

  return (
    <div className="min-h-screen bg-gray-50">
      <SecondaryHeader isVisible={true} />
      <Header isSecondaryVisible={true} />
      
      <main className="pt-[120px] px-4 md:px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <EstablishmentPhotoGallery
            photos={establishment.imagem_url ? [{ photo_url: establishment.imagem_url, is_main: true, caption: '' }] : []}
            establishmentName={establishment.nome}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <EstablishmentHeader
                establishment={{
                  ...establishment,
                  establishment_name: establishment.nome,
                  address: `${establishment.rua}, ${establishment.numero}, ${establishment.bairro}`,
                  city: establishment.cidade,
                  state: establishment.estado,
                  description: establishment.descricao,
                  establishment_sports: establishment.modalidades?.map(sport => ({ sport_name: sport })) || []
                }}
                isFavorited={false}
                onToggleFavorite={() => {}}
                onShare={() => {}}
              />

              <EstablishmentMap establishment={{
                ...establishment,
                establishment_name: establishment.nome,
                latitude: establishment.latitude,
                longitude: establishment.longitude,
                city: establishment.cidade,
                state: establishment.estado,
                establishment_sports: establishment.modalidades?.map(sport => ({ sport_name: sport })) || [],
                establishment_photos: establishment.imagem_url ? [{ photo_url: establishment.imagem_url, is_main: true, caption: '' }] : []
              }} />

              <ReviewSystem
                establishmentId={establishment.id}
                reviews={mockReviews}
                onReviewSubmitted={refetch}
                averageRating={averageRating}
                totalReviews={mockReviews.length}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <EstablishmentContactInfo establishment={{
                phone: establishment.telefone,
                email: establishment.email,
                address: `${establishment.rua}, ${establishment.numero}, ${establishment.bairro}`,
                city: establishment.cidade,
                state: establishment.estado,
                cep: establishment.cep,
                corporate_name: establishment.nome,
                created_at: establishment.criado_em
              }} />

              <SmartRecommendations
                userId={user?.id}
                currentItemId={establishment.id}
                currentItemType="establishment"
                userPreferences={establishment.modalidades || []}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EstablishmentProfile;
