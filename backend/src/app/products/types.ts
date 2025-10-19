export enum PlatformType {
  MERCADO_LIVRE = "MERCADO_LIVRE"
}

export type Product = {
  id: string
  userId: string
  name: string
  image: string
  classification: number | null
  platform: PlatformType
  currentPrice: number
  oldPrice: number
  link: string
  discountPercentage: number
  discountAmount: number
  currency: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export type NewProductData = {
  userId: string
  name: string
  image: string
  classification?: number
  platform: PlatformType
  currentPrice: number
  oldPrice: number
  link: string
  discountPercentage?: number
  discountAmount?: number
  currency: string
}
