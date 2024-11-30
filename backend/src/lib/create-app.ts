import { OpenAPIHono } from "@hono/zod-openapi";
import notFound from "@/middlewares/not-found";
import onError from "@/middlewares/on-error";
import { logger } from "@/middlewares/logger";
import serveEmojiFavicon from "@/middlewares/serve-emoji-favicon";
import { AppBindings } from "@/lib/types";
import defaultHook from "@/hooks/default-hook";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook: defaultHook,
  });
}
export default function () {
  const app = new OpenAPIHono<AppBindings>({
    strict: false,
  });

  // middlewares
  app.notFound(notFound);
  app.onError(onError);
  app.use(logger());
  app.use(serveEmojiFavicon("🔥"));

  return app;
}
