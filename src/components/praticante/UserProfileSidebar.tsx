
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar, Users, MapPin, Trophy, Edit, Award } from 'lucide-react';
import { useUserData } from '@/hooks/useUserData';
import EditProfileModal from './EditProfileModal';
import AchievementsModal from './AchievementsModal';

const UserProfileSidebar = () => {
  const { profile, sports, loading } = useUserData();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="w-20 h-20 bg-muted rounded-full mx-auto"></div>
            <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
            <div className="space-y-2">
              <div className="h-8 bg-muted rounded"></div>
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

  // Mock data for groups and establishments
  const mockGroups = [
    "Vôlei Litoral RS",
    "Tennis Club POA",
    "Corrida Matinal"
  ];

  const mockEstablishments = [
    "Arena Sports",
    "Clube do Remo",
    "Academia Gold"
  ];

  const mockAchievements = [
    "Participou de 5 eventos",
    "Criou 3 grupos",
    "Conectou-se com 25 praticantes"
  ];

  return (
    <>
      <Card className="w-full">
        <CardHeader className="text-center pb-4">
          <Avatar className="w-20 h-20 mx-auto mb-4">
            <AvatarImage 
              src={profile.photo_url || `https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face`} 
              alt={profile.full_name} 
            />
            <AvatarFallback className="text-lg">
              {profile.full_name?.split(' ').map(n => n[0]).join('') || 'U'}
            </AvatarFallback>
          </Avatar>
          
          <CardTitle className="text-xl">{profile.full_name || 'Nome não informado'}</CardTitle>
          
          <div className="space-y-2 text-sm text-muted-foreground">
            {age && (
              <div className="flex items-center justify-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{age} anos</span>
              </div>
            )}
            
            {(profile.city || profile.state) && (
              <div className="flex items-center justify-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>
                  {profile.city || 'Cidade não informada'}, {profile.state || 'Estado não informado'}
                </span>
              </div>
            )}
          </div>

          <div className="flex gap-2 mt-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowEditModal(true)}
              className="flex-1"
            >
              <Edit className="h-4 w-4 mr-1" />
              Editar perfil
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowAchievementsModal(true)}
              className="flex-1"
            >
              <Trophy className="h-4 w-4 mr-1" />
              Ver conquistas
            </Button>
          </div>
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
                <span className="text-sm text-muted-foreground">Ainda não informado</span>
              )}
            </div>
          </div>

          {/* Grupos que Participa */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Grupos que Participa</h4>
            <div className="space-y-2">
              {mockGroups.map((group, index) => (
                <div key={index} className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-foreground">{group}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Estabelecimentos que Frequenta */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Locais que Frequenta</h4>
            <div className="space-y-2">
              {mockEstablishments.map((establishment, index) => (
                <div key={index} className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-foreground">{establishment}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Conquistas Preview */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Principais Conquistas</h4>
            <div className="flex items-center space-x-2 mb-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <Award className="h-5 w-5 text-gray-400" />
              <Trophy className="h-5 w-5 text-orange-500" />
            </div>
            <p className="text-xs text-muted-foreground">
              {mockAchievements[0]}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        profile={profile}
      />

      <AchievementsModal
        isOpen={showAchievementsModal}
        onClose={() => setShowAchievementsModal(false)}
        achievements={mockAchievements}
      />
    </>
  );
};

export default UserProfileSidebar;
