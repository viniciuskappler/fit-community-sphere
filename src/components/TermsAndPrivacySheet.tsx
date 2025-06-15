
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';
import { ScrollArea } from './ui/scroll-area';

interface TermsAndPrivacySheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsAndPrivacySheet = ({ isOpen, onClose }: TermsAndPrivacySheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle className="text-orange-600">Termos de Uso e Política de Privacidade</SheetTitle>
          <SheetDescription>
            Leia atentamente nossos termos de uso e política de privacidade
          </SheetDescription>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          <div className="space-y-6 pr-4">
            {/* Termos de Uso */}
            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-4">Termos de Uso</h3>
              
              <div className="space-y-4 text-sm text-gray-700">
                <div>
                  <h4 className="font-medium mb-2">1. Aceitação dos Termos</h4>
                  <p>
                    Ao acessar e usar nossa plataforma, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">2. Uso da Plataforma</h4>
                  <p>
                    Nossa plataforma é destinada a conectar esportistas, estabelecimentos e grupos esportivos. Você se compromete a usar o serviço de forma responsável e legal.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">3. Cadastro e Conta</h4>
                  <p>
                    Para usar certos recursos da plataforma, você deve criar uma conta. Você é responsável por manter a confidencialidade de suas credenciais de login.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">4. Conteúdo do Usuário</h4>
                  <p>
                    Você mantém os direitos sobre o conteúdo que compartilha, mas nos concede uma licença para usar, modificar e exibir esse conteúdo na plataforma.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">5. Proibições</h4>
                  <p>
                    É proibido usar a plataforma para atividades ilegais, spam, harassment ou qualquer comportamento que possa prejudicar outros usuários.
                  </p>
                </div>
              </div>
            </div>

            {/* Política de Privacidade */}
            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-4">Política de Privacidade</h3>
              
              <div className="space-y-4 text-sm text-gray-700">
                <div>
                  <h4 className="font-medium mb-2">1. Coleta de Informações</h4>
                  <p>
                    Coletamos informações que você nos fornece diretamente, como nome, e-mail, telefone e preferências esportivas, para melhorar sua experiência na plataforma.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">2. Uso das Informações</h4>
                  <p>
                    Usamos suas informações para personalizar sua experiência, conectá-lo com outros usuários relevantes e melhorar nossos serviços.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">3. Compartilhamento de Dados</h4>
                  <p>
                    Não vendemos suas informações pessoais. Podemos compartilhar dados apenas com seu consentimento ou quando exigido por lei.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">4. Segurança</h4>
                  <p>
                    Implementamos medidas de segurança para proteger suas informações pessoais contra acesso não autorizado, alteração ou destruição.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">5. Seus Direitos</h4>
                  <p>
                    Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Entre em contato conosco para exercer esses direitos.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">6. Cookies</h4>
                  <p>
                    Usamos cookies para melhorar sua experiência de navegação. Você pode gerenciar suas preferências de cookies nas configurações do seu navegador.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">7. Contato</h4>
                  <p>
                    Se você tiver dúvidas sobre esta política de privacidade, entre em contato conosco através do e-mail: contato@plataforma.com
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 mt-6">
              <p className="text-xs text-gray-500">
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default TermsAndPrivacySheet;
