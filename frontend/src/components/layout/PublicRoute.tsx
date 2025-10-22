import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts";
import { Loader2 } from "lucide-react";

interface PublicRouteProps {
  children: ReactNode;
  redirectIfAuthenticated?: boolean;
}

export function PublicRoute({
  children,
  redirectIfAuthenticated = false,
}: PublicRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      // TODO: Criar uma animação melhor
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (redirectIfAuthenticated && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
