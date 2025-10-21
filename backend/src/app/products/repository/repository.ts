import { DataListResponse, PaginationRequest } from "@app/global-types"
import { NewProductData, Product, UpdateProductData } from "../types"

export interface ProductRepository {
  save(data: NewProductData): Promise<Product>
  update(id: string, data: UpdateProductData): Promise<Product>
  get(id: string): Promise<Product | null>
  list(userId: string, queries: PaginationRequest): Promise<DataListResponse<Product>>
  delete(id: string): Promise<void>
}
