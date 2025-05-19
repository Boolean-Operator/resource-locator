import { getAllCommunityResources } from "@/lib/queries/getCommunityResources";

import { columns } from "./columns";
import { DataTable } from "./data-table";

// Delete this page

export default async function CommunityResourcesPage() {
  const resources = await getAllCommunityResources();

  return (
    <div>
      <DataTable columns={columns} data={resources} />
    </div>
  );
}
