import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onRemove: (id: string) => void;
  index: number;
}

const ProductCard = ({ product, onRemove, index }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const calculateDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  const discount = calculateDiscount(product.originalPrice, product.currentPrice);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Card className="overflow-hidden hover:shadow-glow transition-all duration-300">
        <div className="relative group">
          <div className={`aspect-video bg-muted ${!imageLoaded ? 'animate-pulse' : ''}`}>
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <Badge className="absolute top-3 right-3 bg-background/90 text-foreground">
            {product.platform}
          </Badge>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    R$ {product.currentPrice.toFixed(2)}
                  </span>
                  {discount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      <Badge variant="default" className="bg-accent text-accent-foreground">
                        -{discount}%
                      </Badge>
                    </motion.div>
                  )}
                </div>
                {product.originalPrice > product.currentPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    R$ {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="outline" 
                className="w-full group"
                onClick={() => window.open(product.url, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                Ver Produto
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onRemove(product.id)}
                className="hover:bg-destructive hover:text-destructive-foreground transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
