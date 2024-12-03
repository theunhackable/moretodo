import { z, ZodError } from "zod";

const EnvSchema = z
  .object({
    NODE_ENV: z.string().default("development"),
    PORT: z.coerce.number().default(6969),
    DATABASE_URL: z.string().url(),
    DATABASE_AUTH_TOKEN: z.string().optional(),
  })
  .refine((input) => {
    if (input.NODE_ENV === "production") return !!input.DATABASE_AUTH_TOKEN;
    return true;
  });

type Env = z.infer<typeof EnvSchema>;
let env: Env;

try {
  env = EnvSchema.parse(process.env);
} catch (e) {
  const error = e as ZodError;
  console.error("invalid env: ");
  console.error(error.flatten().fieldErrors);
  process.exit(-1);
}
export default env;
