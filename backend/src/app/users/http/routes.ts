import { Router } from "express"
import { Request, Response } from "express"
import { PrismaUserRepository } from "@app/users/repository"
import { UserUpdateConfigNotificationUseCase } from "../use-cases"
import UserHttpController from "./controller"

export function createUsersRoutes(router: Router) {
  const userRepository = new PrismaUserRepository()

  const controller = new UserHttpController({
    updateConfigNotification: new UserUpdateConfigNotificationUseCase(userRepository)
  })

  router.patch("/users/:id/config-notification", async (req: Request, res: Response) => {
    const httpResponse = await controller.updateConfigNotification(req)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  })
}
