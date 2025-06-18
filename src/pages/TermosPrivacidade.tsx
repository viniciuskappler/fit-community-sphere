
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermosPrivacidade = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Termos de Uso e Política de Privacidade</h1>
        
        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Termos de Uso</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">1.1 Aceitação dos Termos</h3>
            <p className="mb-4">
              Ao acessar e usar a plataforma Núcleo do Esporte, você concorda em cumprir estes termos de uso. 
              Se não concordar com qualquer parte destes termos, não deve usar nossos serviços.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">1.2 Descrição do Serviço</h3>
            <p className="mb-4">
              O Núcleo do Esporte é uma plataforma digital que conecta praticantes de esportes, estabelecimentos 
              esportivos e grupos esportivos, facilitando a descoberta de modalidades esportivas e locais para prática.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">1.3 Cadastro e Conta de Usuário</h3>
            <p className="mb-4">
              Para usar certas funcionalidades, você deve criar uma conta fornecendo informações precisas e atualizadas. 
              Você é responsável por manter a confidencialidade de suas credenciais de acesso.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">1.4 Uso Aceitável</h3>
            <p className="mb-4">
              Você concorda em usar a plataforma apenas para fins legais e de acordo com estes termos. 
              É proibido usar o serviço para atividades fraudulentas, spam ou qualquer conteúdo ofensivo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Política de Privacidade</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">2.1 Coleta de Informações</h3>
            <p className="mb-4">
              Coletamos informações que você nos fornece diretamente, como nome, e-mail, telefone, 
              preferências esportivas e localização, além de dados de uso da plataforma.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">2.2 Uso das Informações</h3>
            <p className="mb-4">
              Utilizamos suas informações para:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>Fornecer e melhorar nossos serviços</li>
              <li>Personalizar sua experiência na plataforma</li>
              <li>Conectar você com estabelecimentos e grupos esportivos relevantes</li>
              <li>Enviar comunicações sobre atualizações e promoções (com seu consentimento)</li>
              <li>Garantir a segurança da plataforma</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">2.3 Compartilhamento de Informações</h3>
            <p className="mb-4">
              Não vendemos suas informações pessoais. Podemos compartilhar dados apenas com:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>Estabelecimentos e grupos esportivos quando você demonstra interesse</li>
              <li>Prestadores de serviços que nos ajudam a operar a plataforma</li>
              <li>Autoridades legais quando exigido por lei</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">2.4 Cookies</h3>
            <p className="mb-4">
              Utilizamos cookies para melhorar sua experiência, analisar o uso da plataforma e personalizar conteúdo. 
              Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">2.5 Segurança</h3>
            <p className="mb-4">
              Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais 
              contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">2.6 Seus Direitos</h3>
            <p className="mb-4">
              Você tem o direito de:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>Acessar e atualizar suas informações pessoais</li>
              <li>Solicitar a exclusão de seus dados</li>
              <li>Retirar o consentimento para comunicações de marketing</li>
              <li>Solicitar a portabilidade de seus dados</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Disposições Gerais</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">3.1 Alterações</h3>
            <p className="mb-4">
              Podemos atualizar estes termos e políticas periodicamente. Notificaremos sobre mudanças significativas 
              através da plataforma ou por e-mail.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">3.2 Contato</h3>
            <p className="mb-4">
              Para dúvidas sobre estes termos ou nossa política de privacidade, entre em contato conosco através 
              dos canais disponíveis na plataforma.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">3.3 Lei Aplicável</h3>
            <p className="mb-4">
              Estes termos são regidos pelas leis brasileiras, especialmente pela Lei Geral de Proteção de Dados (LGPD).
            </p>
          </section>
        </div>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermosPrivacidade;
