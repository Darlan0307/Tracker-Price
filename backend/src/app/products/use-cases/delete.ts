import { BaseUseCase } from "@shared/use-cases"
import { AccessDeniedEntityError, DeleteEntityError, NotFoundError } from "@infra/errors"
import { ProductRepository } from "../repository"
import { UserRepository } from "@app/users/repository"

type UseCaseErrors = NotFoundError | DeleteEntityError | AccessDeniedEntityError
export class ProductDeleteUseCase extends BaseUseCase<string, void, DeleteEntityError> {
  constructor(
    private userRepository: UserRepository,
    private productRepository: ProductRepository
  ) {
    super(DeleteEntityError, "Erro ao deletar o produto")
  }

  protected async action(userId: string, productId: string): Promise<void | UseCaseErrors> {
    const userExists = await this.userRepository.get(userId)

    if (!userExists) {
      return new NotFoundError(`Usuário não encontrado.`)
    }

    const productExists = await this.productRepository.get(productId)

    if (!productExists) {
      return new NotFoundError(`Produto não encontrado.`)
    }

    if (productExists.userId !== userId) {
      return new AccessDeniedEntityError(`O usuário não tem permissão para deletar este produto.`)
    }

    return this.productRepository.delete(productId)
  }
}
