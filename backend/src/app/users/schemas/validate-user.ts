import z from "zod"

export const ConfigUpdateNotificationSchema = z
  .object({
    acceptEmailNotification: z.boolean({ error: "Deve ser um booleano" })
  })
  .strict()
