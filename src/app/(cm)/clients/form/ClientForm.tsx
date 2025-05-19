"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { InputWithLabel } from "@/components/inputs/InputWithLabel";
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel";
import { clientStatus } from "@/constants/clientStatus";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

import {
  insertClientSchema,
  selectClientSchemaType,
  type insertClientSchemaType,
} from "@/zod-schema/client";

type Props = {
  client?: selectClientSchemaType;
};

export default function ClientForm({ client }: Props) {
  const { getPermission, isLoading } = useKindeBrowserClient();
  const isManager = !isLoading && getPermission("manager")?.isGranted;
  // const { getPermission, getPermissions, isLoading } = useKindeBrowserClient();
  // // If there are users who will not have both manager and admin permission check for either.
  // const permObj = getPermissions();
  // const isAuthorized =
  //   !isLoading &&
  //   permObj.permissions.some((perm) => perm === "manager" || perm === "admin");

  const defaultValues: insertClientSchemaType = {
    id: client?.id ?? 0,
    firstName: client?.firstName ?? "",
    lastName: client?.lastName ?? "",
    middleName: client?.middleName ?? "",
    email: client?.email ?? "",
    phone: client?.phone ?? "",
    caseManager: client?.caseManager ?? "",
    status: client?.status ?? "Preliminary",
  };

  const form = useForm<insertClientSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertClientSchema),
    defaultValues,
  });

  async function submitForm(data: insertClientSchemaType) {
    console.log(data);
  }
  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <h2 className="text-2xl font-bold">
        {client?.id ? "Edit" : "Add New"} Client{" "}
        {client?.id && `# ${client.id}`}
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col md:flex-row gap-4 md:gap-8"
        >
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<insertClientSchemaType>
              fieldTitle="First Name"
              nameInSchema="firstName"
            />

            <InputWithLabel<insertClientSchemaType>
              fieldTitle="Last Name"
              nameInSchema="lastName"
            />

            <InputWithLabel<insertClientSchemaType>
              fieldTitle="Middle Name"
              nameInSchema="middleName"
            />
          </div>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<insertClientSchemaType>
              fieldTitle="Email"
              nameInSchema="email"
            />

            <InputWithLabel<insertClientSchemaType>
              fieldTitle="Phone"
              nameInSchema="phone"
            />

            <SelectWithLabel<insertClientSchemaType>
              fieldTitle="Client Status"
              nameInSchema="status"
              data={clientStatus}
              readOnly={!isManager}
            />

            <div className="flex gap-2">
              <Button
                type="submit"
                className="w-3/4"
                variant="default"
                title="Save"
              >
                Save
              </Button>
              <Button
                type="button"
                variant="destructive"
                title="Reset"
                onClick={() => form.reset(defaultValues)}
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
