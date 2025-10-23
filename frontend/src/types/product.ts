export enum PlatformType {
  MERCADO_LIVRE = "MERCADO_LIVRE",
}

export type Product = {
  id: string;
  userId: string;
  name: string;
  image: string;
  classification: number | null;
  platform: PlatformType;
  currentPrice: number;
  oldPrice: number | null;
  link: string;
  discountPercentage: number | null;
  discountAmount: number | null;
  currency: string;
  scrapedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
