import { db } from "@/db";
import { caseNotes, clients, workers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getActiveCaseNotes() {
  const results = await db
    .select({
      id: caseNotes.id,
      noteDate: caseNotes.createdAt,
      subject: caseNotes.subject,
      other: caseNotes.other,
      note: caseNotes.note,
      firstName: clients.firstName,
      lastName: clients.lastName,
      caseManager: caseNotes.authorEmail,
      caseManagerFirst: workers.firstName,
      caseManagerLast: workers.lastName,
    })
    .from(caseNotes)
    .leftJoin(clients, eq(caseNotes.clientId, clients.id))
    .leftJoin(workers, eq(caseNotes.authorEmail, workers.email))
    .where(eq(clients.status, "Active"));
  return results;
}
