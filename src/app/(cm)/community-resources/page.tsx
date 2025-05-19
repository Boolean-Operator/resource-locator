import { getCommunityResourceByService } from "@/lib/queries/getCommunityResourcesByService";
import CommunityResourceSearch from "./CommunityResourceSearch";
import { serviceFiltersSchema } from "@/zod-schema/servicesSchema";
import CommunityResouceTable from "@/components/CommunityResouceTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Resource Search",
};

export default async function CommunityResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // const query = await searchParams;
  const params = await searchParams;
  const query = params.query;
  const parseResult = serviceFiltersSchema.safeParse(query);
  const results = parseResult.success
    ? await getCommunityResourceByService(parseResult.data.services)
    : [];

  return (
    <div className="flex">
      <CommunityResourceSearch />
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Filtered Resources</h1>
        {!parseResult.success && (
          <p className="text-red-600">
            Invalid filters. Please check your input.
            {JSON.stringify(parseResult.error.format(), null, 2)}
          </p>
        )}
        <CommunityResouceTable data={results} />
      </main>
    </div>
  );
}
