import { Router } from "express"
import { Request, Response } from "express"
import ProductHttpController from "./controller"
import { PrismaUserRepository } from "@app/users/repository"
import { PrismaProductRepository } from "../repository"
import { ProductScraper } from "../services"
import { ProductCreateUseCase, ProductDeleteUseCase, ProductListUseCase } from "../use-cases"
import { ServiceEmail } from "@shared/services/interfaces"

export function createProductsRoutes(
  router: Router,
  productScraper: ProductScraper,
  serviceEmail: ServiceEmail
) {
  const userRepository = new PrismaUserRepository()
  const productRepository = new PrismaProductRepository()

  const controller = new ProductHttpController({
    save: new ProductCreateUseCase(userRepository, productRepository, productScraper, serviceEmail),
    delete: new ProductDeleteUseCase(userRepository, productRepository),
    list: new ProductListUseCase(userRepository, productRepository)
  })

  router.get("/products", async (req: Request, res: Response) => {
    const httpResponse = await controller.list(req)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  })

  router.post("/products", async (req: Request, res: Response) => {
    const httpResponse = await controller.create(req)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  })

  router.delete("/products/:id", async (req: Request, res: Response) => {
    const httpResponse = await controller.delete(req)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  })
}
