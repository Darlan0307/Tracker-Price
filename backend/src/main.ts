import { logger } from "@infra/logger"
import HttpServer from "./http-server"

enum ExitStatus {
  Failure = 1,
  Success = 0
}

async function main() {
  try {
    const PORT = process.env.PORT || 4000
    const httpServer = new HttpServer()
    const port = Number(PORT)
    const exitSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"]

    exitSignals.map((sig) =>
      process.on(sig, async () => {
        try {
          httpServer.stop()
          logger.info("App encerrado com sucesso.")
          process.exit(ExitStatus.Success)
        } catch (error) {
          logger.error(`Erro ao encerrar o servidor: ${error}`)
          process.exit(ExitStatus.Failure)
        }
      })
    )

    const app = await httpServer.createApp()

    app.listen(port, () => logger.info(`Rodando na porta ${port}`))
  } catch (error) {
    logger.error(`Erro ao iniciar o servidor: ${error}`)
    process.exit(ExitStatus.Failure)
  }
}

main()
