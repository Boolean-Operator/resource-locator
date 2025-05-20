import { BackButton } from "@/components/BackButton";
import { getClient } from "@/lib/queries/getClient";
import { getCaseNote } from "@/lib/queries/getCaseNote";
// import * as Sentry from "@sentry/nextjs";
import CaseNoteForm from "./CaseNoteForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Users, init as KindeInit } from "@kinde/management-api-js";

// export async function generateMetadata({
//   searchParams,
// }: {
//   searchParams: Promise<{ [key: string]: string | undefined }>;
// }) {
//   const { caseNoteId } = await searchParams;
//   if (!caseNoteId) return { title: "New Case Note" };
//   return { title: `Edit Case Note #${caseNoteId}` };
// }

export default async function CaseNoteFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { getPermission, getUser } = getKindeServerSession();
  const [managerPermission, user] = await Promise.all([
    getPermission("manager"),
    getUser(),
  ]);
  const isManager = managerPermission?.isGranted;
  const { clientId, caseNoteId } = await searchParams;
  try {
    if (!clientId && !caseNoteId) {
      return (
        <>
          <h2 className="text-2xl mb-2">
            Client ID or Case Note ID required to load case note form
          </h2>
          <BackButton title="Go Back" variant="default" />
        </>
      );
    }

    // New Note Form
    if (clientId) {
      const client = await getClient(parseInt(clientId));

      if (!client) {
        return (
          <>
            <h2 className="text-2xl mb-2">Client ID #{clientId} not found</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }
      if (client.status === "Inactive") {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Client ID #{clientId} is not active.
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      // Return New Case Note Form Component
      if (isManager) {
        KindeInit(); // Initializes the Kinde Management API
        const { users } = await Users.getUsers();

        const caseManagers = users
          ? users.map((user) => ({ id: user.email!, description: user.email! }))
          : [];
        return (
          <CaseNoteForm
            client={client}
            caseManagers={caseManagers}
            userEmail={user.email!}
          />
        );
      } else {
        return <CaseNoteForm client={client} userEmail={user.email!} />;
      }
    }
    if (caseNoteId) {
      const case_note = await getCaseNote(parseInt(caseNoteId));
      if (!case_note) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Case Note ID #{caseNoteId} not found
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      const client = await getClient(case_note.clientId);

      // Return Case Note Form Component

      if (isManager) {
        KindeInit(); // Initializes the Kinde Management API
        const { users } = await Users.getUsers();

        const caseManagers = users
          ? users.map((user) => ({ id: user.email!, description: user.email! }))
          : [];
        return (
          <CaseNoteForm
            client={client}
            caseManagers={caseManagers}
            caseNote={case_note}
            userEmail={user.email!}
          />
        );
      } else {
        const isEditable = user.email === case_note.authorEmail;
        return (
          <CaseNoteForm
            client={client}
            caseNote={case_note}
            isEditable={isEditable}
            userEmail={user.email!}
          />
        );
      }

      // return <CaseNoteForm client={client} caseNote={case_note} />;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      // Sentry.captureException(error);
      throw error;
    }
  }
}
