import { HttpRequest, HttpResponse, makeResponse, removeUndefinedFields } from "@shared/http"
import { UserUpdateConfigNotificationUseCase } from "../use-cases"

export type UseCases = {
  updateConfigNotification: UserUpdateConfigNotificationUseCase
}

export default class UserHttpController {
  constructor(private useCases: UseCases) {}

  async updateConfigNotification(request: HttpRequest): Promise<HttpResponse> {
    const userId = request?.params?.id ?? ""
    const data = removeUndefinedFields(request?.body ?? {})

    const result = await this.useCases.updateConfigNotification.execute(userId, data)

    return makeResponse(result)
  }
}
