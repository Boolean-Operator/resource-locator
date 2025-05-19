import { communityResources } from "@/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const insertCommunityResourceSchema = createInsertSchema(
  communityResources,
  {
    title: (schema) => schema.min(3, "Resouce name is required"),
  }
);

export const selectCommunityResourceSchema =
  createSelectSchema(communityResources);
export type insertCommunityResourceSchemaType =
  typeof insertCommunityResourceSchema._type;
export type selectCommunityResourceSchemaType =
  typeof selectCommunityResourceSchema._type;
