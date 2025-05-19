import { db } from "@/db";
import { caseNotes } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getCaseNote(id: number) {
  const caseNote = await db
    .select()
    .from(caseNotes)
    .where(eq(caseNotes.id, id));
  return caseNote[0];
}
