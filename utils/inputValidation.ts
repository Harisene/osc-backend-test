import { z } from "zod";

function inputValidation(schema: z.ZodObject<{}>, payload: unknown) {
  const validation = schema.safeParse(payload);

  if (!validation.success) {
    throw new Error(validation.error.errors[0].message);
  }
}

export default inputValidation;
