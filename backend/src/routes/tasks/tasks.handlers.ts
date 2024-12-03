import db from "@/db";
import type {
  CreateRoute,
  GetOneRoute,
  ListRoute,
  PatchRoute,
  RemoveRoute,
} from "./tasks.routes";
import { AppRouteHandler } from "@/lib/types";
import { tasks } from "@/db/schema";
import * as httpStatusCode from "@/utils/http-status-codes";
import { eq } from "drizzle-orm";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const tasks = await db.query.tasks.findMany();
  c.var.logger.info("hi from tasks");
  return c.json(tasks, httpStatusCode.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const task = await db.query.tasks.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    },
  });
  if (!task)
    return c.json(
      { message: `Task with id  ${id} not found` },
      httpStatusCode.NOT_FOUND,
    );
  return c.json(task, httpStatusCode.OK);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const updates = c.req.valid("json");

  const [task] = await db
    .update(tasks)
    .set(updates)
    .where(eq(tasks.id, id))
    .returning();

  if (!task)
    return c.json(
      { message: `Task with id  ${id} not found` },
      httpStatusCode.NOT_FOUND,
    );
  return c.json(task, httpStatusCode.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const result = await db.delete(tasks).where(eq(tasks.id, id));

  if (result.rowsAffected === 0)
    return c.json(
      { message: `Task with id  ${id} not found` },
      httpStatusCode.NOT_FOUND,
    );
  return c.json(null, httpStatusCode.NO_CONTENT);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const task = c.req.valid("json");
  const [createdTask] = await db.insert(tasks).values(task).returning();
  return c.json(createdTask, httpStatusCode.CREATED);
};
