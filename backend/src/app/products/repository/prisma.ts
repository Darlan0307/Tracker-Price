import { CreateEntityError } from "@infra/errors"
import { NewProductData, PlatformType, Product } from "../types"
import { ProductRepository } from "./repository"
import { prismaDB } from "@shared/prisma"
import { Product as PrismaProduct } from "@prisma/client"

export class PrismaProductRepository implements ProductRepository {
  async save(data: NewProductData): Promise<Product> {
    try {
      const product = await prismaDB.product.create({
        data
      })

      return this.mapToResponse(product)
    } catch (error) {
      throw new CreateEntityError("Erro ao criar novo produto: " + JSON.stringify(error, null, 2))
    }
  }

  private mapToResponse(product: PrismaProduct): Product {
    return {
      id: product.id,
      userId: product.userId,
      name: product.name,
      image: product.image,
      classification: product.classification,
      platform: PlatformType[product.platform],
      currentPrice: product.currentPrice,
      oldPrice: product.oldPrice,
      link: product.link,
      discountPercentage: product.discountPercentage ? Number(product.discountPercentage) : null,
      discountAmount: product.discountAmount,
      currency: product.currency,
      scrapedAt: product.scrapedAt,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      deletedAt: product.deletedAt
    }
  }
}
