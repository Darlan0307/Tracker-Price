export interface Product {
  id: string;
  name: string;
  currentPrice: number;
  originalPrice: number;
  imageUrl: string;
  platform: "Mercado Livre" | "Shopee" | "AliExpress";
  url: string;
  priceHistory: { date: string; price: number }[];
}
