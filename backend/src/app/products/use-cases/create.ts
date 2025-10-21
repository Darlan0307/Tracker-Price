import { BaseUseCase, validatePlatformLink } from "@shared/use-cases"
import {
  CreateEntityError,
  InvalidInputError,
  NotFoundError,
  ProductScraperError
} from "@infra/errors"
import { Product } from "../types"
import { ProductRepository } from "../repository"
import { ProductSchema } from "../schema"
import { ProductScraper } from "../services"
import { UserRepository } from "@app/users/repository"

type UseCaseErrors = InvalidInputError | NotFoundError | CreateEntityError | ProductScraperError
export class ProductCreateUseCase extends BaseUseCase<
  createProductPayload,
  Product,
  CreateEntityError
> {
  constructor(
    private userRepository: UserRepository,
    private productRepository: ProductRepository,
    private productScraper: ProductScraper
  ) {
    super(CreateEntityError, "Erro ao criar o produto", ProductSchema)
  }

  protected async action(
    userId: string,
    data: createProductPayload
  ): Promise<Product | UseCaseErrors> {
    const userExists = await this.userRepository.get(userId)

    if (!userExists) {
      return new NotFoundError(`Usuário não encontrado.`)
    }

    if (!validatePlatformLink(data.link)) {
      return new InvalidInputError(
        "Link inválido. Por enquanto só aceitamos links do Mercado Livre."
      )
    }

    const scrapedData = await this.productScraper.scrapeProduct(data.link)

    if (scrapedData instanceof ProductScraperError || scrapedData instanceof NotFoundError) {
      return scrapedData
    }

    return this.productRepository.save({
      userId,
      ...scrapedData
    })
  }
}

type createProductPayload = {
  link: string
}
