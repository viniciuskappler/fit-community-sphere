
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Users, MapPin, Trophy } from 'lucide-react';
import { useUserData } from '@/hooks/useUserData';

const UserProfileSidebar = () => {
  const { profile, sports, loading } = useUserData();

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full mx-auto"></div>
            <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
            <div className="space-y-2">
              <div className="h-8 bg-muted rounded"></div>
              <div className="h-8 bg-muted rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!profile) {
    return null;
  }

  const calculateAge = (birthDate: string): number | null => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const age = profile.birth_date ? calculateAge(profile.birth_date) : null;
  const practicedSports = sports.filter(sport => sport.sport_type === 'practiced');
  const favoriteSports = sports.filter(sport => sport.sport_type === 'favorite');

  return (
    <Card className="w-full">
      <CardHeader className="text-center pb-4">
        <Avatar className="w-20 h-20 mx-auto mb-4">
          <AvatarImage src="/placeholder.svg" alt={profile.full_name} />
          <AvatarFallback className="text-lg">
            {profile.full_name?.split(' ').map(n => n[0]).join('') || 'U'}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-xl">{profile.full_name}</CardTitle>
        {age && (
          <div className="flex items-center justify-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{age} anos</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Esportes Praticados */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Esportes Praticados</h4>
          <div className="flex flex-wrap gap-2">
            {practicedSports.length > 0 ? (
              practicedSports.map((sport, index) => (
                <Badge key={`practiced-${sport.sport_name}-${index}`} variant="default" className="text-xs">
                  {sport.sport_name}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">Nenhum esporte cadastrado</span>
            )}
          </div>
        </div>

        {/* Esportes Favoritos */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Esportes Favoritos</h4>
          <div className="flex flex-wrap gap-2">
            {favoriteSports.length > 0 ? (
              favoriteSports.map((sport, index) => (
                <Badge key={`favorite-${sport.sport_name}-${index}`} variant="secondary" className="text-xs">
                  {sport.sport_name}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">Nenhum esporte favorito</span>
            )}
          </div>
        </div>

        {/* Grupos - Mock para demonstração */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Grupos</h4>
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-foreground">Vôlei Litoral RS</span>
          </div>
        </div>

        {/* Estabelecimentos - Mock para demonstração */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Estabelecimentos</h4>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-foreground">Arena Sports</span>
          </div>
        </div>

        {/* Conquistas - Mock para demonstração */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Conquistas</h4>
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <Trophy className="h-5 w-5 text-gray-400" />
            <Trophy className="h-5 w-5 text-orange-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileSidebar;
