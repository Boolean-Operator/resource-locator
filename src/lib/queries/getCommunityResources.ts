import { db } from "@/db";
import { communityResources } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getCommunityResource(id: number) {
  const resource = await db
    .select()
    .from(communityResources)
    .where(eq(communityResources.id, id));
  return resource[0];
}

export async function getAllCommunityResources() {
  const allResources = await db.select().from(communityResources);
  return allResources;
}
