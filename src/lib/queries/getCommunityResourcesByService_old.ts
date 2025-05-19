import { db } from "@/db";
import { communityResources } from "@/db/schema";
import { eq, and, or } from "drizzle-orm";
import { ServiceKey } from "@/zod-schema/servicesSchema";

// const validServices = [
//   "housingPlacement",
//   "housingFunding",
//   "jobSearch",
//   "wfd",
//   "careerTraining",
//   "academicLifeSkills",
//   "rxBenefits",
//   "bHmHCounsel",
//   "bHmHReferral",
//   "soberLivingRecovery",
//   "caseManagement",
//   "idCards",
//   "foodMeals",
//   "clothes",
//   "directTransport",
//   "busTickets",
// ] as const;

// export type ServiceKey = (typeof validServices)[number];

type ServiceFilterOptions = {
  requiredServices?: ServiceKey[]; // e.g. ["service1", "service3"]
  logic?: "AND" | "OR"; // default to "AND"
};

export async function getCommunityResourceByService(
  options: ServiceFilterOptions = {}
) {
  const { requiredServices = [], logic = "OR" } = options;

  if (requiredServices.length === 0) {
    // Return all if no filters are specified
    return db.select().from(communityResources);
  }

  const conditions = requiredServices.map((service) =>
    eq(communityResources[service], true)
  );

  const whereClause = logic === "OR" ? and(...conditions) : or(...conditions);

  return db.select().from(communityResources).where(whereClause);
}
