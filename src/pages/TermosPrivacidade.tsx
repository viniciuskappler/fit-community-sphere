
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TermosPrivacidade = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold text-foreground mb-8">Termos de Privacidade</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Este documento descreve nossos termos de privacidade e como protegemos suas informações.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Compromisso com a Privacidade</h2>
            <p className="text-muted-foreground mb-4">
              Estamos comprometidos em proteger sua privacidade e dados pessoais.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Coleta de Dados</h2>
            <p className="text-muted-foreground mb-4">
              Coletamos apenas os dados necessários para fornecer nossos serviços.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Uso de Dados</h2>
            <p className="text-muted-foreground mb-4">
              Usamos seus dados exclusivamente para melhorar sua experiência em nossa plataforma.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Compartilhamento</h2>
            <p className="text-muted-foreground mb-4">
              Não compartilhamos seus dados com terceiros sem seu consentimento expresso.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Segurança</h2>
            <p className="text-muted-foreground mb-4">
              Implementamos as melhores práticas de segurança para proteger seus dados.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Contato</h2>
            <p className="text-muted-foreground">
              Para questões sobre privacidade, entre em contato através dos canais oficiais.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermosPrivacidade;
