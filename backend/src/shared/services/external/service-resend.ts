import { Resend } from "resend"
import { DataMessage, ServiceEmail } from "../interfaces"
import { emailSchema } from "@shared/schemas"

export class ServiceResend implements ServiceEmail {
  private resend: Resend
  private emailDomain: string
  private isProduction: boolean

  constructor(secretResend: string, emailDomain: string, isProduction: boolean) {
    if (!secretResend.trim()) {
      throw new Error("RESEND_SECRET não configurado")
    }

    if (!emailDomain.trim()) {
      throw new Error("EMAIL_DOMAIN não configurado")
    }

    this.resend = new Resend(secretResend)
    this.emailDomain = emailDomain
    this.isProduction = isProduction
  }

  async sendEmail(message: DataMessage): Promise<Error | null> {
    if (!this.isProduction) {
      return null
    }

    if (!emailSchema.safeParse(message.to).success) {
      return new Error("Email de destino inválido")
    }

    try {
      const { error } = await this.resend.emails.send({
        from: `Tracker Price  <${this.emailDomain}>`,
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text
      })

      if (error) {
        return new Error(error.message)
      }

      return null
    } catch (error) {
      if (error instanceof Error) {
        return error
      }
      return new Error(String(error))
    }
  }
}
