
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SubscriptionFAQ = () => {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-center mb-8">Perguntas Frequentes</h2>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Como funciona o desconto de 50% para Beta Testers?</AccordionTrigger>
            <AccordionContent>
              O desconto de 50% está disponível para todos que assinarem qualquer plano Premium até 10/08/2025 às 23:59. 
              Esse é um benefício exclusivo para early adopters que acreditam no Núcleo do Esporte desde o início. 
              O desconto será aplicado automaticamente durante esse período promocional.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>Posso mudar de plano depois?</AccordionTrigger>
            <AccordionContent>
              Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. 
              Se você assinar durante o período promocional de Beta Tester com 50% de desconto, 
              esse benefício será mantido caso você faça upgrade para um plano superior.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger>Qual a diferença entre os planos gratuito e premium?</AccordionTrigger>
            <AccordionContent>
              Os planos gratuitos oferecem funcionalidades básicas para que você possa experimentar o Núcleo do Esporte. 
              Já os planos Premium desbloqueiam recursos avançados como visibilidade aumentada, ferramentas de gestão, 
              analytics detalhados, suporte prioritário e muito mais, dependendo do tipo de usuário 
              (Praticante, Estabelecimento, Grupo Esportivo ou Profissional).
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger>Como funciona a cobrança?</AccordionTrigger>
            <AccordionContent>
              Você pode escolher entre pagamento mensal ou anual (com economia). 
              Utilizamos plataformas seguras de pagamento e você pode cancelar sua assinatura a qualquer momento. 
              Não há taxas de cancelamento ou obrigação de permanência mínima.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5">
            <AccordionTrigger>Quais formas de pagamento são aceitas?</AccordionTrigger>
            <AccordionContent>
              Aceitamos cartões de crédito, débito, PIX e boleto bancário. 
              Todas as transações são processadas em ambiente seguro, protegendo seus dados financeiros.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-6">
            <AccordionTrigger>O que acontece após o lançamento oficial?</AccordionTrigger>
            <AccordionContent>
              Após o lançamento oficial em 28 de agosto de 2025, os preços regulares entrarão em vigor. 
              Todos os Beta Testers que assinarem até 10/08/2025 manterão seu desconto vitalício de 50%, 
              desde que mantenham sua assinatura ativa.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-7">
            <AccordionTrigger>Qual o ROI esperado para estabelecimentos e profissionais?</AccordionTrigger>
            <AccordionContent>
              Nossos dados iniciais mostram que estabelecimentos e profissionais recuperam o valor investido 
              na assinatura com apenas 1-2 novos clientes/alunos. Considerando que a plataforma pode gerar 
              dezenas de novos contatos qualificados por mês, o retorno sobre investimento é extremamente positivo.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default SubscriptionFAQ;
