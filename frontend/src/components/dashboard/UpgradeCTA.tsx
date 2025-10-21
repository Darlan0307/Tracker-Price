import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, MessageCircle, TrendingDown, Zap } from "lucide-react";

interface UpgradeCTAProps {
  currentPlan: string;
  onUpgradeClick: () => void;
  hasProducts: boolean;
}

const UpgradeCTA = ({ currentPlan, onUpgradeClick, hasProducts }: UpgradeCTAProps) => {
  if (currentPlan !== "Gratuito" || !hasProducts) return null;

  return (
    <Card className="mb-8 overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border-2 border-primary/20">
      <CardContent className="p-4 md:p-8">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-3">Desbloqueie Todo o Potencial</h3>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2 text-xs md:text-sm">
                <MessageCircle className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Notificações por WhatsApp</span>
              </li>
              <li className="flex items-center gap-2 text-xs md:text-sm">
                <TrendingDown className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Monitore até 50 produtos</span>
              </li>
              <li className="flex items-center gap-2 text-xs md:text-sm">
                <Zap className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Atualizações de preço em tempo real</span>
              </li>
            </ul>
            <Button onClick={onUpgradeClick} size="sm" className="shadow-lg w-full md:w-auto">
              <Crown className="w-4 h-4 mr-2" />
              Ver Planos Premium
            </Button>
          </div>
          <div className="relative h-32 md:h-48 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full"></div>
            <Crown className="w-20 h-20 md:w-32 md:h-32 text-primary animate-float relative z-10" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpgradeCTA;
