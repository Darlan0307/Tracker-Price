import AuthHeader from "@/components/AuthHeader";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import ButtonBackDashboard from "@/components/ui-primitive/ButtonBackDashboard";

const Help = () => {
  const faqs = [
    {
      question: "Como adicionar um produto para monitorar?",
      answer:
        "No painel, cole o link do produto do Mercado Livre, Shopee ou AliExpress no campo de entrada e clique em 'Adicionar Produto'. O sistema começará a monitorar automaticamente.",
    },
    {
      question: "Como funcionam as notificações?",
      answer:
        "Você pode configurar notificações por Email ou WhatsApp na página de Notificações. Quando o preço do produto cair abaixo do percentual definido, você receberá um alerta instantâneo.",
    },
    {
      question: "Quantos produtos posso monitorar?",
      answer:
        "No plano gratuito, você pode monitorar até 3 produtos. Os planos pagos permitem monitorar 20 (Pro) ou produtos ilimitados (Premium).",
    },
    {
      question: "Com que frequência os preços são atualizados?",
      answer:
        "Verificamos os preços a cada hora para garantir que você receba alertas em tempo real quando houver mudanças.",
    },
    {
      question: "Posso cancelar minha assinatura a qualquer momento?",
      answer:
        "Sim, você pode cancelar sua assinatura a qualquer momento sem taxas adicionais. Seu acesso aos recursos premium continuará até o final do período pago.",
    },
    {
      question: "Como alterar minhas configurações de notificação?",
      answer:
        "Acesse a página de Notificações através do menu do seu avatar ou pelo painel principal para configurar seus alertas.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <AuthHeader />

      <div className="max-w-[100px] ml-20 relative top-4 hidden lg:block">
        <ButtonBackDashboard />
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="block max-w-[100px] mb-5 lg:hidden">
          <ButtonBackDashboard />
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <HelpCircle className="w-12 h-12 md:w-16 md:h-16 text-primary mx-auto mb-3 md:mb-4" />
            <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
              Central de Ajuda
            </h1>
            <p className="text-muted-foreground text-sm md:text-lg px-4">
              Encontre respostas para as perguntas mais frequentes
            </p>
          </div>

          <Card className="p-4 md:p-8 mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
              Perguntas Frequentes
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>

          <Card className="p-4 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
              Ainda precisa de ajuda?
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
              Nossa equipe está pronta para ajudar você
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <Button
                variant="outline"
                className="h-auto py-3 md:py-4 justify-start"
              >
                <Mail className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3 flex-shrink-0" />
                <div className="text-left min-w-0">
                  <div className="font-semibold text-sm md:text-base">
                    Email
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground truncate">
                    suporte@trackprice.com
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-auto py-3 md:py-4 justify-start"
              >
                <MessageSquare className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3 flex-shrink-0" />
                <div className="text-left min-w-0">
                  <div className="font-semibold text-sm md:text-base">
                    Chat ao Vivo
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground truncate">
                    Segunda a Sexta, 9h-18h
                  </div>
                </div>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Help;
