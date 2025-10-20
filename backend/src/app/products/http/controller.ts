import {
  created,
  HttpRequest,
  HttpResponse,
  makeResponse,
  removeUndefinedFields
} from "@shared/http"
import { ProductCreateUseCase } from "../use-cases"

export type UseCases = {
  save: ProductCreateUseCase
}

export default class ProductHttpController {
  constructor(private useCases: UseCases) {}

  async create(request: HttpRequest): Promise<HttpResponse> {
    const data = removeUndefinedFields(request?.body ?? {})

    const result = await this.useCases.save.execute(request?.userId ?? "", data)

    return makeResponse(result, created)
  }
}
