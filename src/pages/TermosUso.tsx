
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermosUso = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header isSecondaryVisible={false} />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-8">
          Termos de Uso
        </h1>
        
        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
              1. Aceitação dos Termos
            </h2>
            <p className="mb-4">
              Ao acessar e usar a plataforma Núcleo do Esporte, você concorda em cumprir estes termos de uso. 
              Se não concordar com qualquer parte destes termos, não deve usar nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
              2. Descrição do Serviço
            </h2>
            <p className="mb-4">
              O Núcleo do Esporte é uma plataforma digital que conecta praticantes de esportes, estabelecimentos 
              esportivos e grupos esportivos, facilitando a descoberta de modalidades esportivas e locais para prática.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
              3. Cadastro e Conta de Usuário
            </h2>
            <p className="mb-4">
              Para usar certas funcionalidades, você deve criar uma conta fornecendo informações precisas e atualizadas. 
              Você é responsável por manter a confidencialidade de suas credenciais de acesso e por todas as atividades 
              que ocorram em sua conta.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
              4. Uso Aceitável
            </h2>
            <p className="mb-4">
              Você concorda em usar a plataforma apenas para fins legais e de acordo com estes termos. 
              É proibido usar o serviço para atividades fraudulentas, spam, conteúdo ofensivo ou qualquer 
              atividade que possa prejudicar outros usuários ou a plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
              5. Direitos de Propriedade Intelectual
            </h2>
            <p className="mb-4">
              Todo o conteúdo da plataforma, incluindo textos, gráficos, logotipos, ícones, imagens e software, 
              é propriedade do Núcleo do Esporte ou de seus licenciadores e está protegido por leis de direitos autorais.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
              6. Limitação de Responsabilidade
            </h2>
            <p className="mb-4">
              O Núcleo do Esporte não se responsabiliza por danos diretos, indiretos, incidentais ou consequenciais 
              decorrentes do uso da plataforma. O serviço é fornecido "como está" sem garantias de qualquer tipo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
              7. Modificações dos Termos
            </h2>
            <p className="mb-4">
              Podemos atualizar estes termos periodicamente. Notificaremos sobre mudanças significativas 
              através da plataforma ou por e-mail com pelo menos 30 dias de antecedência.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
              8. Lei Aplicável e Foro
            </h2>
            <p className="mb-4">
              Estes termos são regidos pelas leis brasileiras. Fica eleito o foro da Comarca de São Paulo/SP 
              para dirimir quaisquer controvérsias decorrentes destes termos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
              9. Contato
            </h2>
            <p className="mb-4">
              Para dúvidas sobre estes termos de uso:
            </p>
            <ul className="list-none space-y-1 mb-4">
              <li><strong>E-mail:</strong> contato@nucleodoesporte.com.br</li>
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
            <strong>Versão:</strong> 3.0
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermosUso;
