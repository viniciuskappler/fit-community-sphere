
import React from 'react';
import Header from '../components/Header';
import SecondaryHeader from '../components/SecondaryHeader';
import Footer from '../components/Footer';

const SportsModalities = () => {
  return (
    <div className="min-h-screen bg-white">
      <SecondaryHeader isVisible={true} />
      <Header isSecondaryVisible={true} />
      <main className="pt-[120px]">
        <div className="w-3/4 mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Modalidades Esportivas</h1>
            <p className="mt-4 text-lg text-gray-600">Explore as diversas modalidades disponíveis na nossa plataforma.</p>
            <p className="mt-2 text-md text-gray-500">(Página em construção)</p>
          </div>
          {/* Futuro conteúdo da página aqui */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SportsModalities;
