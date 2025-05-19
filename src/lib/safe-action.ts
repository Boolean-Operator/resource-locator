import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
  // handleServerError(e, utils) {
  handleServerError(e) {
    // const { clientInput, metadata } = utils;
    // Use Sentry or other error logging service to capture and recieve notification about server errors.
    if (e.constructor.name === "DatabaseError") {
      return "Database Error: Your data did not save. Suppport will be notified.";
    }
    return e.message;
  },
});
