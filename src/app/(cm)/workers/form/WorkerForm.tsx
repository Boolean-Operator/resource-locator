"use client";
import { Form } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { InputWithLabel } from "@/components/inputs/InputWithLabel";
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel";
import { Button } from "@/components/ui/button";
import { workerRoles } from "@/constants/workerRoles";
import {
  insertWorkerSchema,
  selectWorkerSchemaType,
  type insertWorkerSchemaType,
} from "@/zod-schema/workers";

type Props = {
  worker?: selectWorkerSchemaType;
};

export default function WorkerForm({ worker }: Props) {
  const defaultValues: insertWorkerSchemaType = {
    id: worker?.id ?? 0,
    firstName: worker?.firstName ?? "",
    lastName: worker?.lastName ?? "",
    middleName: worker?.middleName ?? "",
    role: worker?.role ?? "",
    email: worker?.email ?? "",
    phone: worker?.phone ?? "",
  };

  const form = useForm<insertWorkerSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertWorkerSchema),
    defaultValues,
  });

  async function SubmitForm(data: insertWorkerSchemaType) {
    console.log(data);
  }
  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <h2 className="text-2xl font-bold">
        {worker?.id ? "Edit" : "New"} Worker{" "}
        {worker?.id ? `# ${worker.id}` : "Form"}
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(SubmitForm)}
          className="flex flex-col sm:flex-row md:gap-4 gap-8"
        >
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<insertWorkerSchemaType>
              fieldTitle="First Name"
              nameInSchema="firstName"
            />

            <InputWithLabel<insertWorkerSchemaType>
              fieldTitle="Last Name"
              nameInSchema="lastName"
            />
          </div>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<insertWorkerSchemaType>
              fieldTitle="Email"
              nameInSchema="email"
            />

            <InputWithLabel<insertWorkerSchemaType>
              fieldTitle="Phone"
              nameInSchema="phone"
            />
            <SelectWithLabel<insertWorkerSchemaType>
              fieldTitle="Role"
              nameInSchema="role"
              data={workerRoles}
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
