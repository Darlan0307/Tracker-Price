export enum PlanType {
  GRATUITO = "GRATUITO",
  PRO = "PRO",
  PREMIUM = "PREMIUM",
}

export type User = {
  id: string;
  providerId: string | null;
  providerName: string | null;
  email: string;
  name: string | null;
  image: string | null;
  planType: PlanType;
  qtdMonitoredProducts: number;
  acceptEmailNotification: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type UpdateConfigNotification = {
  acceptEmailNotification: boolean;
};
