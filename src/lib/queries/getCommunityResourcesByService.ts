// lib/getCommunityResourceByService.ts
import { db } from "@/db";
import { communityResources } from "@/db/schema"; // Replace with correct table name
import { eq, or } from "drizzle-orm";
import { ServiceKey } from "@/zod-schema/servicesSchema";

export async function getCommunityResourceByService(services?: ServiceKey[]) {
  if (!services || services.length === 0) {
    return db.select().from(communityResources);
  }

  const conditions = services.map((service) =>
    eq(communityResources[service], true)
  );
  return db
    .select()
    .from(communityResources)
    .where(or(...conditions));
}
