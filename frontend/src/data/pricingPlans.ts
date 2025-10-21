import { Sparkles, Zap, Crown } from "lucide-react";

export const pricingPlans = [
  {
    name: "Gratuito",
    icon: Sparkles,
    price: "R$ 0",
    period: "/mês",
    description: "Perfeito para começar",
    features: [
      "Monitore até 3 produtos",
      "Notificações por email",
      "Verificação diária de preços",
      "Histórico de 7 dias",
      "Suporte básico"
    ],
    cta: "Plano Atual",
    variant: "outline" as const,
    popular: false
  },
  {
    name: "Pro",
    icon: Zap,
    price: "R$ 19,90",
    period: "/mês",
    description: "Para economizadores sérios",
    features: [
      "Monitore até 20 produtos",
      "Email + WhatsApp",
      "Verificação em tempo real",
      "Histórico de 90 dias",
      "Suporte prioritário",
      "Metas de preço customizadas",
      "Exportar dados de preços"
    ],
    cta: "Atualizar para Pro",
    variant: "default" as const,
    popular: true
  },
  {
    name: "Premium",
    icon: Crown,
    price: "R$ 39,90",
    period: "/mês",
    description: "Para usuários avançados",
    features: [
      "Produtos ilimitados",
      "Todos os canais de notificação",
      "Monitoramento instantâneo",
      "Histórico ilimitado",
      "Suporte dedicado",
      "Análises avançadas",
      "Acesso à API",
      "Colaboração em equipe",
      "Integrações customizadas"
    ],
    cta: "Atualizar para Premium",
    variant: "default" as const,
    popular: false
  }
];
