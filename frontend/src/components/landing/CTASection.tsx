import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AnimatedSection from "@/components/shared/AnimatedSection";

const CTASection = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    navigate("/dashboard");
  };

  return (
    <section className="py-12 md:py-24 bg-gradient-primary relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      <AnimatedSection
        className="container mx-auto text-center relative z-10"
        amount={0.3}
      >
        <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-primary-foreground px-4">
          Pronto para Começar a Economizar?
        </h2>
        <p className="text-base md:text-xl mb-6 md:mb-8 text-primary-foreground/90 max-w-xl mx-auto px-4">
          Junte-se a milhares de compradores inteligentes que nunca mais pagam a
          mais
        </p>
        <Button
          variant="secondary"
          size="lg"
          onClick={handleGoogleLogin}
          className="shadow-xl hover:shadow-2xl"
        >
          Começar Gratuitamente
        </Button>
      </AnimatedSection>
    </section>
  );
};

export default CTASection;
