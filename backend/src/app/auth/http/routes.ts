import { TokenService } from "@infra/services"
import { Router } from "express"
import passportConfig from "@shared/passport/passport-config"
import { logger } from "@infra/logger"

export function createAuthRoutes(router: Router) {
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:8080"

  const tokenService = new TokenService(process.env.JWT_SECRET!)

  router.get("/auth/google", passportConfig.authenticate("google", { scope: ["profile", "email"] }))

  router.get(
    "/auth/google/callback",
    passportConfig.authenticate("google", { failureRedirect: `${frontendUrl}/` }),
    async (req, res) => {
      try {
        const accessToken = tokenService.generateAccessToken(req?.user?.id ?? "")

        res.cookie("auth-token", accessToken, getCookieOptions())
        res.redirect(`${frontendUrl}/`)
      } catch (error) {
        logger.error("Erro ao gerar token Google:" + JSON.stringify(error, null, 2))
        res.redirect(`${frontendUrl}/`)
      }
    }
  )

  router.get("/auth/logout", (req, res) => {
    res.clearCookie("auth-token")

    req.logout((err) => {
      if (err) {
        return res.status(500).json({ errorMessage: "Erro ao fazer logout" })
      }
      res.status(200).json({ message: "Logout realizado com sucesso" })
    })
  })

  router.get("/auth/me", async (req, res) => {
    res.status(200).json(req.user)
  })
}

function getCookieOptions() {
  const isProd = process.env.NODE_ENV === "production"

  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? ("none" as const) : ("lax" as const),
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
    path: "/"
  }
}
