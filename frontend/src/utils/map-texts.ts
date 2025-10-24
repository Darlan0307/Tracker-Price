import { PlanType, PlatformType } from "@/types";

export function mapPlatform(platformType: PlatformType): string {
  switch (platformType) {
    case PlatformType.MERCADO_LIVRE:
      return "Mercado Livre";
    // case PlatformType.AMAZON:
    //   return "Amazon";
    // case PlatformType.MAGALU:
    //   return "Magalu";
    // case PlatformType.AMERICANAS:
    //   return "Americanas";
    // case PlatformType.KABUM:
    //   return "Kabum";
    // case PlatformType.CASAS_BAHIA:
    //   return "Casas Bahia";
    default:
      return "Desconhecido";
  }
}

export function mapPlan(planType: PlanType): string {
  switch (planType) {
    case "GRATUITO":
      return "Gratuito";
    case "PRO":
      return "Pro";
    case "PREMIUM":
      return "Premium";
    default:
      return "Gratuito";
  }
}
