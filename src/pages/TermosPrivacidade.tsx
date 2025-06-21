
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermosPrivacidade = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header isSecondaryVisible={false} />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-8">
          Termos de Uso e Política de Privacidade
        </h1>
        
        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
              1. Termos de Uso
            </h2>
            
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
              Você é responsável por manter a confidencialidade de suas credenciais de acesso e por todas as atividades 
              que ocorram em sua conta.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">1.4 Uso Aceitável</h3>
            <p className="mb-4">
              Você concorda em usar a plataforma apenas para fins legais e de acordo com estes termos. 
              É proibido usar o serviço para atividades fraudulentas, spam, conteúdo ofensivo ou qualquer 
              atividade que possa prejudicar outros usuários ou a plataforma.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">1.5 Direitos de Propriedade Intelectual</h3>
            <p className="mb-4">
              Todo o conteúdo da plataforma, incluindo textos, gráficos, logotipos, ícones, imagens e software, 
              é propriedade do Núcleo do Esporte ou de seus licenciadores e está protegido por leis de direitos autorais.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
              2. Política de Privacidade - LGPD
            </h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">2.1 Coleta de Dados Pessoais</h3>
            <p className="mb-4">
              Em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018), coletamos as seguintes 
              categorias de dados pessoais:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li><strong>Dados de identificação:</strong> nome completo, CPF, data de nascimento</li>
              <li><strong>Dados de contato:</strong> e-mail, telefone, cidade</li>
              <li><strong>Dados de preferências:</strong> modalidades esportivas favoritas, praticadas e de interesse</li>
              <li><strong>Dados de navegação:</strong> endereço IP, cookies, logs de acesso</li>
              <li><strong>Dados de localização:</strong> quando autorizado pelo usuário</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">2.2 Finalidades do Tratamento</h3>
            <p className="mb-4">
              Utilizamos seus dados pessoais para as seguintes finalidades, com base nas hipóteses legais da LGPD:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li><strong>Execução de contrato:</strong> criação e gerenciamento de conta de usuário</li>
              <li><strong>Legítimo interesse:</strong> personalização da experiência e melhorias da plataforma</li>
              <li><strong>Consentimento:</strong> envio de comunicações promocionais e newsletter</li>
              <li><strong>Cumprimento de obrigação legal:</strong> quando exigido por autoridades competentes</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">2.3 Compartilhamento de Dados</h3>
            <p className="mb-4">
              Não vendemos seus dados pessoais. Compartilhamos informações apenas nas seguintes situações:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>Com estabelecimentos e grupos esportivos quando você demonstra interesse</li>
              <li>Com prestadores de serviços que nos auxiliam na operação da plataforma</li>
              <li>Com autoridades legais quando exigido por lei ou ordem judicial</li>
              <li>Em caso de fusão, aquisição ou venda de ativos da empresa</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">2.4 Seus Direitos como Titular</h3>
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

            <h3 className="text-xl font-medium text-gray-800 mb-3">2.5 Segurança e Retenção de Dados</h3>
            <p className="mb-4">
              Implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados pessoais contra 
              acesso não autorizado, alteração, divulgação ou destruição. Os dados são mantidos pelo tempo necessário 
              para cumprir as finalidades descritas ou conforme exigido por lei.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">2.6 Cookies e Tecnologias Similares</h3>
            <p className="mb-4">
              Utilizamos cookies essenciais, de desempenho e de funcionalidade para melhorar sua experiência. 
              Você pode gerenciar suas preferências através das configurações do navegador ou da nossa central 
              de preferências de cookies.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">2.7 Transferência Internacional de Dados</h3>
            <p className="mb-4">
              Quando necessário, podemos transferir seus dados para países que ofereçam grau de proteção adequado 
              ou mediante garantias específicas de proteção, sempre em conformidade com a LGPD.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
              3. Disposições Gerais
            </h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">3.1 Alterações</h3>
            <p className="mb-4">
              Podemos atualizar estes termos e políticas periodicamente. Notificaremos sobre mudanças significativas 
              através da plataforma ou por e-mail com pelo menos 30 dias de antecedência.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">3.2 Encarregado de Dados (DPO)</h3>
            <p className="mb-4">
              Para exercer seus direitos ou esclarecer dúvidas sobre o tratamento de dados pessoais, 
              entre em contato com nosso Encarregado de Dados através do e-mail: <strong>dpo@nucleodoesporte.com.br</strong>
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-3">3.3 Contato</h3>
            <p className="mb-4">
              Para dúvidas sobre estes termos ou nossa política de privacidade:
            </p>
            <ul className="list-none space-y-1 mb-4">
              <li><strong>E-mail:</strong> contato@nucleodoesporte.com.br</li>
              <li><strong>Telefone:</strong> (11) 9999-9999</li>
              <li><strong>Endereço:</strong> Rua dos Esportes, 123 - São Paulo/SP</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3">3.4 Lei Aplicável e Foro</h3>
            <p className="mb-4">
              Estes termos são regidos pelas leis brasileiras. Fica eleito o foro da Comarca de São Paulo/SP 
              para dirimir quaisquer controvérsias decorrentes destes termos.
            </p>
          </section>
        </div>

        <div className="mt-12 p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-orange-200">
          <p className="text-sm text-gray-600">
            <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <strong>Versão:</strong> 2.0 - Adequada à LGPD
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermosPrivacidade;
