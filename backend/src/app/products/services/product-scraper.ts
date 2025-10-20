import puppeteer, { Browser, Page } from "puppeteer"
import { ProductScraperData } from "../types"
import { NotFoundError, ProductScraperError } from "@infra/errors"
import { logger } from "@infra/logger"
import { MercadoLivreStrategy } from "./platform-scrapers"

export interface ScraperConfig {
  maxRetries?: number
  retryDelay?: number
  timeout?: number
  userAgent?: string
}

export type ProductDataStrategy = Omit<ProductScraperData, "link" | "platform" | "scrapedAt">

export enum Platform {
  MERCADO_LIVRE = "MERCADO_LIVRE",
  // AMAZON = "Amazon",
  // MAGALU = "Magalu",
  // AMERICANAS = "Americanas",
  // KABUM = "Kabum",
  // CASAS_BAHIA = "Casas Bahia",
  UNKNOWN = "UNKNOWN"
}

export interface ScrapingStrategy {
  scrape(page: Page): Promise<ProductDataStrategy>
}

// const cleanText = (text?: string | null): string => {
//   return text?.trim() || ""
// }

// const extractPrice = (priceText: string): number => {
//   const cleaned = priceText.replace(/[^\d,.-]/g, "").replace(",", ".")
//   return parseFloat(cleaned) || 0
// }

export class ProductScraper {
  private browser: Browser | null = null
  private config: Required<ScraperConfig>
  private strategies: Map<Platform, ScrapingStrategy>

  constructor(config: ScraperConfig = {}) {
    this.config = {
      maxRetries: config.maxRetries ?? 3,
      retryDelay: config.retryDelay ?? 2000,
      timeout: config.timeout ?? 30000,
      userAgent:
        config.userAgent ??
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }

    this.strategies = new Map([
      [Platform.MERCADO_LIVRE, new MercadoLivreStrategy()]
      // [Platform.AMAZON, new AmazonStrategy()],
      // [Platform.MAGALU, new MagaluStrategy()],
      // [Platform.AMERICANAS, new AmericanasStrategy()],
      // [Platform.KABUM, new KabumStrategy()],
      // [Platform.CASAS_BAHIA, new CasasBahiaStrategy()]
    ])
  }

  async initialize(): Promise<void> {
    try {
      this.browser = await puppeteer.launch({
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-accelerated-2d-canvas",
          "--disable-gpu",
          "--disable-blink-features=AutomationControlled",
          "--disable-features=IsolateOrigins,site-per-process",
          "--disable-web-security",
          "--window-size=1920,1080"
        ]
      })
    } catch (error) {
      throw new ProductScraperError(
        "Erro ao inicializar o navegador: " + JSON.stringify(error, null, 2)
      )
    }
  }

  async close(): Promise<void> {
    if (this.browser) {
      try {
        await this.browser.close()
      } catch (error) {
        throw new ProductScraperError(
          "Erro ao fechar o navegador: " + JSON.stringify(error, null, 2)
        )
      } finally {
        this.browser = null
      }
    }
  }

  async scrapeProduct(
    link: string
  ): Promise<ProductScraperData | ProductScraperError | NotFoundError> {
    if (!this.browser) {
      return new ProductScraperError("Browser não inicializado. Chame initialize() primeiro.")
    }

    const platform = this.identifyPlatform(link)
    if (platform === Platform.UNKNOWN) {
      return new NotFoundError(
        "Plataforma não suportada. URLs suportadas: Mercado Livre, Amazon, Magalu, Americanas, Kabum, Casas Bahia"
      )
    }

    const strategy = this.strategies.get(platform)
    if (!strategy) {
      return new NotFoundError("Estratégia de scraping não encontrada para a plataforma")
    }

    let lastError: Error | null = null

    for (let attempt = 1; attempt <= this.config.maxRetries; attempt++) {
      const page = await this.browser.newPage()

      try {
        await this.setupPage(page)

        logger.info(`\n[${platform}] Tentativa ${attempt}: Acessando ${link}...`)

        await page.goto(link, {
          waitUntil: "domcontentloaded",
          timeout: this.config.timeout
        })

        logger.info(`[${platform}] Página carregada, aguardando...`)
        await this.delay(2000)

        await page.evaluate(() => {
          window.scrollBy(0, 100)
        })

        await this.delay(500)

        const scrapedData = await strategy.scrape(page)

        await page.close()

        logger.info(`✓ [${platform}] Scraping realizado com sucesso na tentativa ${attempt}`)

        return {
          link,
          ...scrapedData,
          scrapedAt: new Date(),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          platform: platform as any
        }
      } catch (error) {
        lastError = error as Error

        // try {
        //   await page.screenshot({
        //     path: `debug-${platform.toLowerCase().replace(/\s/g, "-")}-${attempt}.png`,
        //     fullPage: true
        //   })
        // } catch (screenshotError) {
        //   console.log("Erro ao tirar screenshot:", (screenshotError as Error).message)
        // }

        await page.close()

        if (attempt < this.config.maxRetries) {
          await this.delay(this.config.retryDelay)
          continue
        }

        if (lastError.message === "PRODUCT_NOT_FOUND") {
          return new NotFoundError("Não foi possível encontrar o produto na página")
        }

        if (lastError.message === "IMAGE_NOT_FOUND") {
          return new NotFoundError("Não foi possível encontrar a imagem do produto na página")
        }

        if (lastError.message === "PRICE_NOT_FOUND") {
          return new NotFoundError("Não foi possível encontrar o preço do produto na página")
        }
      }
    }

    return new ProductScraperError(
      `[${platform}] Falha ao fazer scraping após ${this.config.maxRetries} tentativas. Último erro: ${lastError?.message}`
    )
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  private identifyPlatform(link: string): Platform {
    const urlLower = link.toLowerCase()

    if (urlLower.includes("mercadolivre.com") || urlLower.includes("mercadolibre.com")) {
      return Platform.MERCADO_LIVRE
    }
    // if (urlLower.includes("amazon.com")) {
    //   return Platform.AMAZON
    // }
    // if (urlLower.includes("magazineluiza.com") || urlLower.includes("magalu.com")) {
    //   return Platform.MAGALU
    // }
    // if (urlLower.includes("americanas.com")) {
    //   return Platform.AMERICANAS
    // }
    // if (urlLower.includes("kabum.com")) {
    //   return Platform.KABUM
    // }
    // if (urlLower.includes("casasbahia.com")) {
    //   return Platform.CASAS_BAHIA
    // }

    return Platform.UNKNOWN
  }

  private async setupPage(page: Page): Promise<void> {
    await page.setExtraHTTPHeaders({
      "User-Agent": this.config.userAgent,
      "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
      "Upgrade-Insecure-Requests": "1"
    })

    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, "webdriver", {
        get: () => false
      })

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
      window.navigator.chrome = {
        runtime: {}
      }

      Object.defineProperty(navigator, "plugins", {
        get: () => [1, 2, 3, 4, 5]
      })

      Object.defineProperty(navigator, "languages", {
        get: () => ["pt-BR", "pt", "en-US", "en"]
      })
    })

    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1
    })
  }
}

// // Shopee

// // AMAZON
// class AmazonStrategy implements ScrapingStrategy {
//   async scrape(page: Page): Promise<ProductDataStrategy> {
//     await page.waitForSelector("#productTitle, h1", { timeout: 10000 })

//     const title = await page.evaluate(() => {
//       const titleEl = document.querySelector("#productTitle") || document.querySelector("h1")
//       return titleEl?.textContent?.trim() || ""
//     })

//     if (!title) throw new Error("PRODUCT_NOT_FOUND")

//     return {
//       name: title,
//       image: "test",
//       classification: undefined,
//       currency: "BRL",
//       currentPrice: 1,
//       oldPrice: 1,
//       discountPercentage: undefined,
//       discountAmount: undefined
//     }
//   }
// }

// // MAGALU
// class MagaluStrategy implements ScrapingStrategy {
//   async scrape(page: Page): Promise<ProductDataStrategy> {
//     await page.waitForSelector("h1, [data-testid='heading-product-title']", { timeout: 10000 })

//     const title = await page.evaluate(() => {
//       const titleEl =
//         document.querySelector("[data-testid='heading-product-title']") ||
//         document.querySelector("h1")
//       return titleEl?.textContent?.trim() || ""
//     })

//     if (!title) throw new Error("PRODUCT_NOT_FOUND")

//     return {
//       name: title,
//       image: "test",
//       classification: undefined,
//       currency: "BRL",
//       currentPrice: 1,
//       oldPrice: 1,
//       discountPercentage: undefined,
//       discountAmount: undefined
//     }
//   }
// }

// // AMERICANAS
// class AmericanasStrategy implements ScrapingStrategy {
//   async scrape(page: Page): Promise<ProductDataStrategy> {
//     await page.waitForSelector("h1, [class*='product']", { timeout: 10000 })

//     const title = await page.evaluate(() => {
//       const h1 = document.querySelector("h1")
//       return h1?.textContent?.trim() || ""
//     })

//     if (!title) throw new Error("PRODUCT_NOT_FOUND")

//     return {
//       name: title,
//       image: "test",
//       classification: undefined,
//       currency: "BRL",
//       currentPrice: 1,
//       oldPrice: 1,
//       discountPercentage: undefined,
//       discountAmount: undefined
//     }
//   }
// }

// // KABUM
// class KabumStrategy implements ScrapingStrategy {
//   async scrape(page: Page): Promise<ProductDataStrategy> {
//     await page.waitForSelector("h1, .sc-a5399e20-0", { timeout: 10000 })

//     const title = await page.evaluate(() => {
//       const h1 = document.querySelector("h1")
//       return h1?.textContent?.trim() || ""
//     })

//     if (!title) throw new Error("PRODUCT_NOT_FOUND")

//     return {
//       name: title,
//       image: "test",
//       classification: undefined,
//       currency: "BRL",
//       currentPrice: 1,
//       oldPrice: 1,
//       discountPercentage: undefined,
//       discountAmount: undefined
//     }
//   }
// }

// // CASAS BAHIA
// class CasasBahiaStrategy implements ScrapingStrategy {
//   async scrape(page: Page): Promise<ProductDataStrategy> {
//     await page.waitForSelector("h1", { timeout: 10000 })

//     const title = await page.evaluate(() => {
//       const h1 = document.querySelector("h1")
//       return h1?.textContent?.trim() || ""
//     })

//     if (!title) throw new Error("PRODUCT_NOT_FOUND")

//     return {
//       name: title,
//       image: "test",
//       classification: undefined,
//       currency: "BRL",
//       currentPrice: 1,
//       oldPrice: 1,
//       discountPercentage: undefined,
//       discountAmount: undefined
//     }
//   }
// }
