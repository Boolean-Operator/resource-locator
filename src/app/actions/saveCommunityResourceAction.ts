"use server";

import { eq } from "drizzle-orm";
import { flattenValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { communityResources } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import {
  insertCommunityResourceSchema,
  type insertCommunityResourceSchemaType,
} from "@/zod-schema/community-resource";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const saveCommunityResourceAction = actionClient
  .metadata({ actionName: "saveCommunityResourceAction" })
  .schema(insertCommunityResourceSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({
      parsedInput: resource,
    }: {
      parsedInput: insertCommunityResourceSchemaType;
    }) => {
      const { isAuthenticated } = getKindeServerSession();
      const isAuth = await isAuthenticated();
      if (!isAuth) redirect("/login");

      if (resource.id === 0) {
        const result = await db
          .insert(communityResources)
          .values({
            title: resource.title,
            ...(resource.contactName
              ? { contactName: resource.contactName }
              : {}),
            ...(resource.email ? { email: resource.email } : {}),
            ...(resource.phone ? { phone: resource.phone } : {}),
            ...(resource.website ? { website: resource.website } : {}),
            ...(resource.street ? { street: resource.street } : {}),
            ...(resource.city ? { city: resource.city } : {}),
            ...(resource.state ? { state: resource.state } : {}),
            ...(resource.housingPlacement
              ? { housingPlacement: resource.housingPlacement }
              : {}),
            ...(resource.housingFunding
              ? { housingFunding: resource.housingFunding }
              : {}),
            ...(resource.jobSearch ? { jobSearch: resource.jobSearch } : {}),
            ...(resource.wfd ? { wfd: resource.wfd } : {}),
            ...(resource.careerTraining
              ? { careerTraining: resource.careerTraining }
              : {}),
            ...(resource.academicLifeSkills
              ? { academicLifeSkills: resource.academicLifeSkills }
              : {}),
            ...(resource.rxBenefits ? { rxBenefits: resource.rxBenefits } : {}),
            ...(resource.bHmHCounsel
              ? { bHmHCounsel: resource.bHmHCounsel }
              : {}),
            ...(resource.bHmHReferral
              ? { bHmHReferral: resource.bHmHReferral }
              : {}),
            ...(resource.soberLivingRecovery
              ? { soberLivingRecovery: resource.soberLivingRecovery }
              : {}),
            ...(resource.caseManagement
              ? { caseManagement: resource.caseManagement }
              : {}),
            ...(resource.idCards ? { idCards: resource.idCards } : {}),
            ...(resource.foodMeals ? { foodMeals: resource.foodMeals } : {}),
            ...(resource.clothes ? { clothes: resource.clothes } : {}),
            ...(resource.directTransport
              ? { directTransport: resource.directTransport }
              : {}),
            ...(resource.busTickets ? { busTickets: resource.busTickets } : {}),

            ...(resource.note?.trim() ? { note: resource.note.trim() } : {}),

            ...(resource.createdAt ? { createdAt: resource.createdAt } : {}),
            ...(resource.updatedAt ? { updatedAt: resource.updatedAt } : {}),
          })
          .returning({ insertedId: communityResources.id });
        return {
          message: `Community Resource ID #${result[0].insertedId} created successfully. Use the Navigation buttons in the header to go to the Community Resource List.`,
        };
      }

      //Existing Community Resource
      const result = await db
        .update(communityResources)
        .set({
          title: resource.title,
          contactName: resource.contactName ?? null,
          email: resource.email ?? null,
          phone: resource.phone ?? null,
          website: resource.website ?? null,
          street: resource.street ?? null,
          city: resource.city ?? null,
          state: resource.state ?? null,
          housingPlacement: resource.housingPlacement ?? null,
          housingFunding: resource.housingFunding ?? null,
          jobSearch: resource.jobSearch ?? null,
          wfd: resource.wfd ?? null,
          careerTraining: resource.careerTraining ?? null,
          academicLifeSkills: resource.academicLifeSkills ?? null,
          rxBenefits: resource.rxBenefits ?? null,
          bHmHCounsel: resource.bHmHCounsel ?? null,
          bHmHReferral: resource.bHmHReferral ?? null,
          soberLivingRecovery: resource.soberLivingRecovery ?? null,
          caseManagement: resource.caseManagement ?? null,
          idCards: resource.idCards ?? null,
          foodMeals: resource.foodMeals ?? null,
          clothes: resource.clothes ?? null,
          directTransport: resource.directTransport ?? null,
          busTickets: resource.busTickets ?? null,
          note: resource.note ?? null,
        })
        .where(eq(communityResources.id, resource.id!))
        .returning({ updatedId: communityResources.id });
      return {
        message: `Community Resource ID #${result[0].updatedId} updated successfully.  Use the Navigation buttons in the header to go to the Community Resource List.`,
      };
    }
  );
