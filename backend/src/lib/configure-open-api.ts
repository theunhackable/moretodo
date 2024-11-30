import { AppOpenApi } from "./types";
import packageJson from "../../package.json";
import { apiReference } from "@scalar/hono-api-reference";

export default function configureOpenApi(app: AppOpenApi) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJson.version,
      title: "More Todo API",
    },
  });
  app.get(
    "/reference",
    apiReference({
      theme: "kepler",
      spec: {
        url: "/doc",
      },
    }),
  );
}
