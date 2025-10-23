import { createContext, useContext, ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types";
import { apiClient } from "@/lib";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refetchUser: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["auth-me"],
    queryFn: async () => {
      const response = await apiClient<User>("/auth/me");

      if (!response.ok) {
        return null;
      }
      return response.data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const logout = async () => {
    try {
      await apiClient("/auth/logout");
      queryClient.setQueryData(["auth-me"], null);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const value: AuthContextType = {
    user: user ?? null,
    isLoading,
    isAuthenticated: !!user,
    refetchUser: () => {
      refetch();
    },
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
