
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
            Termos de Uso e Política de Privacidade
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6 text-sm bg-white">
            <section>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-3">
                Termos de Uso
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">1. Aceitação dos Termos</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Ao utilizar a plataforma Núcleo do Esporte, você concorda com estes termos de uso. 
                    Se não concordar com qualquer parte destes termos, não utilize nossos serviços.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">2. Uso da Plataforma</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Nossa plataforma destina-se a conectar praticantes de esportes, estabelecimentos e grupos esportivos. 
                    É proibido o uso para fins ilícitos, spam ou qualquer atividade que prejudique outros usuários.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">3. Responsabilidades do Usuário</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Você é responsável pela veracidade das informações fornecidas e por manter sua senha segura. 
                    Não compartilhe suas credenciais de acesso com terceiros.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">4. Conteúdo do Usuário</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Ao publicar conteúdo (avaliações, fotos, comentários), você garante que possui os direitos necessários 
                    e concede ao Núcleo do Esporte licença para usar, exibir e distribuir esse conteúdo na plataforma.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-3">
                Política de Privacidade - LGPD
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">1. Coleta de Dados</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Coletamos informações pessoais fornecidas voluntariamente (nome, e-mail, preferências esportivas) 
                    e dados de uso da plataforma para melhorar nossos serviços, em conformidade com a LGPD.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">2. Finalidades do Tratamento</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Utilizamos seus dados para personalizar sua experiência, conectá-lo com estabelecimentos e grupos 
                    relevantes, e enviar comunicações relacionadas ao esporte (quando autorizado).
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">3. Seus Direitos</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Você possui direitos de acesso, correção, eliminação, portabilidade e revogação de consentimento 
                    sobre seus dados pessoais, conforme a LGPD.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">4. Segurança</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Implementamos medidas de segurança para proteger suas informações contra acesso não autorizado, 
                    alteração, divulgação ou destruição.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-3">
                Contato
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Para dúvidas sobre estes termos ou exercer seus direitos: 
                <span className="font-medium"> contato@nucleodoesporte.com.br</span> ou 
                <span className="font-medium"> dpo@nucleodoesporte.com.br</span> (Encarregado de Dados)
              </p>
            </section>
          </div>
        </ScrollArea>

        <div className="flex justify-end mt-4 bg-white">
          <Button onClick={onClose} className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsModal;
