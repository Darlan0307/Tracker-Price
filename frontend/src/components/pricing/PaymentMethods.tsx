import { Card } from "@/components/ui/card";

const PaymentMethods = () => {
  return (
    <Card className="max-w-4xl mx-auto p-4 md:p-8 bg-gradient-card shadow-card">
      <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-center">Métodos de Pagamento</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="p-6 rounded-lg border bg-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold">Cartão de Crédito</h4>
              <p className="text-sm text-muted-foreground">Assinatura mensal</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Todos os principais cartões aceitos. Processamento seguro. Cancele a qualquer momento.
          </p>
        </div>

        <div className="p-6 rounded-lg border bg-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold">PIX</h4>
              <p className="text-sm text-muted-foreground">Pagamento único</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Pagamento instantâneo via PIX. Acesso imediato ao plano selecionado.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PaymentMethods;
