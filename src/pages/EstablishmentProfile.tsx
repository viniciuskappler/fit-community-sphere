
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
    isFavorited,
    toggleFavorite,
    shareEstablishment,
    fetchEstablishment
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

  const averageRating = establishment.reviews.length > 0
    ? establishment.reviews.reduce((sum, review) => sum + review.rating, 0) / establishment.reviews.length
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <SecondaryHeader isVisible={true} />
      <Header isSecondaryVisible={true} />
      
      <main className="pt-[120px] px-4 md:px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <EstablishmentPhotoGallery
            photos={establishment.establishment_photos}
            establishmentName={establishment.establishment_name}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <EstablishmentHeader
                establishment={establishment}
                isFavorited={isFavorited}
                onToggleFavorite={toggleFavorite}
                onShare={shareEstablishment}
              />

              <EstablishmentMap establishment={establishment} />

              <ReviewSystem
                establishmentId={establishment.id}
                reviews={establishment.reviews}
                onReviewSubmitted={fetchEstablishment}
                averageRating={averageRating}
                totalReviews={establishment.reviews.length}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <EstablishmentContactInfo establishment={establishment} />

              <SmartRecommendations
                userId={user?.id}
                currentItemId={establishment.id}
                currentItemType="establishment"
                userPreferences={establishment.establishment_sports.map(s => s.sport_name)}
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
