import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/types/product";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatPrice, mapPlatform } from "@/utils";

interface ProductCardProps {
  product: Product;
  onRemove: (id: string) => void;
  index: number;
}

const ProductCard = ({ product, onRemove, index }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Card className="overflow-hidden hover:shadow-glow transition-all duration-300">
        <div className="relative group">
          <div
            className={`aspect-video bg-muted ${
              !imageLoaded ? "animate-pulse" : ""
            }`}
          >
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <Badge className="absolute top-3 right-3 bg-background/90 text-foreground">
            {mapPlatform(product.platform)}
          </Badge>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    {formatPrice(product.currentPrice, product.currency)}
                  </span>
                  {product.discountPercentage > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 15,
                      }}
                    >
                      <Badge
                        variant="default"
                        className="bg-accent text-accent-foreground relative -top-2"
                      >
                        {product.discountPercentage}% OFF
                      </Badge>
                    </motion.div>
                  )}
                </div>
                {product.oldPrice > product.currentPrice ? (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.oldPrice, product.currency)}
                  </span>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Atualmente o produto está sem desconto
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <motion.div
              className="flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className="w-full group"
                onClick={() => window.open(product.link, "_blank")}
                disabled={product.name === "Carregando..."}
              >
                <ExternalLink className="w-4 h-4 mr-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                Ver Produto
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    disabled={product.name === "Carregando..."}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Tem certeza que deseja remover este produto?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita, o produto será removido
                      permanentemente.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onRemove(product.id)}>
                      Confirmar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
