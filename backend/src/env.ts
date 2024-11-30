import { z, ZodError } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(6969),
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
