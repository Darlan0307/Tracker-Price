import { BaseUseCase } from "@shared/use-cases"
import { ListEntityError, NotFoundError } from "@infra/errors"
import { Product } from "../types"
import { ProductRepository } from "../repository"
import { DataListResponse, PaginationRequest } from "@app/global-types"
import { UserRepository } from "@app/users/repository"

export class ProductListUseCase extends BaseUseCase<
  PaginationRequest,
  DataListResponse<Product>,
  ListEntityError
> {
  constructor(
    private userRepository: UserRepository,
    private productRepository: ProductRepository
  ) {
    super(ListEntityError, "Erro ao listar os produtos")
  }

  protected async action(
    userId: string,
    queries: PaginationRequest
  ): Promise<DataListResponse<Product> | NotFoundError | ListEntityError> {
    const userExists = await this.userRepository.get(userId)

    if (!userExists) {
      return new NotFoundError(`Usuário não encontrado.`)
    }

    return this.productRepository.list(userId, queries)
  }
}
