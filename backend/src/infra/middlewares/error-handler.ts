import { NextFunction, Request, Response } from "express"
import { logger } from "@infra/logger"

export function errorHandler(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"

  logger.error({
    statusCode,
    message,
    stack: process.env.NODE_ENV !== "production" ? err.stack : undefined,
    path: req.originalUrl,
    method: req.method
  })

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack })
  })
}
