import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import GoogleLoginButton from "@/components/shared/GoogleLoginButton";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    navigate("/dashboard");
  };

  return (
    <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-4">
      <div className="container mx-auto text-center">
        <AnimatedSection className="max-w-4xl mx-auto" amount={0.3}>
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 mb-4 md:mb-6 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" />
            <span className="text-xs md:text-sm font-medium">
              Nunca mais perca uma queda de preço
            </span>
          </div>

          <h1 className="mb-4 md:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight">
            Monitore Preços,
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Economize Dinheiro
            </span>
          </h1>

          <p className="mb-8 md:mb-10 text-base md:text-xl text-muted-foreground max-w-xl mx-auto px-4">
            Acompanhe preços de produtos de plataformas como Mercado Livre,
            Amazon e Shopee. Receba alertas instantâneos quando os preços
            caírem.
          </p>

          <Button
            variant="secondary"
            size="lg"
            onClick={handleGoogleLogin}
            className="shadow-xl hover:shadow-2xl bg-gradient-primary text-white hover:scale-105"
          >
            Começar Gratuitamente
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default HeroSection;
