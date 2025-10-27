import { PlatformType } from "@app/products/types"

export function validatePlatformLink(url: string, allowedPlatforms?: string[]): boolean {
  if (!url || typeof url !== "string") return false

  try {
    const parsedUrl = new URL(url)
    const hostname = parsedUrl.hostname.toLowerCase()

    const defaultPlatforms = [
      "mercadolivre.com.br",
      "mercadolivre.com"
      // "shopee.com.br",
      // "shopee.com",
      // "amazon.com.br",
      // "amazon.com",
      // "aliexpress.com",
      // "magazineluiza.com.br",
      // "kabum.com.br"
    ]

    const platforms = allowedPlatforms?.length ? allowedPlatforms : defaultPlatforms

    return platforms.some((domain) => hostname.includes(domain))
  } catch {
    return false
  }
}

export function mapPlatform(platformType: PlatformType): string {
  switch (platformType) {
    case PlatformType.MERCADO_LIVRE:
      return "Mercado Livre"
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
      return "Desconhecido"
  }
}

export function formatPrice(amountInCents: number, currency: string): string {
  const amount = amountInCents / 100

  return new Intl.NumberFormat(currency === "BRL" ? "pt-BR" : "en-US", {
    style: "currency",
    currency
  }).format(amount)
}
