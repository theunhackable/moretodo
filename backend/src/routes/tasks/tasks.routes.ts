import { createRoute, z } from "@hono/zod-openapi";
import * as httpStatusCode from "@/utils/http-status-codes";
import jsonContent from "@/utils/json-content";
import { insertTaskSchema, patchSchema, selectTasksSchema } from "@/db/schema";
import jsonContentRequired from "@/utils/json-content-required";
import createErrorSchema from "@/utils/create-error-schema";
import IdParamsSchema from "@/utils/id-params";
import jsonContentOneOf from "@/utils/json-content-one-of";

const tags = ["Tasks"];

export const list = createRoute({
  tags,
  path: "/tasks",
  method: "get",
  responses: {
    [httpStatusCode.OK]: jsonContent(
      z.array(selectTasksSchema),
      "List of tasks.",
    ),
  },
});

export const getOne = createRoute({
  tags,
  path: "/tasks/{id}",
  request: {
    params: IdParamsSchema,
  },
  method: "get",
  responses: {
    [httpStatusCode.OK]: jsonContent(
      selectTasksSchema,
      "Task with the given Id",
    ),
    [httpStatusCode.NOT_FOUND]: jsonContent(
      z
        .object({
          message: z.string(),
        })
        .openapi({
          example: {
            message: "Task with id  12 not found",
          },
        }),
      "Task with the given Id not found",
    ),
    [httpStatusCode.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error.",
    ),
  },
});

export const create = createRoute({
  tags,
  path: "/tasks",
  method: "post",
  request: {
    body: jsonContentRequired(insertTaskSchema, "Create a new task item."),
  },
  responses: {
    [httpStatusCode.CREATED]: jsonContent(selectTasksSchema, "Created task."),
    [httpStatusCode.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertTaskSchema),
      "Validation errors.",
    ),
  },
});

export const patch = createRoute({
  tags,
  path: "/tasks/{id}",
  method: "patch",
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(patchSchema, "Update a task item."),
  },
  responses: {
    [httpStatusCode.OK]: jsonContent(selectTasksSchema, "Updated task."),

    [httpStatusCode.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
      [createErrorSchema(patchSchema), createErrorSchema(IdParamsSchema)],
      "Validation errors.",
    ),
    [httpStatusCode.NOT_FOUND]: jsonContent(
      z
        .object({
          message: z.string(),
        })
        .openapi({
          example: {
            message: "Task with id  12 not found",
          },
        }),
      "Task with the given Id not found",
    ),
  },
});

export const remove = createRoute({
  tags,
  path: "/tasks/{id}",
  method: "delete",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [httpStatusCode.NO_CONTENT]: { description: "Delete task." },
    [httpStatusCode.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Validation errors.",
    ),
    [httpStatusCode.NOT_FOUND]: jsonContent(
      z
        .object({
          message: z.string(),
        })
        .openapi({
          example: {
            message: "Task with id  12 not found",
          },
        }),
      "Task with the given Id not found",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
