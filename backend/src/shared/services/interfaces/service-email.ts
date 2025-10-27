export type DataMessage = {
  to: string
  subject: string
  html: string
  text?: string
}

export interface ServiceEmail {
  sendEmail(message: DataMessage): Promise<Error | null>
}
