
import React from 'react';
import Header from '@/components/Header';
import SecondaryHeader from '@/components/SecondaryHeader';
import Footer from '@/components/Footer';

interface HubLayoutProps {
  children: React.ReactNode;
}

const HubLayout: React.FC<HubLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SecondaryHeader isVisible={true} />
      <Header />
      
      <main className="pt-[120px] px-4 md:px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HubLayout;
