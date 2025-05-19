"use client";
import { InputWithLabel } from "@/components/inputs/InputWithLabel";
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  insertCaseNoteSchema,
  selectCaseNoteSchemaType,
  type insertCaseNoteSchemaType,
} from "@/zod-schema/case-note";

import { selectClientSchemaType } from "@/zod-schema/client";
import { zodResolver } from "@hookform/resolvers/zod";

import { saveCaseNoteAction } from "@/app/actions/saveCaseNoteAction";
import { DisplayServerActionResponse } from "@/components/DisplayServerActionResponse";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

import { useForm } from "react-hook-form";

type Props = {
  client: selectClientSchemaType;
  caseNote?: selectCaseNoteSchemaType;
  caseManagers?: { id: string; description: string }[];
  userEmail: string;
  isEditable?: boolean;
};

export default function CaseNoteForm({
  client,
  caseNote,
  caseManagers,
  userEmail,
  isEditable = true,
}: Props) {
  const isManager = Array.isArray(caseManagers); //only managers recieve array of CM's

  const { toast } = useToast();

  const defaultValues: insertCaseNoteSchemaType = {
    id: caseNote?.id ?? "(New)",
    subject: caseNote?.subject ?? "Other",
    other: caseNote?.other ?? "",
    note: caseNote?.note ?? "",
    clientId: caseNote?.clientId ?? client?.id,
    authorEmail: caseNote?.authorEmail ?? userEmail,
  };
  // const { register, watch, formState: { errors }, handleSubmit } = useForm();
  const form = useForm<insertCaseNoteSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertCaseNoteSchema),
    defaultValues,
  });
  // const watchSubjectInput = form.watch("subject");

  const {
    execute: executeSave,
    result: saveResult,
    isExecuting: isSaving,
    reset: resetSaveAction,
  } = useAction(saveCaseNoteAction, {
    onSuccess({ data }) {
      toast({
        variant: "default",
        title: "Success! 🎉",
        description: data?.message,
      });
    },
    onError({ error }) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Save failed",
      });
      console.log(error);
    },
  });

  // Case Note submit is not working

  async function SubmitForm(data: insertCaseNoteSchemaType) {
    executeSave(data);
    // form.setFocus("subject");
  }
  if (!isManager)
    return (
      <div>
        Your login does not allow you to add notes. Please contact the system
        Admin.
      </div>
    );
  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <DisplayServerActionResponse result={saveResult} />
      <h2 className="text-2xl font-bold">
        {caseNote?.id ? "Edit" : "Add New"} Case Note{" "}
        {caseNote?.id && `# ${caseNote.id}`}
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(SubmitForm)}
          className="flex flex-col sm:flex-row gap-4 md:gap-8"
        >
          <div className="flex flex-col gap-4 w-full max-w-sm">
            {/* <div className="my-2 p-2 space-y-2 border-2 rounded-md  border-slate-500"> */}
            {/* <h3 className="text-lg">Client Info</h3>
              <hr className="w" />
              <p>
                {client.firstName} {client.lastName}
              </p> */}
            {/* {client.caseManager ? <p>{client.caseManager}</p> : null} */}
            {/* <p>{client.status}</p>
            </div> */}

            {/* <SelectWithLabel<insertCaseNoteSchemaType>
              fieldTitle="Subject"
              nameInSchema="subject"
              data={caseNoteSubjects}
              readOnly={!isEditable}
            /> */}
            {/* <CheckboxWithLabel<insertCaseNoteSchemaType>
                fieldTitle="Other Subject"
                nameInSchema="showOther"
                message="Add other note subject"
              /> */}

            <InputWithLabel<insertCaseNoteSchemaType>
              fieldTitle="Subject"
              nameInSchema="other"
              readOnly={!isEditable}
            />

            <TextAreaWithLabel<insertCaseNoteSchemaType>
              fieldTitle="Notes"
              nameInSchema="note"
              className="h-60 field-sizing-content"
              readOnly={!isEditable}
            />
            {/* {isManager ? (
              <SelectWithLabel<insertCaseNoteSchemaType>
                fieldTitle="Note Author Email"
                nameInSchema="authorEmail"
                data={caseManagers}
                // data={[
                //   {
                //     id: "new-note@example.com",
                //     description: "new-note@example.com",
                //   },
                //   ...caseManagers,
                // ]}
              />
            ) : (
              <InputWithLabel<insertCaseNoteSchemaType>
                fieldTitle="CaseManager"
                nameInSchema="authorEmail"
                disabled={true}
              />
            )} */}
            <InputWithLabel<insertCaseNoteSchemaType>
              fieldTitle="Note Author Email"
              nameInSchema="authorEmail"
              readOnly
            />
            {isEditable ? (
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="w-3/4"
                  variant="default"
                  title="Save"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <LoaderCircle className="animate-spin" /> Saving
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  title="Reset"
                  onClick={() => {
                    form.reset(defaultValues);
                    resetSaveAction();
                  }}
                >
                  Reset
                </Button>
              </div>
            ) : null}
          </div>
        </form>
      </Form>
    </div>
  );
}
