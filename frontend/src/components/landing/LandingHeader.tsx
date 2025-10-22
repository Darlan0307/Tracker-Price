import Logo from "@/components/shared/Logo";
import GoogleLoginButton from "@/components/shared/GoogleLoginButton";

const LandingHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <Logo />
        <GoogleLoginButton
          variant="default"
          size="sm"
          className="text-sm md:text-base"
        />
      </div>
    </header>
  );
};

export default LandingHeader;
