import { getCaseNoteSearchResults } from "@/lib/queries/getCaseNoteSearchResults";
import CaseNoteSearch from "./CaseNoteSearch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Note Search",
};

export default async function CaseNotes({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;

  const results = await getCaseNoteSearchResults(searchText);

  return (
    <div>
      <CaseNoteSearch />
      <ul>
        {results.map((note) => (
          <li
            key={note.id}
            className="my-4 p-2 border-2 border-solid rounded-md"
          >
            {/* <h3>{note.subject}</h3> */}
            <h3 className="text-xl">
              Subject: {note.subject === "Other" ? note.other : note.subject}
            </h3>
            {/* <p>{note.client}</p> */}
            <p className="text-lg">
              Author: {`${note.caseManagerFirst} ${note.caseManagerLast}`}
            </p>
            <p className="pl-4 bg-slate-200">Note: {note.note}</p>
          </li>
        ))}
      </ul>
      {/* <p>{JSON.stringify(results)}</p> */}
    </div>
  );
}
