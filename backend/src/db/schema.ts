import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";

export const tasks = sqliteTable("tasks", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  done: integer("done", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
});

export const selectTasksSchema = createSelectSchema(tasks);
export const insertTaskSchema = createInsertSchema(tasks, {
  name: (schema) => schema.name.min(1).max(500),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const patchSchema = insertTaskSchema.partial();
