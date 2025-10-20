export class ProductScraperError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ProductScraperError"
  }
}
