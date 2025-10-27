import { BaseUseCase, formatPrice, mapPlatform, validatePlatformLink } from "@shared/use-cases"
import {
  AccessDeniedEntityError,
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
import { userCanAddProduct } from "@app/users"
import { ServiceEmail } from "@shared/services/interfaces"
import { productRegisteredTemplate } from "@shared/services/external"

type UseCaseErrors =
  | InvalidInputError
  | NotFoundError
  | CreateEntityError
  | ProductScraperError
  | AccessDeniedEntityError
export class ProductCreateUseCase extends BaseUseCase<
  createProductPayload,
  Product,
  CreateEntityError
> {
  constructor(
    private userRepository: UserRepository,
    private productRepository: ProductRepository,
    private productScraper: ProductScraper,
    private serviceEmail: ServiceEmail
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

    if (!userCanAddProduct(userExists)) {
      return new AccessDeniedEntityError("Você atingiu o limite de produtos permitidos.")
    }

    const scrapedData = await this.productScraper.scrapeProduct(data.link)

    if (scrapedData instanceof ProductScraperError || scrapedData instanceof NotFoundError) {
      return scrapedData
    }

    const newProduct = await this.productRepository.save({
      userId,
      ...scrapedData
    })

    await this.userRepository.increaseMonitoredProducts(userId)

    const template = productRegisteredTemplate({
      currentPrice: formatPrice(newProduct.currentPrice, newProduct.currency),
      productImage: newProduct.image,
      productName: newProduct.name,
      platform: mapPlatform(newProduct.platform),
      productUrl: newProduct.link,
      userName: userExists.name ?? ""
    })

    this.serviceEmail.sendEmail({
      to: userExists.email,
      subject: "Produto Cadastrado com Sucesso!",
      html: template.html,
      text: template.text
    })

    return newProduct
  }
}

type createProductPayload = {
  link: string
}
