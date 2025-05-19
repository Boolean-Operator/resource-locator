import Form from "next/form";
import { Input } from "@/components/ui/input";
import SearchButton from "@/components/SearchButton";

export default function CaseNoteSearch() {
  return (
    <Form action="/case-notes" className="flex gap-2 items-center">
      <Input
        name="searchText"
        type="text"
        placeholder="Search CaseNotes"
        className="w-full"
      />
      <SearchButton />
    </Form>
  );
}
