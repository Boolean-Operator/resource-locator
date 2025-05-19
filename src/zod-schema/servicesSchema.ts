// zod/serviceSchema.ts
import { z } from "zod";

const validServices = [
  "housingPlacement",
  "housingFunding",
  "jobSearch",
  "wfd",
  "careerTraining",
  "academicLifeSkills",
  "rxBenefits",
  "bHmHCounsel",
  "bHmHReferral",
  "soberLivingRecovery",
  "caseManagement",
  "idCards",
  "foodMeals",
  "clothes",
  "directTransport",
  "busTickets",
] as const;

export const serviceFiltersSchema = z.object({
  services: z
    .preprocess((val) => {
      if (Array.isArray(val)) return val;
      if (typeof val === "string") return [val];
      return [];
    }, z.enum(validServices).array())
    .optional(),
});

export type ServiceKey = (typeof validServices)[number];
export type ServiceFilterInput = z.infer<typeof serviceFiltersSchema>;
