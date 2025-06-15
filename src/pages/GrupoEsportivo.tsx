
import React from 'react';
import Header from '../components/Header';
import SecondaryHeader from '../components/SecondaryHeader';
import Footer from '../components/Footer';

const GrupoEsportivo = () => {
  return (
    <div className="min-h-screen bg-white">
      <SecondaryHeader isVisible={true} />
      <Header isSecondaryVisible={true} />
      <main className="pt-[120px] px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              Área do Grupo Esportivo
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Organize seu grupo esportivo e encontre novos membros
            </p>
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Funcionalidades em desenvolvimento
              </h2>
              <p className="text-gray-600">
                Esta página está sendo desenvolvida para oferecer ferramentas de organização e gestão para grupos esportivos.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GrupoEsportivo;
