import { workers } from "@/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const insertWorkerSchema = createInsertSchema(workers, {
  firstName: (schema) => schema.min(1, "First Name is required"),
  lastName: (schema) => schema.min(1, "Last name is required"),
  email: (schema) => schema.email("Invalid email address"),
});

export const selectWorkerSchema = createSelectSchema(workers);
export type insertWorkerSchemaType = typeof insertWorkerSchema._type;
export type selectWorkerSchemaType = typeof selectWorkerSchema._type;
