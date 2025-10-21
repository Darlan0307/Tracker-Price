import {
  created,
  createPaginationRequest,
  HttpRequest,
  HttpResponse,
  makeResponse,
  noContent,
  removeUndefinedFields
} from "@shared/http"
import { ProductCreateUseCase, ProductDeleteUseCase, ProductListUseCase } from "../use-cases"

export type UseCases = {
  save: ProductCreateUseCase
  delete: ProductDeleteUseCase
  list: ProductListUseCase
}

export default class ProductHttpController {
  constructor(private useCases: UseCases) {}

  async create(request: HttpRequest): Promise<HttpResponse> {
    const data = removeUndefinedFields(request?.body ?? {})

    const result = await this.useCases.save.execute(request?.userId ?? "", data)

    return makeResponse(result, created)
  }

  async delete(request: HttpRequest): Promise<HttpResponse> {
    const productId = request?.params?.id

    const result = await this.useCases.delete.execute(request?.userId ?? "", productId)

    return makeResponse(result, noContent)
  }

  async list(request: HttpRequest): Promise<HttpResponse> {
    const paginationRequest = createPaginationRequest(request)

    const result = await this.useCases.list.execute(request?.userId ?? "", paginationRequest)

    return makeResponse(result)
  }
}
