import { BackButton } from "@/components/BackButton";
import { getCommunityResource } from "@/lib/queries/getCommunityResources";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import CommunityResourceForm from "./CommunityResourceForm";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { resourceId } = await searchParams;
  if (!resourceId) return { title: "New Community Resource" };
  return { title: `Edit Community Resource #${resourceId}` };
}

export default async function CommunityResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { getPermission } = getKindeServerSession();
  const [managerPermission] = await Promise.all([getPermission("manager")]);
  const isManager = managerPermission?.isGranted;

  if (!isManager)
    return (
      <div>
        Your login does not allow you to add notes. Please contact the system
        Admin.
      </div>
    );

  try {
    const { resourceId } = await searchParams;

    // Edit Community Resource Form
    if (resourceId) {
      const resource = await getCommunityResource(parseInt(resourceId));
      if (!resource) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Resource ID #{resourceId} not found
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      return <CommunityResourceForm communityResource={resource} />;
    } else {
      return <CommunityResourceForm />;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      // Sentry.captureException(error);
      throw error;
    }
  }
}
