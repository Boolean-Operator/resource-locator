import Form from "next/form";
import { Input } from "@/components/ui/input";
import SearchButton from "@/components/SearchButton";

export default function ClientSearch() {
  return (
    <Form action="/clients" className="flex gap-2 items-center">
      <Input
        name="searchText"
        type="text"
        placeholder="Search Clients"
        className="w-full"
      />
      <SearchButton />
    </Form>
  );
}
