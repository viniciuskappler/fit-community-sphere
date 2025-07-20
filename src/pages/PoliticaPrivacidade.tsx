
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PoliticaPrivacidade = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold text-foreground mb-8">Política de Privacidade</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações pessoais.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Informações que Coletamos</h2>
            <p className="text-muted-foreground mb-4">
              Coletamos informações que você nos fornece diretamente, como quando você cria uma conta, atualiza seu perfil ou entra em contato conosco.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Como Usamos suas Informações</h2>
            <p className="text-muted-foreground mb-4">
              Usamos suas informações para fornecer e melhorar nossos serviços, personalizar sua experiência e comunicar com você.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Compartilhamento de Informações</h2>
            <p className="text-muted-foreground mb-4">
              Não compartilhamos suas informações pessoais com terceiros, exceto conforme descrito nesta política.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Segurança</h2>
            <p className="text-muted-foreground mb-4">
              Implementamos medidas de segurança adequadas para proteger suas informações pessoais.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Seus Direitos</h2>
            <p className="text-muted-foreground mb-4">
              Você tem o direito de acessar, atualizar ou excluir suas informações pessoais.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Contato</h2>
            <p className="text-muted-foreground">
              Se você tiver dúvidas sobre esta política, entre em contato conosco.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PoliticaPrivacidade;
