import { getAllClients } from "@/lib/queries/getAllClients";
import ClientSearch from "./ClientSearch";
import { getClientSearchResults } from "@/lib/queries/getClientSearchResults";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Search",
};

export default async function Clients() {
//   {
//   searchParams,
// }: {
//   searchParams: Promise<{ [key: string]: string | undefined }>;
// }
  // const params = await searchParams;
  // const searchText = params.searchText;
  // if (!searchText) {
  //   const results = await getAllClients();
  //   return (
  //     <div>
  //       <ClientSearch />
  //       <p>{JSON.stringify(results)}</p>
  //     </div>
  //   );
  // }

  // const results = await getClientSearchResults(searchText);

  return (
    <div>
      <h1>Client Page</h1>
      {/* <ClientSearch /> */}
      {/* <p>{JSON.stringify(results)}</p> */}
    </div>
  );
}
