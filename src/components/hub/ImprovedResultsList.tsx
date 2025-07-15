
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Star, Clock, Phone, Heart, Share2, Eye, Users, Building2 } from 'lucide-react';
import { EstablishmentWithDetails } from '@/hooks/useEstablishments';
import { SportsGroupWithDetails } from '@/hooks/useSportsGroups';
import RatingStars from '@/components/RatingStars';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface ImprovedResultsListProps {
  establishments: EstablishmentWithDetails[];
  groups: SportsGroupWithDetails[];
  sortBy: string;
  onSortChange: (value: string) => void;
  userLocation?: { lat: number; lng: number };
}

const ImprovedResultsList: React.FC<ImprovedResultsListProps> = ({
  establishments,
  groups,
  sortBy,
  onSortChange,
  userLocation
}) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const toggleFavorite = async (id: string, type: 'establishment' | 'group') => {
    if (!user) {
      toast({
        title: 'Login necessário',
        description: 'Faça login para favoritar',
        variant: 'destructive',
      });
      return;
    }

    try {
      const isFavorited = favoriteIds.has(id);
      
      if (isFavorited) {
        // Remover favorito - funcionalidade desabilitada temporariamente
        // await supabase
        //   .from('user_favorites')
        //   .delete()
        //   .eq('user_id', user.id)
        //   .eq(type === 'establishment' ? 'establishment_id' : 'group_id', id);
        
        setFavoriteIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
        
        toast({
          title: 'Removido dos favoritos',
          description: 'Item removido dos seus favoritos',
        });
      } else {
        // Adicionar favorito - funcionalidade desabilitada temporariamente
        // await supabase
        //   .from('user_favorites')
        //   .insert({
        //     user_id: user.id,
        //     [type === 'establishment' ? 'establishment_id' : 'group_id']: id,
        //   });
        
        setFavoriteIds(prev => new Set([...prev, id]));
        
        toast({
          title: 'Adicionado aos favoritos',
          description: 'Item adicionado aos seus favoritos',
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar favoritos',
        variant: 'destructive',
      });
    }
  };

  const shareItem = async (item: any, type: 'establishment' | 'group') => {
    const url = `${window.location.origin}/${type === 'establishment' ? 'estabelecimento' : 'grupo-esportivo'}/${item.id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: type === 'establishment' ? item.establishment_name : item.group_name,
          text: `Confira este ${type === 'establishment' ? 'estabelecimento' : 'grupo'} no Núcleo do Esporte`,
          url: url,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: 'Link copiado',
        description: 'Link copiado para a área de transferência',
      });
    }
  };

  const renderEstablishmentCard = (establishment: EstablishmentWithDetails) => {
    const distance = userLocation && establishment.latitude && establishment.longitude
      ? calculateDistance(userLocation.lat, userLocation.lng, establishment.latitude, establishment.longitude)
      : null;

    const mainPhoto = establishment.photos.find(p => p.is_main)?.photo_url || establishment.photos[0]?.photo_url;

    return (
      <Card key={establishment.id} className="hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Imagem */}
            <div className="w-full md:w-48 h-48 md:h-auto relative">
              {mainPhoto ? (
                <img
                  src={mainPhoto}
                  alt={establishment.establishment_name}
                  className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-t-none">
                  <Building2 className="w-12 h-12 text-white" />
                </div>
              )}
              
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/80 hover:bg-white"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(establishment.id, 'establishment');
                  }}
                >
                  <Heart 
                    className={`w-4 h-4 ${favoriteIds.has(establishment.id) ? 'fill-red-500 text-red-500' : ''}`} 
                  />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/80 hover:bg-white"
                  onClick={(e) => {
                    e.preventDefault();
                    shareItem(establishment, 'establishment');
                  }}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="flex-1 p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {establishment.establishment_name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <RatingStars rating={establishment.averageRating} size="sm" />
                    <span className="text-sm text-gray-600">
                      ({establishment.reviewCount} avaliações)
                    </span>
                    {distance && (
                      <>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {distance.toFixed(1)}km
                        </span>
                      </>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mb-3">
                    {establishment.address}, {establishment.city} - {establishment.state}
                  </p>

                  {establishment.description && (
                    <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                      {establishment.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {establishment.sports.slice(0, 3).map((sport, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-orange-100 text-orange-800">
                        {sport}
                      </Badge>
                    ))}
                    {establishment.sports.length > 3 && (
                      <Badge variant="outline">
                        +{establishment.sports.length - 3} mais
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 md:ml-4">
                  <Button
                    onClick={() => window.open(`/estabelecimento/${establishment.id}`, '_blank')}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Detalhes
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => window.open(`tel:${establishment.phone}`, '_self')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Ligar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderGroupCard = (group: SportsGroupWithDetails) => {
    const distance = userLocation && group.latitude && group.longitude
      ? calculateDistance(userLocation.lat, userLocation.lng, group.latitude, group.longitude)
      : null;

    const mainPhoto = group.photos.find(p => p.is_main)?.photo_url || group.photos[0]?.photo_url;

    return (
      <Card key={group.id} className="hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Imagem */}
            <div className="w-full md:w-48 h-48 md:h-auto relative">
              {mainPhoto ? (
                <img
                  src={mainPhoto}
                  alt={group.group_name}
                  className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-t-none">
                  <Users className="w-12 h-12 text-white" />
                </div>
              )}
              
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/80 hover:bg-white"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(group.id, 'group');
                  }}
                >
                  <Heart 
                    className={`w-4 h-4 ${favoriteIds.has(group.id) ? 'fill-red-500 text-red-500' : ''}`} 
                  />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/80 hover:bg-white"
                  onClick={(e) => {
                    e.preventDefault();
                    shareItem(group, 'group');
                  }}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="flex-1 p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {group.group_name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <RatingStars rating={group.averageRating} size="sm" />
                    <span className="text-sm text-gray-600">
                      ({group.reviewCount} avaliações)
                    </span>
                    {distance && (
                      <>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {distance.toFixed(1)}km
                        </span>
                      </>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mb-3">
                    {group.cities.join(', ')}
                  </p>

                  {group.description && (
                    <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                      {group.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {group.sports.slice(0, 3).map((sport, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-blue-100 text-blue-800">
                        {sport}
                      </Badge>
                    ))}
                    {group.sports.length > 3 && (
                      <Badge variant="outline">
                        +{group.sports.length - 3} mais
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 md:ml-4">
                  <Button
                    onClick={() => window.open(`/grupo-esportivo/${group.id}`, '_blank')}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Detalhes
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => window.open(`tel:${group.phone}`, '_self')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Ligar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const totalResults = establishments.length + groups.length;

  return (
    <div className="space-y-4">
      {/* Header com ordenação */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {totalResults} resultado{totalResults !== 1 ? 's' : ''} encontrado{totalResults !== 1 ? 's' : ''}
        </p>
        
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevância</SelectItem>
            <SelectItem value="rating">Melhor Avaliado</SelectItem>
            <SelectItem value="distance">Mais Próximo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de resultados */}
      <div className="space-y-4">
        {establishments.map(renderEstablishmentCard)}
        {groups.map(renderGroupCard)}
        
        {totalResults === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <MapPin className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum resultado encontrado
              </h3>
              <p className="text-gray-600">
                Tente ajustar os filtros ou buscar por outros termos
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ImprovedResultsList;
