import { db } from "@/db";
import { caseNotes, clients, workers } from "@/db/schema";
import { and, ilike, eq, or } from "drizzle-orm";

export async function getCaseNoteSearchResults(searchText: string | undefined) {
  if (!searchText || searchText.length === 0 || undefined) {
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
      .where(and(eq(clients.status, "Active"), eq(caseNotes.subject, "Other")));
    return results;
  }
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
    .where(
      or(
        ilike(caseNotes.subject, `%${searchText}%`),
        ilike(caseNotes.other, `%${searchText}%`),
        ilike(caseNotes.note, `%${searchText}%`),
        ilike(workers.firstName, `%${searchText}%`),
        ilike(workers.lastName, `%${searchText}%`),
        ilike(clients.firstName, `%${searchText}%`),
        ilike(clients.lastName, `%${searchText}%`)
      )
    );
  return results;
}
