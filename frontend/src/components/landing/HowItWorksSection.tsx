import { Card } from "@/components/ui/card";
import { TrendingDown, Bell, ShieldCheck } from "lucide-react";
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
    icon: TrendingDown,
    title: "Rastreamento Inteligente",
    description:
      "Cole qualquer link ou nome de produto de plataformas como Mercado Livre e nós monitoramos 24/7",
  },
  {
    icon: Bell,
    title: "Notificações Instantâneas",
    description:
      "Receba alertas via Email ou WhatsApp no momento que os preços caírem abaixo do seu objetivo",
  },
  {
    icon: ShieldCheck,
    title: "Seguro e Confiável",
    description:
      "Seus dados são criptografados e protegidos. Monitore com confiança.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-12 md:py-24 bg-secondary/30 px-4">
      <div className="container mx-auto">
        <AnimatedSection className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
            Como Funciona
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg">
            Simples, poderoso e eficiente
          </p>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card
                className="p-8 bg-card shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1 animate-slide-up border-border/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
