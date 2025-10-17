import express, { Request, Response, Express, Router } from "express"
import cors from "cors"
import helmet from "helmet"
import compression from "compression"
import session from "express-session"
import cookieParser from "cookie-parser"
import passportConfig from "@shared/passport/passport-config"
import { logger } from "@infra/logger"
import { createAuthRoutes } from "@app/auth/http"
import { apiLimiter, createAuthMiddleware, errorHandler } from "@infra/middlewares"
import { prismaDB } from "@shared/prisma"

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173"

export default class HttpServer {
  private app: Express

  constructor() {
    this.app = express()
  }

  async createApp(): Promise<Express> {
    try {
      await prismaDB.$connect()
      this.loadMiddlewares()
      this.loadRoutes()
      return this.app
    } catch (error) {
      logger.error("Falha ao iniciar o servidor:" + JSON.stringify(error, null, 2))
      throw error
    }
  }

  async stop(): Promise<void> {
    try {
      logger.info("Encerrando servidor...")
      await prismaDB.$disconnect()
    } catch (error) {
      logger.error("Erro ao fechar conexão com o banco de dados:" + JSON.stringify(error, null, 2))
    }
  }

  private loadMiddlewares(): void {
    this.app.use(
      cors({
        origin: FRONTEND_URL,
        credentials: true
      })
    )

    this.app.use(cookieParser())

    this.app.use(
      session({
        secret: process.env.AUTH_SECRET!,
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          maxAge: 24 * 60 * 60 * 1000
        }
      })
    )

    this.app.use(passportConfig.initialize())
    this.app.use(passportConfig.session())

    this.app.use(
      helmet({
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false,
        crossOriginOpenerPolicy: false
      })
    )

    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(compression())
    this.app.use(createAuthMiddleware())
    this.app.use(apiLimiter)
  }

  private loadRoutes(): void {
    this.app.get("/", async (req: Request, res: Response) => {
      res.status(200).json({ message: "API Tracker Price está online!" })
    })

    this.app.get("/health", async (req: Request, res: Response) => {
      res.status(200).json({ status: "ok", timestamp: new Date().toISOString() })
    })

    const router = Router()
    this.app.use(router)
    createAuthRoutes(router)
    this.app.use(errorHandler)
  }
}
