import { useState } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TrendingDown } from "lucide-react";
import AuthHeader from "@/components/AuthHeader";
import AddProductSection from "@/components/dashboard/AddProductSection";
import UpgradeCTA from "@/components/dashboard/UpgradeCTA";
import ProductCard from "@/components/dashboard/ProductCard";
import { Product } from "@/types/product";

const Dashboard = () => {
  const navigate = useNavigate();
  const [productUrl, setProductUrl] = useState("");
  const currentPlan = "Gratuito"; // TODO: Get from user data
  const maxProducts =
    currentPlan === "Gratuito" ? 1 : currentPlan === "Pro" ? 10 : 50;

  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Smartphone Samsung Galaxy A54",
      currentPrice: 1599.99,
      originalPrice: 1999.99,
      imageUrl:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
      platform: "Mercado Livre",
      url: "#",
      priceHistory: [
        { date: "2024-01", price: 1999.99 },
        { date: "2024-02", price: 1899.99 },
        { date: "2024-03", price: 1599.99 },
      ],
    },
    {
      id: "2",
      name: "Headphone Bluetooth JBL",
      currentPrice: 299.99,
      originalPrice: 449.99,
      imageUrl:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      platform: "Shopee",
      url: "#",
      priceHistory: [
        { date: "2024-01", price: 449.99 },
        { date: "2024-02", price: 399.99 },
        { date: "2024-03", price: 299.99 },
      ],
    },
  ]);

  const handleAddProduct = () => {
    if (!productUrl.trim()) {
      toast.error("Por favor, insira uma URL de produto");
      return;
    }

    if (products.length >= maxProducts) {
      toast.error(
        `Você atingiu o limite de ${maxProducts} produto(s) do plano ${currentPlan}`,
        {
          action: {
            label: "Fazer Upgrade",
            onClick: () => navigate("/pricing"),
          },
        }
      );
      return;
    }

    const supportedDomains = [
      "mercadolivre.com",
      "shopee.com",
      "aliexpress.com",
    ];
    const isSupported = supportedDomains.some((domain) =>
      productUrl.includes(domain)
    );

    if (!isSupported) {
      toast.error(
        "Por favor, insira uma URL válida do Mercado Livre, Shopee ou AliExpress"
      );
      return;
    }

    toast.success("Produto adicionado com sucesso! Estamos monitorando agora.");
    setProductUrl("");
  };

  const handleRemoveProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    toast.success("Produto removido do monitoramento");
  };

  const handleUpgradeClick = () => {
    navigate("/pricing");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <AuthHeader currentPlan={currentPlan} />

      <div className="container mx-auto px-4 py-4 md:py-8">
        <AddProductSection
          productUrl={productUrl}
          setProductUrl={setProductUrl}
          onAddProduct={handleAddProduct}
          currentPlan={currentPlan}
          productsLength={products.length}
          maxProducts={maxProducts}
          onUpgradeClick={handleUpgradeClick}
        />

        <UpgradeCTA
          currentPlan={currentPlan}
          onUpgradeClick={handleUpgradeClick}
          hasProducts={products.length > 0}
        />

        {/* Products Grid */}
        <div>
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-lg md:text-2xl font-semibold">
              Produtos Monitorados ({products.length}/{maxProducts})
            </h2>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onRemove={handleRemoveProduct}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="p-12 text-center bg-gradient-card shadow-card">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <TrendingDown className="w-20 h-20 mx-auto mb-6 text-primary" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-3">
                  Nenhum Produto Ainda
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Adicione seu primeiro produto acima para começar a monitorar
                  preços e economizar dinheiro
                </p>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
