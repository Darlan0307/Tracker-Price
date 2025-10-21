import {
  CreateEntityError,
  DeleteEntityError,
  GetEntityError,
  ListEntityError,
  UpdateEntityError
} from "@infra/errors"
import { NewProductData, PlatformType, Product, UpdateProductData } from "../types"
import { ProductRepository } from "./repository"
import { BuildPagination, prismaDB } from "@shared/prisma"
import { Product as PrismaProduct } from "@prisma/client"
import { PaginationRequest, DataListResponse } from "@app/global-types"

export class PrismaProductRepository implements ProductRepository {
  //TODO: Implementar sistema de cache
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

  async update(id: string, data: UpdateProductData): Promise<Product> {
    try {
      const product = await prismaDB.product.update({
        where: {
          id
        },
        data
      })

      return this.mapToResponse(product)
    } catch (error) {
      throw new UpdateEntityError("Erro ao atualizar produto: " + JSON.stringify(error, null, 2))
    }
  }

  async get(id: string): Promise<Product | null> {
    try {
      const product = await prismaDB.product.findUnique({
        where: {
          id
        }
      })

      if (!product) {
        return null
      }

      return this.mapToResponse(product)
    } catch (error) {
      throw new GetEntityError("Erro ao buscar produto: " + JSON.stringify(error, null, 2))
    }
  }

  async list(userId: string, queries: PaginationRequest): Promise<DataListResponse<Product>> {
    const { firstPosition, perPage, whereCondition } = BuildPagination(queries)
    try {
      const [products, totalRecords] = await Promise.all([
        prismaDB.product.findMany({
          where: {
            userId,
            ...whereCondition
          },
          skip: firstPosition,
          take: perPage,
          orderBy: {
            createdAt: "desc"
          }
        }),
        prismaDB.product.count({
          where: {
            userId,
            ...whereCondition
          }
        })
      ])

      const totalPages = Math.ceil(totalRecords / perPage)

      const result = {
        data: products.map((product) => this.mapToResponse(product)),
        totalPages,
        totalRecords,
        currentPage: queries.page,
        perPage
      }

      return result
    } catch (error) {
      throw new ListEntityError("Erro ao listar produtos: " + JSON.stringify(error, null, 2))
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prismaDB.product.delete({
        where: {
          id
        }
      })
      return
    } catch (error) {
      throw new DeleteEntityError("Erro ao deletar produto: " + JSON.stringify(error, null, 2))
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
