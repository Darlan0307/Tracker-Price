import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { DataListResponse, PaginationRequest, Product } from "@/types";
import { buildQueryParams } from "@/utils";
import { useMemo } from "react";

type CreateProductInput = {
  link: string;
};

const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters?: PaginationRequest) =>
    [...productKeys.lists(), filters] as const,
};

type UseProductsParams = {
  pagination?: PaginationRequest;
};

export function useProducts(params?: UseProductsParams) {
  const queryClient = useQueryClient();

  const pagination = useMemo(() => params?.pagination, [params?.pagination]);
  const queryKey = useMemo(() => productKeys.list(pagination), [pagination]);

  const getProducts = useQuery({
    queryKey,
    queryFn: async () => {
      const queryParams = buildQueryParams(pagination);

      const url = `/products?${queryParams}`;
      const response = await apiClient<DataListResponse<Product>>(url);

      if (response.ok === false) throw new Error(response.errorMessage);

      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const createProduct = useMutation({
    mutationFn: async (newProduct: CreateProductInput) => {
      const response = await apiClient<Product>("/products", {
        method: "POST",
        body: newProduct,
      });

      if (response.ok === false) throw new Error(response.errorMessage);

      return response.data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: productKeys.lists() });

      const previousData =
        queryClient.getQueryData<DataListResponse<Product>>(queryKey);

      if (previousData) {
        queryClient.setQueryData(queryKey, {
          ...previousData,
          data: [
            {
              id: "temp",
              userId: "temp",
              name: "Carregando...",
              image: "temp",
              classification: null,
              platform: "temp",
              currentPrice: 0,
              oldPrice: null,
              link: "#",
              discountPercentage: null,
              discountAmount: null,
              currency: "BRL",
              scrapedAt: new Date(),
              createdAt: new Date(),
              updatedAt: new Date(),
              deletedAt: null,
            },
            ...previousData.data,
          ],
        });
      }

      return { previousData };
    },
    onError: (error, _, context) => {
      console.error("Erro ao criar produto:", error);
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });

  const deleteProduct = useMutation({
    mutationFn: async (productId: string) => {
      const response = await apiClient<{ message: string }>(
        `/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok === false) throw new Error(response.errorMessage);

      return { productId, ...response.data };
    },
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: productKeys.lists() });
      const previousData =
        queryClient.getQueryData<DataListResponse<Product>>(queryKey);

      if (previousData) {
        queryClient.setQueryData(queryKey, {
          ...previousData,
          data: previousData.data.filter((p) => p.id !== productId),
        });
      }

      return { previousData };
    },
    onError: (error, _, context) => {
      console.error("Erro ao deletar produto:", error);
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });

  return {
    products: getProducts.data?.data ?? [],
    totalRecords: getProducts.data?.totalRecords ?? 0,
    totalPages: getProducts.data?.totalPages ?? 0,
    currentPage: getProducts.data?.currentPage ?? 0,
    perPage: getProducts.data?.perPage ?? 0,
    isLoading: getProducts.isLoading,
    isError: getProducts.isError,
    error: getProducts.error,

    createProduct: createProduct.mutate,
    createProductAsync: createProduct.mutateAsync,
    isCreating: createProduct.isPending,
    createError: createProduct.error,

    deleteProduct: deleteProduct.mutate,
    deleteProductAsync: deleteProduct.mutateAsync,
    isDeleting: deleteProduct.isPending,
    deleteError: deleteProduct.error,

    refetch: getProducts.refetch,
  };
}
