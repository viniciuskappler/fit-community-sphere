import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EstablishmentHeader from '@/components/establishment/EstablishmentHeader';
import EstablishmentPhotoGallery from '@/components/establishment/EstablishmentPhotoGallery';
import EstablishmentContactInfo from '@/components/establishment/EstablishmentContactInfo';
import EstablishmentMap from '@/components/establishment/EstablishmentMap';
import ReviewSystem from '@/components/ReviewSystem';
import { useEstablishmentProfile } from '@/hooks/useEstablishmentProfile';

const EstablishmentProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { establishment, loading, error } = useEstablishmentProfile(id || '');
  const [isFavorited, setIsFavorited] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error || !establishment) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-20">
          <Alert className="max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {error || 'Estabelecimento não encontrado'}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited);
    // TODO: Implement favorite logic with backend
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: establishment.nome,
        text: `Confira ${establishment.nome} no Núcleo do Esporte`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Transform establishment data to match component interfaces
  const mappedEstablishment = {
    establishment_name: establishment.nome,
    address: `${establishment.rua}, ${establishment.numero}`,
    city: establishment.cidade || '',
    state: establishment.estado || '',
    description: establishment.descricao || '',
    establishment_sports: establishment.modalidades ? establishment.modalidades.map(modal => ({ sport_name: modal })) : []
  };

  const mappedContactInfo = {
    phone: establishment.telefone || '',
    email: establishment.email || '',
    address: `${establishment.rua}, ${establishment.numero}`,
    city: establishment.cidade || '',
    state: establishment.estado || '',
    cep: establishment.cep || '',
    corporate_name: establishment.nome,
    created_at: establishment.criado_em || ''
  };

  const mappedMapData = {
    id: establishment.id,
    establishment_name: establishment.nome,
    latitude: establishment.latitude || 0,
    longitude: establishment.longitude || 0,
    city: establishment.cidade || '',
    state: establishment.estado || '',
    establishment_sports: establishment.modalidades ? establishment.modalidades.map(modal => ({ sport_name: modal })) : [],
    establishment_photos: [{ photo_url: establishment.imagem_url || '/placeholder.svg', is_main: true, caption: '' }]
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Navigation */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </div>

          {/* Header Section */}
          <EstablishmentHeader 
            establishment={mappedEstablishment}
            isFavorited={isFavorited}
            onToggleFavorite={handleToggleFavorite}
            onShare={handleShare}
          />

          {/* Photo Gallery */}
          <EstablishmentPhotoGallery 
            photos={[{ photo_url: establishment.imagem_url || '/placeholder.svg', is_main: true, caption: '' }]}
            establishmentName={establishment.nome}
          />

          {/* Contact and Map */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <EstablishmentContactInfo establishment={mappedContactInfo} />
            <EstablishmentMap establishment={mappedMapData} />
          </div>

          {/* Review System */}
          <ReviewSystem 
            establishmentId={establishment.id}
            reviews={[]}
            onReviewSubmitted={() => {}}
            averageRating={0}
            totalReviews={0}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EstablishmentProfile;
