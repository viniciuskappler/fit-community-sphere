
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SportsModalities = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-8">Modalidades Esportivas</h1>
            
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Página em desenvolvimento. Em breve você terá acesso a informações detalhadas sobre todas as modalidades esportivas disponíveis.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SportsModalities;
