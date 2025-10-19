import { z } from "zod"

export const ProductSchema = z
  .object({
    link: z.url({ error: "Link inválido" })
  })
  .strict()
