import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail, Edit } from 'lucide-react';
import { useUserData } from '@/hooks/useUserData';

const UserInfoSection = () => {
  const { profile, sports, loading } = useUserData();

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Informações Pessoais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const favoriteSports = sports.filter(sport => sport.sport_type === 'favorite');
  const interestedSports = sports.filter(sport => sport.sport_type === 'interested');

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">Informações Pessoais</CardTitle>
        <Button variant="ghost" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Contato */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Contato</h4>
          
          {profile?.email && (
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-foreground">{profile.email}</span>
            </div>
          )}
          
          {profile?.phone && (
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-foreground">{profile.phone}</span>
            </div>
          )}
        </div>

        <Separator />

        {/* Endereço */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Localização</h4>
          
          <div className="flex items-start text-sm">
            <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground flex-shrink-0" />
            <div className="text-foreground">
              {profile?.street && profile?.number && (
                <div>{profile.street}, {profile.number}</div>
              )}
              {profile?.neighborhood && (
                <div>{profile.neighborhood}</div>
              )}
              {profile?.city && profile?.state && (
                <div>{profile.city}, {profile.state}</div>
              )}
              {profile?.cep && (
                <div>CEP: {profile.cep}</div>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Esportes Favoritos */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Esportes Favoritos</h4>
          
          <div className="flex flex-wrap gap-2">
            {favoriteSports.length > 0 ? (
              favoriteSports.map((sport, index) => (
                <Badge key={`fav-${sport.sport_name}-${index}`} variant="default" className="text-xs">
                  {sport.sport_name}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">
                Nenhum esporte favorito cadastrado
              </span>
            )}
          </div>
        </div>

        <Separator />

        {/* Esportes de Interesse */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Interesse em Aprender</h4>
          
          <div className="flex flex-wrap gap-2">
            {interestedSports.length > 0 ? (
              interestedSports.map((sport, index) => (
                <Badge key={`int-${sport.sport_name}-${index}`} variant="outline" className="text-xs">
                  {sport.sport_name}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">
                Nenhum interesse cadastrado
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfoSection;