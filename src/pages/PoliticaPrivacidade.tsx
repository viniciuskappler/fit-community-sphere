
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PoliticaPrivacidade = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header isSecondaryVisible={false} />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-8">
          Política de Privacidade
        </h1>
        
        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
              1. Introdução - LGPD
            </h2>
            <p className="mb-4">
              Em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018), esta política 
              descreve como coletamos, usamos, armazenamos e protegemos seus dados pessoais na plataforma 
              Núcleo do Esporte.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
              2. Coleta de Dados Pessoais
            </h2>
            <p className="mb-4">
              Coletamos as seguintes categorias de dados pessoais:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li><strong>Dados de identificação:</strong> nome completo, CPF, data de nascimento</li>
              <li><strong>Dados de contato:</strong> e-mail, telefone, cidade</li>
              <li><strong>Dados de preferências:</strong> modalidades esportivas favoritas, praticadas e de interesse</li>
              <li><strong>Dados de navegação:</strong> endereço IP, cookies, logs de acesso</li>
              <li><strong>Dados de localização:</strong> quando autorizado pelo usuário</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
              3. Finalidades do Tratamento
            </h2>
            <p className="mb-4">
              Utilizamos seus dados pessoais para as seguintes finalidades, com base nas hipóteses legais da LGPD:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li><strong>Execução de contrato:</strong> criação e gerenciamento de conta de usuário</li>
              <li><strong>Legítimo interesse:</strong> personalização da experiência e melhorias da plataforma</li>
              <li><strong>Consentimento:</strong> envio de comunicações promocionais e newsletter</li>
              <li><strong>Cumprimento de obrigação legal:</strong> quando exigido por autoridades competentes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
              4. Compartilhamento de Dados
            </h2>
            <p className="mb-4">
              Não vendemos seus dados pessoais. Compartilhamos informações apenas nas seguintes situações:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>Com estabelecimentos e grupos esportivos quando você demonstra interesse</li>
              <li>Com prestadores de serviços que nos auxiliam na operação da plataforma</li>
              <li>Com autoridades legais quando exigido por lei ou ordem judicial</li>
              <li>Em caso de fusão, aquisição ou venda de ativos da empresa</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
              5. Seus Direitos como Titular
            </h2>
            <p className="mb-4">
              Conforme a LGPD, você possui os seguintes direitos em relação aos seus dados pessoais:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li><strong>Acesso:</strong> confirmar a existência e acessar seus dados</li>
              <li><strong>Correção:</strong> corrigir dados incompletos, inexatos ou desatualizados</li>
              <li><strong>Eliminação:</strong> solicitar a exclusão de dados desnecessários ou tratados em desconformidade</li>
              <li><strong>Portabilidade:</strong> solicitar a portabilidade de dados a outro fornecedor</li>
              <li><strong>Revogação:</strong> revogar o consentimento a qualquer momento</li>
              <li><strong>Oposição:</strong> opor-se ao tratamento quando realizado com base no legítimo interesse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
              6. Segurança e Retenção de Dados
            </h2>
            <p className="mb-4">
              Implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados pessoais contra 
              acesso não autorizado, alteração, divulgação ou destruição. Os dados são mantidos pelo tempo necessário 
              para cumprir as finalidades descritas ou conforme exigido por lei.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
              7. Cookies e Tecnologias Similares
            </h2>
            <p className="mb-4">
              Utilizamos cookies essenciais, de desempenho e de funcionalidade para melhorar sua experiência. 
              Você pode gerenciar suas preferências através das configurações do navegador ou da nossa central 
              de preferências de cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
              8. Transferência Internacional de Dados
            </h2>
            <p className="mb-4">
              Quando necessário, podemos transferir seus dados para países que ofereçam grau de proteção adequado 
              ou mediante garantias específicas de proteção, sempre em conformidade com a LGPD.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
              9. Encarregado de Dados (DPO)
            </h2>
            <p className="mb-4">
              Para exercer seus direitos ou esclarecer dúvidas sobre o tratamento de dados pessoais, 
              entre em contato com nosso Encarregado de Dados através do e-mail: <strong>dpo@nucleodoesporte.com.br</strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
              10. Contato
            </h2>
            <p className="mb-4">
              Para dúvidas sobre nossa política de privacidade:
            </p>
            <ul className="list-none space-y-1 mb-4">
              <li><strong>E-mail:</strong> privacidade@nucleodoesporte.com.br</li>
              <li><strong>Telefone:</strong> (11) 9999-9999</li>
              <li><strong>Endereço:</strong> Rua dos Esportes, 123 - São Paulo/SP</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-orange-200">
          <p className="text-sm text-gray-600">
            <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <strong>Versão:</strong> 3.0 - Adequada à LGPD
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PoliticaPrivacidade;
