import { getAllCommunityResources } from "@/lib/queries/getCommunityResources";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function CommunityResourcesPage() {
  const resources = await getAllCommunityResources();

  const { getPermission } = getKindeServerSession();
  const [managerPermission] = await Promise.all([getPermission("manager")]);
  const isManager = managerPermission?.isGranted;

  return (
    <div>
      {isManager && (
        <section>
          <Button className="mb-4">Add New</Button>
        </section>
      )}
      <DataTable columns={columns} data={resources} />
    </div>
  );
}
