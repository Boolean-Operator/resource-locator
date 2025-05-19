import { db } from "@/db";
import { clients, workers } from "@/db/schema";
import { ilike, eq, or } from "drizzle-orm";

export async function getClientSearchResults(searchText: string) {
  const results = await db
    .select({
      firstName: clients.firstName,
      middleName: clients.middleName,
      lastName: clients.lastName,
      email: clients.email,
      phone: clients.phone,
      status: clients.status,
      caseManagerFirst: workers.firstName,
      caseManagerLast: workers.lastName,
    })
    .from(clients)
    .leftJoin(workers, eq(clients.caseManager, workers.email))
    .where(
      or(
        ilike(clients.firstName, `%${searchText}%`),
        ilike(clients.lastName, `%${searchText}%`),
        ilike(clients.email, `%${searchText}%`),
        ilike(clients.phone, `%${searchText}%`),
        ilike(clients.middleName, `%${searchText}%`),
        ilike(clients.caseManager, `%${searchText}%`),
        ilike(clients.status, `%${searchText}%`)
      )
    );
  return results;
}
