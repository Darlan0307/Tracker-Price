import { Card } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/shared/AnimatedSection";

const platforms = [
  {
    name: "Mercado Livre",
    description: "Maior marketplace do Brasil",
    color: "from-primary/20 to-primary/10",
    iconColor: "text-primary"
  },
  {
    name: "Shopee",
    description: "Compras online populares",
    color: "from-orange-500/20 to-orange-500/10",
    iconColor: "text-orange-500"
  },
  {
    name: "Amazon",
    description: "E-commerce global",
    color: "from-blue-500/20 to-blue-500/10",
    iconColor: "text-blue-500"
  },
  {
    name: "Magalu",
    description: "Magazine Luiza",
    color: "from-blue-600/20 to-blue-600/10",
    iconColor: "text-blue-600"
  },
  {
    name: "Americanas",
    description: "Variedade de produtos",
    color: "from-red-500/20 to-red-500/10",
    iconColor: "text-red-500"
  },
  {
    name: "KaBuM!",
    description: "Tecnologia e games",
    color: "from-orange-600/20 to-orange-600/10",
    iconColor: "text-orange-600"
  },
  {
    name: "Casas Bahia",
    description: "Eletrodomésticos e móveis",
    color: "from-yellow-600/20 to-yellow-600/10",
    iconColor: "text-yellow-600"
  }
];

const PlatformsCarousel = () => {
  return (
    <section className="py-12 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Plataformas Suportadas</h2>
          <p className="text-muted-foreground text-sm md:text-lg">
            Monitore preços nas principais plataformas de e-commerce do Brasil
          </p>
        </AnimatedSection>
      </div>

      <div className="relative w-full py-4 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />
        
        <motion.div
          className="flex gap-4 md:gap-6"
          animate={{
            x: [0, -1680],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {[...Array(3)].map((_, arrayIndex) => (
            <div key={arrayIndex} className="flex gap-4 md:gap-6 flex-shrink-0">
              {platforms.map((platform, index) => (
                <div key={index} className="w-[200px] md:w-[220px] flex-shrink-0 group">
                  <Card className="h-full p-4 md:p-6 text-center bg-card/50 backdrop-blur-sm border-2 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className={`w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 bg-gradient-to-br ${platform.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <ShoppingCart className={`w-6 h-6 md:w-7 md:h-7 ${platform.iconColor}`} />
                    </div>
                    <h3 className="font-bold text-sm md:text-base mb-1">{platform.name}</h3>
                    <p className="text-xs text-muted-foreground">{platform.description}</p>
                  </Card>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformsCarousel;
