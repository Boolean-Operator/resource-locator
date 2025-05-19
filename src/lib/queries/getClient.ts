import { db } from "@/db";
import { clients } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getClient(id: number) {
  const client = await db.select().from(clients).where(eq(clients.id, id));
  return client[0];
}
