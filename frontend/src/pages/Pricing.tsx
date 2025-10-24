import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AuthHeader from "@/components/AuthHeader";
import PricingCard from "@/components/pricing/PricingCard";
import PaymentMethods from "@/components/pricing/PaymentMethods";
import { pricingPlans } from "@/data/pricingPlans";
import ButtonBackDashboard from "@/components/ui-primitive/ButtonBackDashboard";
import { useAuth } from "@/contexts";
import { PlanType } from "@/types";

const Pricing = () => {
  const { user } = useAuth();

  const handleSelectPlan = (planName: string) => {
    if (planName === "Gratuito") {
      toast.info("Você já está no plano Gratuito");
      return;
    }
    toast.success(`Redirecionando para pagamento do plano ${planName}...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <AuthHeader />

      <div className="max-w-[100px] mx-4 relative top-5 mb-5 md:mb-0 lg:mx-16">
        <ButtonBackDashboard />
      </div>

      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            Preços Simples e Transparentes
          </h2>
          <p className="text-sm md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Escolha o plano perfeito para suas necessidades. Atualize ou faça
            downgrade a qualquer momento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto mb-8 md:mb-12">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              {...plan}
              onSelect={() => handleSelectPlan(plan.name)}
              currentPlan={user?.planType ?? PlanType.GRATUITO}
              index={index}
            />
          ))}
        </div>

        <PaymentMethods />

        <div className="max-w-3xl mx-auto mt-8 md:mt-12 text-center">
          <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">
            Dúvidas?
          </h3>
          <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 px-4">
            Todos os planos incluem garantia de 7 dias. Sem perguntas.
          </p>
          <Button variant="outline" size="sm" className="md:text-base">
            Contatar Suporte
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
