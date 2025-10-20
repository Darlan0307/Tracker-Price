import { truncateNumber } from "@app/products/helpers"
import { ProductDataStrategy, ScrapingStrategy } from "../product-scraper"
import { Page } from "puppeteer"

export class MercadoLivreStrategy implements ScrapingStrategy {
  async scrape(page: Page): Promise<ProductDataStrategy> {
    await page.waitForSelector("h1", { timeout: 10000 })

    const title = await page.evaluate(() => {
      const h1 = document.querySelector("h1.ui-pdp-title")
      return h1?.textContent?.trim() || ""
    })

    if (!title) throw new Error("PRODUCT_NOT_FOUND")

    const imageUrl = await page.evaluate(() => {
      const imgEl = document.querySelector(".ui-pdp-gallery__figure img")
      return imgEl?.getAttribute("src") || ""
    })

    if (!imageUrl) throw new Error("IMAGE_NOT_FOUND")

    const price = await page.evaluate(async () => {
      const priceElement = document.querySelector(
        '.ui-pdp-price__second-line meta[itemprop="price"]'
      )

      if (!priceElement) {
        return 0
      }

      const priceText = priceElement?.getAttribute("content")?.trim() || ""

      const cleaned = priceText.replace(/[^\d,.-]/g, "").replace(",", ".")
      return parseFloat(cleaned) || 0
    })

    if (!price) throw new Error("PRICE_NOT_FOUND")

    const oldPrice = await page.evaluate(() => {
      const containerOldPrice = document.querySelector("span.ui-pdp-price__part__container")

      if (!containerOldPrice) {
        return null
      }

      const oldPriceElement = containerOldPrice.querySelector("span.andes-money-amount__fraction")
      const oldCentsElement = containerOldPrice.querySelector("span.andes-money-amount__cents")

      const oldPriceText = oldPriceElement?.textContent?.trim() || ""
      let oldPrice = 0

      const cleaned = oldPriceText.replace(/[^\d,.-]/g, "").replace(",", ".")
      oldPrice = parseFloat(cleaned) || 0

      if (oldCentsElement) {
        const oldCentsText = oldCentsElement?.textContent?.trim() || ""
        const cleanedCents = oldCentsText.replace(/[^\d,.-]/g, "").replace(",", ".")
        oldPrice += parseFloat(cleanedCents) / 100 || 0
      }

      return oldPrice || null
    })

    const currency = await page.evaluate(() => {
      const currencyElement = document.querySelector("span.andes-money-amount__currency-symbol")
      return currencyElement?.textContent?.trim() || ""
    })

    const productPriceToCents = price * 100
    const oldPriceToCents = oldPrice ? oldPrice * 100 : undefined
    const discountPercentage = oldPrice ? ((oldPrice - price) / oldPrice) * 100 : undefined
    const discountAmountToCents = oldPriceToCents
      ? productPriceToCents - oldPriceToCents
      : undefined

    return {
      name: title,
      image: imageUrl,
      classification: undefined,
      currency: currency === "R$" ? "BRL" : "USD",
      currentPrice: productPriceToCents,
      oldPrice: oldPriceToCents,
      discountPercentage: discountPercentage ? truncateNumber(discountPercentage, 2) : undefined,
      discountAmount: discountAmountToCents
    }
  }
}
