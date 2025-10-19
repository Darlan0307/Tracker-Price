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
