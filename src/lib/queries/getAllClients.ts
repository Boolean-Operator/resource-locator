import { db } from "@/db";
import { clients, workers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAllClients() {
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
    .leftJoin(workers, eq(clients.caseManager, workers.email));
  return results;
}
