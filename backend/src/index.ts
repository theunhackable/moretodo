import app from "@/app";
import { serve } from "bun";
import env from "@/env";

const port = env.PORT;

serve({
  fetch: app.fetch,
  port,
});

export default app;
