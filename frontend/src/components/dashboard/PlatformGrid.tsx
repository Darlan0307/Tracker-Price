import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

interface Platform {
  name: string;
  description: string;
  color: string;
  iconColor: string;
  available: boolean;
}

const platforms: Platform[] = [
  {
    name: "Mercado Livre",
    description: "Maior marketplace",
    color: "from-primary/20 to-primary/10",
    iconColor: "text-primary",
    available: true,
  },
  {
    name: "Shopee",
    description: "Compras populares",
    color: "from-orange-500/20 to-orange-500/10",
    iconColor: "text-orange-500",
    available: false,
  },
  {
    name: "Amazon",
    description: "E-commerce global",
    color: "from-blue-500/20 to-blue-500/10",
    iconColor: "text-blue-500",
    available: false,
  },
  {
    name: "Magalu",
    description: "Magazine Luiza",
    color: "from-blue-600/20 to-blue-600/10",
    iconColor: "text-blue-600",
    available: false,
  },
  {
    name: "Americanas",
    description: "Variedade",
    color: "from-red-500/20 to-red-500/10",
    iconColor: "text-red-500",
    available: false,
  },
  {
    name: "KaBuM!",
    description: "Tecnologia",
    color: "from-orange-600/20 to-orange-600/10",
    iconColor: "text-orange-600",
    available: false,
  },
  {
    name: "Casas Bahia",
    description: "Eletrodomésticos",
    color: "from-yellow-600/20 to-yellow-600/10",
    iconColor: "text-yellow-600",
    available: false,
  },
];

const PlatformGrid = () => {
  return (
    <div className="mt-6">
      <h4 className="text-sm font-semibold mb-3 text-muted-foreground">
        Plataformas Compatíveis
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 min-[1250px]:grid-cols-7 max-[419px]:grid-cols-1 gap-3">
        {platforms.map((platform, index) => (
          <motion.div
            key={platform.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={platform.available ? { scale: 1.05 } : {}}
            className={`relative p-3 rounded-lg border-2 transition-all duration-300 ${
              platform.available
                ? "border-primary/30 bg-card hover:border-primary/50 hover:shadow-md cursor-pointer"
                : "border-border/30 bg-muted/30 opacity-60 cursor-not-allowed"
            }`}
          >
            {!platform.available && (
              <Badge
                variant="secondary"
                className="absolute -top-2 -right-2 text-[10px] px-1.5 py-0.5 bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30"
              >
                Em breve
              </Badge>
            )}
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center flex-shrink-0`}
              >
                <ShoppingCart className={`w-4 h-4 ${platform.iconColor}`} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold truncate">
                  {platform.name}
                </p>
                <p className="text-[10px] text-muted-foreground truncate">
                  {platform.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PlatformGrid;
