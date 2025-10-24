import { BaseUseCase } from "@shared/use-cases"
import { InvalidInputError, NotFoundError, UpdateEntityError } from "@infra/errors"
import { UserRepository } from "@app/users/repository"
import { UpdateConfigNotification } from "../types"
import { ConfigUpdateNotificationSchema } from "../schemas"

type UseCaseErrors = NotFoundError | UpdateEntityError | InvalidInputError
export class UserUpdateConfigNotificationUseCase extends BaseUseCase<
  UpdateConfigNotification,
  void,
  UpdateEntityError
> {
  constructor(private userRepository: UserRepository) {
    super(
      UpdateEntityError,
      "Erro ao atualizar configurações de notificação",
      ConfigUpdateNotificationSchema
    )
  }

  protected async action(
    userId: string,
    data: UpdateConfigNotification
  ): Promise<void | UseCaseErrors> {
    const userExists = await this.userRepository.get(userId)

    if (!userExists) {
      return new NotFoundError(`Usuário não encontrado.`)
    }

    return this.userRepository.updateConfigNotification(userId, data)
  }
}
