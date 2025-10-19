import { BaseUseCase, validatePlatformLink } from "@shared/use-cases"
import { CreateEntityError, InvalidInputError, NotFoundError } from "@infra/errors"
import { Product } from "../types"
import { UserRepository } from "@app/users/repository"
import { ProductRepository } from "../repository"
import { ProductSchema } from "../schema"

type UseCaseErrors = InvalidInputError | NotFoundError | CreateEntityError
export class ProductCreateUseCase extends BaseUseCase<
  createProductPayload,
  Product,
  CreateEntityError
> {
  constructor(
    private userRepository: UserRepository,
    private productRepository: ProductRepository
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

    if (validatePlatformLink(data.productLink)) {
      return new InvalidInputError(
        "Link inválido. Por enquanto só aceitamos links do Mercado Livre."
      )
    }

    // Chamar service de extração de dados do produto

    return this.productRepository.save({
      userId
    })
  }
}

type createProductPayload = {
  productLink: string
}
