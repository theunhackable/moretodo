import { createRouter } from "@/lib/create-app";
import jsonContent from "@/utils/json-content";
import { createRoute } from "@hono/zod-openapi";
import * as statusCode from "@/utils/http-status-codes";
import createMessageObjectSchema from "@/utils/create-message-object-schema";

const index = createRouter().openapi(
  createRoute({
    tags: ["Index"],
    method: "get",
    path: "/",
    responses: {
      [statusCode.OK]: jsonContent(
        createMessageObjectSchema("Index api"),
        "api index",
      ),
    },
  }),
  (c) => {
    return c.json(
      {
        message: "Hello bitch",
      },
      statusCode.OK,
    );
  },
);

export default index;
