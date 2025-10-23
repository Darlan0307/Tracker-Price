import { z } from "zod";

export type ValidationResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      errors: Record<string, string[]>;
      message: string;
    };

export function validateSchema<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): ValidationResult<z.infer<T>> {
  const result = schema.safeParse(data);

  if (result.success) {
    return {
      success: true,
      data: result.data,
    };
  }

  const errors: Record<string, string[]> = {};

  result.error.issues.forEach((error) => {
    const path = error.path.join(".");
    if (!errors[path]) {
      errors[path] = [];
    }
    errors[path].push(error.message);
  });

  return {
    success: false,
    errors,
    message: "Erro de validação",
  };
}
