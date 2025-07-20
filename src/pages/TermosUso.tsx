
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TermosUso = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold text-foreground mb-8">Termos de Uso</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Bem-vindo ao Núcleo do Esporte. Estes termos de uso regem o uso de nossos serviços.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Aceitação dos Termos</h2>
            <p className="text-muted-foreground mb-4">
              Ao usar nossos serviços, você concorda com estes termos de uso.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Uso dos Serviços</h2>
            <p className="text-muted-foreground mb-4">
              Você deve usar nossos serviços de forma responsável e de acordo com as leis aplicáveis.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Contas de Usuário</h2>
            <p className="text-muted-foreground mb-4">
              Você é responsável por manter a confidencialidade de sua conta e senha.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Conteúdo</h2>
            <p className="text-muted-foreground mb-4">
              Você é responsável pelo conteúdo que publica em nossos serviços.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Modificações</h2>
            <p className="text-muted-foreground mb-4">
              Podemos modificar estes termos a qualquer momento, com aviso prévio.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Contato</h2>
            <p className="text-muted-foreground">
              Se você tiver dúvidas sobre estes termos, entre em contato conosco.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermosUso;
