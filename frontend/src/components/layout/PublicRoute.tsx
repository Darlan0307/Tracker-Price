import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts";
import { LoadingScreen } from "../animations/LoadingScreen";

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
    return <LoadingScreen />;
  }

  if (redirectIfAuthenticated && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
