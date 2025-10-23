import { z } from "zod";

export const ProductSchema = z
  .object({
    link: z.url({ error: "Link deve ser uma URL válida" }),
  })
  .strict();
