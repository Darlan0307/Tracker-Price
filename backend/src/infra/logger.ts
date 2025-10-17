import fs from "fs"
import path from "path"
import pino from "pino"
import pretty from "pino-pretty"

const logsDir = path.resolve("logs")
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true })
}

const stream = pretty({
  colorize: true,
  translateTime: "SYS:yyyy-mm-dd HH:MM:ss.l o",
  ignore: "pid,hostname"
})

export const logger = pino(
  {
    level: process.env.LOG_LEVEL || "error",
    base: undefined,
    timestamp: pino.stdTimeFunctions.isoTime,
    transport:
      process.env.NODE_ENV !== "production"
        ? {
            targets: [
              {
                target: "pino-pretty",
                options: { colorize: true },
                level: "debug"
              }
            ]
          }
        : {
            targets: [
              {
                target: "pino/file",
                options: { destination: path.join(logsDir, "app.log") },
                level: "info"
              }
            ]
          }
  },
  stream
)
