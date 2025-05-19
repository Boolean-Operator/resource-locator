"use server";

import { eq } from "drizzle-orm";
import { flattenValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { caseNotes } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import {
  insertCaseNoteSchema,
  type insertCaseNoteSchemaType,
} from "@/zod-schema/case-note";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const saveCaseNoteAction = actionClient
  .metadata({ actionName: "saveCaseNoteAction" })
  .schema(insertCaseNoteSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({
      parsedInput: case_note,
    }: {
      parsedInput: insertCaseNoteSchemaType;
    }) => {
      const { isAuthenticated } = getKindeServerSession();
      const isAuth = await isAuthenticated();
      if (!isAuth) redirect("/login");

      if (case_note.id === "(New)") {
        const result = await db
          .insert(caseNotes)
          .values({
            subject: case_note.subject,
            ...(case_note.other ? { other: case_note.other } : {}),
            ...(case_note.note ? { note: case_note.note } : {}),
            clientId: case_note.clientId,
            authorEmail: case_note.authorEmail,
            ...(case_note.createdAt ? { createdAt: case_note.createdAt } : {}),
            ...(case_note.updatedAt ? { updatedAt: case_note.updatedAt } : {}),
          })
          .returning({ insertedId: caseNotes.id });
        return {
          message: `Case Note ID # ${result[0].insertedId} created successfully `,
        };
      }

      const result = await db
        .update(caseNotes)
        .set({
          subject: case_note.subject,
          other: case_note.other ?? null,
          note: case_note.note ?? null,
          clientId: case_note.clientId ?? null,
          // authorId: case_note.authorId ?? null,
          authorEmail: case_note.authorEmail ?? null,
        })
        .where(eq(caseNotes.id, case_note.id!))
        .returning({ updatedId: caseNotes.id });
      return {
        message: `Case Note ID # ${result[0].updatedId} updated successfully.`,
      };
    }
  );
