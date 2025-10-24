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
import { mapPlan, validatePlatformLink } from "@/utils";
import { useProducts } from "@/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingScraping from "@/components/animations/LoadingScraping";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import PaginationComponent from "@/components/dashboard/PaginationComponent";
import { useAuth } from "@/contexts";
import {
  maxProductsByPlan,
  userCanAddProduct,
} from "@/utils/validate-rules-user";
import { PlanType } from "@/types";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [productUrl, setProductUrl] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const maxProducts = maxProductsByPlan[user?.planType] ?? 1;

  const {
    isLoading,
    products,
    totalRecords,
    totalPages,
    createProductAsync,
    isCreating,
    deleteProductAsync,
    isDeleting,
  } = useProducts({
    pagination: {
      page: currentPage,
      perPage: 10,
      withDeleted: false,
    },
  });

  const handleAddProduct = async () => {
    if (!validatePlatformLink(productUrl)) {
      toast.warning("Por favor, insira uma URL válida de umas das plataformas");
      return;
    }

    if (!userCanAddProduct(user)) {
      if (user.planType === PlanType.PREMIUM) {
        toast.warning(
          "Você já atingiu o limite de produtos permitidos para o plano Premium, estamos trabalhando para aumentar essa quantidade"
        );
        return;
      }

      toast.warning(
        `Você atingiu o limite de ${maxProducts} produto(s) do plano ${mapPlan(
          user.planType
        )}`,
        {
          action: {
            label: "Fazer Upgrade",
            onClick: () => navigate("/pricing"),
          },
        }
      );
      return;
    }

    try {
      await createProductAsync({
        link: productUrl,
      });
      toast.success(
        "Produto adicionado com sucesso! Estamos monitorando agora."
      );
      setProductUrl("");
    } catch (error) {
      toast.error("Erro ao adicionar produto. Por favor, tente novamente");
    }
  };

  const handleRemoveProduct = async (id: string) => {
    try {
      toast.warning("O produto está sendo removido...");
      const { message } = await deleteProductAsync(id);
      console.log(message);
      toast.success("Produto removido do monitoramento");
    } catch (error) {
      toast.error("Erro ao remover produto. Por favor, tente novamente");
    }
  };

  const handleUpgradeClick = () => {
    navigate("/pricing");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <AuthHeader />

      <div className="container mx-auto px-4 py-4 md:py-8">
        <AddProductSection
          productUrl={productUrl}
          setProductUrl={setProductUrl}
          onAddProduct={handleAddProduct}
          currentPlan={user.planType}
          productsLength={totalRecords}
          maxProducts={maxProducts}
          onUpgradeClick={handleUpgradeClick}
          disabled={isLoading || isCreating || isDeleting}
        />

        <UpgradeCTA
          currentPlan={user.planType}
          onUpgradeClick={handleUpgradeClick}
          isVisible={!userCanAddProduct(user)}
        />

        <div>
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-lg md:text-2xl font-semibold">
              Produtos Monitorados ({totalRecords}/{maxProducts})
            </h2>
          </div>

          {products.length > 0 && !isLoading && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-4">
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onRemove={handleRemoveProduct}
                    index={index}
                  />
                ))}
              </div>
              <PaginationComponent
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                totalPages={totalPages}
              />
            </div>
          )}

          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <Skeleton className="h-[250px]  rounded-xl bg-slate-400" />
              <Skeleton className="h-[250px]  rounded-xl bg-slate-400" />
              <Skeleton className="h-[250px]  rounded-xl bg-slate-400" />
            </div>
          )}

          {!products.length && !isLoading && (
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

      {isCreating && <LoadingScraping />}
      <DashboardFooter />
    </div>
  );
};

export default Dashboard;
