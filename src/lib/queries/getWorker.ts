import { db } from "@/db";
import { workers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getWorker(id: number) {
  const worker = await db.select().from(workers).where(eq(workers.id, id));
  return worker[0];
}
