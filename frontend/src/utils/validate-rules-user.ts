import { PlanType, User } from "@/types";

export const maxProductsByPlan = {
  [PlanType.GRATUITO]: 1,
  [PlanType.PRO]: 5,
  [PlanType.PREMIUM]: 20,
};

export const userCanAddProduct = (user: User): boolean => {
  return user.qtdMonitoredProducts < maxProductsByPlan[user.planType];
};
