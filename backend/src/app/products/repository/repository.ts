import { NewProductData, Product } from "../types"

export interface ProductRepository {
  save(data: NewProductData): Promise<Product>
}
