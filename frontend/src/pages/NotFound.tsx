import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="mb-4 text-4xl md:text-6xl font-bold">404</h1>
        <p className="mb-6 text-lg md:text-xl text-muted-foreground">Oops! Página não encontrada</p>
        <a href="/" className="text-primary underline hover:opacity-80 transition-opacity text-sm md:text-base">
          Voltar para o Início
        </a>
      </div>
    </div>
  );
};

export default NotFound;
