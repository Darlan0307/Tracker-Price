import { prismaDB } from "@shared/prisma"
import { UserRepository } from "./repository"
import { PlanType, UpdateConfigNotification, User } from "../types"
import { GetEntityError, UpdateEntityError } from "@infra/errors"
import { User as PrismaUser } from "@prisma/client"

export class PrismaUserRepository implements UserRepository {
  async get(id: string): Promise<User | null> {
    try {
      const user = await prismaDB.user.findUnique({
        where: {
          id
        }
      })

      if (!user) {
        return null
      }

      return this.mapUserToResponse(user)
    } catch (error) {
      throw new GetEntityError("Erro ao buscar usuário: " + JSON.stringify(error, null, 2))
    }
  }

  async updateConfigNotification(
    id: string,
    updateConfigNotification: UpdateConfigNotification
  ): Promise<void> {
    try {
      await prismaDB.user.update({
        where: {
          id
        },
        data: {
          acceptEmailNotification:
            Number(updateConfigNotification.acceptEmailNotification) || undefined
        }
      })
    } catch (error) {
      throw new UpdateEntityError(
        "Erro ao atualizar configurações de notificação: " + JSON.stringify(error, null, 2)
      )
    }
  }

  async increaseMonitoredProducts(id: string): Promise<void> {
    try {
      await prismaDB.user.update({
        where: {
          id
        },
        data: {
          qtdMonitoredProducts: {
            increment: 1
          }
        }
      })
    } catch (error) {
      throw new UpdateEntityError(
        "Erro ao aumentar quantidade de produtos monitorados: " + JSON.stringify(error, null, 2)
      )
    }
  }

  async decreaseMonitoredProducts(id: string): Promise<void> {
    try {
      await prismaDB.user.update({
        where: {
          id
        },
        data: {
          qtdMonitoredProducts: {
            decrement: 1
          }
        }
      })
    } catch (error) {
      throw new UpdateEntityError(
        "Erro ao diminuir quantidade de produtos monitorados: " + JSON.stringify(error, null, 2)
      )
    }
  }

  private mapUserToResponse(user: PrismaUser): User {
    return {
      id: user.id,
      providerId: user.providerId,
      providerName: user.providerName,
      email: user.email,
      name: user.name,
      image: user.image,
      planType: PlanType[user.planType],
      qtdMonitoredProducts: user.qtdMonitoredProducts,
      acceptEmailNotification: Boolean(user.acceptEmailNotification),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt
    }
  }
}
