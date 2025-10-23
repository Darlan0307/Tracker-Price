import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShoppingCart,
  ExternalLink,
  Search,
  Zap,
  Crown,
  Lock,
  Package,
} from "lucide-react";
import { motion } from "framer-motion";
import PlatformGrid from "./PlatformGrid";

interface AddProductSectionProps {
  productUrl: string;
  setProductUrl: (url: string) => void;
  onAddProduct: () => void;
  currentPlan: string;
  productsLength: number;
  maxProducts: number;
  onUpgradeClick: () => void;
  disabled: boolean;
}

const AddProductSection = ({
  productUrl,
  setProductUrl,
  onAddProduct,
  currentPlan,
  productsLength,
  maxProducts,
  onUpgradeClick,
  disabled,
}: AddProductSectionProps) => {
  const isLimitReached = productsLength >= maxProducts;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="p-6 md:p-8 mb-8 shadow-glow border-2 border-primary/10 bg-gradient-to-br from-card via-card to-primary/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-primary opacity-5 blur-3xl rounded-full -mr-32 -mt-32"></div>

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
            <div className="flex items-center gap-3">
              <motion.div
                className="p-3 rounded-xl bg-gradient-primary"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
              </motion.div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Adicionar Produto
                </h2>
                <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                  Escolha como adicionar seu produto
                </p>
              </div>
            </div>
            {isLimitReached && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Badge
                  variant="destructive"
                  className="animate-pulse text-xs shadow-lg"
                >
                  <Lock className="w-3 h-3 mr-1" />
                  Limite Atingido
                </Badge>
              </motion.div>
            )}
          </div>

          <Tabs defaultValue="link" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="link" className="text-xs md:text-sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                Por Link
              </TabsTrigger>
              <TabsTrigger value="name" className="text-xs md:text-sm relative">
                <Search className="w-4 h-4 mr-2" />
                Por Nome
                <Badge
                  variant="outline"
                  className="ml-2 text-[10px] px-2 py-0.5 hidden sm:inline-flex bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 font-semibold"
                >
                  Em desenvolvimento
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="link" className="space-y-4 mt-0">
              <div className="hidden md:block">
                <PlatformGrid />
              </div>
              <div className="space-y-4 mt-6">
                <div className="relative sm:w-full">
                  <Input
                    placeholder="https://www.mercadolivre.com.br/produto/..."
                    value={productUrl}
                    onChange={(e) => setProductUrl(e.target.value)}
                    className="flex-1 text-sm h-12 pl-12 pr-4 border-2 focus:border-primary/50 transition-all bg-background/50 backdrop-blur-sm"
                    disabled={isLimitReached || disabled}
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.div
                    className="flex-1"
                    whileHover={{ scale: isLimitReached ? 1 : 1.02 }}
                    whileTap={{ scale: isLimitReached ? 1 : 0.98 }}
                  >
                    <Button
                      onClick={onAddProduct}
                      className="shadow-glow w-full text-sm h-12 font-semibold"
                      disabled={isLimitReached || disabled}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Monitorar Produto
                    </Button>
                  </motion.div>

                  {currentPlan === "Gratuito" && isLimitReached && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="sm:w-auto"
                    >
                      <Button
                        variant="outline"
                        onClick={onUpgradeClick}
                        className="w-full sm:w-auto text-sm h-12 border-2 border-primary/30 hover:border-primary/50"
                      >
                        <Crown className="w-4 h-4 mr-2" />
                        Fazer Upgrade
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>

              <motion.div
                className="mt-4 p-3 rounded-lg bg-muted/50 border border-border/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-xs text-muted-foreground text-center">
                  💡 <span className="font-medium">Dica:</span> Cole o link
                  completo do produto de umas das plataformas disponíveis
                </p>
              </motion.div>
              <div className="block md:hidden">
                <PlatformGrid />
              </div>
            </TabsContent>

            <TabsContent value="name" className="space-y-4 mt-0">
              <div className="text-center py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-20 h-20 mx-auto mb-4 bg-amber-500/10 rounded-full flex items-center justify-center"
                >
                  <Search className="w-10 h-10 text-amber-500" />
                </motion.div>
                <h3 className="text-lg font-semibold mb-2">
                  Funcionalidade em Desenvolvimento
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto px-4">
                  Em breve você poderá adicionar produtos apenas digitando o
                  nome. Estamos trabalhando para trazer essa funcionalidade o
                  mais rápido possível!
                </p>
                <Badge
                  variant="outline"
                  className="mt-4 bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 font-semibold"
                >
                  Disponível em breve
                </Badge>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </motion.div>
  );
};

export default AddProductSection;
