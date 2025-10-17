import { prismaDB } from "@shared/prisma"
import { UserRepository } from "./repository"
import { User } from "../types"
import { GetEntityError } from "@infra/errors"

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

      return user
    } catch (error) {
      throw new GetEntityError("Erro ao buscar usuário: " + JSON.stringify(error, null, 2))
    }
  }
}
