import { User } from "@app/users"
import { PrismaUserRepository } from "@app/users/repository"
import { TokenService } from "@infra/services"
import { Request, Response, NextFunction, RequestHandler } from "express"

const PUBLIC_ROUTES = {
  exact: ["/", "/health", "/auth/google", "/auth/google/callback"]
}

export function createAuthMiddleware(): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (PUBLIC_ROUTES.exact.includes(req.path)) {
      next()
      return
    }

    const tokenService = new TokenService(process.env.JWT_SECRET!)
    const userRepository = new PrismaUserRepository()

    try {
      const token = req.cookies["auth-token"]
      if (!token) {
        res.status(401).json({ errorMessage: "Você não está autenticado" })
        return
      }

      const decoded = tokenService.verifyToken(token)
      if (!decoded) {
        res.status(401).json({ errorMessage: "Token inválido" })
        return
      }

      req.userId = decoded.userId

      req.user = (await userRepository.get(req.userId)) as User

      next()
    } catch (error) {
      res.status(401).json({
        errorMessage: "Erro ao verificar autenticação: " + JSON.stringify(error, null, 2)
      })
      return
    }
  }
}
