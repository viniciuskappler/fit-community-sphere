import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import SecondaryHeader from '@/components/SecondaryHeader';
import Footer from '@/components/Footer';
import UserProfileSection from '@/components/dashboard/UserProfileSection';
import UserInfoSection from '@/components/dashboard/UserInfoSection';
import EventsSection from '@/components/dashboard/EventsSection';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <SecondaryHeader isVisible={true} />
      <Header isSecondaryVisible={true} />
      
      <main className="pt-[120px] px-4 md:px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Perfil do usuário - Lado esquerdo */}
            <div className="lg:col-span-1">
              <UserProfileSection />
            </div>
            
            {/* Eventos no centro */}
            <div className="lg:col-span-2">
              <EventsSection />
            </div>
            
            {/* Informações pessoais - Lado direito */}
            <div className="lg:col-span-1">
              <UserInfoSection />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;