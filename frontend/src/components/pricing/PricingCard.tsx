import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, LucideIcon } from "lucide-react";
import { PlanType } from "@/types";

interface PricingCardProps {
  name: string;
  type: PlanType;
  icon: LucideIcon;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  variant: "default" | "outline";
  popular: boolean;
  onSelect: () => void;
  index: number;
  currentPlan: PlanType;
}

const PricingCard = ({
  name,
  type,
  icon: Icon,
  price,
  period,
  description,
  features,
  cta,
  variant,
  popular,
  onSelect,
  index,
  currentPlan,
}: PricingCardProps) => {
  function isDisabled() {
    switch (currentPlan) {
      case PlanType.GRATUITO:
        return type === PlanType.GRATUITO;
      case PlanType.PRO:
        return type !== PlanType.PREMIUM;
      case PlanType.PREMIUM:
        return true;
    }
  }

  return (
    <Card
      className={`relative p-8 animate-slide-up ${
        popular
          ? "border-primary shadow-glow lg:scale-105"
          : "hover:shadow-card"
      } transition-all duration-300`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary text-primary-foreground">
          Mais Popular
        </Badge>
      )}

      <div className="text-center mb-6">
        <div
          className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
            popular ? "bg-gradient-primary" : "bg-primary/10"
          }`}
        >
          <Icon
            className={`w-8 h-8 ${
              popular ? "text-primary-foreground" : "text-primary"
            }`}
          />
        </div>

        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>

        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground">{period}</span>
        </div>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        variant={variant}
        className="w-full"
        onClick={onSelect}
        disabled={isDisabled()}
      >
        {cta}
      </Button>
    </Card>
  );
};

export default PricingCard;
