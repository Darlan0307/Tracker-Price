import { Card } from "@/components/ui/card";
import { Link2, Clock, Bell, DollarSign, TrendingDown } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { motion, Variants } from "framer-motion";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const features = [
  {
    icon: Link2,
    title: "Pesquise Produtos",
    description:
      "Simplesmente copie e cole o link de qualquer produto ou pesquise pelo nome de um produto das plataformas como Mercado Livre, Amazon e Shopee",
  },
  {
    icon: Clock,
    title: "Monitoramento Automático",
    description:
      "Acompanhamos o preço do produto 24/7, verificando mudanças de preço regularmente",
  },
  {
    icon: Bell,
    title: "Receba Alertas",
    description:
      "Quando o preço cair, você recebe notificação por Email ou WhatsApp na hora",
  },
  {
    icon: DollarSign,
    title: "Economize Dinheiro",
    description: "Compre no momento certo e economize com as melhores ofertas",
  },
];

const WhatIsSection = () => {
  return (
    <section className="py-12 md:py-24 px-4">
      <div className="container mx-auto">
        <AnimatedSection className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
            O que é o Track Price?
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto px-4">
            Uma plataforma inteligente que monitora preços de produtos nas
            principais lojas online do Brasil e do mundo
          </p>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto"
        >
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeInUp} className="relative">
            <Card className="p-8 bg-gradient-card shadow-glow">
              <div className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-16 h-16 text-primary animate-float" />
                </div>
                <h3 className="text-2xl font-bold">Monitore Seus Produtos</h3>
                <p className="text-muted-foreground">
                  Adicione quantos produtos quiser e receba alertas quando os
                  preços baixarem
                </p>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIsSection;
